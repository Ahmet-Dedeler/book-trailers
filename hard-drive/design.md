# Design truth — Hard Drive (60s trailer, v4, real 3D)

v4 rebuilds every scene and re-lights the world. The prior cut (archived in
`archive/v-prev-2026-08-23/`) had the right spine — a real Three.js disk assembly under
one unbroken camera move — but the machine was invisible (exposure .72, layer at 68%),
the frames were mostly empty void, the type sat at 126px, cuts were jump cuts, and the
score never moved. v4, in priority order:

1. **The machine is finally visible.** Exposure up, a second rim, the camera low and
   close so the platter's specular sweep fills the right two-thirds, and a cobalt
   **written-track ring** that grows outward over the minute — the empire being written
   to the disk track by track (the concept, finally on screen).
2. **Every cut is a head seek.** Scenes overlap 0.5s on alternating tracks and hand off
   with a **vertical seek-push** (in from below, out upward, blurred) while the actuator
   snaps to a new track and the camera kicks. Never a jump cut.
3. **Type fills the frame.** Archivo Black 150–230px, blocks 450–650px tall.
4. **Every scene owns a built object**: a 5.25" floppy, a rolodex of sources, the Altair
   panel, the licence diagram, a fault panel, the drawn timeline, a hex field, the jacket.
5. **A sector-readout HUD** (track 3, all 60s): cylinder/head/sector counters, a `C:\>`
   prompt, track index, progress rule, brackets, grain.
6. **Sound design + a scored arc**: a drive spin-up under the cold open, a head-seek click on
   every handoff, Altair toggles, a coin ping on $50,000, a glitch on the bully, a boom on
   the title.

## Concept angle (unchanged)

**The story is told on the surface of the machine it made** — the frame is a disk platter
under a read head, and the empire is written to it track by track. Cold, cooled-black,
blunt and mechanical. It must not look like the Apple trailer.

## Palette (fixed)

| Token        | Hex       | Role                                                     |
| ------------ | --------- | -------------------------------------------------------- |
| `--void`     | `#05070E` | canvas. near-black cooled toward blue (never `#000`)      |
| `--void-2`   | `#0B1120` | panels, track fills, raised surfaces                      |
| `--screen`   | `#DCE5F2` | primary type. cool screen white (never `#fff`)            |
| `--screen-d` | `#7C8AA3` | metadata, labels, attribution (AA on void: 6.4:1)         |
| `--cobalt`   | `#3B7BFF` | THE accent. one hue. rules, data, emphasis, platter glow  |

Windows-era four-pane flag, **once**, title card only: `#E8443A #7DBB42 #2C7FD4 #F3C13A`.
Literal colours in CSS, no `var()`.

## Typography

- **Archivo Black (400 only)** — the monopoly. Uppercase, tracking `-0.03em`, line-height
  `0.98`. Archivo Black caps average **0.80em per character**, so size each block from its
  longest line: `font-size = min(1180 / (0.8 × chars_in_longest_line), 228)`. Break
  statements into **3–4 short lines** (≤ 9 chars → 160px; ≤ 12 chars → 122px; ≤ 7 chars →
  210px) so the block stands 450–650px tall. Ledger rows 48px, node labels 26–46px.
  `white-space:nowrap` per line.
- **Space Mono (400/700)** — the machine and the hobbyist culture. Dates, labels, data,
  the prompt, the HUD. **24–31px**, uppercase, tracking `+0.16–0.22em`. Notes 31px normal
  case, line-height 1.5, `border-left:4px solid #3B7BFF`.

## Frame rules

- Left rail at **168px**, stage 1180px. Objects live in the right third (x 1300–1860) *over*
  the platter, or full-width low in the frame (the Altair panel, the timeline) at y ≥ 700.
- No `.veil` — the world is graded to sit behind the message (host canvas at 88%). Each
  scene carries a local radial `.scrim` behind its type block instead.
