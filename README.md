# irenenam.com

Personal site. Next.js 15 (App Router), TypeScript, no CMS, no database.

## Run

```bash
npm install
npm run dev
```

## Structure

- `app/` — routes. One folder per page.
- `components/` — shared UI. `CaseStudy/` holds the project-page primitives.
- `content/projects.ts` — single source of truth for project metadata.
- `app/globals.css` — design tokens and shared classes.

## Adding a project

1. Add an object to `content/projects.ts`
2. Create `app/work/<slug>/page.tsx`

## Deploy

Push to `main`. Vercel builds automatically.
