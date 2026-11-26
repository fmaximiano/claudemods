/**
 * Terra-média: two scenes in the spirit of an old fantasy epic, drawn as original art.
 * Day: a hand-inked map on parchment, its river and road moving, a gold ring glinting in the margin.
 * Night: a starry sky over dark ranges, a smoking fire-mountain and a watchtower far off, a lit round door in a hill.
 * Detail sits in the side margins, where the chat column does not cover it. Every id has a hyphen.
 */

const W = 1512
const H = 945

/** A small seeded random source, so the picture is the same every time it is drawn. */
function rng(seed: number): () => number {
  let s = seed >>> 0
  return () => {
    s = (s + 0x6d2b79f5) >>> 0
    let t = s
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const f = (n: number) => n.toFixed(1)

// ---------------------------------------------------------------- day: the map

/** One inked peak with hatching down its shaded right flank. */
function peak(x: number, y: number, w: number, h: number): string {
  const top = `${f(x)},${f(y - h)}`
  let s = `<path d="M${f(x - w / 2)},${f(y)} L${top} L${f(x + w / 2)},${f(y)}" class="ink"/>`
  const n = Math.max(3, Math.round(w / 9))
  for (let i = 1; i < n; i++) {
    const t = i / n
    const px = x + (w / 2) * t * 0.92
    const py = y - h + h * t * 0.92
    s += `<path d="M${f(px)},${f(py)} l${f(-w * 0.07)},${f(h * 0.16)}" class="hatch"/>`
  }
  return s
}

function range(seed: number, x0: number, x1: number, yBase: number, rows: number, hMin: number, hMax: number): string {
  const r = rng(seed)
  let s = ''
  for (let row = 0; row < rows; row++) {
    const y = yBase + row * 46
    let x = x0 + (row % 2) * 22
    while (x < x1) {
      const w = 40 + r() * 34
      const h = hMin + r() * (hMax - hMin)
      s += peak(x, y + r() * 10, w, h)
      x += w * 0.72
    }
  }
  return s
}

function forest(seed: number, cx: number, cy: number, rx: number, ry: number, count: number): string {
  const r = rng(seed)
  const trees: [number, number][] = []
  for (let i = 0; i < count; i++) {
    const a = r() * Math.PI * 2
    const d = Math.sqrt(r())
    trees.push([cx + Math.cos(a) * rx * d, cy + Math.sin(a) * ry * d])
  }
  trees.sort((p, q) => p[1] - q[1])
  return trees
    .map(([x, y]) => `<path d="M${f(x)},${f(y)} v9" class="ink"/><circle cx="${f(x)}" cy="${f(y - 3)}" r="7.5" class="tree"/>`)
    .join('')
}

function compass(x: number, y: number): string {
  const pts = (r1: number, r2: number, rot: number) =>
    Array.from({ length: 8 }, (_, i) => {
      const a = rot + (i * Math.PI) / 4
      const r = i % 2 ? r2 : r1
      return `${f(x + Math.sin(a) * r)},${f(y - Math.cos(a) * r)}`
    }).join(' ')
  return `<g class="compass">
<circle cx="${x}" cy="${y}" r="58" class="ink thin"/><circle cx="${x}" cy="${y}" r="50" class="ink hair"/>
<polygon points="${pts(44, 10, Math.PI / 4)}" class="rose-b"/>
<polygon points="${pts(62, 12, 0)}" class="rose-a"/>
<circle cx="${x}" cy="${y}" r="4" class="rose-dot"/>
<text x="${x}" y="${y - 70}" class="lbl n">N</text></g>`
}

export function terraMediaSvg(): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid slice">
<title>Terra-média</title>
<style>
.ink{fill:none;stroke:#4a3320;stroke-width:2.2;stroke-linecap:round;stroke-linejoin:round}
.thin{stroke-width:1.6}.hair{stroke-width:1;opacity:.6}
.hatch{fill:none;stroke:#4a3320;stroke-width:1.2;stroke-linecap:round;opacity:.7}
.tree{fill:#7c8455;stroke:#4a3320;stroke-width:1.6}
.lbl{font-family:'Palatino Linotype','Book Antiqua',Georgia,serif;font-style:italic;fill:#4a3320;font-size:22px;letter-spacing:.14em;text-anchor:middle}
.lbl.n{font-style:normal;font-size:20px;font-weight:bold}
.rose-a{fill:#8c2f22;stroke:#4a3320;stroke-width:1.2}.rose-b{fill:#e9d9b0;stroke:#4a3320;stroke-width:1.2}.rose-dot{fill:#4a3320}
.river{fill:none;stroke:#5c8796;stroke-width:4;stroke-linecap:round}
.river-flow{fill:none;stroke:#d9eef0;stroke-width:2;stroke-linecap:round;stroke-dasharray:5 26;animation:tm-flow 5s linear infinite}
.road{fill:none;stroke:#8a5a32;stroke-width:2.4;stroke-linecap:round;stroke-dasharray:.5 11;animation:tm-walk 14s linear infinite}
.ring-glow{animation:tm-pulse 5s ease-in-out infinite;transform-origin:1352px 578px}
.glint{animation:tm-spin 7s linear infinite;transform-origin:1352px 578px}
@keyframes tm-flow{to{stroke-dashoffset:-62}}
@keyframes tm-walk{to{stroke-dashoffset:-115}}
@keyframes tm-pulse{0%,100%{opacity:.35;transform:scale(.92)}50%{opacity:.85;transform:scale(1.06)}}
@keyframes tm-spin{to{transform:rotate(360deg)}}
@media (prefers-reduced-motion:reduce){*{animation:none!important}}
</style>
<defs>
<radialGradient id="tm-vignette" cx="50%" cy="48%" r="75%">
<stop offset="0.55" stop-color="#f1e4c3"/><stop offset="0.85" stop-color="#e2cb98"/><stop offset="1" stop-color="#b98f55"/></radialGradient>
<radialGradient id="tm-stain" r="50%"><stop offset="0" stop-color="#a77a42" stop-opacity=".18"/><stop offset="1" stop-color="#a77a42" stop-opacity="0"/></radialGradient>
<linearGradient id="tm-gold" x1="0" y1="0" x2="1" y2="1">
<stop offset="0" stop-color="#fff1b0"/><stop offset=".35" stop-color="#e0a92e"/><stop offset=".7" stop-color="#9c6512"/><stop offset="1" stop-color="#f4cf62"/></linearGradient>
<radialGradient id="tm-halo" r="50%"><stop offset="0" stop-color="#ffd76a" stop-opacity=".75"/><stop offset="1" stop-color="#ffd76a" stop-opacity="0"/></radialGradient>
</defs>
<rect width="${W}" height="${H}" fill="url(#tm-vignette)"/>
<ellipse cx="300" cy="560" rx="170" ry="120" fill="url(#tm-stain)"/>
<ellipse cx="1240" cy="200" rx="200" ry="140" fill="url(#tm-stain)"/>
<ellipse cx="760" cy="880" rx="260" ry="90" fill="url(#tm-stain)"/>
<rect x="22" y="22" width="${W - 44}" height="${H - 44}" class="ink thin" opacity=".7"/>
<rect x="32" y="32" width="${W - 64}" height="${H - 64}" class="ink hair"/>

<path d="M1470,250 C1400,300 1300,330 1290,420 S1360,520 1300,640 S1180,760 1215,945" class="river"/>
<path d="M1470,250 C1400,300 1300,330 1290,420 S1360,520 1300,640 S1180,760 1215,945" class="river-flow"/>
<path d="M140,920 C180,820 120,760 190,690 S300,560 250,470 S150,380 230,300" class="road"/>

${range(11, 70, 340, 170, 4, 48, 92)}
<text x="205" y="400" class="lbl">Montanhas Sombrias</text>
${range(29, 1170, 1460, 110, 2, 40, 74)}
${forest(7, 210, 760, 120, 90, 46)}
<text x="215" y="880" class="lbl">Floresta Antiga</text>
<text x="1395" y="380" class="lbl" transform="rotate(-62 1395 380)">Grande Rio</text>

<g>
<circle cx="1352" cy="578" r="70" fill="url(#tm-halo)" class="ring-glow"/>
<ellipse cx="1352" cy="578" rx="36" ry="30" fill="none" stroke="#5a3a10" stroke-width="13" opacity=".35" transform="translate(4 5)"/>
<ellipse cx="1352" cy="578" rx="36" ry="30" fill="none" stroke="url(#tm-gold)" stroke-width="11"/>
<ellipse cx="1352" cy="578" rx="36" ry="30" fill="none" stroke="#fff7d6" stroke-width="1.4" opacity=".7"/>
<g class="glint"><path d="M1352,543 l3,-9 l3,9 l9,3 l-9,3 l-3,9 l-3,-9 l-9,-3 z" fill="#fffbe8" transform="translate(-3 -3)"/></g>
</g>
${compass(1380, 800)}
</svg>`
}

// ---------------------------------------------------------------- night: the far mountains

function stars(seed: number, count: number): string {
  const r = rng(seed)
  let s = ''
  for (let i = 0; i < count; i++) {
    const x = r() * W
    const y = Math.pow(r(), 1.6) * 600
    const rad = r() < 0.12 ? 1.9 : 0.6 + r() * 0.9
    const cls = r() < 0.3 ? ` class="tw tw${1 + Math.floor(r() * 3)}"` : ''
    s += `<circle cx="${f(x)}" cy="${f(y)}" r="${f(rad)}"${cls}/>`
  }
  return `<g fill="#f3efe0">${s}</g>`
}

/** A jagged ridge line across the width, closed down to the bottom. */
function ridge(seed: number, base: number, amp: number, step: number): string {
  const r = rng(seed)
  let d = `M0,${H} L0,${f(base - r() * amp)}`
  for (let x = step; x <= W + step; x += step) {
    const sharp = r() < 0.35 ? amp * 1.5 : amp
    d += ` L${f(x - step / 2)},${f(base - r() * sharp)} L${f(x)},${f(base - r() * amp * 0.4)}`
  }
  return d + ` L${W},${H} Z`
}

export function terraMediaNightSvg(): string {
  const smoke = [0, 1, 2, 3]
    .map(i => `<ellipse cx="1338" cy="575" rx="${28 + i * 6}" ry="${16 + i * 3}" class="smoke" style="animation-delay:${-i * 3.5}s"/>`)
    .join('')
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid slice">
<title>Terra-média, Noite</title>
<style>
.tw{animation:tm-twinkle 4s ease-in-out infinite}.tw2{animation-delay:-1.3s;animation-duration:5.5s}.tw3{animation-delay:-2.6s;animation-duration:3.2s}
.fire{animation:tm-fire 3.4s ease-in-out infinite;transform-origin:1338px 600px}
.beacon{animation:tm-beacon 2.6s ease-in-out infinite}
.smoke{fill:#3a2a2e;filter:url(#tm-soft);animation:tm-rise 14s linear infinite;transform-box:fill-box;transform-origin:center}
.window{animation:tm-hearth 6s ease-in-out infinite}
@keyframes tm-twinkle{0%,100%{opacity:1}50%{opacity:.25}}
@keyframes tm-fire{0%,100%{opacity:.6;transform:scale(.95)}45%{opacity:1;transform:scale(1.08)}70%{opacity:.75}}
@keyframes tm-beacon{0%,100%{opacity:.55}50%{opacity:1}}
@keyframes tm-rise{0%{transform:translate(0,0) scale(.6);opacity:0}15%{opacity:.75}100%{transform:translate(-120px,-420px) scale(2.6);opacity:0}}
@keyframes tm-hearth{0%,100%{opacity:.85}40%{opacity:1}55%{opacity:.78}}
@media (prefers-reduced-motion:reduce){*{animation:none!important}.smoke{opacity:.4}}
</style>
<defs>
<linearGradient id="tm-sky" x1="0" y1="0" x2="0" y2="1">
<stop offset="0" stop-color="#04060e"/><stop offset=".55" stop-color="#0f1530"/><stop offset=".85" stop-color="#1d1a33"/><stop offset="1" stop-color="#2b1b27"/></linearGradient>
<radialGradient id="tm-ember-sky" cx="88%" cy="68%" r="40%">
<stop offset="0" stop-color="#c2461c" stop-opacity=".55"/><stop offset=".5" stop-color="#7a2416" stop-opacity=".18"/><stop offset="1" stop-color="#7a2416" stop-opacity="0"/></radialGradient>
<radialGradient id="tm-fire-glow" r="50%"><stop offset="0" stop-color="#ffcf6b"/><stop offset=".35" stop-color="#ff6a1f" stop-opacity=".8"/><stop offset="1" stop-color="#ff3d0a" stop-opacity="0"/></radialGradient>
<radialGradient id="tm-moon-glow" r="50%"><stop offset="0" stop-color="#dfe6ff" stop-opacity=".35"/><stop offset="1" stop-color="#dfe6ff" stop-opacity="0"/></radialGradient>
<radialGradient id="tm-warm" r="50%"><stop offset="0" stop-color="#ffd27a" stop-opacity=".6"/><stop offset="1" stop-color="#ffb347" stop-opacity="0"/></radialGradient>
<filter id="tm-soft" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="9"/></filter>
<mask id="tm-crescent"><rect width="${W}" height="${H}" fill="#fff"/><circle cx="222" cy="128" r="40" fill="#000"/></mask>
</defs>
<rect width="${W}" height="${H}" fill="url(#tm-sky)"/>
<rect width="${W}" height="${H}" fill="url(#tm-ember-sky)"/>
${stars(5, 230)}
<circle cx="200" cy="140" r="110" fill="url(#tm-moon-glow)"/>
<circle cx="200" cy="140" r="44" fill="#e9ecf6" mask="url(#tm-crescent)"/>

<path d="${ridge(3, 690, 120, 70)}" fill="#141a33"/>
${smoke}
<path d="M1180,760 L1310,590 L1326,598 L1350,592 L1366,600 L1500,760 Z" fill="#1a1222"/>
<ellipse cx="1338" cy="600" rx="60" ry="34" fill="url(#tm-fire-glow)" class="fire"/>
<path d="M1310,590 L1326,598 L1350,592 L1366,600" fill="none" stroke="#ff8a3a" stroke-width="3" class="fire" opacity=".9"/>
<path d="M1196,800 L1196,640 L1186,640 L1200,600 L1204,560 L1208,600 L1222,640 L1212,640 L1212,800 Z" fill="#07080f"/>
<ellipse cx="1204" cy="596" rx="5" ry="3" fill="#ff5a1e" class="beacon"/>
<ellipse cx="1204" cy="596" rx="18" ry="12" fill="url(#tm-fire-glow)" class="beacon" opacity=".7"/>
<path d="${ridge(17, 800, 70, 55)}" fill="#0b0e1d"/>
<path d="M0,${H} L0,760 C90,705 260,700 380,790 C420,820 430,880 430,${H} Z" fill="#0d1612"/>
<circle cx="190" cy="812" r="90" fill="url(#tm-warm)" class="window"/>
<circle cx="190" cy="822" r="30" fill="#2a1a0c" stroke="#3b2a16" stroke-width="5"/>
<circle cx="190" cy="822" r="24" fill="#f2b950" class="window"/>
<circle cx="200" cy="824" r="2.5" fill="#5a3a12"/>
<circle cx="290" cy="802" r="13" fill="#e8a43c" class="window" style="animation-delay:-2s"/>
<path d="M277,802 h26 M290,789 v26" stroke="#2a1a0c" stroke-width="2.5"/>
<path d="M0,${H} L0,880 C200,860 360,900 520,${H} Z" fill="#080d0b"/>
</svg>`
}
