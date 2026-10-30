# Design truth — The Little Kingdom (60s trailer, v4)

v4 is a full rebuild of every scene on top of the v3 world. The prior cut (archived in
`archive/v-prev-2026-08-23/`) was correct but timid: type at 120–150px floating in
half-empty frames, flat dark slabs for objects, hard jump-cuts between scenes, a score
with no dynamics and no sound design. v4 fixes each of those, in this order of priority:

1. **Every cut is a camera move.** Scenes overlap by 0.5s on alternating tracks; the
   outgoing scene streaks out while the incoming streaks in, and the 3D board surges
   forward under both. No jump cuts anywhere in the film.
2. **Type fills the frame.** Statements 176–250px League Gothic (178px for a three-line
   stack, 220–250px for a one-liner), stacked so the block is 450–650px tall. Metadata
   24–30px mono. Nothing under 18px.
3. **Objects are built things with material,** not outlined rectangles: printed spines,
   a micro-cassette with a moving tape and a VU needle, a newsmagazine with a halftone
   cover, a stack of typed manuscript pages with a stamp, a jacket you could pick up.
4. **A paper motif carries the reporter.** Quotes and sourced lines arrive on cream
   *paper slips* set in typewriter mono — the notebook the whole film is about.
5. **A frame-chrome layer runs the full minute** (chapter ticker, tape counter, a
   progress rule, film grain) so the film reads as one produced object.
6. **Sound design + a dynamic score.** Keys, tape, a slam, a door, pages, whooshes on
   every handoff, a boom under the title; score movements cut to the beat table.

Everything below is binding for anyone building a scene.

## Concept angle (unchanged)

**A reporter's private notebook on the company that ate the world — set in hot-metal
headline type, interrupted by the machine that replaced it.**

## Palette (fixed — do not invent per-element colours)

| Token         | Hex       | Role                                                        |
| ------------- | --------- | ----------------------------------------------------------- |
| `--ink`       | `#0B0A09` | canvas. near-black warmed toward the accent (never `#000`)   |
| `--ink-2`     | `#16130F` | raised panels, rules, ghost type                             |
| `--paper`     | `#EFE7D6` | primary type. newsprint cream, never `#fff`                  |
| `--paper-dim` | `#9A8F7C` | metadata, attribution, kickers (AA on ink: 6.1:1)            |
| `--amber`     | `#F0761E` | THE accent. rules, emphasis words, glow (6.8:1)              |
| `--slip`      | `#E9DFC8` | paper-slip fill (typed quotes). Ink on slip: `#1A1611`       |

Six-colour spectrum, **once**, title card only: `#61BB46 #FCB61A #F5821F #E03A3E #963D97 #009DDC`.
The magazine's red border is `#E03A3E` (also the REC lamp). No other reds.

Write colours as literals in CSS (no `var()`), so a future shader pass can capture them.

## Typography

- **League Gothic (400 only)** — the press. Every statement. Uppercase, tracking `-0.02em`,
  line-height `0.92`. Display sizes: three-line statements **178px** (stage width 1180px,
  the longest line ≤ 21 characters), one-line slams **230–250px**, secondary statements
  **120–150px**, ledger rows 76px, jacket title 150px. `white-space:nowrap` on each line.
- **IBM Plex Mono (400/700)** — the machine and the typescript. Kickers, datelines,
  attributions, counters, and the paper slips. **24–30px**, uppercase, tracking `+0.18–0.24em`.
  Paper-slip body: 30–34px, normal case, tracking `0.02em`, line-height 1.45.

Weight contrast is carried by scale and case, never by weight.

## Frame rules

- Left rail at **168px**. Statements sit on the rail in a 1180px stage; objects live in the
  right third of the frame (x 1300–1860) and are vertically centred on the type block. Title card and thesis are centred — the only two.
- Every scene keeps a `.veil` (rgba(11,10,9,.40)) over the plate and a local radial `.scrim`
  behind its type block. Type must pass AA with the plate at its brightest.
- The 2px amber rule is the recurring structural element: it draws, wipes, holds.
- Static decoratives are banned: every decorative breathes, drifts, or pulses (finite repeats).
- Objects carry their **own** `perspective` wrapper (`.rig { perspective:1600px }`) — never rely
  on `#root` perspective, because the `.world` wrapper is filtered during handoffs and a
  filter flattens inherited 3D.

