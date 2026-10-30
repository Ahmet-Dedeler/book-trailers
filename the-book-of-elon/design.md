# Design truth — The Book of Elon (60s trailer, v4, real 3D)

v4 rebuilds every typography scene and upgrades the world. The prior cut (archived in
`archive/v-prev-2026-08-23/`) had the right idea — one unbroken Three.js flight with the
camera whip as the transition — but the type sat small and left-heavy, the 3D read as
grey plastic on black, there was no atmosphere, no HUD, no sound design, and the score
had no arc. v4 changes, in priority order:

1. **The whip is now visible in the HTML layer too.** Scenes overlap 0.5s on alternating
   tracks and streak in/out laterally on the *same* window as the camera whip
   (the camera transit straddles each cut: 0.7s before → 0.7s after).
2. **Type fills the frame.** Archivo Black statements 170–230px, blocks 450–650px tall.
3. **The world has atmosphere:** brushed-steel materials that actually catch light, a
   nebula backdrop, near-camera dust, a denser starfield, a detailed vehicle and pad.
4. **A telemetry HUD** (track 3, all 60s): mission clock, altitude, station index,
   corner brackets, grain — the manual's instrument panel.
5. **Every scene keeps its Visualize-Value line diagram**, drawn larger, and adds the
   sourced text as a **spec card** (a dim-bordered mono panel) where a quote or credit lands.
6. **Sound design + a scored arc:** countdown beeps and ignition, whip whooshes on every
   handoff, metallic hits on the assembly, a glitch on the deletion, a boom under the title.

## Concept angle (unchanged)

**The book is an operating manual, so the trailer is drawn like one** — line diagrams that
build themselves while the world behind climbs from a launchpad to Mars without cutting.

## Palette (fixed)

| Token     | Hex       | Role                                                 |
| --------- | --------- | ---------------------------------------------------- |
| `--fg`    | `#F2F4F8` | statements, diagram strokes, key surfaces            |
| `--dim`   | `#79839B` | readouts, labels, structural geometry (AA on all bgs) |
| `--flame` | `#FF3B1F` | THE accent: thrust, the live step, mission           |
| `--panel` | `rgba(7,8,11,.78)` | spec-card fill; border `rgba(121,131,155,.55)` |

Exactly one accent. The second colour is the background itself (fog: night → atmosphere
→ vacuum → Mars). No cyan, no blue-on-black tech cliché. Literal colours in CSS, no `var()`.

## Typography

- **Archivo Black (400 only)** — statements. Uppercase, tracking `-0.03em`, line-height `0.96`.
  Archivo Black caps average **0.80em per character**, so size each block from its longest
  line: `font-size = min(1020 / (0.8 × chars_in_longest_line), 200)`. Break statements into
  **3–5 short lines** (≤ 11 chars each → 112–118px; ≤ 8 chars → 150–160px; ≤ 6 chars →
  200px) so the block stands 450–650px tall and the words hit one per beat. Section
  headers 80–88px, list steps 40px. `white-space:nowrap` per line. The stage is 1020px
  wide at x=150 (the 3D object owns x ≥ 1200).
- **Space Mono (400/700)** — readouts. Part labels, telemetry, attribution, procedure
  steps, HUD. **24–30px**, uppercase, tracking `+0.16–0.26em`. Spec-card body 28px.

## Frame rules

- Stations 1–6: the object frames in the **right half** (world x ≈ +6.8); type owns the
  left in a **1020px stage at x=150**. SVG diagrams sit in the right half at x ≥ 1150. Stations 7–8 are centred (type centred too).
- Every scene carries a radial `.scrim` (left or mid) so type passes AA over the lit world.
- The 2px flame rule under each header is the structural constant. Static decoratives are banned.
- Objects inside scenes (SVG diagrams) sit in the right half over the 3D object, never over type.

## The world (`world.js`, canvas in the host)

