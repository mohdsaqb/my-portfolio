/**
 * Generates PWA/app icons and the social share (Open Graph) image from
 * public/favicon.svg.
 *
 * Re-run with `npm run generate:icons` any time the brand mark, name, or
 * tagline changes.
 *
 * Note: the source SVG declares fills as `fill:#863bff;fill:color(display-p3 ...)`.
 * That's valid CSS (the display-p3 value wins in browsers that support it), but
 * neither of our rasterizers agree with browsers about it: librsvg (used by
 * sharp) mishandles the SVG's gaussian-blur filter regions and bakes in opaque
 * black bars, and resvg doesn't parse the `color()` function and falls back to
 * black fill. Stripping the display-p3 duplicate and keeping the plain hex
 * fallback renders correctly in both, so we sanitize before rasterizing with
 * resvg (accurate filters/masks), then hand the clean raster to sharp for
 * compositing onto icon backgrounds and resizing.
 */
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { Resvg } from '@resvg/resvg-js';
import sharp from 'sharp';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const publicDir = join(root, 'public');
const iconsDir = join(publicDir, 'icons');

const THEME_BG = '#0f172a'; // matches manifest background_color / theme_color

await mkdir(iconsDir, { recursive: true });

const rawSvg = await readFile(join(publicDir, 'favicon.svg'), 'utf8');
const sanitizedSvg = rawSvg.replace(/;?fill:color\(display-p3[^)]*\)/g, '');
// The bare <path> geometry (no defs/mask/filters) so it can be embedded inline
// inside the hand-authored OG-image SVG below.
const boltPathD = sanitizedSvg.match(/<path fill="#863bff" d="([^"]+)"/)[1];

/** Rasterizes an SVG string at a given pixel width via resvg. */
function rasterizeSvg(svg, pxWidth) {
  const resvg = new Resvg(svg, { fitTo: { mode: 'width', value: pxWidth } });
  return resvg.render().asPng();
}

/**
 * Renders the logo mark onto a square canvas.
 * @param {number} size final PNG side length in px
 * @param {object} opts
 * @param {string|null} opts.background CSS color, or null for transparent
 * @param {number} opts.coverage fraction of the canvas the logo mark should occupy (0-1)
 */
async function renderIcon(size, { background, coverage }) {
  const logoWidth = Math.round(size * coverage);
  const logo = rasterizeSvg(sanitizedSvg, logoWidth);

  const canvas = sharp({
    create: {
      width: size,
      height: size,
      channels: 4,
      background: background ?? { r: 0, g: 0, b: 0, alpha: 0 },
    },
  });

  return canvas
    .composite([{ input: logo, gravity: 'center' }])
    .png()
    .toBuffer();
}

/** Renders the 1200x630 Open Graph / Twitter card share image. */
function renderOgImage() {
  const svg = `
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="blob1" cx="12%" cy="18%" r="55%">
      <stop offset="0%" stop-color="#3b82f6" stop-opacity="0.35"/>
      <stop offset="100%" stop-color="#3b82f6" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="blob2" cx="92%" cy="88%" r="60%">
      <stop offset="0%" stop-color="#38bdf8" stop-opacity="0.28"/>
      <stop offset="100%" stop-color="#38bdf8" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="bolt" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#863bff"/>
      <stop offset="100%" stop-color="#47bfff"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="#0f172a"/>
  <rect width="1200" height="630" fill="url(#blob1)"/>
  <rect width="1200" height="630" fill="url(#blob2)"/>
  <g transform="translate(90,203) scale(4.5)">
    <path fill="url(#bolt)" d="${boltPathD}"/>
  </g>
  <text x="332" y="298" font-family="Arial, Helvetica, sans-serif" font-size="72" font-weight="700" fill="#ffffff">Mohd Saqib</text>
  <text x="334" y="356" font-family="Arial, Helvetica, sans-serif" font-size="33" font-weight="500" fill="#94a3b8">Software Engineer &amp; Full Stack Developer</text>
  <text x="334" y="404" font-family="Arial, Helvetica, sans-serif" font-size="26" font-weight="400" fill="#64748b">Building scalable apps, interactive UX &amp; AI-powered products</text>
</svg>`.trim();

  return rasterizeSvg(svg, 1200);
}

const jobs = [
  // Manifest icons ("any" purpose) - opaque so they read cleanly on any launcher background
  { file: join(iconsDir, 'icon-192.png'), render: () => renderIcon(192, { background: THEME_BG, coverage: 0.6 }) },
  { file: join(iconsDir, 'icon-512.png'), render: () => renderIcon(512, { background: THEME_BG, coverage: 0.6 }) },
  // Maskable icon - logo kept inside the ~80% safe-zone circle so OS masks don't clip it
  {
    file: join(iconsDir, 'icon-512-maskable.png'),
    render: () => renderIcon(512, { background: THEME_BG, coverage: 0.42 }),
  },
  // iOS home screen icon - iOS applies its own rounded-corner mask, ignores transparency
  {
    file: join(publicDir, 'apple-touch-icon.png'),
    render: () => renderIcon(180, { background: THEME_BG, coverage: 0.6 }),
  },
  // Browser tab favicons - transparent so they sit naturally in any browser chrome
  { file: join(publicDir, 'favicon-32.png'), render: () => renderIcon(32, { background: null, coverage: 0.9 }) },
  { file: join(publicDir, 'favicon-16.png'), render: () => renderIcon(16, { background: null, coverage: 0.9 }) },
  // Open Graph / Twitter card social preview image
  { file: join(publicDir, 'og-image.png'), render: renderOgImage },
];

for (const job of jobs) {
  const buffer = await job.render();
  await writeFile(job.file, buffer);
  console.log(`generated ${job.file.replace(root + '/', '')}`);
}

console.log('\nDone. Icons written to public/ and public/icons/, OG image to public/og-image.png.');