## The world (track 0, `compositions/bg-field.html`)

One continuous Three.js flight down a circuit board for 60s: sparse hand-schematic at the
top of the film, dense manufactured board with seated packages by the end. v4 adds dust
motes in the lamp light, standing capacitors, a warmer key, a cream **flash** on every cut
(the press flashbulb), and a **surge**: at each cut time the camera accelerates ~14 units
forward over 0.6s and banks toward the handoff direction. The board is the only thing that
is allowed to move continuously through a cut.

## Timing table (binding)

Cuts are on the score's beat table. Scenes overlap by **0.5s** on alternating tracks: a scene's
slot runs from its cut to the next cut **plus 0.5s**. Inside a scene, local time `0–0.5`
is the entry handoff, `D-0.5 – D` is the exit handoff (D = slot duration).

| #  | id            | cut   | slot dur | track | on-screen beat                               |
| -- | ------------- | ----- | -------- | ----- | -------------------------------------------- |
| 1  | s1-cold-open  | 0     | 7.0      | 1     | Every story about Apple was written after it won. |
| 2  | s2-turn       | 6.5   | 6.5      | 2     | This one wasn't.                             |
| 3  | s3-access     | 12.5  | 9.0      | 1     | Jobs hired a Time reporter… "our historian." |
| 4  | s4-room       | 21    | 10.0     | 2     | What he was let in to see (six-row ledger).  |
| 5  | s5-break      | 30.5  | 9.0      | 1     | Then the story ran. / And the door closed.   |
| 6  | s6-anyway     | 39    | 8.5      | 2     | He finished the book anyway. + Hertzfeld.    |
| 7  | s7-thesis     | 47    | 6.0      | 1     | Before Apple was a myth, somebody was taking notes. |
| 8  | s8-title      | 52.5  | 7.5      | 2     | Jacket lockup, spectrum, credits, cut to black. |
| —  | chrome        | 0     | 60       | 3     | ticker, counter, progress rule, grain.       |

## Scene contract (copy this skeleton)

```html
<!doctype html>
<html lang="en"><head><meta charset="UTF-8" /></head><body>
<template>
  <style>
    #root { position:absolute; inset:0; width:1920px; height:1080px; overflow:hidden;
            font-family:"IBM Plex Mono",monospace; color:#EFE7D6; }
    .world { position:absolute; inset:0; }                 /* the handoff wrapper */
    .veil  { position:absolute; inset:0; background:rgba(11,10,9,.40); }
    .scrim { position:absolute; left:-260px; top:100px; width:1560px; height:880px;
             background:radial-gradient(ellipse closest-side, rgba(11,10,9,.94),
               rgba(11,10,9,.74) 56%, rgba(11,10,9,0) 100%); }
    .rig   { position:absolute; perspective:1600px; perspective-origin:50% 50%; } /* object wrapper */
    /* … scene styles … */
  </style>
  <div id="root" data-composition-id="sN-id" data-start="0" data-duration="D"
       data-width="1920" data-height="1080">
    <div class="world" id="sN-world">
      <div class="veil" data-layout-ignore aria-hidden="true"></div>
      <div class="rig" id="sN-rig" style="left:1180px; top:200px; width:640px; height:680px;">…object…</div>
      <div class="scrim" data-layout-ignore aria-hidden="true"></div>
      <div class="stage">…type…</div>
    </div>
  </div>
  <script>
    (function () {
      var DUR = D, IN = 0.5, OUT = 0.5;
      var tl = gsap.timeline({ paused: true });

      /* ---- handoff IN: the previous scene is streaking out at the same wall time ---- */
      tl.fromTo("#sN-world", { opacity: 0, x: 160, filter: "blur(16px)" },
                             { opacity: 1, x: 0, filter: "blur(0px)", duration: IN, ease: "power3.out" }, 0);
      tl.set("#sN-world", { filter: "none" }, IN);        /* release the filter after the settle */

      /* ---- scene motion (rules) — between IN and DUR-OUT ---- */

      /* ---- handoff OUT (mirror of the next scene's IN) ---- */
      tl.set("#sN-world", { filter: "blur(0px)" }, DUR - OUT);
      tl.to("#sN-world", { opacity: 0, x: -160, filter: "blur(16px)", duration: OUT, ease: "power3.in" }, DUR - OUT);

      window.__timelines = window.__timelines || {};
      window.__timelines["sN-id"] = tl;
    })();
  </script>
</template>
</body></html>
```

