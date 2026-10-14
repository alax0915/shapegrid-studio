# ShapeGrid Studio

An interactive React + Vite playground for the supplied ShapeGrid canvas component.

## Local development

- `pnpm install` — install dependencies.
- `pnpm dev:static` — run the preview at `http://localhost:3000`.
- `pnpm check` — run the TypeScript check.
- `pnpm build:static` — build the static site for root-path preview/hosting.

## GitHub Pages

The public site is published at <https://alax0915.github.io/shapegrid-studio/> from the `main` branch's `/docs` folder. The repository and the Pages site are public.

After changing the site source, regenerate the Pages files and push them to `main`:

```bash
pnpm build:pages
git add docs
git commit -m "Update GitHub Pages site"
git push origin main
```

The `build:pages` script builds with the `/shapegrid-studio/` base URL, copies the static output into `docs/`, and adds `.nojekyll`. The Pages branch source then deploys the updated files.

## Other project commands

- `pnpm build` / `pnpm start` — build and serve the template's Express application.
- `pnpm db:migrate` / `pnpm db:push` — database migration commands.
- `pnpm test` — run the application tests.