One continuous camera path down −Z, eight stations at z = 0, −55, −112, −170, −232, −300,
−372, −440. Arrive → dwell (slow push) → whip. v4 adds: brushed-steel PBR (`#B8C0CC`,
metalness .82, roughness .28, env intensity .55), a warmer key, three nebula sprites
parented to the camera (flame / dim / fg at 12–18% opacity, drifting), 7,000 near-path
dust points (additive), a denser 6,000-star field, engine bells and grid fins on the
vehicle, a gridded pad with a horizon glow, a roll kick during every whip, and the bloom
pulsing up on each cut. `renderAt(t)` remains a pure function of t.

## Timing table (binding)

| #  | id                  | cut  | slot dur | track | station | beat                                          |
| -- | ------------------- | ---- | -------- | ----- | ------- | --------------------------------------------- |
| 1  | s1-ignition         | 0    | 7.5      | 1     | pad     | T-minus… MOST AMBITION NEVER LEAVES THE GROUND. |
| 2  | s2-not-biography    | 7    | 6.5      | 2     | slab    | THIS IS NOT A BIOGRAPHY. IT'S THE MANUAL.      |
| 3  | s3-useful           | 13   | 7.5      | 1     | network | "Don't aspire to glory. Aspire to work."       |
| 4  | s4-first-principles | 20   | 8.0      | 2     | shards  | FIRST PRINCIPLES. + three arrows               |
| 5  | s5-algorithm        | 27.5 | 12.0     | 1     | plates  | THE ALGORITHM, five steps, $2M                 |
| 6  | s6-hardcore         | 39   | 8.0      | 2     | ridge   | EAT GLASS. STARE INTO THE ABYSS.               |
| 7  | s7-multiplanetary   | 46.5 | 7.0      | 1     | transfer| PRESERVE THE LIGHT OF CONSCIOUSNESS.           |
| 8  | s8-title            | 53   | 7.0      | 2     | halo    | THE BOOK OF ELON lockup, credits, fade.        |
| —  | chrome              | 0    | 60       | 3     | —       | HUD: clock, altitude, station, brackets, grain |

Camera transits (whips) run `cut−0.7 → cut+0.7`. The HTML handoff sits inside that window.

## Scene contract (copy this skeleton)

```html
<!doctype html>
<html lang="en"><head><meta charset="UTF-8"></head><body>
<template>
  <style>
    #root { position:absolute; inset:0; width:1920px; height:1080px; overflow:hidden;
            font-family:"Space Mono",monospace; color:#F2F4F8; }
    .world { position:absolute; inset:0; }                    /* the handoff wrapper */
    .scrim { position:absolute; inset:0; }
    .scrim.left { background:radial-gradient(ellipse 68% 100% at 6% 50%,
                    rgba(7,8,11,.97) 12%, rgba(7,8,11,.82) 46%, rgba(7,8,11,0) 82%); }
    .scrim.mid  { background:radial-gradient(ellipse 78% 68% at 50% 56%,
                    rgba(7,8,11,.94) 18%, rgba(7,8,11,0) 80%); }
    .stage { position:absolute; left:150px; top:0; bottom:0; width:1020px;
             display:flex; flex-direction:column; justify-content:center; }
    .part  { display:flex; align-items:center; gap:20px; font-size:26px; letter-spacing:.26em;
             color:#FF3B1F; text-transform:uppercase; margin-bottom:34px; opacity:0; white-space:nowrap; }
    .part i { display:block; width:56px; height:2px; background:#FF3B1F; }
    .disp  { font-family:"Archivo Black",sans-serif; font-weight:400; text-transform:uppercase;
             line-height:.96; letter-spacing:-.03em; font-size:116px; white-space:nowrap; }
    .disp span { display:inline-block; opacity:0; }
    .flame-t { color:#FF3B1F; }
    .rule  { height:2px; background:#FF3B1F; width:100%; margin:36px 0 28px; transform-origin:left center; }
    .meta  { font-size:27px; letter-spacing:.16em; color:#79839B; line-height:1.7; text-transform:uppercase; opacity:0; }
    .card  { position:absolute; padding:28px 34px; background:rgba(7,8,11,.78);
             border:2px solid rgba(121,131,155,.55); opacity:0; }             /* spec card */
    .card::before { content:""; position:absolute; left:-2px; top:-2px; width:22px; height:22px;
             border-top:3px solid #FF3B1F; border-left:3px solid #FF3B1F; }
    .diagram { position:absolute; left:1150px; top:180px; width:720px; height:720px; }   /* right half */
  </style>
  <div id="root" data-composition-id="sN-id" data-start="0" data-duration="D" data-width="1920" data-height="1080">
    <div class="world" id="sN-world">
      <div class="scrim left" data-layout-ignore aria-hidden="true"></div>
      <div class="diagram" id="sN-dia"><svg viewBox="0 0 720 720">…</svg></div>
      <div class="stage">…</div>
    </div>
  </div>
  <script>
    (function () {
      var DUR = D, IN = 0.5, OUT = 0.5;
      var tl = gsap.timeline({ paused: true });
      /* handoff IN — rides the camera whip; the previous scene streaks out on the same window */
      tl.fromTo("#sN-world", { opacity: 0, x: 220, skewX: 6, filter: "blur(14px)" },
                             { opacity: 1, x: 0, skewX: 0, filter: "blur(0px)", duration: IN, ease: "power3.out" }, 0);
      tl.set("#sN-world", { filter: "none" }, IN);
      /* … scene motion … */
      /* handoff OUT */
      tl.set("#sN-world", { filter: "blur(0px)" }, DUR - OUT);
      tl.to("#sN-world", { opacity: 0, x: -220, skewX: -6, filter: "blur(14px)", duration: OUT, ease: "power3.in" }, DUR - OUT);
      tl.to({}, { duration: DUR }, 0);      /* pad to the slot — no black-frame flashes */
      window.__timelines = window.__timelines || {};
      window.__timelines["sN-id"] = tl;
    })();
  </script>
</template>
</body></html>
```

