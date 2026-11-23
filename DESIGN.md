# DESIGN.md — Yenlik Abdissattar portfolio

**Direction: a quiet archive.** One 12-column grid, black and white, Helvetica, and a strict budget for how much each page shows. The work is the only colour. Fewer, larger pictures; short text; nothing repeated. Interaction is where the blue appears and where the site comes alive: the drifting blind contours, the hover preview, and books you can turn in 3D.

Built from the project's own brand (white, #111, #293785, Helvetica, the blind contours), the Swiss grid-template references, and two reviews (art director, front-end designer). Not compared against example sites.

Tokens live in `css/site.css` (`:root`). Your local overrides go in `css/tokens.css`.

---

## 1. Content budget — the main rule

The site had too much: 33–38 images on some pages, the same spreads shown three times, tool lists twice. Every page now follows this budget.

| Page | Budget |
|---|---|
| Home | Landing (name, one line, four links). Index: 10 projects, Wander and Distort Noise large. About: photo, three sentences, CV and LinkedIn. Email. Nothing else; lists live in the CV. |
| Case study | Title, subtitle, at most 4 meta rows plus credits. One hero. Flipbook if it is a book or magazine. Overview: one summary sentence, Brief and Approach under 35 words each. Process: at most 4 steps, at most 2 images a step, one sentence a step. Outcome: at most 3 images, or none when the flipbook shows the finished piece. |
| Foundations | 4 chapters × 3 images. |
| Whole case study | At most 10 images outside the flipbook. |

If something new goes in, something comes out.

---

## 2. Colour

| Token | Value | Role |
|---|---|---|
| `--paper` | #ffffff | Page background |
| `--ink` | #111111 | All text and the menu lines. Contrast on paper 18.9:1 |
| `--plate` | #f2f2f0 | Ground behind images that don't fill their frame; behind the flipbook |
| `--accent` | #293785 | Interaction only: hover, focus ring, active filter, selection. 10.6:1 on paper |
| `--accent-2` | #496da2 | Interaction on the black RunwAI page |
| `--shade` | rgba(17,17,17,.12) | The one shadow: menu, hover preview |

Themes: Foundations sets `--plate` to white. RunwAI sets paper #0b0b0b, ink #f1f1f1, plate #161616. No other colours. No gradients except the flipbook's light.

---

## 3. Typography

Helvetica, from Adobe Fonts (kit `hpl6gyc`): **Neue Haas Grotesk Text** for text, **Neue Haas Grotesk Display** for big type. Fallback Helvetica Neue, Helvetica, Arial.

| Token | Size / line | Weight | Use |
|---|---|---|---|
| `--big` | clamp(44px, 7.4vw, 128px) / 0.9, tracking −0.04em | Display 500 | Titles, "Index", the email |
| `--tx` | 16px / 24px | Text 400 | Summaries, paragraphs. Lines up to `--measure` (34em, about 65 characters) |
| `--sm` | 12px / 16px | Text 400, 500 for labels | Header, labels, meta, steps, cards, buttons |

Small or big; text only for reading. Only quotes are italic (Times New Roman). No grey text, no capitals for effect. Numbers tabular: 01, Pages 3–4 of 28.

---

## 4. Space and grid

| | Desktop > 1024 | Tablet | Mobile ≤ 640 |
|---|---|---|---|
| Columns | 12 | 8 | 4 |
| Margin `--m` | clamp(16px, 2vw, 28px) | same | same |
| Gutter `--g` | clamp(10px, 1vw, 16px) | same | same |

Space scale, 8px steps only: `--s1` 8 · `--s2` 16 · `--s3` 24 · `--s4` 32 · `--s6` 48 · `--s8` 64 · `--s12` 96 · `--s16` 128. Between sections: `--section` (96px).

Four slots of three columns: **A** 1–3 labels and step text · **B** 4–6 · **C** 7–9 · **D** 10–12 meta, brief, links. Main column B–D. Titles A–C.

---

## 5. Shape and depth

Square corners (`--radius: 0`) everywhere except the flipbook's covers (3px, like board). One shadow (`--shade`) for things that float: menu, hover preview. The flipbook has its own shadow under the book.

