import { useMemo, useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Check,
  Copy,
  Pause,
  Play,
  RotateCcw,
  Sparkles,
} from "lucide-react";
import ShapeGrid from "@/components/ShapeGrid.jsx";
import "./home.css";

type Shape = "square" | "tile" | "hexagon" | "triangle" | "diamond" | "circle" | "cross" | "dot";
type Direction = "diagonal" | "up" | "down" | "left" | "right" | "none";

const shapes: { id: Shape; label: string; glyph: string }[] = [
  { id: "square", label: "Square", glyph: "□" },
  { id: "tile", label: "Tile", glyph: "▢" },
  { id: "hexagon", label: "Hexagon", glyph: "⬡" },
  { id: "triangle", label: "Triangle", glyph: "△" },
  { id: "diamond", label: "Diamond", glyph: "◇" },
  { id: "circle", label: "Circle", glyph: "○" },
  { id: "cross", label: "Cross", glyph: "+" },
  { id: "dot", label: "Dot", glyph: "·" },
];
const directions: { id: Direction; label: string; arrow: string }[] = [
  { id: "diagonal", label: "Diagonal", arrow: "↗" },
  { id: "up", label: "Up", arrow: "↑" },
  { id: "down", label: "Down", arrow: "↓" },
  { id: "left", label: "Left", arrow: "←" },
  { id: "right", label: "Right", arrow: "→" },
  { id: "none", label: "Still", arrow: "·" },
];
const colors = ["#d8ff70", "#94b7ff", "#ff977e", "#f1eee6"];

function RangeControl({
  label,
  value,
  min,
  max,
  step,
  display,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  display: string;
  onChange: (value: number) => void;
}) {
  const progress = ((value - min) / (max - min)) * 100;
  return (
    <label className="range-control">
      <span className="control-label"><span>{label}</span><span className="control-value">{display}</span></span>
      <input
        aria-label={label}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        style={{ "--range-progress": `${progress}%` } as React.CSSProperties}
        onChange={(event) => onChange(Number(event.target.value))}
      />
      <span className="range-ends"><span>{min}</span><span>{max}</span></span>
    </label>
  );
}

function Toggle({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      className={`toggle-row${checked ? " is-on" : ""}`}
      onClick={() => onChange(!checked)}
    >
      <span>{label}</span>
      <span className="toggle-track"><span className="toggle-thumb" /></span>
    </button>
  );
}