Handoff rules:

- Primary = **whip**: in from `x:+220, skewX:6`, out to `x:-220, skewX:-6`, blur 14. Used
  for 1→2, 2→3, 3→4, 5→6, 6→7.
- Accent **4→5 (the drop at 27.5)**: s4 exits by *overexposure* — `filter: brightness(1)→
  brightness(3.2)` + opacity→0 over 0.3s `power2.in`; s5 enters from `scale:1.18, blur 18`
  → `1, 0` over 0.5s `power4.out` (a punch-in on the drop). No x.
- Accent **7→8**: dip. s7 opacity-only out 0.5s (`power2.in`); s8 opacity-only in 0.8s with
  `scale:1.05→1` (`power2.out`).
- Scene 1 opens from black (opacity 0→1 over 0.7s, no x). Scene 8 fades to black at the
  end (the only allowed exit besides handoffs).
- No exit motion before `DUR-OUT`. Finite repeats via `Math.max(0, Math.floor(span/cycle)-1)`.
  Ids prefixed `sN-`. Never target `.clip`. No `Math.random`.

## Spec card (shared component)

A quote or credit lands on a spec card: mono 28px `#F2F4F8`, attribution 24px `#79839B`,
`.card` styles above, width 700–860px, positioned inside the stage flow or absolutely at
the bottom-left. Entrance `x:-40→0, opacity 0→1, 0.5s power3.out`; the flame corner
bracket draws (`scale 0→1` from top-left) 0.1s after.

## HUD chrome (track 3, `compositions/chrome.html`, 60s)

Transparent root. Space Mono 22–24px, `#79839B`, uppercase, tracking .22em. Bands only:
top 64px band and bottom 56px band, x from 150 to 1770. Never over statements.

- **Top-left:** `T+ 00:00.00` mission clock in flame digits (`tabular-nums`), written in
  onUpdate from `tl.time()` (`mm:ss.ff` at 30fps).
- **Top-centre:** `STATION 01 / 08 — <name>` (`PAD`, `MANUAL`, `PURPOSE`, `PHYSICS`,
  `ALGORITHM`, `HARDCORE`, `TRANSFER`, `TITLE`), swapped by `tl.set` at each cut with a
  0.25s dip.
- **Top-right:** `ALT` readout: a number that follows the camera's travel — compute from
  the timing table as a piecewise-linear km value 0 → 4 → 38 → 210 → 400 → 1,200 → 54,600
  → 225,000,000 (formatted with thousands separators, `tabular-nums`), and under it
  `VEL` in m/s stepping on the same table.
