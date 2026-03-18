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
- `data.js`
- `spine_manifest.js`
- `assets/`
- `vendor/`

## Notes

- The project is self-contained. External `../...` asset paths were removed.
- Spine previews use embedded texture/skeleton data from `spine_manifest.js`.
- Only runtime assets remain in `assets/`; probe images and export-time scratch files were removed.

## Git

- Repository already initialized with `main`.
- Recommended next commands:
- `git add .`
- `git commit -m "Initial Vercel bundle"`
