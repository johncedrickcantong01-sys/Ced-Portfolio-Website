# cedcantong.site

The site of Ced Cantong, DTC video ad editor. React Router 7 in framework mode with `ssr: false`: every page is prerendered to its own HTML file at build time. Node 22 (`.node-version`).

## Run

```sh
npm install
npm run dev
```

## Build

```sh
npm run typecheck
npm run build
```

The site is written to `build/client`, ready for any static host.

## Where the media lives

- `public/media/`: posters, process frames, share images and the portrait, served with the site.
- The full ads are on assets.cedcantong.site and load only when a visitor presses play.

## Add a case study

1. Add an entry to `work` in `src/content/work.ts` with a new slug and every field. Its card on the home page, its page at `/work/<slug>` and its place in the prerender list all come from that entry.
2. Put its poster (9:16 WebP) and share image (1200×630 JPG) in `public/media/` and set `poster` and `shareImage`.
3. Upload the full ad (MP4, H.264) to assets.cedcantong.site and set `video`, `duration` and `uploadDate`.
4. Add its URL, `https://www.cedcantong.site/work/<slug>/`, to `public/sitemap.xml`.

`npm run build` then writes `build/client/work/<slug>/index.html`.