---

## 6. Components

| Component | Rule |
|---|---|
| Header | Fixed, 52px. A: three lines + Contents. B: name. C: section. D: CV, Contact. Clear over the landing. |
| Contents menu | Opens on click or hover; six columns (five sections, Information). Esc closes. |
| Link | Small, medium weight; an underline draws in on hover; colour turns blue. 44px tap height on phones. |
| Card | 4:3 image (3:2 for the two leads), number, title, year, discipline. Hover: lifts 2px, image zooms 3%, page preview follows the cursor. |
| Filter | Text buttons; active is medium and underlined; other cards leave the grid. |
| Plate | 4:3 (16:9 heroes and films, 3:4 rows of phone screens). Image contained with `--plate-pad` (7%). Mockup photos fill the frame edge to edge. Click opens the viewer. |
| Film | Muted, looping, no controls. Previews loop 8 seconds from a chosen still; project films skip black intros and link to the full film with sound. |
| Flipbook | See section 7. |
| Viewer | Full screen on the page colour; Previous, Next, Close; arrows and Esc; focus moves in and back. |
| Footer | Name, email, LinkedIn, Back to top, in the four slots. |

---

## 7. The flipbook

Books and magazines (Wander, TIME, RunwAI) are shown as an object you can handle, placed straight under the hero.

- **On a table:** the book tilts back 10° and straightens to 4° when you point at it; a soft shadow lies under it.
- **Drag to turn:** press on a page and drag; the page rotates with the pointer and completes the turn past a third. Click, swipe, arrow keys and Previous / Next also turn.
- **Depth:** page-block edges at both sides grow and shrink as you read; a gutter shadow on every page; light passes across the turning page.
- **Covers:** slightly rounded fore-edges; the book opens from the centre, closed on its cover, and centres itself when closed at the back.
- **Counter:** Cover, Pages 3–4 of 28, Back cover.
- Reduced motion: no tilt, no animation; pages still turn.

---

## 8. Imagery and motion

- One image per idea. No captions under images. Credits in the meta list.
- Process images are the work itself (boards cropped of their titles, screens, stills), not slides.
- Motion: blind contours drift on the landing and fade on scroll; titles rise once on load; hover responses 0.2–0.7s; nothing fades in as you scroll.

---

## 9. Projects

| No. | Project | Section | Year | Shows |
|---|---|---|---|---|
| 01 | Wander, with Dust and 9 Panels | Editorial Design | 2026 | Flipbook, 4 steps, companion film |
| 02 | Distort Noise | Interface | 2026 | 4 steps of screens, outcome |
| 03 | RunwAI | AI | 2025 | Film on black, flipbook, process film |
| 04 | TIME | Editorial Design | 2025 | Flipbook, 2 steps |
| 05 | Snippets | Editorial Design | 2026 | 3 steps, 3 outcome |
| 06 | Silence of the Dawn | Film and Motion | 2025 | Film, 3 steps of stills |
| 07 | Fly Me to the Moon | Film and Motion | 2025 | Film, 3 steps |
| 08 | Baskerville | Editorial Design | 2025 | 2 steps, outcome |
| 09 | Gazebo | Film and Motion | 2025 | Film |
| 10 | Foundations | Foundations | 2025 | 4 chapters × 3 |

Not shown: VESSEL (no images yet), ARTFORUM (left out on purpose).

---

## 10. Files and local editing

```
index.html            landing, index, about, contact
work/<project>.html   one case study per project
cv.html / cv.pdf      one-page CV
css/site.css          tokens and components
css/tokens.css        your overrides from the edit panel
js/site.js            menu, contours, preview, filter, films, flipbook, viewer
js/tune.js            local edit panel (press E)
js/project-log.js     project dates, duration, role, team, course
rmedia/               images: WebP 1600 and 800px, JPEG originals
```

Open the site locally (`python3 -m http.server`, then localhost:8000) and press **E**. Design tab: sliders and colours, then Download tokens.css into `css/`. Projects tab: calendar per project, then Download project-log.js into `js/`. Push to publish.
