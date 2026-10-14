import { cpSync, existsSync, mkdirSync, rmSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const packageManager = process.platform === "win32" ? "pnpm.cmd" : "pnpm";
const build = spawnSync(packageManager, ["run", "build:static"], {
  cwd: projectRoot,
  env: { ...process.env, GITHUB_PAGES: "true" },
  stdio: "inherit",
});

if (build.error) throw build.error;
if (build.status !== 0) process.exit(build.status ?? 1);

const output = path.join(projectRoot, "dist", "public");
const docs = path.join(projectRoot, "docs");
if (!existsSync(path.join(output, "index.html"))) {
  throw new Error("The static build did not produce dist/public/index.html");
}

mkdirSync(docs, { recursive: true });
for (const directory of ["assets", "api"]) {
  rmSync(path.join(docs, directory), { recursive: true, force: true });
}
for (const file of ["index.html", "manus-routes.json", "shapegrid-mark.svg", ".nojekyll"]) {
  rmSync(path.join(docs, file), { force: true });
}

for (const directory of ["assets", "api"]) {
  const source = path.join(output, directory);
  if (existsSync(source)) cpSync(source, path.join(docs, directory), { recursive: true });
}
for (const file of ["index.html", "manus-routes.json", "shapegrid-mark.svg"]) {
  const source = path.join(output, file);
  if (existsSync(source)) cpSync(source, path.join(docs, file));
}
cpSync(path.join(output, ".gitkeep"), path.join(docs, ".gitkeep"), { force: true });
await import("node:fs").then(({ writeFileSync }) => writeFileSync(path.join(docs, ".nojekyll"), ""));

console.log("GitHub Pages files are ready in docs/.");