- The 2px cobalt rule is the structural constant. Static decoratives are banned.
- Objects carry their own `perspective` wrapper when they use CSS 3D; never rely on `#root`.

## The world (host `index.html`, Three.js in the head)

Three steel platters on a spindle, clamp rings, a three-beam actuator with a lit head.
One revolution every 6s, dead steady. The head **seeks on the beat table** (`SEEKS`), the
camera flies ONE Catmull-Rom path — now lower and closer, aimed 3 units left of the spindle
so the platter fills the right two-thirds — with a small **kick** (aim-y bump + a 0.5-unit
dolly) across each cut. v4 adds: exposure 1.05, key 2.2, cool rim 2.4 + a second white rim,
hemisphere .6, brighter env bands, a cobalt emissive **written ring** (torus at radius
1.3→4.9 over the 60s) plus a faint written-area disc behind it, 3,000 dust points in the
head light, and a stronger head glow that flares 0.3s on every seek. Canvas opacity .88.

## Timing table (binding)

| #  | id            | cut  | slot dur | track | beat                                              |
| -- | ------------- | ---- | -------- | ----- | ------------------------------------------------- |
| 1  | s1-cold-open  | 0    | 7.0      | 1     | C:\> … EVERYONE KNOWS HOW MICROSOFT WON.           |
| 2  | s2-turn       | 6.5  | 6.5      | 2     | THEY DIDN'T ASK HIM.                               |
| 3  | s3-altair     | 12.5 | 9.0      | 1     | THEY SOLD IT FIRST. THEN THEY BUILT IT.            |
| 4  | s4-deal       | 21   | 10.0     | 2     | The deal that made the empire — $50,000, non-exclusive |
| 5  | s5-bully      | 30.5 | 9.0      | 1     | THE SILICON BULLY + the charge sheet               |
| 6  | s6-timeline   | 39   | 8.5      | 2     | What the book covers, 1975 → 1992                  |
| 7  | s7-thesis     | 47   | 6.0      | 1     | He bought the code. He negotiated the rest.        |
| 8  | s8-title      | 52.5 | 7.5      | 2     | HARD DRIVE lockup, the flag, credits, fade.        |
| —  | chrome        | 0    | 60       | 3     | HUD                                                |

## Scene contract (copy this skeleton)

```html
<!doctype html>
<html lang="en"><head><meta charset="UTF-8" /></head><body>
<template>
  <style>
    #root { position:absolute; inset:0; width:1920px; height:1080px; overflow:hidden;
            font-family:"Space Mono",monospace; color:#DCE5F2; }
    .world { position:absolute; inset:0; }                    /* the handoff wrapper */
    .scrim { position:absolute; left:-300px; top:40px; width:1640px; height:1000px;
             background:radial-gradient(ellipse closest-side, rgba(5,7,14,.94),
               rgba(5,7,14,.72) 54%, rgba(5,7,14,0) 100%); }
    .stage { position:absolute; left:168px; top:0; bottom:0; width:1180px;
             display:flex; flex-direction:column; justify-content:center; }
    .kicker { font-size:27px; letter-spacing:.2em; color:#7C8AA3; text-transform:uppercase; opacity:0; white-space:nowrap; }
    .disp { font-family:"Archivo Black",sans-serif; font-weight:400; text-transform:uppercase;
            font-size:150px; line-height:.98; letter-spacing:-.03em; color:#DCE5F2; white-space:nowrap; }
    .w { display:inline-block; opacity:0; }
    .co { color:#3B7BFF; }
    .rule { height:2px; background:#3B7BFF; width:620px; margin:30px 0 40px; transform-origin:left center; }
    .note { margin-top:40px; padding-left:34px; border-left:4px solid #3B7BFF;
            font-size:31px; line-height:1.5; color:#DCE5F2; opacity:0; max-width:1000px; }
    .rig { position:absolute; perspective:1600px; }           /* object wrapper (CSS 3D) */
  </style>
  <div id="root" data-composition-id="sN-id" data-start="0" data-duration="D"
       data-width="1920" data-height="1080">
    <div class="world" id="sN-world">
      <div class="rig" id="sN-rig" style="left:1300px; top:220px; width:560px; height:640px;">…object…</div>
      <div class="scrim" data-layout-ignore aria-hidden="true"></div>
      <div class="stage">…type…</div>
    </div>
  </div>
  <script>
    (function () {
      var DUR = D, IN = 0.5, OUT = 0.5;
      var tl = gsap.timeline({ paused: true });
      /* handoff IN — a head seek: the previous scene lifts out on the same window */
      tl.fromTo("#sN-world", { opacity: 0, y: 140, filter: "blur(14px)" },
                             { opacity: 1, y: 0, filter: "blur(0px)", duration: IN, ease: "power3.out" }, 0);
      tl.set("#sN-world", { filter: "none" }, IN);
      /* … scene motion … */
      /* handoff OUT */
      tl.set("#sN-world", { filter: "blur(0px)" }, DUR - OUT);
      tl.to("#sN-world", { opacity: 0, y: -140, filter: "blur(14px)", duration: OUT, ease: "power3.in" }, DUR - OUT);
      window.__timelines = window.__timelines || {};
      window.__timelines["sN-id"] = tl;
    })();
  </script>
</template>
</body></html>
```