- **Bottom:** a 2px flame progress rule 150→1770 (`scaleX 0→1`, 60s, `ease:none`) over a
  `rgba(121,131,155,.25)` track; eight ticks at the cut fractions; a small flame marker
  travels the rule.
- **Corners:** four 22px brackets `rgba(242,244,248,.5)` inset 40px, breathing.
- **Grain:** 256px seeded noise tile (LCG seed 20260324) full-bleed `opacity:.09`,
  `mix-blend-mode:overlay`, position hashed per frame (`floor(t*24)`), `data-layout-ignore`.

## Scene briefs (binding — copy verbatim)

### s1-ignition (0 → 7.5) — `logo-assemble-lockup` + `counting-dynamic-scale`
- **Copy:** readout `T-MINUS 10` counting down to `0` (flame digit, one step per 0.4s from
  local 0.3s → `IGNITION` at 4.15s local in flame, with the digit scale-popping on each
  step); statement `MOST / AMBITION / NEVER / LEAVES / THE GROUND.` (five lines, 112px, THE GROUND. flame).
- **Diagram (right, over the vehicle):** a countdown **ring** (r=300, stroke 3 dim) whose
  arc drains clockwise from full to empty by 4.15s (`svg-path-draw` reversed), tick marks
  every 36°, and a small flame arc that lights at ignition and blooms (`opacity .0→1,
  scale 1→1.12`). After lift-off the ring un-draws quickly (0.5s).
- **Sound (mix-side):** beep per count, ignition roar at 4.15s, a riser into it.

### s2-not-biography (7 → 13.5) — `kinetic-type-beats` + `reactive-displacement`
- **Copy:** `THIS IS / NOT A / BIOGRAPHY.` (128px) then `IT'S THE / MANUAL.` (flame, 128px)
  slamming in and shoving the first two lines up 60px (victim tween 45% of intruder);
  meta `FIVE YEARS OF TRANSCRIPTS, TWEETS / AND INTERVIEWS. HIS OWN WORDS.`
- **Diagram:** a **blueprint sheet** (rect 640×460, dim grid 40px, flame schematic
  polyline drawing itself, three flame nodes popping) that slides in from the right at
  local 2.05s as the 3D books are shoved off (matches world timing P2 = 9.05 global).

### s3-useful (13 → 20.5) — `kinetic-type-beats` + `svg-path-draw`
- **Copy:** part `PART I — PURSUE PURPOSE`; quote `"DON'T / ASPIRE / TO GLORY. / ASPIRE / TO WORK."`
  (five lines, 124px, last two lines flame); spec card `— ELON MUSK · "BE USEFUL"`.
- **Diagram:** the **utility node** — a flame hub circle, eight arrows radiating (path-draw
  in a wave, 1.0s), each arrow splitting into two dim children (second wave at 1.5s),
  arrowheads popping; the whole graph slowly rotates (±6°, sine).

### s4-first-principles (20 → 28.0) — `kinetic-type-beats` + `depth-scatter-assemble`
- **Copy:** part `THINK LIKE A PHYSICIST`; statement `FIRST / PRINCIPLES.` (116px — PRINCIPLES. is 11 chars; FIRST may go 200px on its own line,
  PRINCIPLES. flame); three arrows `→ OBSESS OVER TRUTH · → THINK IN LIMITS · → ASPIRE TO BE LESS WRONG`
  (mono 28px, waterfall on a 0.3s beat).
- **Diagram:** a wire **cube** (isometric, 12 edges) that draws on, then at local 2.6s
  (global 22.6 — the shatter) its edges scatter outward as 12 separate segments with
  spin (index-hashed vectors), and at local 4.4s reassemble into a **smaller tetrahedron**
  (6 edges, flame) — fewer parts. Label `SAME PHYSICS. FEWER PARTS.` (mono 24px) pops under it.
- **Exit:** overexposure (see handoffs) — the drop.

