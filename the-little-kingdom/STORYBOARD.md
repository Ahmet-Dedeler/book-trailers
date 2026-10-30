---
format: 1920x1080
duration: 60s
message: "The Little Kingdom is the Apple origin story written from inside the room — before anyone knew how it ended, and before Jobs shut the door."
arc: "Cold open → The turn → The access → The room → The break → Finished anyway → Thesis → Title"
background: "compositions/bg-field.html — ONE continuous 60s Three.js circuit-board flight on track 0; it surges, banks and flashes on every cut. Scenes are transparent, overlap 0.5s on alternating tracks, and hand off with a lateral streak."
audience: "People who think they already know the Apple story"
mode: autonomous
version: v4
---

Every frame's object, motion citation, copy, and handoff is specified in `design.md`
(§ Scene briefs, § Scene contract, § Timing table). This board is the dispatch index.

## Frame 1 — Every story was written after it won
- status: animated
- src: compositions/s1-cold-open.html
- duration: 7.0s (cut 0)
- transition_in: from black
- blueprint: typewriter-reveal
- rules: discrete-text-sequence, context-sensitive-cursor, waterfall-entry
- scene: The dateline types; six printed spines drop onto an amber shelf; the claim builds in three lines and AFTER slams.

## Frame 2 — This one wasn't
- status: outline
- src: compositions/s2-turn.html
- duration: 6.5s (cut 6.5)
- transition_in: lateral page-push
- blueprint: kinetic-type-beats
- rules: kinetic-beat-slam, motion-blur-streak, waterfall-entry
- scene: THIS ONE WASN'T. slams; one volume slides off the shelf, turns to face us and grows; a paper slip carries the bibliographic line.

## Frame 3 — Jobs handed over the keys
- status: outline
- src: compositions/s3-access.html
- duration: 9.0s (cut 12.5)
- transition_in: lateral page-push
- blueprint: kinetic-type-beats
- rules: waterfall-entry, svg-icon-enrichment, sine-wave-loop
- scene: A micro-cassette recorder rolls — hubs turn, tape transfers, REC beats, VU wobbles, counter runs; the Hertzfeld-recalled Jobs line arrives on a paper slip.

## Frame 4 — What was in the room
- status: outline
- src: compositions/s4-room.html
- duration: 10.0s (cut 21)
- transition_in: lateral page-push
- blueprint: grid-card-assemble
- rules: waterfall-entry, spring-pop-entrance, svg-path-draw
- scene: Six ledger rows self-assemble on a beat; six line-art icons draw themselves beside them.

## Frame 5 — Then the story ran
- status: outline
- src: compositions/s5-break.html
- duration: 9.0s (cut 30.5)
- transition_in: push-in (accent)
- blueprint: kinetic-type-beats
- rules: reactive-displacement, chromatic-glitch, motion-blur-streak
- scene: The halftone newsmagazine flies in and shoves the headline; the door slams shut; AND THE DOOR CLOSED resolves out of an RGB split; the door is the handoff to 6.

## Frame 6 — He finished it anyway
- status: outline
- src: compositions/s6-anyway.html
- duration: 8.5s (cut 39)
- transition_in: from below, behind the door
- blueprint: kinetic-type-beats
- rules: discrete-text-sequence, waterfall-entry, spring-pop-entrance
- scene: The caret returns and types; typed manuscript pages fly in and stack; a DRAFT stamp lands on ANYWAY; the Hertzfeld verdict on a slip.

## Frame 7 — Thesis
- status: outline
- src: compositions/s7-thesis.html
- duration: 6.0s (cut 47)
- transition_in: lateral page-push
- blueprint: titlecard-reveal
- rules: waterfall-entry, svg-path-draw, sine-wave-loop
- scene: A ruled page draws around one centred two-line statement; a pencil underline; then stillness. Exits by dip.

## Frame 8 — Title lockup
- status: outline
- src: compositions/s8-title.html
- duration: 7.5s (cut 52.5)
- transition_in: dip from black
- blueprint: logo-assemble-lockup
- rules: spring-pop-entrance, svg-path-draw, sine-wave-loop
- scene: The six-face jacket turns into frame; the spectrum wipes down its spine and cover edge; credits; fade to black.

## Frame 0 — Chrome (all 60s)
- status: outline
- src: compositions/chrome.html
- duration: 60s
- blueprint: —
- rules: discrete-text-sequence, sine-wave-loop
- scene: Chapter ticker, tape counter, progress rule, corner brackets, film grain. Never touches the statement zones.