Handoff rules:

- Primary handoff = **lateral page-push**: in from `x:+160`, out to `x:-160`, 16px blur,
  opacity. Scenes 1→2, 2→3, 3→4, 6→7 use it exactly as above.
- Accent handoffs (do not use elsewhere):
  - **4→5**: s4 exits with a hard *upward* push (`y:-120`, blur 12, 0.35s) — the story
    jumps. s5 enters with `scale:1.12→1, blur:18→0` (a push-in), no x.
  - **5→6**: s5's door slam is the handoff (see s5 brief). s6 enters from below (`y:+90`),
    blur 12, `power4.out`.
  - **7→8**: dip. s7 exits opacity-only over 0.5s (`power2.in`); s8 enters opacity-only
    over 0.7s from black with `scale:1.04→1` (`power2.out`). No x, no blur.
- Nothing else animates out before `DUR-OUT`. The last scene fades to black (only allowed exit).
- **Scene 1 has no IN handoff** (opens from black on its own terms). Scene 8 has no OUT (it ends the film).

Determinism / lint reminders: `fromTo` with explicit from-states; finite repeats
`Math.max(0, Math.floor(span/cycle) - 1)`; no CSS `transform` on tweened elements; no
`Math.random` — index-derived hashes only; ids prefixed `sN-`; `.clip` never targeted.

## Paper slip (shared component)

Sourced quotes and bibliographic lines arrive on a cream slip:

```html
<div class="slip" id="sN-slip"><div class="slip-t">"Mike's going to be our historian."</div>
  <div class="slip-a">— Steve Jobs, as recalled by Andy Hertzfeld</div></div>
```
```css
.slip { position:absolute; width:760px; padding:34px 40px 30px; background:#E9DFC8; color:#1A1611;
        box-shadow: 0 30px 60px rgba(0,0,0,.55), 0 2px 0 rgba(255,255,255,.35) inset; }
.slip-t { font-family:"IBM Plex Mono",monospace; font-size:33px; line-height:1.42; letter-spacing:.02em; }
.slip-a { margin-top:18px; font-size:22px; letter-spacing:.2em; text-transform:uppercase; color:#6B6152; }
.slip::after { content:""; position:absolute; left:0; right:0; top:0; height:6px; background:#F0761E; }
```
Entrance: `rotation:-3→-1.2, y:60→0, opacity 0→1, 0.55s power4.out`; the text on it can
type (discrete-text-sequence) when the beat wants it. One slip per scene at most.

## Frame chrome (track 3, `compositions/chrome.html`, 60s)

Transparent root. Everything in mono, `#9A8F7C`, 22–24px, uppercase, tracking .22em:

- **Top-left (168px, 64px):** `CHAPTER 01 / 08` then an amber ` — ` and the chapter title
  (`EVERY STORY`, `THIS ONE`, `THE ACCESS`, `THE ROOM`, `THE BREAK`, `ANYWAY`, `THESIS`,
  `THE LITTLE KINGDOM`). Chapter text swaps by `tl.set` at each cut time (with a 0.25s
  opacity dip-and-return around the swap). Index digits step the same way.
- **Top-right (right:168px, 64px):** `MORITZ / APPLE — TAPE 01` and beneath it a tape
  counter `0000` that runs at 27 counts/s for the whole film (text write in onUpdate off
  `tl.time()`), amber digits, `tabular-nums`.
- **Bottom (168px→1752px, bottom 56px):** a 2px `#F0761E` progress rule that draws from
  `scaleX:0→1` over 60s (`ease:"none"`) over a `rgba(239,231,214,.14)` track. Eight 1px cream
  ticks at the cut fractions.
- **Corners:** four 18px L-brackets in `rgba(239,231,214,.45)` inset 40px, that breathe
  (`opacity .45↔.8`, 3.2s sine, finite repeats).
