# CLAUDE.md — Yenlik Abdissattar Portfolio

This file is the source of truth for Claude Code when working on this portfolio. Read it fully before editing any file.

---

## 0. Project overview

**Designer:** Yenlik Abdissattar
**Audience:** headhunters and creative directors
**Purpose:** curated visual archive — work is always the focus, UI disappears
**Repo:** https://github.com/yenlikabdissattar/yenlik.abdissattar
**Live media:** hosted on Cloudinary (`res.cloudinary.com/dnarrwa1m/...`)
**Feel:** museum archive · editorial · magazine · cinematic · airy · curated · **subtly futuristic**

---

## 1. Operating rules — read before every edit

1. **Only build what is explicitly requested.** Do not add sections, features, animations, or interactions not listed in this document.
2. **Ask before restructuring** files or folders.
3. **Do not refactor existing code** unless asked.
4. **Do not invent content.** Use only the project copy in section 7 of this file or in the YENA Google Doc.
5. **Keep all files editable and clean.** Comment HTML and CSS clearly.
6. **No CSS frameworks, no utility classes, no inline styles, no build tools, no libraries.**
7. **Before every session, confirm:**
   - Which file(s) you are editing
   - Current file structure
   - That image / video URLs are Cloudinary (not local) unless explicitly told otherwise
8. **Every decision must serve a professional portfolio audience.** When in doubt, choose less, quieter, and more spaced out.

---

## 2. Stack

- Plain HTML and CSS only
- Vanilla JavaScript ONLY for:
  - Nav toggle (open/close)
  - Smooth scroll
  - Blind contour balloon-drift animation on landing
  - Slide cycles (postcards carousel, gouache slide-through, colour design preview)
  - Hover glow trigger
- **NO** frameworks, libraries, Tailwind, utility classes, inline styles, build tools, bundlers
- **NO** PDFs anywhere, ever — images and video only

---

## 3. File structure

```
index.html
style.css
script.js
/projects
  film-fly-me-to-the-moon.html
  film-gazebo.html
  film-silence-of-the-dawn.html
  film-dust.html
  film-runwai.html         ← will be re-categorised as AI but file stays here for now
  editorial-artforum.html
  editorial-time.html
  editorial-baskerville.html
  editorial-9panels.html
  editorial-postcards.html
  art-portrait.html
  art-composition-form.html
  art-colour-studies.html
  art-perspective.html     ← keep file, remove from main page tiles
  art-blackandwhite.html   ← keep file, remove from main page tiles
  colour-design.html       ← shows all 12 colour works
  illustration-artforum-cover.html
  illustration-postcards.html
  illustration-gouache.html
```

Do NOT create new files without asking. Do NOT rename existing files without asking.

---

## 4. Typography

### Fonts
- **Bodoni** → page titles, project titles, category labels, landing name, blockquotes
- **Gill Sans** → everything else: body, descriptions, captions, nav links, meta info, contact

### CSS stacks (use exactly these)
```css
/* Titles + quotes */
font-family: 'Bodoni Moda', 'Bodoni 72', Bodoni, Didot, serif;

/* Everything else */
font-family: 'Gill Sans', 'Gill Sans MT', Calibri, sans-serif;
```

Load Bodoni Moda from Google Fonts (one weight, e.g. 400 or 500). Gill Sans uses system fallback — do not load it from any web font source.

### Hierarchy rules
- **Karch-style:** mostly SMALL or mostly BIG. Almost nothing medium.
- **Only quotes are italic.** Nothing else is italic anywhere on the site.
- Body line-height: ~1.7
- Captions / meta (year, tools): small, light gray `#9A9A9A`

---

## 5. Color palette

| Use | Value |
|---|---|
| Default background | `#FAFAF8` |
| Art & Colour Design sections / pages background | `#FFFFFF` (pure white) |
| Primary text | `#1A1A1A` |
| Light gray text | `#9A9A9A` |
| Placeholder gray | `#EBEBEB` |
| Nav panel background | `rgba(255, 255, 255, 0.97)` |
| Page overlay behind nav | `rgba(0, 0, 0, 0.3)` |
| Hover glow | `box-shadow: 0 8px 32px rgba(200,200,210,0.45), 0 0 24px rgba(255,255,255,0.6);` |

**No accents, no color blocks, no borders, no gradients (except the subtle glow above).**

---

## 6. Layout — `index.html`

### Section order (single scrollable page)
1. `#landing` — blind contours
2. `#projects` — six categories, continuous scroll
3. `#contact`