Handoff rules:

- Primary = **seek-push** (vertical): in from `y:+140`, out to `y:-140`, blur 14. For 1→2,
  2→3, 3→4, 5→6.
- Accent **4→5 (the turn against the subject)**: s4 exits with a hard **shutter**: opacity
  1→0 in 0.12s (`steps(1)`-like: use `duration:0.12, ease:"power4.in"`) after a 0.2s
  `filter:brightness(1)→brightness(0.25)` dim; s5 enters through its own **chromatic
  glitch** (see brief) — no blur, no y.
- Accent **6→7**: dip. s6 opacity-only out 0.5s (`power2.in`); s7 opacity-only in 0.6s.
- Accent **7→8**: dip with scale — s7 out opacity 0.5s; s8 in opacity 0.8s, `scale 1.05→1`.
- Scene 1 opens from black (opacity 0→1, 0.7s). Scene 8 fades to black at the end.
- No exit motion before `DUR-OUT`. Finite repeats via `Math.max(0, Math.floor(span/cycle)-1)`.
  Ids prefixed `sN-`. Never target `.clip`. No `Math.random`.

## HUD chrome (track 3, `compositions/chrome.html`, 60s)

Transparent root. Space Mono 22–24px, `#7C8AA3`, uppercase, tracking .2em. Bands only:
top 64px, bottom 56px, x 168→1752. Never over statements.

- **Top-left:** `C:\>` in `#DCE5F2` followed by `CYL 0000  HD 0  SEC 00` where the numbers
  step on the beat table (a hash of `floor(t*2)` gives cylinder 0000–0999 in cobalt,
  head 0–5, sector 00–63) — written in onUpdate from `tl.time()`, `tabular-nums`.
- **Top-centre:** `TRACK 01 / 08 — <name>` (`THE RECEIVED STORY`, `THE REPORTERS`,
  `ALTAIR`, `THE DEAL`, `THE BULLY`, `THE RECORD`, `THESIS`, `HARD DRIVE`), swapped by
  `tl.set` at each cut with a 0.25s dip.
- **Top-right:** `WRITTEN` and a percentage that climbs 0 → 100% over the film
  (`ease:none`), cobalt digits — it mirrors the written ring in the world.
- **Bottom:** a 2px cobalt progress rule 168→1752 (`scaleX 0→1`, 60s) over a
  `rgba(124,138,163,.28)` track; eight ticks at the cut fractions.
