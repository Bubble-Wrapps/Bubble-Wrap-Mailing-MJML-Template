# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

This project uses MJML (Mailjet Markup Language) to build responsive HTML emails. Runtime: Bun (v1.3.13), Node.js (v20.12.0) managed via asdf.

## Commands

```bash
bun run build           # Compile all templates → dist/
bun run build:watch     # Watch mode for development
bun run build:minify    # Compile with minified output
```

## Architecture

- `src/blocks/` — Reusable MJML fragments, included via `<mj-include path="..." />`
- `src/templates/` — MJML source files (`.mjml` extension); each file is a standalone email template
- `dist/` — Compiled HTML output (generated, not committed)

## MJML Rules

- All layout must use MJML components — never raw `<div>` or `<table>`
- Required nesting: `<mjml>` → `<mj-body>` → `<mj-section>` → `<mj-column>` → content
- Content components: `mj-text`, `mj-button`, `mj-image`, `mj-divider`, `mj-social`
- Global styles and font declarations go in `<mj-head>` using `<mj-attributes>`
- Reusable fragments belong in `src/blocks/` and are included with `<mj-include>`
