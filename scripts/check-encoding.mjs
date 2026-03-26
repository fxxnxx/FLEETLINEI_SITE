import fs from "node:fs";
import path from "node:path";

const root = process.argv[2] || path.resolve("src");
const exts = new Set([".ts", ".tsx", ".css", ".html", ".md"]);
const mojibakePattern = /(Р[А-Яа-яЁё]|С[А-Яа-яЁё]){3,}/u;

const badFiles = [];

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === "node_modules" || entry.name === "dist") continue;
      walk(full);
      continue;
    }

    const ext = path.extname(entry.name);
    if (!exts.has(ext)) continue;

    const text = fs.readFileSync(full, "utf8");
    if (mojibakePattern.test(text)) badFiles.push(full);
  }
}

walk(path.resolve(root));

if (badFiles.length) {
  console.error("Potential mojibake found in files:");
  for (const f of badFiles) console.error(`- ${f}`);
  process.exit(1);
}

console.log("Encoding check passed");