# Design truth — Hard Drive (60s trailer)

## Concept angle

One sentence: **the story is told on the surface of the machine it made** — the
frame is a disk platter under a read head, and the empire is written to it track
by track.

This piece must not look like the Apple trailer. That one was warm ink, newsprint
and condensed press type. This one is cold, cooled-black, blunt and mechanical.

## Palette (fixed)

| Token        | Hex       | Role                                                     |
| ------------ | --------- | -------------------------------------------------------- |
| `--void`     | `#05070E` | canvas. near-black cooled toward blue (never `#000`)      |
| `--void-2`   | `#0B1120` | panels, track fills, raised surfaces                      |
| `--screen`   | `#DCE5F2` | primary type. cool screen white (never `#fff`)            |
| `--screen-d` | `#7C8AA3` | metadata, labels, attribution (AA on void: 6.4:1)         |
| `--cobalt`   | `#3B7BFF` | THE accent. one hue. rules, data, emphasis, platter glow  |

Windows-era four-pane flag — used **once**, on the title card only:
`#E8443A #7DBB42 #2C7FD4 #F3C13A`.

## Typography

Two voices in argument:

- **Archivo Black (400 only)** — the monopoly. Blunt, heavy, geometric, corporate.
  Every statement is set in it. Never request 700/900; it ships one cut.
- **Space Mono (400/700)** — the machine and the hobbyist culture it came out of.
  Odd ball terminals, quirky and slightly wrong. Dates, labels, data, the prompt.

The tension is the book's subject: institutional weight versus the strange little
industry it grew out of and then dominated.

Display 130–230px uppercase, tracking `-0.02em`. Mono 22–30px uppercase, tracking
`+0.16em to +0.22em`. Light-on-dark: line-height +0.06 over a light-canvas value.

## The continuous background (the piece's spine) — real 3D

A genuine **Three.js** disk assembly runs under all 60s: three metal platters on a
spindle, clamp rings, a three-beam actuator with a lit head, real lights and real
perspective. Not CSS pseudo-3D — CSS only skews flat planes, with no camera and no
light, so specular sweep and depth occlusion are impossible there.

Over the minute it continuously:

- **rotates** — one revolution every 6s, dead steady, forever;
- **seeks** — the actuator head steps on the same beat table the 2D cuts land on;
- **travels** — ONE unbroken camera move along a Catmull-Rom path: high and far →
  low and close → settling back for the title. The 2D layer cuts; the camera never does.

It is graded to sit *behind* the message: exposure 0.72, rim light kissing the edge
only, layer at 68% over a deep vignette. If the machine ever competes with the type,
the grade is wrong — not the type.

### Non-negotiable technical constraints (learned the hard way)

- The 3D **must live in the host `index.html` `<head>`**. A sub-composition template's
  `<script type="module">` is inlined as a *classic* script by the compiler, so a bare
  `import` throws `Cannot use import statement outside a module` — and that throw kills
  every later script on the page (all scene text silently disappears while lint stays green).
- Three.js is **vendored to `assets/`**, never CDN-imported: a render-time network fetch
  breaks determinism. `three.module.js` also needs `three.core.js` beside it.
- Render from `hf-seek` / `window.__hfThreeTime` only — never wall-clock, never rAF.
- `setPixelRatio(2)` is **pinned**, not device-derived, so the canvas backing store is a
  true 3840×2160 and the 3D holds real detail at 4K.

## Objects (built, not stock)

- Hard-disk platter + actuator arm (background, all 60s)
- Altair 8800 front panel — toggle switches and deterministically blinking LEDs
- Licence-flow node diagram — Seattle Computer → Microsoft → IBM, then fanning to clones
- Drawn timeline 1975 → 1992 with popped milestone marks
- Windows four-pane flag (title card, once)

## Do not

- No gradient text, no neon, no purple/blue *gradient* (flat cobalt only).
- No pure `#000` / `#fff`.
- No full-screen linear gradients — radial only (they band under H.264).
- No per-scene background swap. The background is one continuous object.
- Do not reuse the Apple trailer's amber/newsprint palette or its type pairing.