**Spacing between categories:** ~50vh of whitespace (medium breathing room).

### Landing
- Full viewport height, `#FAFAF8` background
- 15 blind contour images drift slowly + randomly across the screen like **balloons**:
  - Each image has a random start position, random slow velocity (e.g. 10–30 px/sec range), gentle rotation
  - Animation loops continuously
  - On scroll past landing, contours fade out smoothly
- Bottom-left caption: `under three minutes blind contours` — Gill Sans, small, `#9A9A9A`
- Top-right: `Yenlik Abdissattar` — Bodoni, small, `#1A1A1A`, static position
- No other elements on landing

### Navigation
- Three-line `≡` icon top-left, fixed, always visible while scrolling
- Small "Menu" label in Gill Sans next to icon
- **Click only** to open (NOT hover)
- Panel slides in from left, overlays content (does NOT push page)
- Semi-transparent dark overlay covers rest of page behind panel
- Click outside panel OR press Esc → closes
- CSS transition: 0.35s ease

#### Panel contents (exact structure)
```
Yenlik Abdissattar
──────────────────
Home

Film & Motion Graphics
  Fly Me to the Moon
  Gazebo
  Silence of the Dawn
  DUST

AI
  RunwAI — Fashion Show

Editorial Design
  Artforum — Bad Habits
  TIME — Architecture Issue
  Baskerville Typography Study
  9 Panels (Aaron Siskind)
  Postcards

Art & Sketching
  Portrait
  Composition & Form
  Colour Studies

Colour Design
  (single link to colour-design.html)

Illustration
  Artforum Cover Illustration
  Postcard Illustrations
  Gouache Works

Contact
```

- Category labels: Bodoni, small caps or letter-spaced, light gray
- Project links: Gill Sans, regular weight, dark
- No bullets, no icons, just clean vertical list with spacing

### Contact
Bottom of page. Whitespace separator only (no border, no line).

```
Yenlik Abdissattar

Email      yenlik.abdissattar@gmail.com
Instagram  kllneiy
LinkedIn   —
```

Gill Sans throughout, no icons.

---

## 7. Project categories — main page tiles

### Category 1 — Film & Motion Graphics (4 tiles)
**Layout:** 2-column grid
**Behavior:** ALL videos autoplay muted looped (`autoplay muted loop playsinline`) on home page
**Tiles in this order:**
1. Fly Me to the Moon
2. Gazebo
3. Silence of the Dawn
4. DUST

⚠️ RunwAI is NO LONGER in this category. Remove it.

### Category 2 — AI (1 tile, full-width hero)
**Layout:** Single full-width video block (not a grid)
**Tile:**
1. RunwAI — Fashion Show (autoplay muted loop hero video)

### Category 3 — Editorial Design (5 tiles)
**Layout:** 3-column grid, **smaller tiles than other categories** so spreads don't need to be huge
**Tiles in this order:**
1. Artforum — Bad Habits
2. TIME — Architecture Issue
3. Baskerville Typography Study
4. 9 Panels (Aaron Siskind)
5. Postcards

### Category 4 — Art & Sketching (3 tiles)
**Layout:** 3-column grid
**Background:** pure white `#FFFFFF` for the entire section
**Tiles:**
1. Portrait
2. Composition & Form *(preview image = the final Black & White composition)*
3. Colour Studies *(mono / comp / real — combined into one tile)*

⚠️ Remove standalone **Perspective** tile from main page (the detail page stays, but no tile).
⚠️ Remove standalone **Black & White** tile from main page (B&W IS the Composition preview).

### Category 5 — Colour Design (6 tiles)
**Layout:** 3-column sub-grid
**Background:** pure white `#FFFFFF` for the section
**Tiles in this order:**
1. Colour Wheel
2. Colour Chart
3. Visual Memory
4. Colour Cube
5. Colour Harmony
6. Colour Psychology

All 6 link to `colour-design.html` (which contains all 12 works). Do not create per-study HTML files.

⚠️ Do not include empty / filler colour studies on the main page.

### Category 6 — Illustration (3 tiles)
**Layout:** 3-column grid
**Tiles:**
1. **Artforum Cover Illustration** — static image
2. **Postcard Illustrations** — simple horizontal carousel with slight 3D depth, 5 postcards, auto-advance every 3 seconds
3. **Gouache Works** — slide one after another (WALL-E → Mounts → Sushi), auto-advance

---

## 8. Tile rules (apply to EVERY preview tile)

