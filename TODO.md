# TODO

## ShapeGrid component and supplied CSS
- [x] Copy the complete supplied ShapeGrid JavaScript component source into the project without omitting or replacing any behavior or public props. Preserve the eight shapes (`square`, `tile`, `hexagon`, `triangle`, `diamond`, `circle`, `cross`, and `dot`); `cellSize`; `lineWidth`; directions (`diagonal`, `up`, `down`, `left`, `right`, and `none`); `speed`; `lineColor`; `hoverColor`; `hoverFillColor`; `fillOpacity`; `rainbow`; `tiltX`; `tiltY`; `radius`; `trail`; `glow`; `twinkle`; `fade`; `clickCascade`; `intro`; `opacity`; `backgroundColor`; `paused`; `dpr`; `className`; and `style`.
- [x] Preserve responsive canvas sizing and the provided behavior for animated directional drift, pointer-follow lighting, click cascades, intro animation, perspective tilt, edge fading, and reduced-motion preferences.
- [x] Copy the supplied `.shape-grid` and `.shape-grid-canvas` CSS, import it alongside the component, and preserve the provided styling hooks.

## Responsive React integration
- [x] Render ShapeGrid in a polished, responsive React page, using the supplied usage example as the integration starting point and adjusting props for ShapeGrid Studio.
- [x] Ensure the website route manifest describes all page routes and is served as static JSON at `/manus-routes.json`.

## GitHub source repository
- [x] Save the completed project source to the user's GitHub through the managed GitHub connection workflow, honoring the confirmed repository owner, canonical repository switch, and the user's latest visibility choice.

## GitHub Pages hosting
- [ ] Publish the website publicly at `https://alax0915.github.io/shapegrid-studio/` from the `main` branch's `/docs` folder, with the repository public as explicitly approved.
- [ ] Configure the Vite production base and all public logo/runtime asset references to work beneath `/shapegrid-studio/`, while keeping local development at the root path.
- [ ] Provide a repeatable `pnpm build:pages` command that builds the static site, refreshes the generated `docs/` files, and includes `.nojekyll` for branch-based Pages publishing.
