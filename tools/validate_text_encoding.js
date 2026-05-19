#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const { TextDecoder } = require("util");

const root = path.resolve(__dirname, "..");
const decoder = new TextDecoder("utf-8", { fatal: true });
const targetExtensions = new Set([".html", ".css", ".js", ".json", ".md"]);
const ignoredDirs = new Set([
  ".git",
  ".vercel",
  "assets",
  "node_modules",
  "spine_assets",
  "spine_assets_pickup",
  "vendor",
]);
const ignoredFilePatterns = [
  /\.embedded\.js$/i,
  /^spine_manifest(?:_weapon|_index)?\.js$/i,
];

const suspiciousRanges = [
  [0x4e00, 0x9fff, "unexpected CJK ideograph"],
  [0x1100, 0x11ff, "Hangul jamo fragment"],
  [0x3130, 0x318f, "Hangul compatibility jamo fragment"],
  [0xa960, 0xa97f, "Hangul jamo fragment"],
  [0xd7b0, 0xd7ff, "Hangul jamo fragment"],
  [0xfffd, 0xfffd, "replacement character"],
];

const mojibakeSequencePattern = /[\u00C0-\u00FF][\u0080-\u00FF]{1,}/g;
const htmlTagPattern = /<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>|<[^>]+>/gi;

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (ignoredDirs.has(entry.name)) continue;

    const entryPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(entryPath, files);
      continue;
    }

    const rel = relative(entryPath);
    if (ignoredFilePatterns.some((pattern) => pattern.test(rel))) {
      continue;
    }

    if (targetExtensions.has(path.extname(entry.name).toLowerCase())) {
      files.push(entryPath);
    }
  }
  return files;
}

function relative(filePath) {
  return path.relative(root, filePath).replace(/\\/g, "/");
}

function lineAndColumn(text, offset) {
  const prefix = text.slice(0, offset);
  const lines = prefix.split(/\r\n|\r|\n/);
  return {
    line: lines.length,
    column: lines[lines.length - 1].length + 1,
  };
}

function contextAt(text, offset) {
  return text
    .slice(Math.max(0, offset - 24), Math.min(text.length, offset + 24))
    .replace(/\r/g, "\\r")
    .replace(/\n/g, "\\n");
}

function charReason(codePoint) {
  for (const [start, end, reason] of suspiciousRanges) {
    if (codePoint >= start && codePoint <= end) return reason;
  }
  return "";
}

function inspectText(filePath, text) {
  const problems = [];

  for (let index = 0; index < text.length; index += 1) {
    const codePoint = text.codePointAt(index);
    if (codePoint > 0xffff) index += 1;

    const reason = charReason(codePoint);
    if (!reason) continue;

    const loc = lineAndColumn(text, index);
    problems.push({
      file: relative(filePath),
      line: loc.line,
      column: loc.column,
      reason,
      codePoint: `U+${codePoint.toString(16).toUpperCase().padStart(4, "0")}`,
      context: contextAt(text, index),
    });
  }

  for (const match of text.matchAll(mojibakeSequencePattern)) {
    const loc = lineAndColumn(text, match.index);
    problems.push({
      file: relative(filePath),
      line: loc.line,
      column: loc.column,
      reason: "latin-1 mojibake sequence",
      codePoint: "",
      context: contextAt(text, match.index),
    });
  }

  if (path.extname(filePath).toLowerCase() === ".html") {
    const visibleText = text.replace(htmlTagPattern, " ");
    const suspiciousQuestion = /[^\x00-\x7F][^?.!]*\?{2,}|[^\x00-\x7F]\?+[^\x00-\x7F]/.exec(visibleText);
    if (suspiciousQuestion) {
      const loc = lineAndColumn(text, text.indexOf(suspiciousQuestion[0]));
      problems.push({
        file: relative(filePath),
        line: loc.line,
        column: loc.column,
        reason: "question marks inside non-ASCII visible HTML text",
        codePoint: "",
        context: suspiciousQuestion[0].slice(0, 80),
      });
    }
  }

  return problems;
}

function main() {
  const files = walk(root);
  const problems = [];

  for (const filePath of files) {
    const bytes = fs.readFileSync(filePath);
    let text;
    try {
      text = decoder.decode(bytes);
    } catch (error) {
      problems.push({
        file: relative(filePath),
        line: 1,
        column: 1,
        reason: "invalid UTF-8",
        codePoint: "",
        context: error.message,
      });
      continue;
    }

    problems.push(...inspectText(filePath, text));
  }

  if (problems.length) {
    console.error("Text encoding validation failed:");
    for (const problem of problems.slice(0, 80)) {
      const location = `${problem.file}:${problem.line}:${problem.column}`;
      const codePoint = problem.codePoint ? ` ${problem.codePoint}` : "";
      console.error(`- ${location} ${problem.reason}${codePoint}`);
      if (problem.context) {
        console.error(`  ${problem.context}`);
      }
    }
    if (problems.length > 80) {
      console.error(`...and ${problems.length - 80} more problem(s).`);
    }
    process.exit(1);
  }

  console.log(`Text encoding validation passed (${files.length} files).`);
}

main();
