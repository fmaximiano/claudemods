/**
 * Sombra e Mithril: a night-blue map of Middle-earth in silver and gold. A white tree under seven stars at the lower
 * left, slow-turning rings with calligraphic glyphs at the upper right, hatched fire-mountains at the lower right,
 * embers drifting up. Every id has a hyphen. Motion rests when the system asks for reduced motion.
 */

/** Embers that rise and fade: [x, y, radius, seconds, delay]. */
const EMBERS: [number, number, number, number, number][] = [
  [1580, 460, 1.4, 11, 0], [1690, 540, 1.1, 14, -4], [1490, 680, 1.6, 12, -7], [1820, 610, 1.2, 16, -2],
  [1640, 820, 1.3, 13, -9], [1760, 900, 1.0, 15, -5], [1530, 960, 1.5, 12, -11], [1870, 780, 1.1, 17, -13],
  [420, 640, 1.2, 18, -3], [510, 790, 1.0, 20, -10],
]

export function shadowMithrilSvg(): string {
  const embers = EMBERS.map(
    ([x, y, r, s, d]) => `<circle cx="${x}" cy="${y}" r="${r}" class="me-ember" style="animation-duration:${s}s;animation-delay:${d}s"/>`,
  ).join('')
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice">
<title>Sombra e Mithril</title>
<style>
.me-orbit{animation:me-turn 360s linear infinite}
.me-orbit-back{animation:me-turn 240s linear infinite reverse}
.me-glyphs{animation:me-glow 7s ease-in-out infinite}
.me-glyphs-in{animation:me-glow 9s ease-in-out infinite;animation-delay:-4s}
.me-star{animation:me-twinkle 5s ease-in-out infinite}
.me-mordor{animation:me-breathe 9s ease-in-out infinite}
.me-ember{fill:#FDE047;opacity:0;transform-box:fill-box;transform-origin:center;animation:me-rise 14s linear infinite}
@keyframes me-turn{to{transform:rotate(360deg)}}
@keyframes me-glow{0%,100%{opacity:.55}50%{opacity:1}}
@keyframes me-twinkle{0%,100%{opacity:1}50%{opacity:.35}}
@keyframes me-breathe{0%,100%{opacity:.75}50%{opacity:1}}
@keyframes me-rise{0%{opacity:0;transform:translate(0,0)}15%{opacity:.35}70%{opacity:.2}100%{opacity:0;transform:translate(-30px,-260px)}}
@media (prefers-reduced-motion:reduce){*{animation:none!important}.me-ember{opacity:.25}}
</style>
<defs>
<radialGradient id="me-gondor-glow" cx="15%" cy="85%" r="65%">
<stop offset="0%" stop-color="#1E3A5F" stop-opacity="0.42"/><stop offset="55%" stop-color="#0D131D" stop-opacity="0.15"/><stop offset="100%" stop-color="#090C12" stop-opacity="0"/></radialGradient>
<radialGradient id="me-mordor-glow" cx="92%" cy="18%" r="60%">
<stop offset="0%" stop-color="#9A4E1C" stop-opacity="0.34"/><stop offset="45%" stop-color="#4A220D" stop-opacity="0.16"/><stop offset="100%" stop-color="#090C12" stop-opacity="0"/></radialGradient>
<radialGradient id="me-ember-glow" cx="88%" cy="92%" r="45%">
<stop offset="0%" stop-color="#B86B35" stop-opacity="0.22"/><stop offset="100%" stop-color="#090C12" stop-opacity="0"/></radialGradient>
<filter id="me-ring-glow" x="-20%" y="-20%" width="140%" height="140%">
<feGaussianBlur stdDeviation="3.5" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
<pattern id="me-hatch" width="10" height="10" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
<line x1="0" y1="0" x2="0" y2="10" stroke="#C5834B" stroke-width="0.9" stroke-opacity="0.24"/></pattern>
<linearGradient id="me-mithril" x1="0%" y1="0%" x2="0%" y2="100%">
<stop offset="0%" stop-color="#F8FAFC" stop-opacity="0.45"/><stop offset="65%" stop-color="#CBD5E1" stop-opacity="0.28"/><stop offset="100%" stop-color="#64748B" stop-opacity="0.12"/></linearGradient>
<linearGradient id="me-gold" x1="0%" y1="0%" x2="100%" y2="100%">
<stop offset="0%" stop-color="#FDE047" stop-opacity="0.55"/><stop offset="50%" stop-color="#D4AF37" stop-opacity="0.38"/><stop offset="100%" stop-color="#9E7B4F" stop-opacity="0.18"/></linearGradient>
</defs>

<rect width="1920" height="1080" fill="#0B0F17"/>
<rect width="1920" height="1080" fill="url(#me-gondor-glow)"/>
<rect width="1920" height="1080" fill="url(#me-mordor-glow)" class="me-mordor"/>
<rect width="1920" height="1080" fill="url(#me-ember-glow)"/>

<g fill="none" stroke="#94A3B8" stroke-width="0.75" stroke-opacity="0.13">
<path d="M -40 680 C 120 690, 180 790, 290 830 C 410 870, 460 990, 490 1100"/>
<path d="M -40 715 C 105 725, 165 815, 270 855 C 380 895, 425 1005, 450 1100"/>
<path d="M -40 750 C 90 760, 150 840, 250 880 C 350 920, 390 1020, 410 1100"/>
<path d="M -40 785 C 75 795, 135 865, 230 905 C 320 945, 355 1035, 370 1100"/>
<path d="M -40 820 C 60 830, 120 890, 210 930 C 290 970, 320 1050, 330 1100"/>
<path d="M -40 855 C 45 865, 105 915, 190 955 C 260 995, 285 1065, 290 1100"/>
</g>

<g transform="translate(210, 860)" fill="none" stroke="url(#me-mithril)" stroke-linecap="round" stroke-linejoin="round">
<path d="M 0 110 C -15 135, -45 150, -85 162" stroke-width="2.2"/>
<path d="M 0 110 C 15 135, 45 150, 85 162" stroke-width="2.2"/>
<path d="M -4 115 C -25 142, -30 165, -52 178" stroke-width="1.5"/>
<path d="M 4 115 C 25 142, 30 165, 52 178" stroke-width="1.5"/>
<path d="M 0 118 C -8 148, -12 168, -18 185" stroke-width="1.2"/>
<path d="M 0 118 C 8 148, 12 168, 18 185" stroke-width="1.2"/>
<path d="M -6 112 C -8 65, -5 25, -4 -15" stroke-width="3.2"/>
<path d="M 6 112 C 8 65, 5 25, 4 -15" stroke-width="3.2"/>
<path d="M 0 105 L 0 -25" stroke-width="1.4" stroke-opacity="0.6"/>
<path d="M -5 30 C -45 15, -85 -5, -115 -35" stroke-width="2"/>
<path d="M 5 30 C 45 15, 85 -5, 115 -35" stroke-width="2"/>
<path d="M -55 12 C -75 20, -95 18, -110 8" stroke-width="1.3"/>
<path d="M 55 12 C 75 20, 95 18, 110 8" stroke-width="1.3"/>
<path d="M -4 5 C -42 -20, -72 -50, -92 -88" stroke-width="1.8"/>
<path d="M 4 5 C 42 -20, 72 -50, 92 -88" stroke-width="1.8"/>
<path d="M -45 -24 C -68 -24, -85 -35, -98 -52" stroke-width="1.2"/>
<path d="M 45 -24 C 68 -24, 85 -35, 98 -52" stroke-width="1.2"/>
<path d="M -3 -15 C -28 -48, -45 -82, -52 -122" stroke-width="1.6"/>
<path d="M 3 -15 C 28 -48, 45 -82, 52 -122" stroke-width="1.6"/>
<path d="M 0 -22 C -12 -65, -16 -98, -18 -138" stroke-width="1.4"/>
<path d="M 0 -22 C 12 -65, 16 -98, 18 -138" stroke-width="1.4"/>
<path d="M 0 -25 L 0 -148" stroke-width="1.3"/>
<path d="M -22 -162 L -14 -176 L 0 -166 L 14 -176 L 22 -162 Q 0 -156 -22 -162 Z" stroke="#D4AF37" stroke-opacity="0.45" stroke-width="1.2"/>
<g fill="#F8FAFC" fill-opacity="0.45" stroke="none">
<polygon class="me-star" points="0,-196 1.5,-190 7,-189 1.5,-187.5 0,-182 -1.5,-187.5 -7,-189 -1.5,-190"/>
<polygon class="me-star" style="animation-delay:-0.7s" points="-58,-154 -57,-149 -52,-148 -57,-147 -58,-142 -59,-147 -64,-148 -59,-149"/>
<polygon class="me-star" style="animation-delay:-1.4s" points="58,-154 59,-149 64,-148 59,-147 58,-142 57,-147 52,-148 57,-149"/>
<polygon class="me-star" style="animation-delay:-2.1s" points="-106,-106 -105,-101 -100,-100 -105,-99 -106,-94 -107,-99 -112,-100 -107,-101"/>
<polygon class="me-star" style="animation-delay:-2.8s" points="106,-106 107,-101 112,-100 107,-99 106,-94 105,-99 100,-100 105,-101"/>
<polygon class="me-star" style="animation-delay:-3.5s" points="-132,-48 -131,-44 -127,-43 -131,-42 -132,-38 -133,-42 -137,-43 -133,-44"/>
<polygon class="me-star" style="animation-delay:-4.2s" points="132,-48 133,-44 137,-43 133,-42 132,-38 131,-42 127,-43 131,-44"/>
</g>
</g>

<g transform="translate(1740, 195)" filter="url(#me-ring-glow)">
<g class="me-orbit">
<circle r="290" fill="none" stroke="url(#me-gold)" stroke-width="1.2"/>
<circle r="252" fill="none" stroke="url(#me-gold)" stroke-width="0.8" stroke-dasharray="14 6 3 6"/>
<circle r="215" fill="none" stroke="url(#me-gold)" stroke-width="1.4"/>
<g class="me-glyphs" fill="none" stroke="#FDE047" stroke-opacity="0.42" stroke-width="1.35" stroke-linecap="round">
<g transform="rotate(115) translate(0, -233)">
<path d="M -28 8 C -26 -8, -22 -14, -18 -14 C -14 -14, -15 -2, -16 4 C -11 -4, -6 -6, -3 -2 C 0 2, -2 8, 3 8"/>
<path d="M -22 -19 C -20 -21, -17 -21, -15 -19" stroke-width="1.1"/>
<path d="M 10 -12 L 6 10 M 8 -4 C 14 -8, 21 -6, 20 1 C 19 7, 12 8, 8 5"/>
<circle cx="14" cy="-14" r="1.2" fill="#FDE047" fill-opacity="0.45"/>
</g>
<g transform="rotate(142) translate(0, -233)">
<path d="M -26 -10 C -22 -10, -24 6, -20 9 C -16 12, -11 4, -12 -3 C -13 -8, -18 -7, -18 -2"/>
<path d="M -2 -14 L -6 9 M -4 -6 C 2 -10, 8 -8, 7 -1 C 13 -7, 19 -5, 18 2 C 17 8, 11 9, 8 6"/>
<path d="M 2 -18 L 6 -21 M 8 -18 L 12 -21" stroke-width="1.1"/>
</g>
<g transform="rotate(169) translate(0, -233)">
<path d="M -25 6 C -21 -6, -15 -12, -11 -10 C -7 -8, -11 4, -7 7 C -3 10, 3 2, 4 -5"/>
<path d="M 12 -13 C 16 -13, 14 4, 11 11 M 13 -4 C 19 -7, 25 -4, 23 3 C 21 8, 15 8, 12 5"/>
<path d="M 16 -18 C 18 -20, 21 -20, 23 -18" stroke-width="1.1"/>
</g>
<g transform="rotate(196) translate(0, -233)">
<path d="M -28 -8 L -32 10 M -30 -2 C -24 -7, -18 -5, -19 2 C -20 7, -26 8, -29 5"/>
<path d="M -8 -12 C -4 -12, -6 5, -2 8 C 2 11, 8 5, 8 -2 C 8 -8, 2 -8, 1 -3"/>
<path d="M 16 -10 C 20 -12, 24 -8, 22 -1 C 20 5, 16 9, 22 9"/>
<circle cx="-3" cy="-16" r="1.2" fill="#FDE047" fill-opacity="0.45"/>
</g>
<g transform="rotate(223) translate(0, -233)">
<path d="M -26 7 C -24 -7, -19 -13, -15 -13 C -11 -13, -13 -1, -14 5 C -9 -3, -4 -5, -1 -1 C 2 3, 0 8, 5 8"/>
<path d="M 12 -11 L 8 10 M 10 -3 C 16 -7, 22 -5, 21 2 C 20 8, 13 8, 10 5"/>
</g>
</g>
</g>
<g class="me-orbit-back">
<circle r="168" fill="none" stroke="#D4AF37" stroke-opacity="0.22" stroke-width="0.75"/>
<circle r="115" fill="none" stroke="#C5834B" stroke-opacity="0.18" stroke-width="0.9" stroke-dasharray="4 8"/>
<g class="me-glyphs-in" fill="none" stroke="#D4AF37" stroke-opacity="0.28" stroke-width="1" stroke-linecap="round">
<g transform="rotate(128) translate(0, -191)">
<path d="M -18 -6 L -20 7 M -19 -1 C -14 -5, -9 -3, -10 2 M -2 -7 C 2 -7, 0 5, 4 7 C 8 9, 12 3, 11 -2"/>
</g>
<g transform="rotate(162) translate(0, -191)">
<path d="M -16 5 C -13 -4, -8 -8, -5 -6 C -2 -4, -5 4, -2 6 M 6 -8 L 4 7 M 5 -2 C 10 -5, 15 -3, 14 2"/>
</g>
<g transform="rotate(196) translate(0, -191)">
<path d="M -18 -7 L -20 7 M -19 -1 C -14 -5, -9 -3, -10 2 C -5 -4, 0 -2, -1 3 M 8 -6 C 12 -6, 10 5, 14 7"/>
</g>
</g>
</g>
</g>

<g transform="translate(1320, 740)">
<path d="M 120 340 L 235 165 L 310 225 L 425 95 L 530 190 L 620 125 L 620 340 Z" fill="url(#me-hatch)"/>
<g fill="none" stroke="#C5834B" stroke-linecap="round" stroke-linejoin="round">
<path d="M 120 340 L 235 165 L 310 225 L 425 95 L 530 190 L 620 125" stroke-width="1.3" stroke-opacity="0.34"/>
<path d="M 235 165 L 255 240 L 220 340" stroke-width="0.9" stroke-opacity="0.24"/>
<path d="M 425 95 L 405 185 L 445 255 L 415 340" stroke-width="1" stroke-opacity="0.28"/>
<path d="M 530 190 L 505 265 L 525 340" stroke-width="0.85" stroke-opacity="0.22"/>
<path d="M 60 340 C 110 265, 155 210, 215 145" stroke-width="0.7" stroke-opacity="0.16"/>
<path d="M 25 340 C 80 255, 135 190, 195 125" stroke-width="0.7" stroke-opacity="0.11"/>
</g>
</g>

<g>${embers}</g>
</svg>`
}