- **Use real proportions of the work.** Do NOT crop to uniform square. No `object-fit: cover` that crops content.
- Drop shadow on every tile by default (resting state)
- On hover:
  - Tile lifts slightly (`transform: translateY(-4px)`)
  - Heavier shadow
  - Soft white/silver glow (see color palette)
  - Smooth transition (~0.3s ease)
- Whole tile is clickable → links to project detail page
- Tile contents:
  - Image or video
  - Title — Bodoni, small
  - One-line description — Gill Sans, light gray `#9A9A9A`, smaller
- Art & Sketching section: title only, no description

---

## 9. Project detail pages — template

Every project lives at `/projects/[slug].html`.

### Shared header
- Same hamburger nav as `index.html`
- Back link top-left below nav: `← Back` in Gill Sans → links to `index.html#projects`

### Layout
Single column, max-width ~800px, centered, generous margins.

### Field order (use exactly this)
```
[Category — Bodoni, small caps, light gray]

[Title — Bodoni, large, light weight]

[Year] · [Category]   — Gill Sans, small

Overview
[2–4 sentences — Gill Sans]

Tools
[comma-separated — Gill Sans]

Process
[paragraph — Gill Sans]

Problems
[paragraph — Gill Sans]

Reflections
[paragraph — Gill Sans]

Final Outcome
[paragraph or placeholder]

Images / Video
[grid or full-width — NO PDFs ever]
```

### Media rules
- Images: `<img>` in 2-column grid or full-width
- Videos: `<video controls>` tag
- **No PDFs anywhere, ever**
- Placeholders: light gray block `#EBEBEB` with small centered label `[image]` or `[video]`

---

## 10. Existing project copy

Use this copy exactly. Do not rewrite, summarise, or paraphrase. Source: YENA Google Doc.

### Fly Me to the Moon
- **Category:** Film & Motion Graphics
- **Year:** 2025
- **Tools:** Adobe After Effects, Adobe Illustrator
- **Process:** This project translates a six-panel visual structure into a time-based motion narrative. Beginning with storyboard development, each panel was reinterpreted as a sequential scene with its own pacing and visual identity. Assets were designed in Illustrator and animated in After Effects, with a focus on rhythm, continuity, and controlled transitions to maintain narrative cohesion across frames.
- **Problems:** A key challenge was balancing continuity with fragmentation — ensuring each panel remained distinct while contributing to a unified motion flow. Achieving consistent timing and emotional pacing required multiple iterations, particularly in refining transitions and easing.
- **Reflections:** This project reinforced my understanding of motion as a narrative tool. It highlighted the importance of timing, structure, and visual hierarchy in guiding user perception, and strengthened my ability to translate static compositions into dynamic sequences.

### Gazebo
- **Category:** Film & Motion Graphics
- **Year:** 2025
- **Tools:** Adobe Illustrator, Adobe Photoshop
- **Process:** This project explores narrative construction through found imagery. Using a collection of thrifted photographs taken in Singapore, I developed a visual system centered around the concept of a "gazebo" as a symbolic space of convergence. Through layering, cropping, and compositional manipulation, disparate images were recontextualized into a cohesive visual narrative.
- **Problems:** The primary difficulty lay in reconciling inconsistencies across the source material — variations in lighting, scale, and perspective disrupted visual harmony. Establishing cohesion without over-processing the images required precise compositional decisions.
- **Reflections:** This work expanded my approach to storytelling by embracing randomness as a generative tool. It deepened my understanding of composition as a means of meaning-making and demonstrated how constraints can drive more intentional design outcomes.

### Silence of the Dawn
- **Category:** Film & Motion Graphics
- **Year:** 2025
- **Tools:** Adobe Premiere Pro, Audacity
- **Process:** An observational film capturing the transitional stillness of Singapore at dawn. Filming took place during early morning hours, focusing on quiet urban landscapes, subtle motion, and ambient sound. The editing process prioritized restraint — long takes, minimal cuts, and careful sound design — to preserve the authenticity of the environment and evoke a contemplative atmosphere.
- **Problems:** Working within a minimal visual context presented challenges in maintaining engagement without relying on overt action. Balancing and preserving natural audio while ensuring clarity required detailed post-production adjustments.
- **Reflections:** This project refined my sensitivity to pacing, atmosphere, and sound as integral components of visual storytelling. It emphasized the value of observation and restraint, and strengthened my ability to communicate emotion through subtle, immersive experiences.

