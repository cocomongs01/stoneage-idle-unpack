# Gacha Pet Viewer

Vercel static deployment bundle for the gacha viewer.

## Deploy

- Root directory: repository root (`.`)
- Framework preset: `Other`
- Build command: none
- Output directory: none

## Runtime Files

- `index.html`
- `viewer.js`
- `viewer.css`
- `viewer-mobile.css`
- `data.js`
- `extra_pet_data.js`
- `added_pet_data.js`
- `spine_manifest_index.js`
- `character_meta_overrides.js`
- `spine_manifest_entries/`
- `spine_manifest_pickup_entries/`
- `spine_assets/`
- `spine_assets_pickup/`
- `assets/`
- `vendor/`

## Local Server

- Run `.\start_viewer_server.ps1` from this directory.
- Open `http://127.0.0.1:4173/`.
- Direct `file://` mode is no longer supported.

## Notes

- The project is self-contained. External `../...` asset paths were removed.
- Spine previews load `spine_manifest_index.js` first, then lazy-load per-entry chunks and external Spine assets only when needed.
- PNG runtime assets are served as WebP.
- Desktop no longer downloads `viewer-mobile.css`; the mobile stylesheet is gated with `media="(max-width: 900px)"`.
- Debug captures, test artifacts, and local tooling pages are excluded from deployment.

## Validation

- Run `node tools/validate_text_encoding.js` before publishing or committing UI/data text changes.
- A local pre-commit hook runs the same check and fails on invalid UTF-8, replacement characters, and common Korean mojibake patterns.

## Git

- Repository already initialized with `main`.
- Recommended next commands:
- `git add .`
- `git commit -m "Initial Vercel bundle"`
