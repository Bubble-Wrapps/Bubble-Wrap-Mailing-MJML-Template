#!/usr/bin/env node
// Watches src/templates/, src/blocks/, src/_styles/, and dist/components/
// for changes, then runs MJML one-shot (working around MJML v5's broken
// -w mode which has a bug with async/await in its lodash flow pipeline).

import fs from "fs";
import path from "path";
import { execSync } from "child_process";

const OUT_DIR = "dist/templates";
const MJML_BIN = path.join(process.cwd(), "node_modules/.bin/mjml");
const MJML_CMD = `"${MJML_BIN}" src/templates/*.mjml -o ${OUT_DIR} --config.allowIncludes true --config.includePath '["../_styles","../blocks","../components","../../dist/components"]'`;
const WATCH_DIRS = [
  "src/templates",
  "src/blocks",
  "src/_styles",
  "dist/components",
];

fs.mkdirSync(OUT_DIR, { recursive: true });

function compile() {
  try {
    execSync(MJML_CMD, { stdio: "inherit" });
    console.log("[templates] Build complete");
  } catch {
    console.error("[templates] Build failed");
  }
}

// NOTE: Initial build on startup.
compile();

// NOTE: Debounced rebuild on any source change.
let debounce = null;
for (const dir of WATCH_DIRS) {
  if (!fs.existsSync(dir)) continue;
  fs.watch(dir, { recursive: true }, () => {
    clearTimeout(debounce);
    debounce = setTimeout(compile, 200);
  });
}

console.log(`Watching ${WATCH_DIRS.join(", ")} → ${OUT_DIR}`);