### DUST
- **Category:** Film & Motion Graphics
- **Year:** 2025
- **Tools:** (to fill)
- **Process:** (to fill)
- **Problems:** (to fill)
- **Reflections:** (to fill)

### RunwAI — Fashion Show
- **Category:** AI
- **Year:** 2025
- **Tools:** ComfyUI, AI Image/Video Generation, Adobe Premiere Pro, Adobe Illustrator
- **Process:** RunwAI explores the intersection of fashion, AI generation, and cinematic storytelling. The project began with designing garments conceptually, which were then translated into AI-generated visuals through a structured pipeline using ComfyUI. A LoRA-based workflow was developed to maintain stylistic consistency across outputs, allowing for controlled generation of models, outfits, and environments. These outputs were curated and sequenced into a runway-style video, emphasizing movement, lighting, and atmosphere. In parallel, poster designs were created to extend the project into a magazine/editorial format, reinforcing the identity of RunwAI as both a fashion brand and a visual publication.
- **Problems:** One of the main challenges was achieving consistency across AI-generated outputs. Variations in faces, garments, and lighting required careful prompt control and iterative refinement. Translating still AI images into a cohesive cinematic sequence was difficult, as motion had to be simulated through editing rather than captured directly. Managing rendering time and workflow complexity within ComfyUI also required optimization.
- **Reflections:** This project expanded my understanding of AI as a design tool rather than just a generator. I learned how to build structured workflows that allow for creative control within generative systems. It also reinforced my interest in fashion, editorial design, and visual storytelling, positioning RunwAI as a foundation for future work in AI-driven creative direction.

### Artforum — Bad Habits
- **Category:** Editorial Design
- **Year:** 2025
- **Tools:** Adobe Illustrator, Adobe Photoshop
- **Process:** Explored a more experimental layout approach, focusing on image-text relationships, spacing, and visual tension inspired by contemporary art publications.
- **Problems:** Balancing experimentation with readability was difficult. Some layouts became visually strong but less functional, requiring refinement.
- **Reflections:** Learned how to push design boundaries while maintaining intention, and how spacing and composition can carry conceptual meaning.

### TIME — Architecture Issue
- **Category:** Editorial Design
- **Year:** 2025
- **Tools:** Adobe Illustrator, Adobe Photoshop
- **Process:** Built on a structured grid system focusing on clarity and readability. Developed consistent typographic hierarchy across spreads, aligning text and image for smooth information flow.
- **Problems:** Maintaining consistency across multiple pages was challenging, especially with margins, spacing, and hierarchy. Small misalignments disrupted the overall system.
- **Reflections:** Strengthened my ability to work within strict design systems and improved my understanding of editorial hierarchy and clarity.

### Baskerville Typography Study
- **Category:** Editorial Design
- **Year:** 2025
- **Tools:** Adobe Illustrator, Adobe Photoshop
- **Process:** Analyzed Baskerville's structure and characteristics, then translated them into a poster and book cover, focusing on contrast, elegance, and typographic composition.
- **Problems:** Capturing the essence of the typeface without overcomplicating the design was challenging. Maintaining balance between form and readability required careful control.
- **Reflections:** Developed a deeper appreciation for typography as both a historical and expressive tool, not just a functional element.

### 9 Panels (Aaron Siskind)
- **Category:** Editorial Design
- **Year:** 2025
- **Tools:** Adobe Illustrator, Adobe Photoshop
- **Process:** Combined selected text with Aaron Siskind's photography into a 9-panel grid, focusing on sequencing, rhythm, and conceptual alignment between image and text.
- **Problems:** Ensuring a clear narrative across all panels was difficult. Some combinations felt disconnected and required reordering and refinement.
- **Reflections:** Improved my understanding of visual storytelling and how structure (grid) can organize meaning across multiple elements.

### Composition & Form Studies
- **Category:** Art & Sketching
- **Year:** 2025
- **Tools:** Gouache
- **Process:** This series focuses on understanding composition through reduction, contrast, and spatial relationships. Beginning with sketch-based planning, compositions were developed by simplifying real-world forms into geometric structures. The primary focus was on the interaction between positive and negative space, using high-contrast black and white to eliminate distraction and emphasize balance, rhythm, and hierarchy.
- **Problems:** A major challenge was achieving balance within highly reduced compositions. Removing detail made every shape and proportion more critical, where small misalignments disrupted the entire structure. Controlling negative space was particularly difficult, as empty areas often became visually dominant or unintentional focal points.
- **Reflections:** This project strengthened my understanding of composition as a foundational design principle. It emphasized how space, rather than form alone, defines visual structure.