export default function Home() {
  const [shape, setShape] = useState<Shape>("square");
  const [direction, setDirection] = useState<Direction>("diagonal");
  const [cellSize, setCellSize] = useState(40);
  const [speed, setSpeed] = useState(0.5);
  const [radius, setRadius] = useState(1.5);
  const [fillOpacity, setFillOpacity] = useState(0.2);
  const [glow, setGlow] = useState(0.45);
  const [hoverColor, setHoverColor] = useState(colors[0]);
  const [rainbow, setRainbow] = useState(false);
  const [paused, setPaused] = useState(false);
  const [copied, setCopied] = useState(false);

  const snippet = useMemo(
    () => `<div style={{ width: "100%", height: 520, position: "relative" }}>\n  <ShapeGrid\n    shape="${shape}"\n    direction="${direction}"\n    lineColor="#283039"\n    hoverColor="${hoverColor}"\n    fillOpacity={${fillOpacity.toFixed(2)}}\n    cellSize={${cellSize}}\n    speed={${speed.toFixed(2)}}\n    radius={${radius.toFixed(1)}}\n    glow={${glow.toFixed(2)}}\n    rainbow={${rainbow}}\n  />\n</div>`,
    [shape, direction, hoverColor, fillOpacity, cellSize, speed, radius, glow, rainbow],
  );

  const reset = () => {
    setShape("square");
    setDirection("diagonal");
    setCellSize(40);
    setSpeed(0.5);
    setRadius(1.5);
    setFillOpacity(0.2);
    setGlow(0.45);
    setHoverColor(colors[0]);
    setRainbow(false);
    setPaused(false);
  };

  const copySnippet = async () => {
    try {
      await navigator.clipboard.writeText(snippet);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <main className="studio-page">
      <header className="topbar page-width">
        <a className="brand" href="#top" aria-label="ShapeGrid Studio home">
          <img src={`${import.meta.env.BASE_URL}shapegrid-mark.svg`} alt="" width="38" height="38" />
          <span className="brand-word">shapegrid<span className="brand-period">.</span></span>
        </a>
        <nav className="main-nav" aria-label="Main navigation">
          <a href="#playground">Playground</a>
          <a href="#component">The component</a>
        </nav>
        <a className="nav-cta" href="#playground">Open the playground <ArrowUpRight size={15} /></a>
      </header>

      <section className="hero page-width" id="top">
        <div className="hero-copy">
          <div className="eyebrow"><span className="live-dot" /> CANVAS STUDY <span className="eyebrow-slash">/</span> 001</div>
          <h1>Order, with<br /><em>a pulse.</em></h1>
          <p className="hero-lede">A living grid for the in-between moments. Follow the light, set the rhythm, make it yours.</p>
          <div className="hero-actions">
            <a className="button-primary" href="#playground">Make it move <ArrowRight size={16} /></a>
            <span className="hero-note">React component <span>·</span> Canvas rendered</span>
          </div>
          <div className="hero-index"><span>01</span><span className="index-rule"/><span>INTERACTIVE CANVAS</span></div>
        </div>

        <div className="hero-art" aria-label="Animated square grid with pointer-reactive light">
          <div className="hero-art-wash" />
          <div className="hero-grid-wrap">
            <ShapeGrid
              shape="square"
              direction="diagonal"
              lineColor="#28323c"
              hoverColor="#d8ff70"
              hoverFillColor="#d8ff70"
              fillOpacity={0.12}
              cellSize={42}
              speed={0.32}
              radius={1.8}
              trail={0.7}
              glow={0.52}
              fade={0.72}
              intro
              clickCascade
            />
          </div>
          <div className="art-corner art-corner-top"><span>FIG. 01</span><span>MOVE TO INTERACT</span></div>
          <div className="art-crosshair" aria-hidden="true"><i /><i /></div>
          <div className="art-coordinate">40° 43′ 55.3″ N<br />73° 59′ 11.2″ W</div>
          <div className="art-index"><span>DRIFT</span><b>↗</b><span>0.32</span></div>
        </div>
        <div className="hero-bottomline"><span>AN EXPERIMENT IN SPATIAL FEEDBACK</span><a href="#playground">SCROLL TO TUNE <ArrowDown size={13} /></a></div>
      </section>

      <section className="playground-section" id="playground">
        <div className="page-width">
          <div className="section-heading">
            <div><div className="eyebrow"><span className="section-number">01</span> THE PLAYGROUND</div><h2>Your grid.<br /><em>Your rules.</em></h2></div>
            <p>Every line has a little give. Change the geometry, tune the drift, then move your cursor across the canvas.</p>
          </div>

          <div className="workbench">
            <div className="preview-column">
              <div className="preview-toolbar"><div className="preview-title"><span className="live-dot" /> LIVE CANVAS</div><div className="preview-meta">{shape.toUpperCase()} <span>·</span> {direction.toUpperCase()}</div></div>
              <div className="preview-canvas" aria-label="Interactive ShapeGrid preview. Move the pointer over the canvas; click to send a light cascade.">
                <ShapeGrid
                  shape={shape}
                  direction={direction}
                  lineColor="#26313b"
                  hoverColor={hoverColor}
                  hoverFillColor={hoverColor}
                  fillOpacity={fillOpacity}
                  cellSize={cellSize}
                  speed={speed}
                  radius={radius}
                  trail={0.68}
                  glow={glow}
                  twinkle={0.04}
                  fade={0.58}
                  rainbow={rainbow}
                  tiltX={0}
                  tiltY={0}
                  clickCascade
                  intro
                  paused={paused}
                />
                <div className="preview-caption"><span>MOVE YOUR CURSOR THROUGH THE FIELD</span><span>CLICK TO SEND A CASCADE <span className="caption-arrow">↗</span></span></div>
                <div className="preview-marker" aria-hidden="true"><span>SG</span></div>
              </div>
              <div className="preview-foot"><span><span className="status-led" /> CANVAS ACTIVE</span><span>60 FPS TARGET <span className="foot-divider">/</span> DPR AUTO</span></div>
            </div>

            <aside className="controls-panel" aria-label="Grid settings">
              <div className="controls-heading"><div><span className="panel-kicker">THE CONTROL ROOM</span><h3>Shape it.</h3></div><button className="icon-button" type="button" onClick={reset} aria-label="Reset all controls" title="Reset controls"><RotateCcw size={16} /></button></div>

              <div className="control-group shape-group"><div className="control-label"><span>01 <i>/</i> Cell geometry</span><span className="control-value">{shape}</span></div><div className="shape-picker" role="group" aria-label="Cell geometry">
                {shapes.map((option) => <button key={option.id} type="button" className={`shape-option${shape === option.id ? " selected" : ""}`} aria-label={option.label} aria-pressed={shape === option.id} title={option.label} onClick={() => setShape(option.id)}><span aria-hidden="true">{option.glyph}</span></button>)}
              </div></div>

              <div className="control-group"><div className="control-label"><span>02 <i>/</i> Drift direction</span><span className="control-value">{direction}</span></div><div className="direction-picker" role="group" aria-label="Grid drift direction">
                {directions.map((option) => <button key={option.id} type="button" className={`direction-option${direction === option.id ? " selected" : ""}`} aria-pressed={direction === option.id} onClick={() => setDirection(option.id)}><span className="direction-arrow" aria-hidden="true">{option.arrow}</span><span>{option.label}</span></button>)}
              </div></div>

              <div className="range-pair"><RangeControl label="Cell size" value={cellSize} min={20} max={72} step={1} display={`${cellSize} px`} onChange={setCellSize} /><RangeControl label="Drift speed" value={speed} min={0} max={1.5} step={0.05} display={speed.toFixed(2)} onChange={setSpeed} /></div>
              <div className="range-pair second-pair"><RangeControl label="Light radius" value={radius} min={0.5} max={3.5} step={0.1} display={`${radius.toFixed(1)} cells`} onChange={setRadius} /><RangeControl label="Fill strength" value={fillOpacity} min={0} max={0.65} step={0.01} display={`${Math.round(fillOpacity * 100)}%`} onChange={setFillOpacity} /></div>

              <div className="control-group color-group"><div className="control-label"><span>03 <i>/</i> Light color</span><span className="control-value">{rainbow ? "spectrum" : hoverColor}</span></div><div className="color-row"><div className="swatches" role="group" aria-label="Hover light color">
                {colors.map((color) => <button key={color} className={`color-swatch${hoverColor === color ? " selected" : ""}`} style={{ "--swatch": color } as React.CSSProperties} type="button" aria-label={`Use ${color} light`} aria-pressed={hoverColor === color} onClick={() => { setHoverColor(color); setRainbow(false); }} />)}
              </div><Toggle label="Rainbow" checked={rainbow} onChange={setRainbow} /></div></div>

              <div className="control-group motion-group"><div className="control-label"><span>04 <i>/</i> Motion</span><span className="control-value">{paused ? "paused" : "in motion"}</span></div><button className={`motion-button${paused ? " paused" : ""}`} type="button" onClick={() => setPaused(!paused)}>{paused ? <Play size={15} /> : <Pause size={15} />}<span>{paused ? "Resume animation" : "Pause animation"}</span><span className="motion-key">{paused ? "▶" : "Ⅱ"}</span></button><RangeControl label="Glow" value={glow} min={0} max={1} step={0.05} display={glow.toFixed(2)} onChange={setGlow} /></div>

              <div className="panel-footer"><span><Sparkles size={14} /> CHANGES ARE INSTANT</span><button type="button" onClick={reset}>RESET <RotateCcw size={12} /></button></div>
            </aside>
          </div>
        </div>
      </section>

      <section className="component-section page-width" id="component">
        <div className="component-intro"><div><div className="eyebrow"><span className="section-number">02</span> SMALL API, BIG FEELING</div><h2>Drop it in.<br /><em>Let it breathe.</em></h2></div><p>One canvas. No dependencies. A handful of thoughtful props and a grid that meets the pointer halfway.</p></div>
        <div className="feature-rail">
          <article className="feature-card"><span className="feature-index">A / GEOMETRY</span><div className="feature-graphic geometry-graphic" aria-hidden="true"><span>□</span><span>⬡</span><span>△</span><span>○</span></div><h3>Eight ways to tile.</h3><p>From quiet squares to little dots. Pick the geometry that fits your surface.</p></article>
          <article className="feature-card"><span className="feature-index">B / MOTION</span><div className="feature-graphic motion-graphic" aria-hidden="true"><span>↗</span><i /><i /><i /></div><h3>Motion with manners.</h3><p>Slow drift, soft trails and a reduced-motion-aware intro that never takes over.</p></article>
          <article className="feature-card"><span className="feature-index">C / FEEDBACK</span><div className="feature-graphic feedback-graphic" aria-hidden="true"><span className="feedback-ring" /><span className="feedback-core" /></div><h3>Made to be touched.</h3><p>Cells brighten as you pass. A click sends a ripple all the way out.</p></article>
        </div>
      </section>

      <section className="code-section" aria-labelledby="code-title">
        <div className="page-width code-layout">
          <div className="code-copy"><div className="eyebrow"><span className="section-number">03</span> TAKE IT WITH YOU</div><h2 id="code-title">A small piece<br />of <em>wonder.</em></h2><p>Copy the live configuration as JSX, or bring the component files straight into your project.</p><div className="file-pills"><span><i /> ShapeGrid.jsx</span><span><i /> ShapeGrid.css</span></div></div>
          <div className="code-card"><div className="code-toolbar"><span><i /> LIVE CONFIG</span><button type="button" onClick={copySnippet}>{copied ? <Check size={14} /> : <Copy size={14} />} {copied ? "COPIED" : "COPY JSX"}</button></div><pre><code>{snippet}</code></pre><div className="code-card-footer"><span>JAVASCRIPT + CSS</span><a href="#playground">TUNE THE PROPS <ArrowUpRight size={13} /></a></div></div>
        </div>
      </section>

      <footer className="site-footer page-width"><a className="brand footer-brand" href="#top"><img src={`${import.meta.env.BASE_URL}shapegrid-mark.svg`} alt="" width="30" height="30" /><span className="brand-word">shapegrid<span className="brand-period">.</span></span></a><span className="footer-note">BUILT FOR THE SPACE BETWEEN STATES.</span><a className="footer-link" href="https://reactbits.dev" target="_blank" rel="noreferrer">Inspired by React Bits <ArrowUpRight size={13} /></a></footer>
    </main>
  );
}
