---
workflow: general-video
flow: automation
storyboard: no
message: "The Book of Elon isn't a biography — it's the operating manual, assembled from five years of Musk's own words."
style_preset: 3d-continuous-world
destination: youtube
aspect: 1920x1080
language: en
length: 60s
angle: narrative
---

## Intent

A 60-second cinematic trailer for *The Book of Elon: A Guide to Purpose and
Success* (Eric Jorgenson, first edition 2026, foreword by Naval Ravikant,
visuals by Jack Butcher). Audience: builders and founders who are sick of Musk
biographies and Musk discourse, and would actually use the methods.

The hook is the distinction the book itself insists on: this is not a biography
and not a gossip column. It is Musk's own words, edited into a manual you can
run. The trailer therefore looks like a manual — drawn diagrams that assemble
themselves — rather than like a documentary.

Tone: engineered, propulsive, unsentimental. No hagiography, no politics, no
personal life — matching the book's own stated scope.

## Assets

- assets/score.mp3 — instrumental trailer score generated locally via `hcai`
  (google/lyria-2), two movements stitched so the percussion drop lands exactly
  on The Algorithm at 27.5s.

## Customizations

- **Rebuilt in real 3D.** One continuous Three.js world; the camera flies a single
  ~450-unit path for the full minute, decelerating into eight stations. No cuts in
  the 3D layer — the whip between stations IS the transition. See design.md.
- Real PBR materials, PMREM room environment, ACES tonemapping, UnrealBloom.
- Three.js is vendored into `vendor/` rather than fetched from a CDN, because a
  render-time fetch races the renderer's parallel capture workers.

- Every scene owns a purpose-built animated SVG object (see design.md) — the
  previous trailer in this series was type-only and the brief for this one was
  explicitly "have visuals, images, art, objects, animations".
- The background is ONE continuous 60s composition on its own track, performing
  an unbroken launchpad → atmosphere → orbit → Mars ascent. Scenes are
  transparent and sit on top. Explicitly not per-scene background swaps.

## Notes

Source: the publisher's own free PDF (book-of-elon.s3.us-east-2.amazonaws.com),
plus the Goodreads listing. Everything on screen traces to it:

- Structure is the book's real one: Part I Pursue Purpose · Part II Ultra
  Hardcore Work · Part III Building Companies · Part IV On Behalf of Humanity,
  plus the bonus "69 Core Musk Methods".
- "Don't aspire to glory; aspire to work." — Musk, opening line of "Be Useful".
- The Algorithm's five steps are shown in shortened imperative form
  (Question the requirements / Delete the part / Simplify / Accelerate /
  Automate) rather than verbatim, and the book's own emphasis that the ORDER
  matters is kept.
- The fiberglass-mat story — deleting the part deleted $2M of robotics — is real
  and from the same section.
- "…preserve the light of consciousness" — Musk, Becoming Multiplanetary.
- Jorgenson's framing: built entirely from transcripts, tweets and interviews;
  five years of work; zero pages on family or politics.

Deliberately NOT on screen: net worth, politics, personal life, sales figures,
or any claim the book does not make. Quotes are kept short and attributed.

Auth: not signed in to HeyGen (verbatim: "Not signed in to HeyGen — voice &
music will use local engines (free, offline)"); local MusicGen/Kokoro deps
missing, so the score was resolved through the machine's own `hcai` provider.
No narration VO by design — scored and diagrammatic.

## v4 (2026-09-02)

Full rebuild of every scene on the same facts and copy; prior sources archived in
`archive/v-prev-2026-08-23/`. What changed: scenes overlap 0.5s on alternating tracks and hand
off with streaks tied to the 3D camera (no jump cuts); type sized to fill the frame; every
object rebuilt with real material and moving parts; a full-length chrome/HUD layer on track 3;
the world re-lit and given atmosphere; a four-movement Lyria score cut to the beat table plus a
procedural sound-design stem, mixed into `assets/mix.mp3`. Renders: `renders/*-v4-*.mp4`.
See `design.md` for the binding v4 contract.
