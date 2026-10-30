# Design truth — The Book of Elon (3D, 60s)

## What changed from the 2D cut

The film is now ONE continuous Three.js world. The camera does not cut — it flies
a single ~450-unit path down -Z for the whole minute, decelerating into eight
stations and accelerating out. Every object is a real lit mesh in that world.
Typography stays in HTML on top, where it renders crisp; WebGL text does not.

## Architecture (learned from HeyGen's own launch-video project + registry blocks)

- **3D lives in `index.html`, not in a sub-composition.** The runtime clones
  `<template>` contents and re-executes their scripts as *classic* scripts, so
  `<script type="module">` inside a sub-comp dies with "Cannot use import
  statement outside a module". The root is a real page, so modules work there.
- **The canvas is driven by a property SETTER, not `onUpdate`.** GSAP's `seek()`
  suppresses callbacks, so an `onUpdate` repaint can silently freeze on frame 0.
  Tweened values are always written during render. (Pattern taken from the
  `cosmic-orb` registry block's own source.)
- **Everything is a pure function of `t`.** `renderAt(t)` recomputes every
  transform from time — no accumulators, no clock deltas, no `requestAnimationFrame`.
- Sub-comp timelines are padded to their slot length (`tl.to({}, {duration: N}, 0)`)
  — HeyGen's HANDOFF.md documents black-frame flashes when a timeline is shorter
  than its slot.

## Palette (unchanged — this is the same film, rebuilt)

| Token     | Hex       | Role                                   |
| --------- | --------- | -------------------------------------- |
| `--fg`    | `#F2F4F8` | statements, mesh key surfaces          |
| `--dim`   | `#79839B` | readouts, labels, structural geometry  |
| `--flame` | `#FF3B1F` | the one accent: thrust, the live step  |

The background colour is still animated, now as scene fog + background colour,
so distance itself carries the ascent: ground night → atmosphere → vacuum → Mars.

## The flight path

| t         | Station                          | z    |
| --------- | -------------------------------- | ---- |
| 0–7       | launchpad + vehicle              | 0    |
| 7–13      | biography stack → blueprint slab | -55  |
| 13–20     | utility network                  | -112 |
| 20–27.5   | icosahedron shattered to shards  | -170 |
| 27.5–39   | five-plate assembly              | -232 |
| 39–46.5   | glass ridge field                | -300 |
| 46.5–53   | Earth · trajectory · Mars        | -372 |
| 53–60     | title space                      | -440 |

Stations 1–6 sit at x≈+4.6 so the object frames in the right half and the type
owns the left. Stations 7–8 are centred, because the type centres there too.

## Quality

- `MeshStandardMaterial` with real key/rim/hemisphere lighting, ACES tonemapping.
- `UnrealBloom` post-processing so emissive surfaces (thrust, the live step, the
  planets, the travelling light) actually bloom.
- `FogExp2` so stations resolve out of depth instead of popping in.
- Renderer pinned to 1920×1080 at pixelRatio 1 — no device-pixel dependence.
- 4,000-point seeded starfield surrounding the whole path.

## Do not

- No `Date.now()`, `performance.now()`, or frame deltas anywhere.
- No render-time asset fetches; all geometry is procedural, no models, no textures.
- No pure `#000`/`#fff`, no second accent hue.
