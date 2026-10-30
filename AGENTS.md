# Book Trailers

Repository containing HyperFrames-powered cinematic book trailers for technology history books:
- **The Little Kingdom** (Michael Moritz, 1984)
- **Hard Drive: Bill Gates and the Making of the Microsoft Empire** (James Wallace & Jim Erickson, 1992)
- **The Book of Elon** (Per user direction / Walter Isaacson & Eric Jorgenson context)

## Project Structure

- `the-little-kingdom/` — The Apple origin story before the Macintosh launch.
- `hard-drive/` — Microsoft DOS/IBM deal and early empire, featuring an evolving 3D disk platter.
- `the-book-of-elon/` — Elon Musk / SpaceX / Tesla first-principles trailer with 3D cosmic/orbital visuals.

## HyperFrames Tooling

Each subproject is a self-contained HyperFrames composition:
- Preview: `cd <project> && npm run dev`
- Persistent preview: `cd <project> && npx hyperframes preview --background`
- Lint & check: `cd <project> && npm run check`
- Render: `cd <project> && npm run render`

## Assets & Audio

- Scores were generated via `hcai` with `google/lyria-2` and stitched with `ffmpeg`.
- Renders exceeding 100MB (4K masters and certain 1080p cuts) are stored as GitHub Release assets.
