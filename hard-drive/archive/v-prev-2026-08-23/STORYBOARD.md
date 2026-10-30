---
format: 1920x1080
duration: 60s
message: "Microsoft's empire was not won with better code — it was bought for $50,000 and negotiated into a licence nobody else thought to ask for."
arc: "Cold open → The turn → The origin → The deal → The bully → The record → Thesis → Title"
audience: "People who know the Microsoft outcome but not the mechanism"
mode: autonomous
---

## Frame 0 — The machine (continuous background, all 60s)

- status: animated
- src: compositions/bg-platter.html
- duration: 60s
- transition_in: cut
- blueprint: camera-journey
- runtime: three
- rules: 3d-camera-flight, depth-of-field-blur, sine-wave-loop
- scene: A real Three.js hard-disk assembly — three metal platters, spindle, clamp rings, a lit actuator head — turning under the whole film on one unbroken camera move.

Not a scene — the spine. Sub-shape (B) cursorless flight: the camera dives from high and
far to low and close, then settles back for the title. Scenes cut over it with transparent
roots; the machine never cuts. Lives in the host document, not a sub-comp — see design.md.

## Frame 1 — Everyone knows how Microsoft won

- status: animated
- src: compositions/s1-cold-open.html
- duration: 6.5s
- transition_in: cut
- blueprint: typewriter-reveal
- rules: discrete-text-sequence, context-sensitive-cursor, waterfall-entry
- scene: A DOS prompt types the dateline; the received story builds under it.

Hook in outcome language — it challenges the viewer's own version of events.

## Frame 2 — They didn't ask him

- status: animated
- src: compositions/s2-turn.html
- duration: 6.0s
- transition_in: cut
- blueprint: kinetic-type-beats
- rules: kinetic-beat-slam, motion-blur-streak, waterfall-entry
- scene: Two-phrase slam onto the reversal, then the bibliographic line assembles.

The value claim lands on beat two: this is the reported, unauthorized version.

## Frame 3 — They sold it first

- status: animated
- src: compositions/s3-altair.html
- duration: 8.5s
- transition_in: cut
- blueprint: kinetic-type-beats
- rules: waterfall-entry, svg-icon-enrichment, spring-pop-entrance
- scene: An Altair 8800 front panel powers up and runs; address LEDs blink a deterministic program while toggles are thrown.

Evidence beat 1 — the origin. The object is the machine they wrote for sight unseen.

## Frame 4 — The deal that made the empire

- status: animated
- src: compositions/s4-deal.html
- duration: 9.5s
- transition_in: cut
- blueprint: constellation-hub
- rules: svg-path-draw, spring-pop-entrance, waterfall-entry
- scene: A licence-flow diagram assembles — Seattle Computer → Microsoft → IBM, fanning to every clone maker — with royalty pulses riding the drawn edges.

Evidence beat 2 and the hinge of the whole film: non-exclusive.

## Frame 5 — The Silicon Bully

- status: animated
- src: compositions/s5-bully.html
- duration: 8.5s
- transition_in: cut
- blueprint: kinetic-type-beats
- rules: chromatic-glitch, reactive-displacement, kinetic-beat-slam
- scene: The label lands with an RGB split; the charge sheet slides in and shoves it aside.

The turn against the subject. Sourced label, sourced charges, no editorializing.

## Frame 6 — What the book covers

- status: animated
- src: compositions/s6-timeline.html
- duration: 8.0s
- transition_in: cut
- blueprint: spatial-pan-stations
- rules: svg-path-draw, spring-pop-entrance, waterfall-entry
- scene: A timeline draws 1975 → 1992, milestones pop as the axis passes them, then a read head sweeps the whole span.

Scope beat — what the reporting actually contains, and where it stops.

## Frame 7 — Thesis

- status: animated
- src: compositions/s7-thesis.html
- duration: 5.5s
- transition_in: cut
- blueprint: titlecard-reveal
- rules: waterfall-entry, sine-wave-loop
- scene: Two centered lines, one restrained move, then stillness.

"He bought the code. He negotiated the rest."

## Frame 8 — Title lockup

- status: animated
- src: compositions/s8-title.html
- duration: 7.5s
- transition_in: cut
- blueprint: logo-assemble-lockup
- rules: spring-pop-entrance, sine-wave-loop
- scene: Jacket lockup over the now-large platter; the Windows-era four-pane flag snaps in once — the only colour in the film.
