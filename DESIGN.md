---
name: Instituto Superior Tecnológico Horizonte
description: Institutional landing where the question box is the admission desk.
colors:
  navy-950: "#08132e"
  navy-900: "#0b1a3d"
  navy-800: "#0f2350"
  navy-700: "#1a3470"
  navy-300: "#9fb1d9"
  navy-100: "#e3e9f6"
  navy-50: "#f3f6fb"
  ink: "#0e1730"
  ink-2: "#44506a"
  ink-3: "#5d6883"
  line: "#dde3ef"
  surface: "#ffffff"
  sun: "#f2782d"
  accent: "#c84b0a"
  accent-hover: "#ae3f06"
  danger: "#b42318"
  req: "#e09a00"
  req-bg: "#fff3d6"
  req-ink: "#7a4b00"
  hor: "#12a08c"
  hor-bg: "#daf4ef"
  hor-ink: "#0a5e52"
  cos: "#d93d84"
  cos-bg: "#fce3ef"
  cos-ink: "#97184f"
typography:
  display:
    fontFamily: "'Archivo Variable', 'Archivo', system-ui, sans-serif"
    fontSize: "clamp(2.6rem, 5.6vw, 4.9rem)"
    fontWeight: 780
    lineHeight: 0.98
    letterSpacing: "-0.022em"
    fontVariation: "'wdth' 84"
  headline:
    fontFamily: "'Archivo Variable', 'Archivo', system-ui, sans-serif"
    fontSize: "clamp(2rem, 3.6vw, 3.1rem)"
    fontWeight: 760
    lineHeight: 1.05
    letterSpacing: "-0.02em"
    fontVariation: "'wdth' 88"
  title:
    fontFamily: "'Archivo Variable', 'Archivo', system-ui, sans-serif"
    fontSize: "clamp(1.6rem, 2.4vw, 2rem)"
    fontWeight: 720
    lineHeight: 1.05
    letterSpacing: "-0.02em"
    fontVariation: "'wdth' 88"
  title-sm:
    fontFamily: "'Archivo Variable', 'Archivo', system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 700
    lineHeight: 1.25
    fontVariation: "'wdth' 92"
  body:
    fontFamily: "'Hanken Grotesk Variable', 'Hanken Grotesk', system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.6
  body-lead:
    fontFamily: "'Hanken Grotesk Variable', 'Hanken Grotesk', system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "'Hanken Grotesk Variable', 'Hanken Grotesk', system-ui, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 650
    lineHeight: 1.4
rounded:
  control: "10px"
  bubble: "16px"
  card: "18px"
  media: "20px"
  panel: "22px"
  pill: "999px"
spacing:
  gutter: "clamp(16px, 4vw, 40px)"
  container: "1240px"
  section: "clamp(72px, 9vw, 120px)"
  section-head: "clamp(32px, 4vw, 48px)"
components:
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.surface}"
    rounded: "{rounded.pill}"
    padding: "0 22px"
    height: "46px"
  button-primary-hover:
    backgroundColor: "{colors.accent-hover}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.navy-800}"
    rounded: "{rounded.pill}"
    padding: "0 22px"
    height: "46px"
  button-ghost-hover:
    backgroundColor: "{colors.navy-50}"
  button-light:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.navy-900}"
    rounded: "{rounded.pill}"
    padding: "0 22px"
    height: "46px"
  button-light-hover:
    backgroundColor: "{colors.navy-100}"
  send-button:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.surface}"
    rounded: "{rounded.pill}"
    size: "40px"
  send-button-disabled:
    backgroundColor: "{colors.navy-100}"
    textColor: "{colors.ink-3}"
  choice-chip:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.navy-900}"
    rounded: "{rounded.pill}"
    padding: "0 16px"
    height: "40px"
  choice-chip-hover:
    backgroundColor: "{colors.navy-50}"
  category-tag-requisitos:
    backgroundColor: "{colors.req-bg}"
    textColor: "{colors.req-ink}"
    rounded: "{rounded.pill}"
    padding: "3px 10px 3px 8px"
  category-tag-horarios:
    backgroundColor: "{colors.hor-bg}"
    textColor: "{colors.hor-ink}"
    rounded: "{rounded.pill}"
    padding: "3px 10px 3px 8px"
  category-tag-costos:
    backgroundColor: "{colors.cos-bg}"
    textColor: "{colors.cos-ink}"
    rounded: "{rounded.pill}"
    padding: "3px 10px 3px 8px"
  input-field:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "10px 12px"
    height: "44px"
  ask-bar:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "6px 6px 6px 20px"
  bubble-bot:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.bubble}"
    padding: "10px 14px"
  bubble-user:
    backgroundColor: "{colors.navy-800}"
    textColor: "{colors.surface}"
    rounded: "{rounded.bubble}"
    padding: "10px 14px"
  chat-panel:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.panel}"
    width: "400px"
  launcher:
    backgroundColor: "{colors.navy-800}"
    textColor: "{colors.surface}"
    rounded: "{rounded.pill}"
    padding: "0 22px 0 16px"
    height: "56px"
  launcher-hover:
    backgroundColor: "{colors.navy-700}"
