# Design truth — The Little Kingdom (60s trailer)

## v3 — real 3D

The background is no longer CSS. It is a **Three.js scene**: a physical circuit board
receding to a horizon, with a real `PerspectiveCamera` flying 512 world-units down it over
the full 60s, banking as it goes. Traces are emissive instanced boxes, pads are cylinders,
DIP packages are solids that genuinely occlude and catch the key light. Fog carries the
horizon into the ink. Density and heat both climb with distance travelled, so the flight
itself performs the sparse-schematic → dense-board evolution.

Engineering decisions worth keeping:

- **Driven by the paused GSAP timeline**, not `requestAnimationFrame` — the registry's own
  `three-orbiting-cards` pattern (`{state, render}` + a single `ease:"none"` driver tween).
  Seek-safe in both directions.
- **three.js is linked, declared once, in `bg-field.html` only.** Inlining it made lint scan
  the library's own `Math.random`/rAF internals; loading it in the host head as well produced
  a duplicate-instance warning. Scene construction is **lazy**, so it cannot lose a race with
  the linked script, and stays deterministic because everything derives from the seed.
- **`renderer.setPixelRatio(2)` is pinned, never read from `devicePixelRatio`** — a fixed
  3840×2160 buffer, so the `--resolution 4k` pass samples real WebGL detail.

**Scene objects use CSS 3D, deliberately.** The jacket in scene 8 is a true six-face
`preserve-3d` solid — cover, back, spine, fore-edge, head and tail — that rotates in real
space. It is CSS and not WebGL because **CSS text re-rasterizes at 4K while a canvas texture
would be locked to its buffer**, and on the payoff shot the type is the point. Shelf volumes,
the deck, the magazine and the manuscript pages all carry real `rotateY`/`rotateX`/`translateZ`.

Every scene carries a `.veil` (~46%, 56% on the ledger): the lit 3D plate is far brighter
than v2's CSS board and cost four elements their WCAG margin.

## v2 — the built world

The film is no longer type on a field. Two changes define v2:

1. **One continuous background** (`compositions/bg-field.html`, track 0, full 60s). A printed
   circuit board draws itself across the whole runtime — sparse hand-schematic at the top of
   the film, dense manufactured board with seated DIP packages by the end — under a warm
   bloom that migrates on a four-leg path and a camera that descends 1.00 → 1.16. Geometry is
   generated at load from a seeded PRNG (`mulberry(19810401)`), never `Math.random()`.
   It never cuts. Scenes are transparent and float on top of it.
2. **Every scene carries a built object**, not decoration: a shelf, a book pulled from it, a
   cassette deck whose reels actually turn, six drawn ledger icons, a newsmagazine cover and
   a slamming door, a stack of manuscript pages, a ruled page, and the jacket itself.

Scenes carry a local radial `.scrim` so type keeps contrast as the board densifies.

## Concept angle

One sentence: **a reporter's private notebook on the company that ate the world —
set in hot-metal headline type, interrupted by the machine that replaced it.**

## Palette (fixed — do not invent per-element colors)

| Token         | Hex       | Role                                                       |
| ------------- | --------- | ---------------------------------------------------------- |
| `--ink`       | `#0B0A09` | canvas. near-black, warmed toward the accent (never `#000`) |
| `--ink-2`     | `#16130F` | raised panels, rules, ghost type                            |
| `--paper`     | `#EFE7D6` | primary type. newsprint cream, never `#fff`                 |
| `--paper-dim` | `#9A8F7C` | metadata, attribution, kickers (AA on ink: 6.1:1)           |
| `--amber`     | `#F0761E` | THE accent. one hue. rules, emphasis words, glow (6.8:1)    |

Six-color spectrum — used **once**, on the title card only:
`#61BB46 #FCB61A #F5821F #E03A3E #963D97 #009DDC` (Apple's 1977 logo bands).

## Typography

Two voices in argument, which is the book's subject:

- **League Gothic (400 only)** — the press. Condensed headline metal, 1980s
  paperback-jacket scale. Every statement is set in it. Never request 700/900.
- **IBM Plex Mono (400/700)** — the machine, and the reporter's typescript.
  Dates, attributions, source lines, the typed cold open. IBM is the mainframe
  world Apple defined itself against; that is why this face and not a neutral mono.

Weight contrast is carried by *scale and case*, not by weight (League Gothic ships
one cut): display 150–260px uppercase vs mono 22–30px uppercase, tracked +0.22em.

Display tracking `-0.02em`; mono tracking `+0.18em to +0.24em`.
Light-on-dark compensation: line-height +0.06 over the light-canvas value.

## Frame rules

- Content anchored to a left rail at 168px. Not centered-and-floating — except the
  title card and the thesis, where centering is the point (a book jacket is centered).
- Every scene carries a persistent background layer: a fine horizontal scanline
  field (the CRT), one warm radial bloom, and an oversized ghost word at 6–9%.
- Static decoratives are banned. Every decorative breathes, drifts, or pulses.
- A 2px amber rule is the recurring structural element across scenes — it draws,
  it wipes, it holds. It is the through-line.

## Do not

- No gradient text, no cyan, no purple/blue gradients, no neon.
- No pure `#000` / `#fff`.
- No full-screen linear gradients (they band under H.264) — radial only.
- No serif. An editorial subject does not require a serif; the press/machine
  tension is louder without one.
