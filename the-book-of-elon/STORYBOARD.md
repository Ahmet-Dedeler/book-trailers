---
format: 1920x1080
duration: 60s
message: "The Book of Elon isn't a biography — it's the operating manual, assembled from five years of Musk's own words."
arc: "Ignition → Not a biography → Be useful → First principles → The Algorithm → Ultra hardcore → Multiplanetary → Title"
background: "world.js — ONE continuous Three.js flight (launchpad → atmosphere → orbit → Mars) rendered in the host canvas; the camera whip across each cut IS the transition. Scenes are transparent, overlap 0.5s on alternating tracks, and streak with the whip."
audience: "Builders and founders tired of Musk biographies"
mode: autonomous
version: v4
---

Every frame's object, motion citation, copy and handoff is specified in `design.md`
(§ Scene briefs, § Scene contract, § Timing table). This board is the dispatch index.

## Frame 1 — Ignition
- status: animated
- src: compositions/s1-ignition.html
- duration: 7.5s (cut 0)
- transition_in: from black
- blueprint: logo-assemble-lockup
- rules: counting-dynamic-scale, svg-path-draw, waterfall-entry
- scene: T-minus counts down; a launch-window ring drains around the vehicle; the statement lands one word per count; ignition at 4.15.

## Frame 2 — Not a biography
- status: outline
- src: compositions/s2-not-biography.html
- duration: 6.5s (cut 7)
- transition_in: whip
- blueprint: kinetic-type-beats
- rules: reactive-displacement, kinetic-beat-slam, svg-path-draw
- scene: THIS IS NOT A BIOGRAPHY; IT'S THE MANUAL shoves it up; a blueprint sheet draws in as the 3D books are shoved off.

## Frame 3 — Be useful
- status: outline
- src: compositions/s3-useful.html
- duration: 7.5s (cut 13)
- transition_in: whip
- blueprint: constellation-hub
- rules: svg-path-draw, spring-pop-entrance, sine-wave-loop
- scene: The quote lands in five beats; the utility node fans out and splits again; a spec card credits it.

## Frame 4 — First principles
- status: outline
- src: compositions/s4-first-principles.html
- duration: 8.0s (cut 20)
- transition_in: whip
- blueprint: kinetic-type-beats
- rules: depth-scatter-assemble, svg-path-draw, waterfall-entry
- scene: A wire cube draws, shatters into edges, reassembles as a smaller tetrahedron; three arrows; exits by overexposure on the drop.

## Frame 5 — The Algorithm
- status: outline
- src: compositions/s5-algorithm.html
- duration: 12.0s (cut 27.5)
- transition_in: punch-in (the drop)
- blueprint: grid-card-assemble
- rules: waterfall-entry, anchored-layout-expand, counting-dynamic-scale
- scene: Five steps on a beat; the part tags beside the plates lose P-03 (struck, collapsed); the $2M counter.

## Frame 6 — Ultra hardcore
- status: outline
- src: compositions/s6-hardcore.html
- duration: 8.0s (cut 39)
- transition_in: whip
- blueprint: dataviz-countup
- rules: kinetic-beat-slam, chromatic-glitch, stat-bars-and-fills, chart-scrub-readout
- scene: EAT GLASS slams with echoes; a jagged waveform draws; the load bar grinds; intensity fills to 100%.

## Frame 7 — Multiplanetary
- status: outline
- src: compositions/s7-multiplanetary.html
- duration: 7.0s (cut 46.5)
- transition_in: whip
- blueprint: titlecard-reveal
- rules: svg-path-draw, sine-wave-loop
- scene: A transfer arc draws over the planets; one light crosses it; the quote, centred; exits by dip.

## Frame 8 — Title lockup
- status: outline
- src: compositions/s8-title.html
- duration: 7.0s (cut 53)
- transition_in: dip from black
- blueprint: logo-assemble-lockup
- rules: spring-pop-entrance, 3d-text-depth-layers, sine-wave-loop
- scene: THE BOOK OF ELON with depth, the mark spins in, credits, the 69 Methods tag, fade to black.

## Frame 0 — HUD chrome (all 60s)
- status: outline
- src: compositions/chrome.html
- duration: 60s
- rules: discrete-text-sequence, sine-wave-loop
- scene: Mission clock, station index, altitude/velocity readouts, progress rule, brackets, grain.