### s5-algorithm (27.5 → 39.5) — `grid-card-assemble` + `anchored-layout-expand`
- **Copy:** header `THE ALGORITHM` (88px) with `ORDER IS NON-NEGOTIABLE` (flame mono);
  steps `01 QUESTION THE REQUIREMENTS · 02 DELETE THE PART · 03 SIMPLIFY · 04 ACCELERATE
  · 05 AUTOMATE` (mono 700, 40px) on beats `[1.35, 2.85, 4.75, 6.15, 7.35]` local; a
  flame cursor bar steps down the list; foot `ONE DELETED PART REMOVED $2M OF ROBOTICS.`
  at 8.6s (`$2M OF ROBOTICS.` flame).
- **Diagram (right, beside the 3D plates):** five labelled **part tags** (`P-01 STRUCTURE`,
  `P-02 HARNESS`, `P-03 MAT`, `P-04 PACK`, `P-05 SHELL`) stacked with bracket lines to a
  spine; at local 3.2s (global 30.7, the deletion) `P-03 MAT` gets a flame strike-through,
  flashes, and collapses to zero height (`scaleY`, `anchored-layout-expand`) while the tags
  below slide up to close the gap; a `−$2,000,000` counter counts down in flame at 8.6s.
- **Entrance:** punch-in (see handoffs). The score's drop lands here.

### s6-hardcore (39 → 47.0) — `kinetic-beat-slam` + `stat-bars-and-fills`
- **Copy:** part `PART II — ULTRA HARDCORE WORK`; slams `EAT GLASS.` (three stacked echoes,
  `chromatic-glitch` entrance, 126px) then `STARE / INTO THE / ABYSS.` (three lines, 126px);
  meta `SLEEP ON THE FACTORY FLOOR / ADVERSITY FORGES STRENGTH`; readout `INTENSITY` with a
  progress fill 0→100% and a counter.
- **Diagram:** a **jagged waveform** (polyline, 14 peaks matching the 3D ridges) draws
  left→right in 1.2s; a flame **load bar** grinds along its base (`scaleX`), and a small
  dim needle rides the waveform's peaks (`chart-scrub-readout`).

### s7-multiplanetary (46.5 → 53.5) — `titlecard-reveal` + `svg-path-draw`
- **Copy:** part `PART IV — ON BEHALF OF HUMANITY` (centred); statement `PRESERVE / THE LIGHT OF /
  CONSCIOUSNESS.` (centred, stage 1620px wide → 14 chars → 144px, last line flame); spec card `— ELON MUSK ·
  "BECOMING MULTIPLANETARY"` centred beneath.
- **Diagram (full-frame, behind type, over the 3D transfer):** a dim **transfer arc**
  (quadratic path, 1400px wide) draws in 1.0s, a fg light travels it over 3.1s
  (`getPointAtLength`), with two orbit ellipses around the endpoints (`sine-wave-loop`).
  Keep strokes at 2px so the 3D planets read through.

### s8-title (53 → 60) — `logo-assemble-lockup`
- **Copy:** byline `ERIC JORGENSON`; title `THE BOOK / OF ELON` (194px centred — 8 chars × 0.8 × 194 = 1241px fits the 1620px centre stage, OF ELON flame);
  rule–mark–rule; sub `A GUIDE TO PURPOSE AND SUCCESS`; credits `FOREWORD BY NAVAL RAVIKANT
  · VISUALS BY JACK BUTCHER` / `FROM THE AUTHOR OF THE ALMANACK OF NAVAL RAVIKANT`; tag
  `INCLUDES THE 69 CORE MUSK METHODS`.
- **Motion:** blur-snap title (`scale .84→1, blur 18→0, back.out(1.5)`), rules draw from
  the mark outward, the mark spins in, a slow 2.4% push over the hold, and a fade to black
  over the last 0.8s. Add a 3-line **3D depth** on the title (`3d-text-depth-layers`, 2 layers,
  dim at 30%/15%) so the lockup has weight.

## Do not

- No pure `#000` / `#fff`, no gradient text, no cyan, no neon, no emoji, no serif.
- No full-screen linear gradients — radial only.
- No scene may paint a background; the world underneath must stay unbroken.
- No `Date.now()`, `performance.now()`, frame deltas, `Math.random()`, render-time fetches.
