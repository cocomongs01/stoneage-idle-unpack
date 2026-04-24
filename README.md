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
- `spine_manifest.embedded.js`
- `spine_manifest_weapon.embedded.js`
- `pet_pickup_spine_manifest.embedded.js`
- `spine_manifest_entries/`
- `spine_manifest_pickup_entries/`
- `spine_assets/`
- `spine_assets_pickup/`
- `assets/`
- `vendor/`

## Notes

- The project is self-contained. External `../...` asset paths were removed.
- Spine previews load `spine_manifest_index.js` first, then lazy-load per-entry chunks and embedded manifests only when needed.
- Desktop no longer downloads `viewer-mobile.css`; the mobile stylesheet is gated with `media="(max-width: 900px)"`.
- Debug captures, test artifacts, and local tooling pages are excluded from deployment.

## Git

- Repository already initialized with `main`.
- Recommended next commands:
- `git add .`
- `git commit -m "Initial Vercel bundle"`