### Colour Design (umbrella page)
- **Category:** Colour Design
- **Year:** 2025
- **Tools:** Gouache, KC195 Paper, Procreate
- **Process:** This body of work explores colour as both a technical system and a perceptual experience. The process began with foundational exercises — colour wheels, value studies, and mixing charts — to build precision in hue, saturation, and value control. Subsequent projects focused on more complex relationships, including harmony, contrast, and contextual perception.
- **Problems:** Achieving consistency in colour mixing with gouache, where pigment behavior shifts when drying. Translating physical colour accuracy into digital formats introduced discrepancies, requiring calibration between mediums.
- **Reflections:** Shifted my understanding of colour from a decorative element to a structural tool in design.
- **Works:** Colour Wheel 1.0 · Colour Chart · Visual Memory · Different Hue, Same Value · Colour Cube · Refinement Colour Mixing · Colour Mixing · Ground Subtraction · Colour Psychology · Colour Analysis Application 1 · Colour Analysis Application 2 · Colour Harmony

### Illustration & Image-Making (umbrella)
- **Category:** Illustration
- **Year:** 2025
- **Tools:** Procreate, Gouache
- **Process:** This body of work explores illustration across digital and analog mediums, focusing on composition, texture, and narrative tone. The Artforum cover project emphasizes conceptual image-making. The postcard series, centered around the theme of "life," captures everyday moments through simplified forms. The gouache works focus on materiality and texture.
- **Problems:** Maintaining consistency across different mediums. Translating digital precision from Procreate into the unpredictability of gouache required adaptation.
- **Reflections:** Strengthened my ability to move fluidly between digital and physical illustration processes.

---

## 11. Cloudinary media URLs (use these exactly)

### Blind contour (landing) — 15 images
```
https://res.cloudinary.com/dnarrwa1m/image/upload/q_auto/f_auto/v1776410114/blind_contours-01_qpbguf.jpg
https://res.cloudinary.com/dnarrwa1m/image/upload/q_auto/f_auto/v1776410113/blind_contours-02_pv2put.jpg
https://res.cloudinary.com/dnarrwa1m/image/upload/q_auto/f_auto/v1776410113/blind_contours-03_vm8zv8.jpg
https://res.cloudinary.com/dnarrwa1m/image/upload/q_auto/f_auto/v1776410111/blind_contours-04_vgjvml.jpg
https://res.cloudinary.com/dnarrwa1m/image/upload/q_auto/f_auto/v1776410111/blind_contours-05_pdj8i8.jpg
https://res.cloudinary.com/dnarrwa1m/image/upload/q_auto/f_auto/v1776410113/blind_contours-06_jk2r81.jpg
https://res.cloudinary.com/dnarrwa1m/image/upload/q_auto/f_auto/v1776410112/blind_contours-07_x3c5nu.jpg
https://res.cloudinary.com/dnarrwa1m/image/upload/q_auto/f_auto/v1776410111/blind_contours-08_krxrue.jpg
https://res.cloudinary.com/dnarrwa1m/image/upload/q_auto/f_auto/v1776410111/blind_contours-09_uv7hus.jpg
https://res.cloudinary.com/dnarrwa1m/image/upload/q_auto/f_auto/v1776410111/blind_contours-10_qbxzzg.jpg
https://res.cloudinary.com/dnarrwa1m/image/upload/q_auto/f_auto/v1776410113/blind_contours-11_hwfhhm.jpg
https://res.cloudinary.com/dnarrwa1m/image/upload/q_auto/f_auto/v1776410113/blind_contours-12_zikmxk.jpg
https://res.cloudinary.com/dnarrwa1m/image/upload/q_auto/f_auto/v1776410113/blind_contours-13_ztt1ur.jpg
https://res.cloudinary.com/dnarrwa1m/image/upload/q_auto/f_auto/v1776410114/blind_contours-14_ivmnyk.jpg
https://res.cloudinary.com/dnarrwa1m/image/upload/q_auto/f_auto/v1776410114/blind_contours-15_yfouj8.jpg
```

### Film & Motion Graphics
```
Fly Me to the Moon:   https://res.cloudinary.com/dnarrwa1m/video/upload/v1776410130/flymetothemoon_motion_graphic_hpzo92.mp4
Gazebo:               https://res.cloudinary.com/dnarrwa1m/video/upload/v1776411045/GAZEBO_motion_graphics_kxnegm.mp4
Silence of the Dawn:  https://res.cloudinary.com/dnarrwa1m/video/upload/v1776410976/silence_of_the_dawn_final_documentary_filmmaking_2025-2_Yenlik_Abdissattar_sy74ak.mp4
DUST:                 https://res.cloudinary.com/dnarrwa1m/video/upload/v1776410298/DUST_motion_graphics_wxet73.mp4
```

