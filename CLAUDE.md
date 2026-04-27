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

- Always use https://documentation.mjml.io/#mjml-guide for guidelines on how to do stuff.
- All layouts should prioritise using MJML components over raw HTML. If something can't be done with MJML components or would be messy/hard to work with - use <mj-raw> component that allows to put plain HTML in it. mj-raw is an "ending tag", which means that it can contain HTML code but it cannot contain other MJML components.
- Required nesting: `<mjml>` → `<mj-body>` → `<mj-section>` → `<mj-column>` → content.
- Compiled HTML output goes to dist/ (not committed)
- Source files live in src/templates/ and src/blocks (.mjml extension); compiled to dist/templates/ and dist/blocks.
- The files in src/blocks/ are reusable MJML fragments and are included with <mj-include>; compiled to dist/blocks/ without allowIncludes.
