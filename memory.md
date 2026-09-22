# Memory / Project State Log — Unnati

Purpose: a single file an AI agent (or you, half-asleep at 2am) can re-read to get back up to speed on exactly what state the project is in, without re-reading the whole chat history. Update the "Current status" section every time a screen is finished or a decision changes.

## Fixed facts (do not change without a reason — keeps the agent from "helpfully" renaming things)

- App name: **Unnati**
- Tutor: **Kuldeep Verma**, Mathematics, Class 10, greeting: "Good evening, kuldeep ji"
- Tutor code: **KULDEEP10**
- Live demo student: **Aarav Sharma**
- Other 9 seeded students: Priya Singh, Rohan Verma, Neha Gupta, Vikram Patel, Ananya Das, Kabir Mehta, Sneha Rao, Aditya Joshi, Pooja Nair
- Sections: Algebra (~78%, healthy), Trigonometry (~56%, **weak area**), Geometry (~72%, healthy)
- Live playable question set: **"Trigonometry Practice Set 1"** — 5 MCQs, 4 options each, 15 minutes
- Weak topic used in the live demo result: "Applications of Trigonometry"
- Strong topic used in the live demo result: "Basic Trigonometric Ratios"
- Student-join confirmation line: "You are joining Shobha Ma'am's Class 10 Mathematics space." (seeded flavor text — keep as-is, not a bug)
- Stack: React + Tailwind + Vite, `localStorage`-backed `mockDb.js`, no backend, no auth, no API keys
- Design system: Khan Academy-style, see `design.md` for exact hex values

## Demo script (what you will actually click in front of the panel)

1. Landing page → "Tutor Login"
2. Tutor login → "Enter Kuldeep Verma's space"
3. Tutor dashboard → point out metrics, the 3 section bars, Trigonometry flagged weak
4. Click "Create assignment" → select Class 10 / Mathematics / Trigonometry / 5 questions → Create → show it now appears on the dashboard
5. Switch context: "now as the student" → Student join → enter/confirm `KULDEEP10`
6. Student dashboard → show the newly assigned Trigonometry set → Start Practice
7. Answer all 5 questions (mix right/wrong on purpose so the result isn't a boring 5/5) → Submit
8. Result screen → point out score, accuracy, strength, weak topic
9. Back to tutor view → student report for Aarav → point out it reflects the just-submitted attempt
10. Click "Assign targeted practice" → show confirmation state
11. Optional: About page to close on the differentiators + roadmap if there's time/questions

## Current status

_(Update this section as you go.)_

- [x] Project scaffolded (Vite + React + Tailwind installed, dev server runs)
- [x] `seedData.js` / `mockDb.js` written with full data per `.cursorrules` §3
- [x] Landing page
- [x] Tutor login page
- [x] Tutor dashboard
- [x] Create assignment page
- [x] Student join page
- [x] Student dashboard
- [x] Practice flow
- [x] Result page
- [x] Tutor student report page
- [ ] About page
- [ ] Full click-through tested on desktop
- [ ] Full click-through tested on an actual phone
- [ ] README written with exact run commands

## Known risks / things to double check

- Make sure `navigate()` view names match exactly between where they're called and where they're handled — typos here are the #1 cause of blank screens.
- Make sure the score shown on the Result page is actually computed from the student's answers, not hardcoded to "3/5" — a panel member may deliberately answer differently to test this.
- Make sure the tutor dashboard/report re-renders after a new attempt is submitted (via the `refresh()` pattern in `architecture.md`) — a stale dashboard is an easy "gotcha" for a panel to catch.
