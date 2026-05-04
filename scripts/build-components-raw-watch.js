#!/usr/bin/env node
// Watches src/components/, src/blocks/, and src/_styles/ for changes,
// then runs MJML one-shot (working around MJML v5's broken -w mode).
// Outputs full compiled HTML to dist/components-raw/ with no post-processing,
// matching the build-components-raw script in package.json.

import fs from "fs";
import path from "path";
import { execSync } from "child_process";

const OUT_DIR = "dist/components-raw";
const MJML_BIN = path.join(process.cwd(), "node_modules/.bin/mjml");
const MJML_CMD = `"${MJML_BIN}" src/components/*.mjml -o ${OUT_DIR} --config.allowIncludes true --config.includePath '["../_styles","../blocks"]'`;
const WATCH_DIRS = ["src/components", "src/blocks", "src/_styles"];

fs.mkdirSync(OUT_DIR, { recursive: true });

function compile() {
  try {
    execSync(MJML_CMD, { stdio: "inherit" });
    console.log("[components-raw] Build complete");
  } catch {
    console.error("[components-raw] Build failed");
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
