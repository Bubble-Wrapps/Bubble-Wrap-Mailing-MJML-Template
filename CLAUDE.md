# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

This project uses MJML (Mailjet Markup Language) to build responsive HTML emails. Runtime: Bun (v1.3.13), Node.js (v20.12.0) managed via asdf.

## Commands

```bash
bun run build                       # Compile components, components-raw, and templates
bun run build-templates             # Compile templates → dist/templates/
bun run build-components            # Compile components → dist/components/ (post-processed snippets)
bun run build-components-raw        # Compile components → dist/components-raw/ (full HTML, no post-processing)
bun run build-watch                 # Watch mode for all three (components, components-raw, templates)
bun run build-templates-watch       # Watch mode for templates only
bun run build-components-watch      # Watch mode for components (snippet output) only
bun run build-components-raw-watch  # Watch mode for components (raw full HTML output) only
bun run build-minify                # Compile all with minified output
bun run build-templates-minify      # Compile templates with minified output
bun run build-components-minify     # Compile components (snippets) with minified output
bun run build-components-raw-minify # Compile components (raw) with minified output
```

## Architecture

```
src/
  _styles/      — CSS files included into components/templates via <mj-include type="css">
  blocks/       — Reusable MJML fragments (partial markup, e.g. <mj-column>); included via <mj-include>
  components/   — Full MJML documents (<mjml> root); each compiles to two outputs (see below)
  templates/    — Standalone email templates; compiled to dist/templates/

dist/
  components/     — Post-processed snippets: body content + custom <style> blocks only; intended
                    for inclusion in templates via <mj-include path="..." type="html">
  components-raw/ — Full compiled HTML documents (unmodified MJML output); useful for standalone use in emails or for preview/debugging
  templates/      — Final compiled email HTML; the deliverable output
```

### Component system

`src/components/*.mjml` files are full MJML documents that get compiled twice:

- **`dist/components/`** — post-processed snippets. The full HTML document is stripped down to just the `<body>` content plus any custom `<style>` blocks (MJML boilerplate styles are removed). Use these in templates with `<mj-include path="../../dist/components/foo.html" type="html" />`.
- **`dist/components-raw/`** — unmodified MJML output (complete HTML document). Use for browser preview or standalone testing.

The post-processing in `build-components` keeps `<style>` blocks whose content does **not** match MJML boilerplate patterns (`#outlook`, `.mj-outlook`, `@media only screen`, `.moz-text-html`). Custom CSS added via `<mj-include type="css">` passes through automatically.

### Watch mode

MJML v5's built-in `-w` flag has a bug (async/await mishandled inside a synchronous lodash `flow` pipeline), so all watch scripts in `scripts/` bypass it by running MJML one-shot and using Node's `fs.watch` for file change detection.

- `scripts/build-components-watch.js` — watches `src/components/`, `src/blocks/`, `src/_styles/`; compiles + post-processes to `dist/components/`
- `scripts/build-components-raw-watch.js` — same source dirs; compiles to `dist/components-raw/` with no post-processing
- `scripts/build-templates-watch.js` — watches `src/templates/`, `src/blocks/`, `src/_styles/`, `dist/components/`; compiles to `dist/templates/`

When a component changes, `dist/components/` is updated, which triggers `build-templates-watch` to rebuild affected templates automatically.

### Including components in templates

```mjml
<mj-wrapper background-color="#ebebeb" padding="10px 13px">
  <mj-include path="../../dist/components/footer.html" type="html" />
</mj-wrapper>
```

The `../../dist/components` path is relative to `src/templates/`. It is also listed in `build-templates`'s `--config.includePath` so MJML can resolve it.

## MJML Rules

- Always use https://documentation.mjml.io/#mjml-guide for guidelines. Always state when documentation was used and which parts were read.
- Prefer MJML components over raw HTML. If something can't be done cleanly with MJML components, use `<mj-raw>` — it accepts plain HTML but cannot contain other MJML components.
- Required nesting: `<mjml>` → `<mj-body>` → `<mj-section>` → `<mj-column>` → content.
- `dist/` is generated output — not committed to version control.
