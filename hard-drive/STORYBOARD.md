---
format: 1920x1080
duration: 60s
message: "Microsoft's empire was not won with better code — it was bought for $50,000 and negotiated into a licence nobody else thought to ask for."
arc: "Cold open → The turn → The origin → The deal → The bully → The record → Thesis → Title"
background: "A real Three.js disk assembly in the host document, one unbroken 60s camera move; the head seeks and the camera kicks on every cut; a cobalt written-track ring grows over the minute. Scenes are transparent, overlap 0.5s on alternating tracks, and hand off with a vertical seek-push."
audience: "People who know the Microsoft outcome but not the mechanism"
mode: autonomous
version: v4
---

Every frame's object, motion citation, copy and handoff is specified in `design.md`
(§ Scene briefs, § Scene contract, § Timing table). This board is the dispatch index.

## Frame 1 — Everyone knows how Microsoft won
- status: animated
- src: compositions/s1-cold-open.html
- duration: 7.0s (cut 0)
- transition_in: from black
- blueprint: typewriter-reveal
- rules: discrete-text-sequence, context-sensitive-cursor, waterfall-entry, svg-icon-enrichment
- scene: A DOS prompt types the dateline; the received story builds in four lines; a 5.25" floppy spins at right.

## Frame 2 — They didn't ask him
- status: outline
- src: compositions/s2-turn.html
- duration: 6.5s (cut 6.5)
- transition_in: seek-push
- blueprint: kinetic-type-beats
- rules: kinetic-beat-slam, waterfall-entry, orbit-3d-entry
- scene: Two beats slam; a rolodex of redacted sources flips; the bibliographic line assembles.

## Frame 3 — They sold it first
- status: outline
- src: compositions/s3-altair.html
- duration: 9.0s (cut 12.5)
- transition_in: seek-push
- blueprint: kinetic-type-beats
- rules: waterfall-entry, svg-icon-enrichment, spring-pop-entrance
- scene: The Altair 8800 panel powers up across the bottom of the frame; address LEDs run a program; toggles get thrown.

## Frame 4 — The deal that made the empire
- status: outline
- src: compositions/s4-deal.html
- duration: 10.0s (cut 21)
- transition_in: seek-push
- blueprint: constellation-hub
- rules: svg-path-draw, spring-pop-entrance, waterfall-entry
- scene: The licence-flow diagram assembles edge by edge; $50,000; NON-EXCLUSIVE; the clone node fans out; royalty pulses; exits by shutter.

## Frame 5 — The Silicon Bully
- status: outline
- src: compositions/s5-bully.html
- duration: 9.0s (cut 30.5)
- transition_in: chromatic glitch (accent)
- blueprint: kinetic-type-beats
- rules: chromatic-glitch, reactive-displacement, kinetic-beat-slam
- scene: The label snaps out of an RGB split; the charge sheet shoves it; a fault panel flips four indicators.

## Frame 6 — What the book covers
- status: outline
- src: compositions/s6-timeline.html
- duration: 8.5s (cut 39)
- transition_in: seek-push
- blueprint: spatial-pan-stations
- rules: svg-path-draw, spring-pop-entrance, chart-scrub-readout
- scene: The timeline draws 1975 → 1992; milestones pop; a read head sweeps the span; exits by dip.

## Frame 7 — Thesis
- status: outline
- src: compositions/s7-thesis.html
- duration: 6.0s (cut 47)
- transition_in: dip
- blueprint: titlecard-reveal
- rules: waterfall-entry, sine-wave-loop
- scene: A hex field fills behind; two centred lines; one restrained move; stillness. Exits by dip.

## Frame 8 — Title lockup
- status: outline
- src: compositions/s8-title.html
- duration: 7.5s (cut 52.5)
- transition_in: dip from black
- blueprint: logo-assemble-lockup
- rules: spring-pop-entrance, 3d-text-depth-layers, sine-wave-loop
- scene: HARD DRIVE with depth over the large platter; the four-pane flag snaps in once; credits; fade to black.

## Frame 0 — HUD chrome (all 60s)
- status: outline
- src: compositions/chrome.html
- duration: 60s
- rules: discrete-text-sequence, sine-wave-loop
- scene: C:\> sector readout, track index, WRITTEN %, progress rule, brackets, grain.
