---
workflow: general-video
flow: automation
storyboard: no
message: "The Little Kingdom is the Apple origin story written from inside the room — before anyone knew how it ended, and before Jobs shut the door."
destination: youtube
aspect: 1920x1080
language: en
length: 60s
angle: narrative
---

## Intent

A 60-second cinematic book trailer for *The Little Kingdom: The Private Story of
Apple Computer* (Michael Moritz, William Morrow, 1984). Audience: people who
think they already know the Apple story — founders, tech readers, Jobs-biography
readers.

The hook is not "here is an old book about Apple." It is: every Apple account you
have read was written **after** Apple won. This one wasn't. Then the turn — Jobs
personally handed a Time reporter the keys, and then took them back when he read
what got printed.

Tone: documentary trailer, not marketing. Restrained, serious, print-era.
No hype adjectives, no exclamation, no stock-footage gloss. Typography carries it.

## Assets

- assets/score.wav — instrumental trailer score, generated locally via `hcai` (google/lyria-2). Runs the full 60s under the cut.

## Customizations

- Every factual claim on screen traces to a sourced fact (see ## Notes). No invented quotes, no invented numbers.
- The 1977 six-color Apple spectrum appears exactly once, as the title-card payoff — a source-derived prop, not decoration.

## Notes

Sourced facts used on screen:

- Moritz was a Time magazine reporter; Jobs contracted him in the early 1980s to
  document the Macintosh's development.
- Andy Hertzfeld records Jobs saying "Mike's going to be our historian."
- Time's Jan 1983 issue named the personal computer "Machine of the Year" rather
  than making Jobs Person of the Year; it carried critical quotes from Apple staff.
- Jobs then cut off communication with Moritz and threatened to fire anyone who
  spoke to him. Some of the Mac team kept talking anyway.
- Hertzfeld later called it "one of the best books about Apple Computer ever written."
- Published 1984; reissued 2009 as *Return to the Little Kingdom*.

Deliberately NOT claimed on screen: sales figures, "banned", "suppressed", or any
characterization of the book's contents beyond what the sources above support.

Auth: not signed in to HeyGen at build time (verbatim: "Not signed in to HeyGen —
voice & music will use local engines (free, offline)"). Local MusicGen/Kokoro deps
were missing, so the score was resolved through the machine's own `hcai` provider.
No narration VO — the piece is scored and typographic by design.

## v4 (2026-09-02)

Full rebuild of every scene on the same facts and copy; prior sources archived in
`archive/v-prev-2026-08-23/`. What changed: scenes overlap 0.5s on alternating tracks and hand
off with streaks tied to the 3D camera (no jump cuts); type sized to fill the frame; every
object rebuilt with real material and moving parts; a full-length chrome/HUD layer on track 3;
the world re-lit and given atmosphere; a four-movement Lyria score cut to the beat table plus a
procedural sound-design stem, mixed into `assets/mix.mp3`. Renders: `renders/*-v4-*.mp4`.
See `design.md` for the binding v4 contract.