### AI
```
RunwAI video:         https://res.cloudinary.com/dnarrwa1m/video/upload/v1776410142/RunwAI_video_bmvjat.mp4
RunwAI process:       https://res.cloudinary.com/dnarrwa1m/video/upload/v1776410134/RunwAI_fashion_show__Yenlik_Abdissattar_Process_gyivhe.mp4
RunwAI Magazine Cover: https://res.cloudinary.com/dnarrwa1m/image/upload/v1776410109/RunwAI_Magazine_Poster_cover_bgdixg.jpg
RunwAI Magazine p1:   https://res.cloudinary.com/dnarrwa1m/image/upload/v1776410109/RunwAI_Magazine_pg1_sgmawm.jpg
RunwAI Magazine p2:   https://res.cloudinary.com/dnarrwa1m/image/upload/v1776410109/RunwAI_Magazine_pg2_zrxizc.jpg
RunwAI Magazine p3:   https://res.cloudinary.com/dnarrwa1m/image/upload/v1776410109/RunwAI_Magazine_pg3_ttjszd.jpg
```

### Editorial — Artforum
```
Cover:    https://res.cloudinary.com/dnarrwa1m/image/upload/v1776410108/ARTFORUM_Cover_page_re6d6f.png
P1:       https://res.cloudinary.com/dnarrwa1m/image/upload/v1776410108/ARTFORUM_P1_mxbexj.png
P2:       https://res.cloudinary.com/dnarrwa1m/image/upload/v1776410107/ARTFORUM_P2_dxwhyy.png
P3:       https://res.cloudinary.com/dnarrwa1m/image/upload/v1776410106/ARTFORUM_P3_c4c7tb.png
P4:       https://res.cloudinary.com/dnarrwa1m/image/upload/v1776410108/ARTFORUM_P4_izhyc6.png
P5:       https://res.cloudinary.com/dnarrwa1m/image/upload/v1776410108/ARTFORUM_P5_ofwt7c.png
P6:       https://res.cloudinary.com/dnarrwa1m/image/upload/v1776410108/ARTFORUM_P6_aeitwq.png
Mockup cover+p1-2: https://res.cloudinary.com/dnarrwa1m/image/upload/v1776410121/ARTFORUM_mock_up_cover_and_p1_2_ovbz0b.png
Mockup cover+p3-4: https://res.cloudinary.com/dnarrwa1m/image/upload/v1776410119/ARTFORUM_mock_up_cover_and_p3-4_olgqfk.png
Mockup cover+p5-6: https://res.cloudinary.com/dnarrwa1m/image/upload/v1776410123/ARTFORUM_mock_up_cover_and_p5-6_yisuij.png
```

### Editorial — TIME
```
Cover:    https://res.cloudinary.com/dnarrwa1m/image/upload/v1776410107/TIMES_Cover_i4sa3m.jpg
P1:       https://res.cloudinary.com/dnarrwa1m/image/upload/v1776410119/TIME_P1_ius51a.jpg
P2:       https://res.cloudinary.com/dnarrwa1m/image/upload/v1776410119/TIME_P2_gvivxx.jpg
P3:       https://res.cloudinary.com/dnarrwa1m/image/upload/v1776410119/TIME_P3_gehxkx.jpg
P4:       https://res.cloudinary.com/dnarrwa1m/image/upload/v1776410125/TIME_P4_ck7sao.jpg
P5:       https://res.cloudinary.com/dnarrwa1m/image/upload/v1776410124/TIME_P5_ds68go.jpg
P6:       https://res.cloudinary.com/dnarrwa1m/image/upload/v1776410126/TIME_P6_dq36np.jpg
Mockup cover+p1-2: https://res.cloudinary.com/dnarrwa1m/image/upload/v1776410108/TIME_mockup_cover_and_p1-2_hqb730.jpg
Mockup cover+p3-4: https://res.cloudinary.com/dnarrwa1m/image/upload/v1776410107/TIME_mockup_cover_and_p3-4_yaozyn.jpg
Mockup cover+p5-6: https://res.cloudinary.com/dnarrwa1m/image/upload/v1776410107/TIME_mockup_cover_and_p5-6_pxlgwu.jpg
```

