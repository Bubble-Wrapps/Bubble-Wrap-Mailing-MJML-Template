# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

This project uses MJML (Mailjet Markup Language) to build responsive HTML emails. Runtime: Bun (v1.3.13), Node.js (v20.12.0) managed via asdf.

## Commands

```bash
bun run build                    # Compile all templates and blocks
bun run build-templates          # Compile templates → dist/templates/
bun run build-blocks             # Compile blocks → dist/blocks/ (no allowIncludes)
bun run build-watch              # Watch mode for templates and blocks
bun run build-templates-watch    # Watch mode for templates only
bun run build-blocks-watch       # Watch mode for blocks only
bun run build-minify             # Compile all with minified output
bun run build-templates-minify   # Compile templates with minified output
bun run build-blocks-minify      # Compile blocks with minified output
```

## Architecture

- `src/blocks/` — Reusable MJML fragments, included via `<mj-include path="..." />`; compiled to `dist/blocks/`
- `src/templates/` — MJML source files (`.mjml` extension); each file is a standalone email template; compiled to `dist/templates/`
- `dist/` — Compiled HTML output (generated, not committed)

## MJML Rules

- All layout must use MJML components — never raw `<div>` or `<table>`
- Required nesting: `<mjml>` → `<mj-body>` → `<mj-section>` → `<mj-column>` → content
- Content components: `mj-text`, `mj-button`, `mj-image`, `mj-divider`, `mj-social`
- Global styles and font declarations go in `<mj-head>` using `<mj-attributes>`
- Reusable fragments belong in `src/blocks/` and are included with `<mj-include>`
