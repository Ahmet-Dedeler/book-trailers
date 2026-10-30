# Book Trailers

Open-source cinematic trailers and original soundtracks for technology history books, built with [HyperFrames](https://hyperframes.heygen.com), Three.js, and GSAP.

---

## The Trailers

### 1. The Little Kingdom
*Based on **The Little Kingdom: The Private Story of Apple Computer** (Michael Moritz, 1984).*

* **Premise:** Every Apple account you have read was written *after* Apple won. This one wasn't—written from inside the room before the Macintosh launch.
* **Style:** Cold editorial print aesthetic, 1977 six-color Apple prism, typewriter/press typography.
* **Directory:** [`the-little-kingdom/`](./the-little-kingdom/)
* **Soundtrack:** Custom 2-movement cinematic score generated via Google Lyria 2 + analog tape warmth (`assets/score.mp3`).

### 2. Hard Drive
*Based on **Hard Drive: Bill Gates and the Making of the Microsoft Empire** (James Wallace & Jim Erickson, 1992).*

* **Premise:** The unauthorized story of the 1980 IBM deal and how an empire was negotiated rather than coded.
* **Style:** Machine-level monochrome, cobalt accent, Altair 8800 toggle panel, and a continuous 60-second 3D hard-disk platter assembly rendered in Three.js.
* **Directory:** [`hard-drive/`](./hard-drive/)
* **Soundtrack:** 4-movement Lyria score + procedural industrial sound design (`assets/mix.mp3`).

### 3. The Book of Elon
*Inspired by the founding journeys of SpaceX, Tesla, and first-principles thinking.*

* **Premise:** Beyond biography—the relentless execution and hardcore engineering algorithm.
* **Style:** Deep cosmic orbit, 3D solar system and orbital mechanics, glowing HUD telemetry.
* **Directory:** [`the-book-of-elon/`](./the-book-of-elon/)
* **Soundtrack:** Tense pulsing arpeggiators building into full driving percussion (`assets/mix.mp3`).

---

## Soundtracks & Audio

All music in this repository was generated locally using **Google Lyria 2** via the `hcai` CLI, then stitched and mastered with `ffmpeg`:

```bash
# Example score generation
hcai music generate \
  --model google/lyria-2 \
  --negative-prompt "vocals, singing, cheerful, upbeat pop, EDM, distorted guitar, busy drums" \
  "Cinematic documentary trailer score, 60 seconds, serious and restrained. Sparse minor-key piano ostinato over a low analog synth drone with tape warmth..."
```

* Audio stems and master mixes are available in each project's `assets/` directory (`score.mp3` and `mix.mp3`).
* Licensed under **CC BY 4.0**—free to use, remix, and share.

---

## Video Renders

* **In-repo cuts:** Standard 1080p, 3D, and web previews (`*-web.mp4`, `*-1080p.mp4`) are included in each project's `renders/` folder.
* **4K Master Renders:** Full 4K uncompressed 60fps masters exceed GitHub's 100MB file limit and are hosted on the [GitHub Releases](../../releases) tab.

---

## Running Locally

Each trailer is a self-contained HyperFrames project.

```bash
cd the-little-kingdom   # or hard-drive, the-book-of-elon

# Install dependencies / HyperFrames runner
npm install

# Live preview in browser
npm run dev

# Audit layout, runtime determinism & contrast
npm run check

# Render to MP4
npm run render
```

---

## License

* **Code, DOM & Animations:** [MIT License](./LICENSE)
* **Media Assets (Soundtracks & Video Renders):** [Creative Commons Attribution 4.0 (CC BY 4.0)](./LICENSE)