---

# Design System: Instituto Superior Tecnológico Horizonte

## Overview

**Creative North Star: "The Admission Desk"**

Horizonte is a category-standard institute site played straight: cool white ground, a committed deep navy field for the header, hero, closing band and footer, and a single warm sunset orange that marks the thing to do next. The system's one idea is that the question box is the front desk. The ask bar, the chat panel and the classified answer are the product, so the conversational components (pill inputs, bubbles, category tags, choice chips) carry the most design weight and are reused across the landing and the chat.

Density is relaxed and institutional: generous section padding, a 1240px container, hairline dividers instead of cards for lists and tables, and real campus and lab photography with soft rounding. Type is a condensed, heavy Archivo for headings (the width axis is part of the voice) against a calm Hanken Grotesk body. Three category hues (Requisitos amber, Horarios teal, Costos magenta) are a functional code, not decoration: they appear only where a question is classified or chosen.

**Key Characteristics:**
- Navy field plus white ground; orange reserved for primary action.
- Condensed heavy Archivo headings (width 84–92%), Hanken Grotesk body at 17px / 1.6.
- Pill geometry for every action and chip; 10–22px radii for fields, bubbles, cards and panels.
- Hairline rules (`line`) structure lists, tables and dividers; cards are rare.
- Soft navy-tinted shadows only on floating things (chat panel, launcher, preview card).
- Category color code: dot + tinted pill, used only for classification.

## Colors

A cool institutional navy ramp on white, one warm accent, and a three-hue functional category code.

### Primary
- **Azul Horizonte** (`navy-900`): the committed field: sticky header, hero, chat header, mobile nav sheet, closing overlay base. Also the color of section headings on light ground.
- **Deep Desk Navy** (`navy-800`): user chat bubbles, step numerals, launcher, checked consent box, the logo tile. The "speaking" navy.
- **Night Footer** (`navy-950`): footer only, and the closing-photo gradient tint.
- **Hover Navy** (`navy-700`): launcher hover and focused input border.

### Secondary
- **Naranja Atardecer** (`accent`): primary buttons, send buttons, the program row arrow, text caret. Hover deepens to `accent-hover`.
- **Sun** (`sun`): the brighter sunset used for the logo's rising sun and for the focus outline on navy ground. Never a fill for text-bearing controls.

### Tertiary (category code)
- **Requisitos Amber** (`req` / `req-bg` / `req-ink`): Requisitos tags and chips; the requirement check discs; the demo-mode notice in the chat.
- **Horarios Teal** (`hor` / `hor-bg` / `hor-ink`): Horarios tags and chips; the registration success icon.
- **Costos Magenta** (`cos` / `cos-bg` / `cos-ink`): Costos tags and chips.

Each category is a triplet: the saturated hue is only ever an 8px dot or a selected border; the pale `-bg` is the fill; the deep `-ink` is the text.

### Neutral
- **Ink** (`ink`): body text.
- **Slate Ink** (`ink-2`): secondary copy, section lead paragraphs, field labels.
- **Muted Ink** (`ink-3`): meta labels, placeholders, table heads, fine print.
- **Hairline** (`line`): every divider, list rule, field and ghost-button stroke.
- **Mist** (`navy-50`): tinted section bands, chat body ground, selected program row, bot preview bubble.
- **Haze** (`navy-100`): selection highlight, input focus halo, disabled send button, image placeholder.
- **Steel** (`navy-300`): secondary text on navy, dashed step connectors, typing dots, unchecked consent stroke.
- **Surface** (`surface`): page ground, panels, bot bubbles, fields.
- **Error Red** (`danger`): invalid field borders and error text.

### Named Rules
**The One Warm Voice Rule.** Orange (`accent`) appears only on the action to take next: the primary button, the send button, the active arrow. Navy carries everything else.

**The Category Code Rule.** Amber, teal and magenta mean Requisitos, Horarios and Costos and nothing else. Use them as dot + tinted pill + deep ink, never as section backgrounds or decoration.

