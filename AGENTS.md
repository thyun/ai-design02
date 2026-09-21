# AGENTS.md

## Project overview
- React + TypeScript + Vite admin dashboard.
- Current visual system must follow `DESIGN.md` for all new pages and UI updates.

## Running locally
- Install deps: `npm install`
- Dev server: `npm run dev`
- Build: `npm run build`
- Preview: `npm run preview`

## Implementation rules
- Keep UI aligned with `DESIGN.md` tokens for color, typography, radius, spacing, cards, shadows, and button shape.
- Use thin display typography, pill buttons, tabular figures for numeric values, and subtle shadows on light surfaces.
- Preserve the existing overview layout unless the task explicitly changes it.
- Prefer small, surgical changes over broad rewrites.

## Code style
- Use React function components and TypeScript.
- Keep styling in `src/styles.css` unless a task clearly benefits from splitting files.
- Use ASCII text unless the file already requires otherwise.

## Verification
- After UI changes, run `npm run build`.
- If the dev server is needed, keep the existing Vite flow and verify the app still serves.