- **Corners:** four 22px brackets `rgba(220,229,242,.5)` inset 40px, breathing.
- **Grain:** 256px seeded noise tile (LCG seed 19750404) full-bleed `opacity:.09`,
  `mix-blend-mode:overlay`, position hashed per frame, `data-layout-ignore`.

## Scene briefs (binding — copy verbatim)

### s1-cold-open (0 → 7.0) — `typewriter-reveal` + `waterfall-entry`
- **Copy:** prompt `C:\>` (screen white) then typed `SEATTLE, WASHINGTON 1992` with a
  block cursor blinking (`context-sensitive-cursor`); statement `EVERYONE / KNOWS HOW / *MICROSOFT* / WON.` (four lines, 160px, MICROSOFT cobalt).
- **Object (right, 560×560):** a **5.25" floppy** in SVG: black sleeve `#0B1120` with a
  cobalt-stroked outline, the oval head window showing a disk that **spins** (a hashed
  spoke pattern rotating at 300 rpm via `svgOrigin`), the write-protect notch, a label
  reading `THE STORY / EVERYONE KNOWS` in mono 20px (dim). It slides in from the right
  with a slight `rotateY`, then idles on a sine loop. A cobalt index-hole flash every
  revolution.

### s2-turn (6.5 → 13.0) — `kinetic-type-beats`
- **Copy:** `THEY / DIDN'T / ASK HIM.` (three lines, 170px, ASK HIM. cobalt) — two beats 0.55s apart,
  distinct entrances (scale-slam, side-snap); note `Two Seattle Post-Intelligencer
  reporters went to everyone else.`; a bibliographic line in mono: `HARD DRIVE ·
  WALLACE & ERICKSON · JOHN WILEY & SONS · 1992` (dim, letters waterfall).
- **Object:** a **rolodex** (CSS 3D in its own `.rig`): a cylinder axis (two dim rings)
  with 9 cards that flip over the top on a 0.28s beat, each card a `void-2` rectangle with
  a redaction bar (cobalt, varying width) and a dim mono tag (`SOURCE 01` … `SOURCE 09`).
  The flipping starts when `everyone else` lands.

### s3-altair (12.5 → 21.5) — `kinetic-type-beats` + `svg-icon-enrichment`
- **Copy:** kicker `JANUARY 1975 · THE ALTAIR 8800`; statement `THEY SOLD / IT *FIRST*.`
  then `THEN THEY / BUILT IT.` (four lines, 150px, FIRST cobalt; the second pair arrives 0.9s later); note `Neither of them had ever
  touched an Altair. Gates was 19.`
- **Object (full-width, y 720–980):** the **Altair 8800 front panel** — badge `ALTAIR 8800`
  / `MITS · ALBUQUERQUE, N.M.`, sixteen address LEDs that run a deterministic program
  (power-on sweep, then a hash of `floor(t*7)`), sixteen toggle switches of which six get
  thrown on the beat, and (new) a row of eight **data LEDs** above that chase. Cobalt
  LEDs on `void-2`, 2px cobalt border, the panel slides up from y+70.

### s4-deal (21 → 31.0) — `constellation-hub` + `svg-path-draw`
- **Copy:** header `THE DEAL THAT MADE THE EMPIRE` (left) / `1980` (cobalt, right) over a
  header rule; rows `01 IBM NEEDED AN OS · 02 MICROSOFT HAD NONE · 03 SO IT BOUGHT ONE`
  (48px); foot `It licensed DOS to IBM. It never sold it.`
- **Object (right, 1000×620 at x 880):** the **licence-flow diagram** — nodes `SEATTLE
  COMPUTER PRODUCTS` → `MICROSOFT` (cobalt-filled) → `IBM` and → `EVERY CLONE MAKER
  AFTER`; edges draw (`svg-path-draw`); labels `$50,000` (cobalt 46px, pops), `LICENCE`,
  `NON-EXCLUSIVE` (cobalt); royalty pulses ride the edges on a 1.5s cycle. New: the
  `EVERY CLONE MAKER AFTER` node **fans** into six small dim boxes (`COMPAQ`-less — unlabelled
  boxes) on a stagger after it pops, each with its own pulse.

