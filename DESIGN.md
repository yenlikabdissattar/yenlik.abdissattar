# DESIGN.md — Yenlik Abdissattar portfolio

The site is built like a grid-system document: every screen is a landscape "sheet" on one 12-column grid, with a running head, the content, and a running foot. Content always snaps to the grid, and spacing does all the separating (no divider lines, no faded text).

References: Grid System Templates 001/002 (template.systems), A2 Architecture Presentation Grid, A4 Architecture + Photography Grid System, Marketing Academy brand guidelines (typography section).

---

## 1. Layout

### Grid

| | Desktop (> 1024px) | Tablet (641–1024px) | Mobile (≤ 640px) |
|---|---|---|---|
| Columns | 12 | 8 | 4 |
| Outer margin `--m` | clamp(16px, 2.2vw, 32px) | same | same |
| Gutter `--g` | clamp(12px, 1.25vw, 20px) | same | same |
| Vertical unit `--u` | 8px | 8px | 8px |

All vertical spacing is a multiple of 8px (8, 16, 24, 32, 40, 48, 96).

Press **G** (or click "Grid (G)" in the running head) to show the column overlay on any page.

### Column anchors

The page is read in four slots of three columns. Everything lines up to these:

| Slot | Columns | Used for |
|---|---|---|
| A | 1–3 | Labels: "Overview", "Process", step text column starts here |
| B | 4–6 | Second info column |
| C | 7–9 | Body text, intros |
| D | 10–12 | Meta, availability, context |

Common wider spans: 1–6 / 7–12 (halves), 1–8 + 9–12 (title + number), 1–4 + 5–12 (label/text + image).

### Sheet

```
┌ running head: Name | Section | Detail | Grid toggle / (page no.) ┐
│                                                                   │
│  content on the 12-column grid                                    │
│                                                                   │
└ running foot: detail | detail | detail | (page no.)               ┘
```

- A sheet is at least one screen tall (`min-height: 100svh`); long sheets (`.auto`) grow with their content.
- Running head and foot sit in the four slots (columns 1, 4, 7, 10), in 11px medium.
- Page numbers are in brackets: home sheets (001)–(005), case study sheets (04.1), (04.2)…
- The last sheet of every page is inverse (black), for contact or the next project.

### Home page — five sheets

1. **(001) Cover**: name as display type (cols 1–8) with "(001)" (cols 9–12); four discipline labels in the four slots; latest work as a full-width image; intro (1–6), study (7–9), availability (10–12).
2. **(002) Index**: every project as a row: no. (col 1), title (2–6), discipline (7–9), context and year (10–12).
3. **(003) Work**: three tiers with fixed image ratios so every row is even:
   - Featured: 2 per row, 6 columns each, 3:2
   - Film, motion and type: 3 per row, 4 columns each, 4:3
   - Studies: 4 per row, 3 columns each, 1:1
4. **(004) Profile**: heading (1–6), statement (7–12), then Education / Experience / Tools / Languages in the four slots.
5. **(005) Contact**: inverse; availability line and the email set as display type.

### Case study page — up to six sheets

1. **Cover**: title, project number, subtitle, meta list (Year, Discipline, Context, Tools, Credits), hero.
   - *Wide hero* (landscape work): title 1–8, number 9–12, subtitle 1–6, meta 7–12, hero full width.
   - *Tall hero* (portrait work, vertical film): number and title top-left, subtitle and meta bottom-left (1–6), hero 7–12.
2. **Overview**: label (1–4), one-sentence summary as lead text (5–12), then Brief (5–8) and Approach (9–12).
3. **Process**: numbered steps. Step number, title and one or two sentences in 1–4 (sticky while you scroll), images in 5–12. One image fills 5–12; two or three share it equally.
4. **Outcome**: the finished work in rows. 1 image = 12 cols, 2 = 6+6, 3 = 4+4+4, 4 = 3+3+3+3. Images are never cropped here.
5. **Reflection** (only when there is one): label (1–4), text (5–12).
6. **Next**: inverse sheet linking to the next case study, with its thumbnail (7–12) and title as display type.

---

## 2. Typography

One family, Helvetica Neue (fallback Helvetica, Arial). Weights: 400 and 500 only.