## Typography

**Display Font:** Archivo Variable with width axis (fallback Archivo, system-ui, sans-serif)
**Body Font:** Hanken Grotesk Variable (fallback Hanken Grotesk, system-ui, sans-serif)

**Character:** A condensed, heavy grotesk that reads like signage over a friendly, open grotesk body. Archivo is always narrowed (`font-stretch` 84–92%) with tight negative tracking; that compression is the brand's headline voice.

### Hierarchy
- **Display** (780, clamp(2.6rem, 5.6vw, 4.9rem), 0.98, width 84%, max 12ch): hero headline only. The closing headline uses the same voice at clamp(2.2rem, 4.4vw, 3.6rem), -0.03em.
- **Headline** (760, clamp(2rem, 3.6vw, 3.1rem), 1.05, width 88%): section titles, in `navy-900` on light ground.
- **Title** (700–720, 1.4–2rem, width 88–90%): program detail, step titles, program list names (650, clamp(1.25rem, 1.9vw, 1.6rem)).
- **Small Title** (680–750, 1.0625–1.25rem, width 92%): logo wordmark, admission band values, chat title, form card title.
- **Body** (400, 1.0625rem, 1.6): running copy; lead paragraphs step to 1.125rem in `ink-2`. Measure 36–58ch.
- **Label** (600–650, 0.8125rem): meta labels, field labels, tag text, table heads. Sentence case, no tracking, no uppercase.

### Named Rules
**The Narrow Voice Rule.** Every Archivo heading is set with `font-stretch` below 100% (84% display, 88% headings, 92% small titles) and negative tracking (-0.01 to -0.03em). Full-width Archivo is off-brand.

**The Quiet Label Rule.** Labels are small sentence-case Hanken in `ink-3` or `ink-2`. Headings stand alone: no tag lines, overlines or uppercase kickers above them.

## Layout

A single centered container (max 1240px, side gutter clamp(16px, 4vw, 40px)). Sections breathe at clamp(72px, 9vw, 120px) vertical padding; section heads are max 640px with a 12px title-to-lead gap and clamp(32px, 4vw, 48px) below. Light sections alternate with `navy-50` tinted bands; the navy field opens (hero) and closes (photo band, footer) the page.

Grids are asymmetric and few: hero 6/6, programs 5/6 with a sticky detail panel (top 104px), steps 3-up, info 2-up, costs text + action. Large gaps use clamp (32–96px). The hero photo bleeds off the right edge with only its left corners rounded (24px), and a floating chat preview card overlaps its left edge.

Breakpoints: 1020px (admission band wraps), 900px (nav collapses to a dropdown sheet, all grids go single column, program detail moves inline under the selected row as an accordion, steps turn vertical with a vertical dashed connector), 640px (header 64px, chat becomes a 90dvh bottom sheet with a scrim and grabber, launcher hides while the hero ask bar is visible, large buttons go full width). Header is sticky at 72px; anchor scroll offsets match it.

## Elevation & Depth

Mostly flat with tonal layering: white on `navy-50`, navy field on white, hairline rules for structure. Shadows are reserved for elements that float above the page, and they are soft, navy-tinted and offset downward, never hard-edged.

### Shadow Vocabulary
- **Float** (`box-shadow: 0 2px 6px rgb(11 26 61 / 0.08), 0 24px 56px -16px rgb(11 26 61 / 0.32)`): chat panel, launcher, hero preview card.
- **Rest** (`box-shadow: 0 1px 2px rgb(11 26 61 / 0.06), 0 2px 6px rgb(11 26 61 / 0.05)`): the in-chat registration card.
- **Ask Lift** (`box-shadow: 0 12px 32px -12px rgb(0 0 0 / 0.5)`): the white ask bar on navy; on focus it gains a 4px sun halo (`rgb(242 120 45 / 0.45)`).

### Named Rules
**The Only-Floaters Rule.** A shadow means "this sits above the page." In-flow content (lists, tables, steps, program media) uses no shadow.

## Shapes

Two families. Actions are pills: buttons, chips, category tags, nav links, the ask bar, the launcher and send buttons (circles) all use 999px. Containers are softly rounded and scale with size: fields, segmented options and icon buttons 10px; chat bubbles 16px with the speaker-side bottom corner tightened to 6px; cards (registration form, success card, preview card) 18px; program media 20px; chat panel 22px (top corners only as a mobile sheet); hero photo 24px on its inner corners. Category dots, step numerals and status dots are circles. Borders are 1px `line` hairlines; the consent checkbox is a 22px, 6px-radius box with a 1.5px stroke.