- **Grain:** a 256px seeded noise tile (canvas → dataURL at build time; LCG seed 19840101)
  as a full-bleed layer at `opacity:.10`, `mix-blend-mode:overlay`; `backgroundPosition`
  jumps every frame to a hashed offset (`floor(t*24)` → hash → 0–256px) via an onUpdate
  driver. `data-layout-ignore` on it.
- The chrome must **never** overlap statement type: keep to the 64px top band and the
  56px bottom band.

## Scene briefs (binding — object, motion, copy)

Copy is sourced and must be used **verbatim**. Motion names come from
`hyperframes-animation/rules-index.md` / `blueprints-index.md`.

### s1-cold-open (0 → 7.0) — blueprint `typewriter-reveal` + `waterfall-entry`
- **Copy:** kicker `CUPERTINO, CALIFORNIA — 1981` (typed, caret); statement
  `EVERY STORY ABOUT APPLE / WAS WRITTEN *AFTER* IT WON.` (AFTER amber).
- **Object (right):** a shelf of six volumes with printed spines (`APPLE`, `JOBS`, `THE MAC`,
  `1984`, `INSANELY`, `THE RISE` in tiny cream mono), each a real box with a cream
  fore-edge; they drop in one by one on `power4.out` with a 4px settle bounce; the shelf
  rule draws first; tag `THE APPLE SHELF` pops last. Slow breathe after.
- **Sound cues** (mix-side): type keys per character, bell at end of line, thud per spine.

### s2-turn (6.5 → 13.0) — blueprint `kinetic-type-beats`
- **Copy:** `THIS ONE WASN'T.` (240px, slam: `scale 1.5→1, blur 18→0, power4.out`), then a
  paper slip with `The Little Kingdom · Michael Moritz · William Morrow · 1984`.
- **Object:** the same shelf (built again at the same spot so the cut reads continuous),
  then ONE volume slides out, turns 90° to face camera (real `rotateY` on a 6-face box with
  a printed cover: `THE LITTLE KINGDOM / MORITZ · 1984`, amber rule) and grows toward
  camera (`z: 0→260`). Motion-blur-streak (ghost path B, 3 ghosts) on the slam.

### s3-access (12.5 → 21.5) — blueprint `kinetic-type-beats` + `svg-icon-enrichment`
- **Copy:** kicker `EARLY 1980s · CUPERTINO, CALIFORNIA`; statement `JOBS HIRED A TIME
  REPORTER / TO DOCUMENT THE *MACINTOSH*.`; slip: `"Mike's going to be our historian."` —
  `— Steve Jobs, as recalled by Andy Hertzfeld`.
- **Object:** a **micro-cassette recorder** (SVG, 640×420): body with a cream label
  `MORITZ / APPLE · SIDE A — 90 MIN`, window showing two hubs that rotate at different
  speeds as tape transfers (supply pack shrinks, take-up grows, the visible tape run
  between them is a path whose length changes), a REC lamp beating at 0.85s, a VU needle
  wobbling on a hash of `floor(t*18)`, and a 3-digit mechanical counter. The deck arrives
  on a `rotateY 34→-12` orbit and idles on a sine loop.

### s4-room (21 → 31.0) — blueprint `grid-card-assemble` + `svg-path-draw`
- **Copy:** header `WHAT HE WAS LET IN TO SEE` (left) / `CUPERTINO, 1981–1983` (right), a
  header rule; six rows `01 A GARAGE IN LOS ALTOS · 02 THE APPLE I, SOLDERED BY HAND ·
  03 THE 1980 PUBLIC OFFERING · 04 THE LISA, AND WHAT IT COST · 05 THE MACINTOSH, BEFORE
  ANYONE SAW IT · 06 EVERY ARGUMENT IN BETWEEN` (League Gothic 76px, numerals amber mono).
- **Object:** six line-art icons (garage door, circuit board with a chip, a stock ticker
  line, a Lisa-ish beige box, a Macintosh-ish box with a smiling screen, two speech balloons)
  that **draw themselves** (`svg-path-draw`) as each row lands, 96px, amber stroke 3px, in a
  right-hand column at x=1290 aligned to the rows. Rows arrive on a 0.46s beat with
  `spring-pop-entrance` numerals. After the sixth row, the whole ledger drifts up 20px
  and the icons breathe. Veil here is `.52`.

