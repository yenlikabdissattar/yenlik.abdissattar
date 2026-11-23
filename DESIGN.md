# DESIGN.md — Yenlik Abdissattar portfolio

A museum archive, a magazine index: one 12-column grid, two text sizes, and one plate that every image sits on. Every page uses the same parts in the same order, so fourteen very different projects read as one collection.

References: Grid System Templates 001/002 (template.systems), A2 Architecture Presentation Grid, A4 Architecture + Photography Grid System, Marketing Academy brand guidelines (typography).

---

## 1. Principles

1. **One system, not fourteen moods.** The project changes; the frame never does. Same header, same title block, same plate, same order of sections.
2. **Small or big.** Text is either small (labels, meta, captions) or big (titles, the email). Paragraphs sit between them at 14px. Nothing else.
3. **The plate unifies.** Images are not shown raw at their own scale and background; each sits contained on a plate with even padding, like objects on museum mounts.
4. **Tight.** One continuous index on the home page, no empty rows, spacing in steps of 8.
5. **Quiet motion.** The blind contours drift on the landing, the hero enters once, films loop silently. Nothing fades in as you scroll.

---

## 2. Layout

### Grid

| | Desktop > 1024 | Tablet 641–1024 | Mobile ≤ 640 |
|---|---|---|---|
| Columns | 12 | 8 | 4 |
| Margin `--m` | clamp(16px, 2vw, 28px) | same | same |
| Gutter `--g` | clamp(10px, 1vw, 16px) | same | same |
| Header `--head` | 52px | 52px | 52px |

### Four slots

The page reads in four slots of three columns. Everything starts on one of these lines.

| Slot | Columns | Holds |
|---|---|---|
| A | 1–3 | Section labels (Overview, Process, Outcome), step text, "Contents" |
| B | 4–6 | Name in the header; start of the main column |
| C | 7–9 | Current section in the header |
| D | 10–12 | Meta list, brief and approach, "Contact" |

Main column = B to D (4–12). Title = A to C (1–9).

### Home page

1. **Landing** — one screen, white. The fifteen blind contours drift slowly and fade as you scroll. Bottom left, small: "Under three minutes blind contours". Bottom right, small: discipline line.
2. **Index** — "Index" in big type, then the section filter (All, Editorial Design, Interface, Film and Motion, AI, Art) and one grid of all projects: 4 per row, same-size 4:3 previews. Editorial projects use their mockups; films play muted on loop. Hovering a project shows its page in miniature (title, summary, hero, three process images) next to the cursor.
3. **Contact** — the email in big type; Studying, Experience, Tools, Languages in the four slots; footer.

### Case study page (every project)

1. **Title block** — number (small), title (big, A–C), subtitle (small); meta list in D: No., Section, Discipline, Year, Context, Tools, credits.
2. **Hero** — full width, 16:9 plate. Films fill it edge to edge and loop.
3. **Overview** — label in A, summary in B–C (14px), Brief and Approach stacked in D (small).
4. **Process** — label in A; numbered steps. Step number, title and one or two sentences in A (they stay in view while you scroll); images in B–D as equal plates, one to three per row.
5. **Outcome** — label in A; plates three per row in B–D. Click any plate to open the viewer (arrows, Esc).
6. **Reflection** — only when there is one.
7. **Next** — "Next, 05" small in A, the next title big in B–D; footer.

### Exceptions, on purpose

- **Art** (Drawing, Colour Design, Illustration): plates are white, so the work sits on the page itself.
- **RunwAI**: the page is black. The runway film fills the left half, full height, and stays while you scroll; on the right, the title block, then the magazine cover with the pages beside it, then the process film.

---

## 3. Typography

One family, Helvetica Neue (Helvetica, Arial). Weights 400 and 500.

| Style | Size / line | Weight | Tracking | Use |
|---|---|---|---|---|
| Big | clamp(44px, 7.4vw, 128px) / 0.9 | 500 | −0.045em | Titles, "Index", the email |
| Text | 14px / 20px | 400 | 0 | Summaries and paragraphs |
| Small | 12px / 16px | 400, 500 for labels | 0 | Header, labels, meta, steps, cards |
| Quote | inherits | 400 italic | 0 | Times New Roman italic, quotations only |