## Components

### Buttons
Confident pills with a small press.
- **Shape:** full pill (999px), 46px tall (40px small, 56px large), weight 650.
- **Primary:** `accent` fill, white text, 0 22px padding; hover `accent-hover`.
- **Ghost:** transparent with `line` stroke and `navy-800` text; hover `navy-300` stroke on `navy-50`.
- **Light:** white with `navy-900` text, used on navy and photo grounds; hover `navy-100`.
- **Press:** `scale(0.97)` on active, 120ms; color transitions 160ms `cubic-bezier(0.23, 1, 0.32, 1)`. Hover styles apply only under `(hover: hover)`.
- **Send:** 40px circle (48px in the hero) in `accent` with a lucide arrow-up; disabled becomes `navy-100` with `ink-3` icon.

### Chips
- **Choice chip:** 40px pill (36px inside chat), white, `line` stroke, `navy-900` text, optional leading 8px category dot. Hover tints to the category's `-bg` with its hue as border. On navy, chips go translucent white (8% fill, 18% stroke).
- **Category tag:** small 0.8125rem/700 pill in the category `-bg` with `-ink` text and an 8px hue dot. Marks every classified answer.
- **Segmented choice:** 3-up 40px options at 10px radius; checked state takes the category triplet.

### Cards / Containers
- **Corner Style:** 18px (cards), 22px (chat panel).
- **Background:** `surface`, on `navy-50` grounds.
- **Shadow Strategy:** Rest for the registration card, Float for the chat panel and preview card.
- **Border:** 1px `line` on in-chat cards.
- **Internal Padding:** 14–18px.

### Inputs / Fields
- **Style:** 44px min height, 10px 12px padding, 1px `line` stroke, 10px radius, white; labels 0.8125rem/650 in `ink-2` above.
- **Focus:** border shifts to `navy-700` with a 3px `navy-100` halo.
- **Error:** `danger` border and 0.8125rem `danger` message below.
- **Ask bar:** the signature input: white pill on navy, 48px input with an embedded send circle, Ask Lift shadow, sun halo on focus.

### Navigation
White-on-navy sticky header (72px). Links are 0.97rem/550 pills at 86% white, hover to full white on 8% white; a small primary button closes the row. Below 900px a menu icon button opens a full-width navy dropdown sheet with 14px-padded links and a full-width 50px button.

### Chat Panel (signature)
Launcher: a 56px navy pill with chat icon and label, Float shadow, icons crossfading with blur and rotation. Panel: 400px wide, 22px radius, navy header with logo avatar, live dot and status line, `navy-50` scrolling body, white composer with hairline top. Opens from bottom-right with opacity + `translateY(8px) scale(0.96)` to rest (280ms ease-out). Messages enter with fade, 8px rise and a 3px blur (300ms). Bot bubbles are white with a hairline; user bubbles are `navy-800`. A three-dot typing indicator bounces in `navy-300`. On phones the panel becomes a 90dvh bottom sheet sliding on `cubic-bezier(0.32, 0.72, 0, 1)` (460ms in, 320ms out) over a 50% navy scrim. Reduced motion collapses transforms to opacity.

### Program Selector
A hairline-ruled list of program rows: Archivo names in `ink-2` that turn `navy-900` with a `navy-50` fill and an orange arrow sliding in when selected; the paired photo crossfades with a slight scale-down (420/700ms).

## Do's and Don'ts

### Do:
- **Do** keep orange to the next action: one primary button or send circle per view region.
- **Do** set every Archivo heading narrowed (84–92%) with negative tracking.
- **Do** use the category triplet (dot, `-bg` fill, `-ink` text) wherever a question is classified.
- **Do** structure lists and tables with 1px `line` rules rather than cards.
- **Do** give interactive elements a press scale (0.94–0.97) and gate hover styles behind `(hover: hover)`.
- **Do** use real campus and lab photography with 20–24px rounding or full-bleed under a navy gradient.
- **Do** use lucide line icons as inline SVG.

### Don't:
- **Don't** use amber, teal or magenta for anything other than Requisitos, Horarios and Costos.
- **Don't** put shadows on in-flow content; shadows are for floating layers only.
- **Don't** use square or small-radius buttons; actions are pills.
- **Don't** add uppercase kickers or overlines above headings.
- **Don't** fill text-bearing controls with `sun`; the orange fill is `accent` (`#c84b0a`) for contrast with white text.
