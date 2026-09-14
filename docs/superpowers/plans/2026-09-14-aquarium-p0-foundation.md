# Aquarium P0 Foundation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the static Astro foundation for aquarium.emfls.com as an Aquarium Field Guide with extensible species data.

**Architecture:** Use Astro pages and layouts with vanilla CSS. Keep species records in a typed TypeScript module, render the homepage and index pages from shared data, and keep future tools as clearly labeled non-functional entry points.

**Tech Stack:** Astro, TypeScript, vanilla CSS, npm.

**Spec:** User-provided P0 aquarium site requirements in the conversation.

## Global Constraints

- Keep all work inside `emfls-aquarium`.
- Use static output, no database, APIs, login, CMS, UI framework, or paid service.
- Include only minimal validation content for betta, guppy, and cherry shrimp.
- Do not add external or broken image placeholders.
- Run `npm run check` and `npm run build` before completion.

### Task 1: Scaffold and typed species foundation

**Files:** Create `package.json`, `astro.config.mjs`, `tsconfig.json`, `src/data/species.ts`, `src/data/site.ts`.

- [x] Define `Species` and `SpeciesCategory` types and three minimal records.
- [x] Configure Astro static output and strict TypeScript.
- [x] Add npm scripts for `dev`, `check`, and `build`.

### Task 2: Shared shell and visual system

**Files:** Create `src/layouts/BaseLayout.astro`, `src/components/SiteHeader.astro`, `src/components/SiteFooter.astro`, `src/styles/global.css`, `public/favicon.svg`, `public/robots.txt`.

- [x] Implement semantic document metadata with title, description, canonical, and OG tags.
- [x] Implement responsive navigation and footer.
- [x] Define the dark teal field-guide visual system, specimen cards, metrics, focus states, and mobile behavior.

### Task 3: Homepage and index pages

**Files:** Create `src/pages/index.astro`, `src/pages/species/index.astro`, `src/pages/guides/index.astro`, `src/pages/tools/index.astro`.

- [x] Render hero, species discovery, featured records, guide categories, tools roadmap, and category navigation.
- [x] Render species index from typed data.
- [x] Provide non-functional but clear future-tool cards without implying completed features.

### Task 4: Basic pages and project docs

**Files:** Create `src/pages/about.astro`, `src/pages/privacy.astro`, `src/pages/contact.astro`, `src/pages/404.astro`, `src/pages/sitemap.xml.ts`, `AGENTS.md`, `SITE_STRATEGY.md`, `DESIGN_SYSTEM.md`, `TASKS.md`, `PROJECT_HISTORY.md`, `README.md`.

- [x] Add honest placeholder-free foundation pages with no invented contact details.
- [x] Add sitemap generation for the current route set.
- [x] Record architecture, design decisions, scope, and follow-up tasks.

### Task 5: Verification

- [x] Run `npm run check`.
- [x] Run `npm run build`.
- [x] Inspect generated routes and scan internal links.
- [x] Review responsive CSS and source for placeholders or incomplete UI.