Rules: only quotes are italic. No grey text; hierarchy is size and weight. No all-caps. Numbers are tabular (01, 11 / 14).

---

## 4. Colour

| Token | Value | Role |
|---|---|---|
| `--paper` | #ffffff | Page |
| `--ink` | #111111 | All text |
| `--plate` | #f2f2f0 | Ground behind every image (white on Art pages, #161616 on RunwAI) |
| `--accent` | #293785 | Hover, active filter, focus, selection |
| `--accent-2` | #496da2 | Reserve |

Black and white carry the site. Blue appears only when you interact.

---

## 5. Components

| Component | Rule |
|---|---|
| Header | Fixed. A: three lines + "Contents". B: name. C: current section. D: Contact. Clear over the landing, light after. |
| Contents | Opens from the three lines on click, or on hover with a mouse. Six columns: the five sections with their projects, then Information. Esc closes. |
| Card | 4:3 preview, number, title, year, discipline. Hover: lifts 2px, image zooms 3%, title turns blue, page preview appears. |
| Filter | Text buttons; the active one is medium weight and underlined; other cards dim to 12%. |
| Plate | 4:3 (16:9 for heroes and films), padding 7%, image contained, never cropped. |
| Film | Muted, looping, no controls, plays only while on screen. Served from Cloudinary. |
| Viewer | Full screen on the page colour; Previous / Next / Close; arrows and Esc. |
| Link | Underline draws in on hover. |

---

## 6. Motion

| What | How |
|---|---|
| Blind contours | Drift at random speeds, bounce at the edges, fade in one by one on load, fade out on scroll. Still under reduced motion. |
| Title and hero | Rise 14px and fade in once, 0.9s. |
| Hover | 0.35s lift, 0.7s image zoom, 0.2s colour. |
| Films | Loop silently in view, pause out of view. |

---

## 7. Text

- Plain sentences, one idea each. Paragraphs at most three sentences.
- Every project: subtitle, one-sentence summary, brief, approach, steps of one or two sentences.
- Credit sources and collaborators in the meta list.
- Nothing under images: no captions.

---

## 8. Projects

| No. | Project | Section | Discipline | Year | Preview |
|---|---|---|---|---|---|
| 01 | Wander | Editorial Design | Book design | 2026 | Book mockup |
| 02 | Snippets | Editorial Design | Visual systems | 2026 | Calendar mockup |
| 03 | TIME | Editorial Design | Editorial, UX/UI | 2025 | Magazine mockup |
| 04 | Baskerville | Editorial Design | Typography, poster, book cover | 2025 | Poster mockup |
| 05 | Distort Noise | Interface | App design, UX/UI | 2026 | Screens |
| 06 | Silence of the Dawn | Film and Motion | Documentary film | 2025 | Film loop |
| 07 | Dust | Film and Motion | Motion graphics, editorial | 2025 | Film loop |
| 08 | Fly Me to the Moon | Film and Motion | Expressive typography, motion | 2025 | Film loop |
| 09 | Gazebo | Film and Motion | Image-making, motion | 2025 | Film loop |
| 10 | Digital Tools | Film and Motion | Motion, 3D, interactive | 2025 | Bus stop mockup |
| 11 | RunwAI | AI | AI, film, editorial | 2025 | Film loop |
| 12 | Drawing | Art | Drawing | 2025 | Still life |
| 13 | Colour Design | Art | Colour, painting | 2025 | Gouache |
| 14 | Illustration | Art | Illustration | 2025 | Postcard |

Not shown: VESSEL (no images yet), ARTFORUM (left out on purpose).

---

## 9. Files

```
index.html            landing, index, contact
work/<project>.html   one case study per project
css/site.css          tokens, grid, type, components, themes
js/site.js            contents menu, floating contours, page preview, filter, films, viewer
media/bc-*.webp       blind contours for the landing
rmedia/               images, max 1600px
DESIGN.md             this file
```

Adding a project: copy a page in `work/`, replace its text and images, add a card to the Index grid in `index.html` (with its `data-cat` and `data-peek`), and a link in the Contents menu on every page.