### Editorial — Baskerville
```
Poster:           https://res.cloudinary.com/dnarrwa1m/image/upload/v1776410106/Baskerville_Poster_kjpugh.jpg
Poster mockup:    https://res.cloudinary.com/dnarrwa1m/image/upload/v1776410106/baskerville_poster_mockup_dv2nyi.jpg
Book cover:       https://res.cloudinary.com/dnarrwa1m/image/upload/v1776410107/Baskerville_Book_Cover_in1ibs.jpg
Book cover mockup: https://res.cloudinary.com/dnarrwa1m/image/upload/v1776410107/baskerville_book_cover_mockup_i946x5.jpg
```

### Art — Composition & Perspective
```
Composition 1 sketch:                    https://res.cloudinary.com/dnarrwa1m/image/upload/v1776410131/Composition_1_sketch_p8hbug.jpg
Composition 1 negative/positive space:   https://res.cloudinary.com/dnarrwa1m/image/upload/v1776410109/Composition_1_negative_and_posticespace_arulam.jpg
Perspective study 1:  https://res.cloudinary.com/dnarrwa1m/image/upload/v1776410109/Perspective_study1_cylwm2.jpg
Perspective study 2:  https://res.cloudinary.com/dnarrwa1m/image/upload/v1776410109/Perspective_study2_mwccym.jpg
Perspective study 3:  https://res.cloudinary.com/dnarrwa1m/image/upload/v1776410109/Perspective_study3_h5damj.jpg
```

### Colour Design (12 works)
```
Colour Wheel 1.0:               https://res.cloudinary.com/dnarrwa1m/image/upload/q_auto/f_auto/v1776410130/Colour_Wheel_1.0_zfc250.png
Colour Chart:                   https://res.cloudinary.com/dnarrwa1m/image/upload/q_auto/f_auto/v1776410115/Colour_Chart_cebeul.jpg
Visual Memory:                  https://res.cloudinary.com/dnarrwa1m/image/upload/q_auto/f_auto/v1776410118/Visual_Memory_ipohi3.png
Different Hue, Same Value:      https://res.cloudinary.com/dnarrwa1m/image/upload/q_auto/f_auto/v1776410116/Different_Hue_Same_Value_xdckah.png
Colour Cube:                    https://res.cloudinary.com/dnarrwa1m/image/upload/q_auto/f_auto/v1776410124/Colour_Cube_abxmgl.png
Refinement (original cat):      https://res.cloudinary.com/dnarrwa1m/image/upload/q_auto/f_auto/v1776410116/refinement_colours_guache_original_the_cat_dvce8a.png
Refinement (monochrome):        https://res.cloudinary.com/dnarrwa1m/image/upload/q_auto/f_auto/v1776410115/refinement_colours_guache_the_cat_monochrome_jnaxvl.png
Refinement (complementary):     https://res.cloudinary.com/dnarrwa1m/image/upload/q_auto/f_auto/v1776410117/refinement_colours_guache_the_cat_complimentary_colours_wcirgn.png
Colour Mixing:                  https://res.cloudinary.com/dnarrwa1m/image/upload/q_auto/f_auto/v1776410124/Colour_Mixing_snhdrx.png
Ground Subtraction:             https://res.cloudinary.com/dnarrwa1m/image/upload/v1776410122/Ground_Subtraction_iy2sev.png
Colour Psychology:              https://res.cloudinary.com/dnarrwa1m/image/upload/q_auto/f_auto/v1776410116/Colour_Phsycology_hlg1gl.png
Colour Analysis Application 1:  https://res.cloudinary.com/dnarrwa1m/image/upload/q_auto/f_auto/v1776410119/Colour_Analysis_application1_fffq6w.png
Colour Analysis Application 2:  https://res.cloudinary.com/dnarrwa1m/image/upload/q_auto/f_auto/v1776410116/Colour_Analysis_application2_aoh2jk.png
Colour Harmony:                 https://res.cloudinary.com/dnarrwa1m/image/upload/q_auto/f_auto/v1776410116/Colour_Harmony_qqxuzy.png
```

