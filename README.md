# Bubble Wrap Mailing Using MJML

The MJML (Mailjet Markup Language) project starter.

## Usage

This template is free to use in personal and commercial projects.

However, it is not intended to be:
- Resold as a template
- Repackaged as a competing developer product
- Distributed under another name as a template

If you’re unsure whether your use case is okay, feel free to ask or open an issue.

<br>

# Setup

## Prerequisites

- [asdf](https://asdf-vm.com) - asdf is a tool version manager that allows managing multiple runtime versions for different tools.

<br>

```console
brew install asdf
```

>Or:
>
>Follow the installation instructions provided in the asdf documentation to install asdf on your system.

<br>

## Configuration

### asdf

#### 1. Install asdf plugins

Install the required asdf plugins listed in the '.tool-versions' file located inside the root directory of this repository.

To install the required plugins, run the following command:

<br>
   
```console
asdf plugin add <plugin-name>
```

<br>

Replace `<plugin-name>` with the name of each plugin listed in the '.tool-versions' file. For example:

<br>

```console
asdf plugin add bun https://github.com/cometkim/asdf-bun
```

<br>

#### 2. Install asdf dependencies

To install the project dependencies, run the following command:

<br>

```console
asdf install
```

<br>

> Note:
>
> This command will install all the tools required by the project, with the correct versions specified in the '.tool-versions' file.

<br>

### Bun

#### 1. Install dependencies

To install the necessary dependencies, run the following command:

<br>

```console
bun install
```

<br>

## Open the project

To open the folder that contains the MJML project, run the following command in the root directory of the project:

<br>

For using Cursor:

```console
cursor .
```

<br>

Or (for using Visual Studio Code):

```console
code .
```

<br>

> Note:
>
> After opening the workspace, Cursor / VS Code will prompt you to install all the recommended extensions for this workspace. You should install them, since these extensions are necessary for the development of this project.
>
> After opening the workspace, Cursor / VS Code will prompt you to use the Typescript version defined by this workspace. You should allow that, to make sure that you are using the same Typescript version as other people working on the project.

<br>

## Build and start working

Run:
<br>

```console
bun run build
```
> Note:
>
> This will compile your .mjml files into .html (and output them into the dist folder).
>
> This step is necessary for the Preview in the next step to work properly - as hello.mjml contains a component inclusion as compiled html through the mj-include component. (this should be easier to grasp on after you read about the Architecture below and scan through the [MJML documentation](https://documentation.mjml.io/#mjml-guide))

<br>

Then open hello.mjml, hit Cmd/Ctrl + Shift + P and run 'MJML: Open Preview to the Side', which should open an MJML Preview tab (though not necessarily to the Side - you can drag it there though though).

<br>

# Architecture

## Folders

Source lives under `src/`. Compiled HTML goes to `dist/` (generated only; it is not committed to git).

| Folder | Role |
|--------|------|
| `src/_styles/` | CSS pulled in with `<mj-include type="css" path="...">` (or equivalent paths in your MJML). |
| `src/blocks/` | Small reusable MJML fragments (for example a column or row). Not built on their own — only included inside other `.mjml` files. |
| `src/components/` | Full MJML documents (each has an `<mjml>` root). Built twice: snippets under `dist/components/` and full pages under `dist/components-raw/`. |
| `src/templates/` | Full email templates. Built to `dist/templates/` — these are the usual “ship this HTML” outputs. |
| `scripts/` | Node scripts for watch mode (MJML’s built-in watch has issues in v5, so this project uses `fs.watch` and one-shot compiles instead). |

After a build, `dist/` contains:

- `dist/components/` — stripped snippets (body fragment + your custom `<style>` blocks only), meant for `<mj-include type="html" path="...">` inside templates.
- `dist/components-raw/` — full HTML documents from MJML, good for opening in a browser or reusing a whole piece (for example a footer) as a standalone file.
- `dist/templates/` — final template HTML.

<br>

## Preview

- **In the editor:** open an `.mjml` file, Command Palette (Cmd/Ctrl + Shift + P) → **MJML: Open Preview to the Side** (you can drag the preview tab where you like).
- **In the browser:** open the generated `.html` files under `dist/` directly (for example `dist/templates/hello.html`).

> Note:
>
> If you rely on opening `.html` in the browser, **watch mode** (see [Build commands](#build-commands)) keeps `dist/` in sync while you edit, so you only need to refresh the browser.

<br>

## Styles, blocks, components, and templates

- **Styles** — `.css` files (or style sections you include). They are not compiled alone; they are merged into the email when a component or template includes them. Use them for shared typography, colours, and layout helpers.
- **Blocks** — partial MJML only. They are **not** independent emails and **not** built to `dist/`. Include them from components or templates with `<mj-include>`.
- **Components** — full MJML documents, built in **two** ways: **raw** (complete HTML in `dist/components-raw/`) and **stripped** (snippet + custom styles in `dist/components/`). Use a snippet when a template only needs a footer or hero; use raw when you want a whole mini-document or easier debugging.
- **Templates** — full, styled emails compiled to `dist/templates/`. They can include blocks, styles, and compiled component HTML from `dist/components/`.

MJML expects this nesting when you author layout: `<mjml>` → `<mj-body>` → `<mj-section>` → `<mj-column>` → content. Prefer MJML tags over raw HTML; use `<mj-raw>` when MJML cannot express something cleanly (raw HTML cannot wrap other MJML tags inside it).

More detail and API reference: [MJML documentation](https://documentation.mjml.io/#mjml-guide).

<br>

## Build commands

Run these from the project root with Bun.

| Command | What it does | When it’s useful |
|---------|----------------|------------------|
| `bun run build` | Builds components (both outputs), then templates. | Default full compile before send or CI. |
| `bun run build-templates` | Compiles `src/templates/*.mjml` → `dist/templates/` only. | You only changed templates and `dist/components/` is already up to date. |
| `bun run build-components` | Compiles components → `dist/components/` (snippet post-processing). | After changing a component that templates include as HTML. |
| `bun run build-components-raw` | Compiles components → `dist/components-raw/` (full HTML, no stripping). | Standalone previews or copying a full sub-document. |
| `bun run build-watch` | Runs component, component-raw, and template watchers together. | Active editing; templates rebuild when `dist/components/` updates. |
| `bun run build-templates-watch` | Watches templates, blocks, styles, and `dist/components/`. | Template-only work while components are already built elsewhere. |
| `bun run build-components-watch` | Watches components, blocks, styles → `dist/components/`. | Snippet output while you edit shared pieces. |
| `bun run build-components-raw-watch` | Same sources → `dist/components-raw/`. | Raw HTML while you edit components. |
| `bun run build-minify` | Same as `build`, with minified HTML. | Smaller files for production. |
| `bun run build-templates-minify` | Minified templates only. | |
| `bun run build-components-minify` | Minified snippet components + post-process. | |
| `bun run build-components-raw-minify` | Minified raw components. | |

<br>

```console
bun run build
bun run build-templates
bun run build-components
bun run build-components-raw
bun run build-watch
bun run build-templates-watch
bun run build-components-watch
bun run build-components-raw-watch
bun run build-minify
bun run build-templates-minify
bun run build-components-minify
bun run build-components-raw-minify
```

<br>

## Other notes

- Templates resolve includes from paths configured at build time (for example `../../dist/components` for compiled component snippets). Run a **component** build before a **template** build when templates include `dist/components/*.html`.
- Snippet post-processing drops MJML boilerplate styles but keeps styles that look like your own (anything that does not match the usual MJML outlook/media boilerplate patterns). Styles you add via `_styles` includes are kept.
- Watch scripts recompile on save without using MJML’s broken `-w` flag, so behaviour stays predictable on MJML v5.
