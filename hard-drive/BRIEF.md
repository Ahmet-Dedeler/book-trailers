---
workflow: general-video
flow: automation
storyboard: no
message: "Microsoft's empire was not won with better code — it was bought for $50,000 and negotiated into a licence nobody else thought to ask for."
destination: youtube
aspect: 1920x1080
language: en
length: 60s
angle: narrative
---

## Intent

A 60-second cinematic book trailer for *Hard Drive: Bill Gates and the Making of
the Microsoft Empire* (James Wallace & Jim Erickson, John Wiley & Sons, 1992).
Audience: people who know the Microsoft outcome but not the mechanism.

The hook challenges the received story — everyone knows Microsoft won, almost
nobody knows *how*. The value claim lands on beat two: this is the reported,
unauthorized version, assembled by two newspaper reporters from the people
around Gates rather than from Gates. The spine is the 1980 IBM deal.

Tone: cold, mechanical, unsentimental — a business-desk investigation, not a
hagiography and not a hit piece. The machine is the metaphor and the set.

## Assets

- assets/three.module.js + assets/three.core.js — vendored Three.js r181 (no CDN at render time).
- assets/score.mp3 — instrumental trailer score, generated locally via `hcai` (google/lyria-2), two movements crossfaded so the score breaks on the scene-5 conflict beat.

## Customizations

- Per user direction after the first trailer: this one must carry real built
  objects and art, not typography alone — an animated hard-disk platter, an
  Altair 8800 front panel, a licence-flow node diagram, and a drawn timeline.
- The background is ONE continuous layer spanning all 60s that evolves under the
  cuts (the platter grows, tilts and drifts; track density increases; the bloom
  migrates). It is explicitly not a per-scene background swap.
- The Windows-era four-pane flag appears exactly once, as the title-card payoff.
- Upgraded to real 3D on request: the disk assembly is a Three.js scene (metal platters,
  actuator, real lights, real camera) on one unbroken 60s camera move, vendored locally
  for determinism. Delivered at 4K (3840x2160) with the WebGL buffer pinned to match.

## Notes

Sourced facts used on screen:

- Wallace and Erickson were reporters for the Seattle Post-Intelligencer; they
  interviewed Gates's friends, associates, former employees and rivals. The book
  is unauthorized — Gates did not cooperate.
- The book covers Microsoft from its 1975 founding through early 1992.
- Gates and Allen wrote a BASIC interpreter for the Altair 8800 without access to
  the machine; Microsoft was founded in April 1975.
- Microsoft bought the rights to DOS from Seattle Computer Products for $50,000
  (the book's own figure) and licensed it to IBM non-exclusively.
- IBM PC shipped August 1981. Microsoft IPO March 1986. Windows 3.0 May 1990.
- Business Month magazine labelled Gates "The Silicon Bully".
- OS/2 failed; Windows shipped late; IBM split with Microsoft and allied with
  Apple; the FTC opened an investigation.

Deliberately NOT claimed on screen: revenue or market-share figures, net-worth
numbers beyond the book's own framing, any characterization of Gates's motives
that the sources do not support, and any invented quotation. No quoted passages
from the book's text are reproduced — the trailer states facts, not prose.

## v4 (2026-09-02)

Full rebuild of every scene on the same facts and copy; prior sources archived in
`archive/v-prev-2026-08-23/`. What changed: scenes overlap 0.5s on alternating tracks and hand
off with streaks tied to the 3D camera (no jump cuts); type sized to fill the frame; every
object rebuilt with real material and moving parts; a full-length chrome/HUD layer on track 3;
the world re-lit and given atmosphere; a four-movement Lyria score cut to the beat table plus a
procedural sound-design stem, mixed into `assets/mix.mp3`. Renders: `renders/*-v4-*.mp4`.
See `design.md` for the binding v4 contract.