### Illustration
```
Artforum cover illustration:  https://res.cloudinary.com/dnarrwa1m/image/upload/v1776410132/artforum_cover_illustration_design_l0zsav.jpg
Postcard 1:  https://res.cloudinary.com/dnarrwa1m/image/upload/v1776410115/POSTCARD_ILLUSTRATION_1_enfxxv.jpg
Postcard 2:  https://res.cloudinary.com/dnarrwa1m/image/upload/v1776410114/POSTCARD_ILLUSTRATION_2_nrwmtl.jpg
Postcard 3:  https://res.cloudinary.com/dnarrwa1m/image/upload/v1776410114/POSTCARD_ILLUSTRATION_3_ood1hh.jpg
Postcard 4:  https://res.cloudinary.com/dnarrwa1m/image/upload/v1776410115/POSTCARD_ILLUSTRATION_4_b2nxgh.jpg
Postcard 5:  https://res.cloudinary.com/dnarrwa1m/image/upload/v1776410115/POSTCARD_ILLUSTRATION_5_u7julc.jpg
WALL-E (gouache):  https://res.cloudinary.com/dnarrwa1m/image/upload/v1776410121/WALL-E_guache_zwm80m.jpg
Mounts (gouache):  https://res.cloudinary.com/dnarrwa1m/image/upload/v1776410121/Landscape_guache_twrbaq.jpg
Sushi (gouache):   https://res.cloudinary.com/dnarrwa1m/image/upload/v1776410121/Sushi_Guache_lnqclz.jpg
```

---

## 12. Current state of the repo (as of this writing)

The site is partially built. These items match the spec:
- Hamburger nav with categories + Home link
- Landing has 15 blind contours + caption + name
- Film section has 5 videos (currently includes RunwAI — needs to be removed from here)
- Editorial section has 5 tiles
- Contact section with email + Instagram

These items DO NOT match the spec and need fixing (see section 13):

---

## 13. Implementation deltas — fixes to apply

When Claude Code is asked to update the site, these are the gaps between the current repo and the spec. Each is a separate task — ask which to do first before making edits.

1. **Move RunwAI out of Film & Motion Graphics → into a new AI category section.**
   AI section = full-width hero video, not a grid.

2. **Add Bodoni Moda from Google Fonts** to `<head>` of `index.html` and every project page.
   Update `style.css` font stacks per section 4.

3. **Add hover glow** to `.project-card`:
   - Default: subtle drop shadow
   - Hover: `transform: translateY(-4px)`, heavier shadow, soft white/silver glow, ~0.3s ease transition

4. **Increase vertical spacing** between `.category-divider` blocks to ~50vh.

5. **Verify tile aspect ratios** — remove any `object-fit: cover` that crops images. Tiles should use the natural proportions of the work.

6. **Expand Colour Design** on main page from 1 cycling tile → 3-column sub-grid of 6 tiles (Wheel, Chart, Visual Memory, Cube, Harmony, Psychology), white background for the section.

7. **Restructure Art & Sketching** to exactly 3 tiles: Portrait, Composition & Form (B&W preview), Colour Studies. Remove standalone Perspective and Black & White tiles from main page. Section background = `#FFFFFF`.

8. **Convert Postcard Illustrations tile** from fade-cycle → horizontal carousel with slight 3D depth (`transform: perspective(...) translateX(...)`), 5 cards, 3-second auto-advance.

9. **Confirm blind contour animation** is balloon-drift: random slow x/y velocity per image, gentle rotation, continuous loop. Check `script.js` and update if it's currently static or wrong.

10. **Add scroll-fade for contours** when user scrolls past landing — opacity transitions to 0.

11. **Smaller Editorial tiles** — TIME / Artforum / Baskerville covers don't need to be huge on main page. Reduce grid tile size so spreads stay on detail pages.

12. **Verify all local image paths** (`assets/images/...`) — replace with Cloudinary URLs from section 11 if they exist there. The 9 Panels and Portrait tiles currently reference local paths.

13. **Add "Only quotes italic" rule** — global CSS reset for `em`, `i` should be plain unless inside `blockquote` or `q`.

---

## 14. Workflow — before every edit session

When the user asks for a change:

1. **Identify the file(s)** to be edited and confirm with the user.
2. **Show the current relevant code** (view the file before editing).
3. **State what will change** in plain English first.
4. **Make minimal, scoped edits.** Do not touch anything not directly required.
5. **Comment changes** with `/* ── [what + why] ── */` blocks in CSS, `<!-- [what + why] -->` in HTML.
6. **Confirm the change is reflected** correctly after editing.

Never:
- Add JavaScript libraries
- Embed PDFs
- Use inline `style=""` attributes
- Add accent colors
- Crop tile images to uniform size
- Restructure the file tree without explicit permission
- Invent project copy (use section 10 exactly)
- Make medium-weight typography (small or big only)
- Italicize anything except quotes