### s5-break (30.5 → 39.5) — `reactive-displacement` + `chromatic-glitch` + the door
- **Copy:** kicker `JANUARY 3, 1983`; statement `THEN THE STORY RAN.` (230px); card:
  `TIME PUT THE COMPUTER ON THE COVER.` / `MACHINE OF THE YEAR — NOT JOBS.` (amber);
  after the slam: `AND THE DOOR CLOSED.` (240px, RGB split resolving) and sub
  `JOBS STOPPED SPEAKING TO HIM.`
- **Object:** a newsmagazine (SVG 470×620): red border `#E03A3E` 18px, cream nameplate
  `NEWSWEEKLY`, a **halftone** cover (a dot-grid pattern whose dot radii encode a simple
  computer-on-a-pedestal silhouette — SVG `<pattern>` + masked shapes), headline `MACHINE
  OF / THE YEAR`. It flies in from the right on `rotateY 52→-11` and **shoves** the
  statement up-left (reactive-displacement, victim tween 45% of intruder duration).
- **The door (BREAK = 4.55 local):** two ink panels slam shut from both sides in 0.17s
  (`power4.in`), hold 0.06s, then re-open on the consequence. Everything before the slam is
  `tl.set` to opacity 0 behind the doors. A red radial wash swells into the slam and settles
  at half. The doors ARE the 5→6 handoff: s5 has no blur-out; instead the doors close
  again at `DUR-0.3` (`power4.in`) and s6 arrives from below behind them.

### s6-anyway (39 → 47.5) — `discrete-text-sequence` + `waterfall-entry`
- **Copy:** kicker `THE MAC TEAM KEPT TALKING. QUIETLY.` (typed with caret — the caret from
  s1 returns); statement `HE FINISHED THE BOOK *ANYWAY*.`; slip: `"One of the best books
  about Apple Computer ever written."` — `— Andy Hertzfeld, Macintosh team`.
- **Object:** a stack of **typed manuscript pages** (CSS 3D, 8 pages) flying in one at a
  time from the upper right, each with faint typed lines and a page number, landing with a
  small settle and a slight random-hash rotation; the top page carries a red `DRAFT` stamp
  that stamps down (`scale 1.6→1, opacity 0→.9, 0.18s`) on the word ANYWAY.

### s7-thesis (47 → 53.0) — blueprint `titlecard-reveal`
- **Copy:** `BEFORE APPLE WAS A MYTH,` / `SOMEBODY WAS TAKING NOTES.` (second line amber),
  centred, 176px.
- **Object:** a ruled page — two horizontal 2px rules draw outward from centre above and
  below the statement; a faint 24-line ruled field (`rgba(239,231,214,.10)` 1px lines) fades
  in behind; a pencil-line underline draws under NOTES. One restrained move (`y 40→0`,
  1.0s `power2.out`), then stillness plus a 0.4% breathe. Exits by dip (see handoffs).

### s8-title (52.5 → 60) — blueprint `logo-assemble-lockup`
- **Copy:** imprint `WILLIAM MORROW · NEW YORK`; title `THE LITTLE / KINGDOM` (150px on the
  jacket); sub `THE PRIVATE STORY OF APPLE COMPUTER`; byline `MICHAEL MORITZ` (amber);
  footer `FIRST PUBLISHED 1984 · REISSUED 2009 AS "RETURN TO THE LITTLE KINGDOM"`.
- **Object:** the six-face jacket (keep the v3 rig, 628×824, `preserve-3d` inside its own
  `.rig`). v4 cover design: cream **band** across the top third (`#E9DFC8`) holding the
  imprint in ink, the title in ink on the band, the six-colour spectrum as a **vertical
  stripe** down the left edge of the cover (each band wipes down in sequence) — and the
  spine carries the spectrum too. The jacket arrives rotating `rotateY -60→-14`,
  `z -600→0`, then holds on a slow orbit; a warm halo blooms behind. Fade to black over the
  last 0.8s (the only exit in the film).

## Do not

- No gradient text, no cyan, no purple/blue, no neon. No pure `#000` / `#fff`.
- No full-screen linear gradients (they band under H.264) — radial only.
- No serif. No stock imagery. No `<br>` in body text.
- No exit motion before `DUR-OUT` except the s5 door. No jump cuts.
