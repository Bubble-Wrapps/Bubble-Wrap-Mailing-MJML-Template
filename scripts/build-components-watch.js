#!/usr/bin/env node
// Watches src/components/, src/blocks/, and src/_styles/ for changes,
// then runs MJML one-shot (working around MJML v5's broken -w mode) and
// applies the same post-processing as build-components: strips the full
// HTML document wrapper to a body snippet, preserving custom <style> blocks.

import fs from "fs";
import path from "path";
import { execSync } from "child_process";

const OUT_DIR = "dist/components";
const MJML_BIN = path.join(process.cwd(), "node_modules/.bin/mjml");
const MJML_CMD = `"${MJML_BIN}" src/components/*.mjml -o ${OUT_DIR} --config.allowIncludes true --config.includePath '["../_styles","../blocks"]'`;
const WATCH_DIRS = ["src/components", "src/blocks", "src/_styles"];
const MJML_BOILERPLATE =
  /#outlook|\.mj-outlook|@media only screen|\.moz-text-html/;

fs.mkdirSync(OUT_DIR, { recursive: true });

/**
 * Applies the same post-processing as build-components script (located in package.json).
 */
function postProcess(filePath) {
  const html = fs.readFileSync(filePath, "utf8");
  if (!html.includes("<body")) {
    // NOTE: Already post-processed.
    return;
  }

  const customStyles = [];
  const styleRe = /<style[^>]*>([\s\S]*?)<\/style>/gi;
  let m;
  while ((m = styleRe.exec(html)) !== null) {
    if (!MJML_BOILERPLATE.test(m[1])) customStyles.push(m[0]);
  }

  const bodyMatch = html.match(/<body[^>]*>([\s\S]*)<\/body>/i);
  if (!bodyMatch) return;

  const snippet =
    (customStyles.length ? customStyles.join("\n") + "\n" : "") + bodyMatch[1];
  fs.writeFileSync(filePath, snippet);
}

function compile() {
  try {
    execSync(MJML_CMD, { stdio: "inherit" });
    fs.readdirSync(OUT_DIR)
      .filter((f) => f.endsWith(".html"))
      .forEach((f) => postProcess(path.join(OUT_DIR, f)));
    console.log("[components] Build complete");
  } catch {
    console.error("[components] Build failed");
  }
}

// NOTE: Initial build on startup.
compile();

// NOTE: Debounced rebuild on any source change.
let debounce = null;
for (const dir of WATCH_DIRS) {
  fs.watch(dir, { recursive: true }, () => {
    clearTimeout(debounce);
    debounce = setTimeout(compile, 200);
  });
}

console.log(`Watching ${WATCH_DIRS.join(", ")} → ${OUT_DIR}`);