### s5-bully (30.5 → 39.5) — `chromatic-glitch` + `reactive-displacement`
- **Copy:** kicker `BY 1990`; label `THE SILICON / BULLY` (two lines, 160px) arriving as an RGB split
  (three copies: `#E8443A`-free — use cobalt `#3B7BFF` and screen `#DCE5F2` offsets only)
  that snaps sharp; sub `Business Month magazine's label for Gates.`; then the **charge
  sheet** slides in from the right and shoves the label up: `OS/2 FAILED.` / `WINDOWS
  SHIPPED LATE, AND LATE AGAIN.` / `IBM WALKED — AND ALLIED WITH APPLE.` / `THE FTC OPENED
  AN INVESTIGATION.` (last line cobalt), on a 0.5s beat; foot `The book charts the misses,
  not just the wins.`
- **Object (right):** a **fault panel** — four indicator rows `OS/2`, `WINDOWS`, `IBM`,
  `FTC`, each with a cobalt LED and a status word (`FAIL`, `LATE`, `WALKED`, `OPEN`) that
  flips on (`scaleY` flap) as its charge lands; the LED flickers 3 frames then holds.

### s6-timeline (39 → 47.5) — `spatial-pan-stations` + `svg-path-draw`
- **Copy:** header `WHAT THE BOOK COVERS` / `1975 — EARLY 1992`; milestones `MICROSOFT
  FOUNDED 1975`, `THE IBM DEAL 1980`, `THE IBM PC SHIPS 1981`, `THE IPO 1986`, `WINDOWS 3.0
  1990`, `1992 →`; foot `The reporting stops in 1992. The empire did not.`
- **Object (full width, y 420–760):** the **drawn timeline** — axis draws left→right
  (1.0s), milestone marks pop above/below alternately with year in cobalt, then a **read
  head** (a small cobalt bracket with a light) sweeps the whole span and the axis glows
  behind it (`chart-scrub-readout`). The camera in the world is at its closest here.

### s7-thesis (47 → 53.0) — `titlecard-reveal`
- **Copy:** `HE BOUGHT THE CODE.` / `HE NEGOTIATED THE REST.` (centred, stage 1620px → 23 chars →
  88px; or break as `HE BOUGHT / THE CODE.` / `HE NEGOTIATED / THE REST.` at 150px — prefer the
  four-line 150px form, second pair cobalt).
- **Object:** a **hex field** — 14 lines of deterministic hex bytes (mono 22px, dim at 22%)
  filling the frame behind the statement, arriving line by line top→bottom in 0.6s, then a
  single cobalt rule drawing between the two lines. One restrained move (`y 40→0`, 1.0s
  `power2.out`), then stillness plus a 0.4% breathe. Exits by dip.

### s8-title (52.5 → 60) — `logo-assemble-lockup`
- **Copy:** imprint `JOHN WILEY & SONS · NEW YORK · 1992`; title `HARD DRIVE` (228px);
  the four-pane flag (snap in one pane at a time); sub `BILL GATES AND THE MAKING OF THE
  MICROSOFT EMPIRE`; byline `JAMES WALLACE & JIM ERICKSON` (cobalt); foot `THE UNAUTHORIZED
  STORY, REPORTED FROM SEATTLE`.
- **Motion:** title blur-snap with `3d-text-depth-layers` (2 dim layers), flag panes
  `back.out(2.6)`, a slow 2.2% push, fade to black over the last 0.8s.

## Do not

- No gradient text, no neon, no purple/blue *gradient* (flat cobalt only).
- No pure `#000` / `#fff`. No full-screen linear gradients — radial only.
- No per-scene background swap. Do not reuse the Apple trailer's amber/newsprint palette.
- No `Date.now()`, `performance.now()`, frame deltas, `Math.random()`, render-time fetches.
