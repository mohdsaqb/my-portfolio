import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// Repo name for the GitHub Pages project page: https://mohdsaqb.github.io/my-portfolio/
// Everything below (router basename, manifest start_url/scope, service worker scope)
// derives from this at build time via `base` / import.meta.env.BASE_URL.
const BASE_PATH = '/my-portfolio/'

// https://vite.dev/config/
export default defineConfig({
  base: BASE_PATH,
  plugins: [
    react(),
    VitePWA({
      // We own the service worker (src/sw.js) so we control the offline
      // fallback page and the update-prompt flow precisely.
      strategies: 'injectManifest',
      srcDir: 'src',
      filename: 'sw.js',
      injectManifest: {
        // A couple of fonts/vendor chunks can be larger than Workbox's 2MB default.
        maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
      },

      // Let our own UpdateToast component decide when to activate the new
      // worker, instead of auto-reloading the page behind the user's back.
      registerType: 'prompt',
      injectRegister: false,

      // Only used by the browser dev tools "Application" tab / installability
      // checks — actual registration happens in src/pwa/registerSW.js.
      manifest: {
        id: BASE_PATH,
        name: 'Mohd Saqib | Software Engineer & Full Stack Developer',
        short_name: 'Mohd Saqib',
        description:
          'Mohd Saqib — Software Engineer, Full Stack Developer and AI Enthusiast. Explore projects, experience, and skills.',
        start_url: BASE_PATH,
        scope: BASE_PATH,
        display: 'standalone',
        display_override: ['window-controls-overlay', 'standalone', 'minimal-ui'],
        orientation: 'portrait-primary',
        background_color: '#0f172a',
        theme_color: '#0f172a',
        lang: 'en',
        categories: ['portfolio', 'business', 'productivity'],
        icons: [
          { src: 'icons/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
          { src: 'icons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
          { src: 'icons/icon-512-maskable.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },

      includeAssets: [
        'favicon.svg',
        'favicon-16.png',
        'favicon-32.png',
        'apple-touch-icon.png',
        'icons/*.png',
        'offline.html',
        'resume.pdf',
      ],

      devOptions: {
        // Keep the SW out of `npm run dev` so hot-reloading never fights a cache.
        enabled: false,
        type: 'module',
      },
    }),
  ],
})