| Style | Size / line height | Weight | Tracking | Used for |
|---|---|---|---|---|
| Display | clamp(52px, 9vw, 156px) / 0.9 | 500 | −0.045em | Name, project titles, (numbers), email |
| H2 | clamp(28px, 3.4vw, 52px) / 1.0 | 500 | −0.03em | Sheet headings: Index, Featured, Process |
| Lead | clamp(22px, 2.1vw, 34px) / 1.12 | 400 | −0.02em | Subtitles, summaries, step titles |
| Body | 15px / 21px | 400 | 0 | Paragraphs, lists |
| Micro | 11px / 14px | 500 | +0.01em | Running heads, labels, captions, numbers |

Rules:
- Text is always full ink: hierarchy comes from size and weight, never from grey or opacity.
- Numbers use tabular figures and brackets: (001), (04), 04/14.
- Body text never runs wider than one slot pair (6 columns).
- Sentence case everywhere; no all-caps.

---

## 3. Colour

| Token | Value | Role |
|---|---|---|
| `--paper` | #ffffff | Background |
| `--ink` | #111111 | All text, inverse sheets |
| `--accent` | #293785 | Hover, links, focus, selection, grid overlay |
| `--accent-2` | #496da2 | Hover on inverse (black) sheets |
| `--frame` | #f1f1ef | Behind images that do not fill their cell |

Black and white carry the page; blue appears only on interaction.

---

## 4. Images and motion

- Thumbnails crop to their tier's ratio (3:2, 4:3, 1:1). Case study images keep their own proportions.
- Captions sit 8px below the image in micro type.
- Films are muted, loop, and play only while on screen; controls stay visible.
- Sections fade up 16px on first view; nothing moves if the visitor prefers reduced motion. Thumbnails scale 2.5% on hover.

---

## 5. Text voice

- Plain, short sentences. One idea per sentence.
- Every project has: a one-line subtitle, a one-sentence summary, a brief (the problem), an approach (how), and steps of one or two sentences each.
- Credit collaborators and sources in the meta list (Photography, Text, Sound).
- No claims of results that cannot be shown.

---

## 6. Projects

| No. | Project | Discipline | Year | Context | Tier |
|---|---|---|---|---|---|
| 01 | Wander | Book design | 2026 | Editorial design | Featured |
| 02 | Snippets | Visual systems | 2026 | Visual Systems, Yonsei University | Featured |
| 03 | Distort Noise | App design, UX/UI | 2026 | — | Featured |
| 04 | TIME | Editorial, UX/UI | 2025 | Communicating with Type | Featured |
| 05 | Silence of the Dawn | Documentary film | 2025 | — | Film, motion and type |
| 06 | Dust | Motion graphics, editorial | 2025 | — | Film, motion and type |
| 07 | Fly Me to the Moon | Expressive typography, motion | 2025 | Communicating with Type | Film, motion and type |
| 08 | Baskerville | Typography, poster, book cover | 2025 | Communicating with Type | Film, motion and type |
| 09 | RunwAI | AI, film, editorial | 2025 | — | Film, motion and type |
| 10 | Gazebo | Image-making, motion | 2025 | — | Film, motion and type |
| 11 | Digital Tools | Motion, 3D, interactive | 2025 | Introduction to Digital Tools | Studies |
| 12 | Colour Design | Colour, painting | 2025 | Colour Design | Studies |
| 13 | Drawing | Drawing | 2025 | Basic Drawing | Studies |
| 14 | Illustration | Illustration | 2025 | Illustration for Designers, NTU ADM | Studies |
| 15 | VESSEL | Interactive AI installation | — | Yonsei exhibition | Index only (no images yet) |

Left out on purpose: ARTFORUM (magazine, app and cover illustration).

---

## 7. Files

```
index.html              home (five sheets)
work/<project>.html     one case study per project
css/site.css            the whole system: tokens, grid, type, components
js/site.js              grid overlay, fade-in, autoplay films
rmedia/                 images (≤1800px) and films
DESIGN.md               this file
```

To add a project: copy a page in `work/`, change the text and images, add a card to the right tier in `index.html` (sheet 003) and a row to the Index (sheet 002).
