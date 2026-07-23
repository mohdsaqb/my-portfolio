/**
 * Custom service worker (injectManifest strategy).
 *
 * Vite-plugin-pwa builds this file, replacing `self.__WB_MANIFEST` with the
 * precache list (hashed JS/CSS/fonts from the build) before writing it to
 * dist/sw.js. Keeping the source here (instead of using the generateSW
 * strategy) gives us full control over the offline fallback page and the
 * update-notification flow used by src/pwa/registerSW.js.
 */
import { cleanupOutdatedCaches, createHandlerBoundToURL, precacheAndRoute } from 'workbox-precaching';
import { NavigationRoute, registerRoute, setCatchHandler } from 'workbox-routing';
import { CacheFirst, StaleWhileRevalidate } from 'workbox-strategies';
import { ExpirationPlugin } from 'workbox-expiration';
import { CacheableResponsePlugin } from 'workbox-cacheable-response';

const OFFLINE_URL = `${self.registration.scope}offline.html`;

// --- Precache the built app shell (HTML/CSS/JS/fonts emitted by the build) ---
precacheAndRoute(self.__WB_MANIFEST);
cleanupOutdatedCaches();

// --- App shell navigation: serve the precached index.html for any route ---
// so client-side routing (React Router) works offline. Falls through to the
// catch handler below if the shell itself was never cached (first-run,
// interrupted install, or an unsupported scenario).
const appShellHandler = createHandlerBoundToURL('index.html');
registerRoute(new NavigationRoute(appShellHandler));

// --- Google Fonts stylesheet: revalidate in the background, serve fast ---
registerRoute(
  ({ url }) => url.origin === 'https://fonts.googleapis.com',
  new StaleWhileRevalidate({ cacheName: 'google-fonts-stylesheets' })
);

// --- Google Fonts font files: rarely change, cache aggressively ---
registerRoute(
  ({ url }) => url.origin === 'https://fonts.gstatic.com',
  new CacheFirst({
    cacheName: 'google-fonts-webfonts',
    plugins: [
      new CacheableResponsePlugin({ statuses: [0, 200] }),
      new ExpirationPlugin({ maxAgeSeconds: 60 * 60 * 24 * 365, maxEntries: 30 }),
    ],
  })
);

// --- Same-origin images (icons, screenshots, etc.) ---
registerRoute(
  ({ request }) => request.destination === 'image',
  new CacheFirst({
    cacheName: 'images',
    plugins: [
      new CacheableResponsePlugin({ statuses: [0, 200] }),
      new ExpirationPlugin({ maxEntries: 80, maxAgeSeconds: 60 * 60 * 24 * 30 }),
    ],
  })
);

// Note: the resume PDF, favicons, and manifest icons are all listed in
// `includeAssets` (vite.config.js) so they ride along in the precache
// manifest above rather than needing a separate runtime route.

// --- Last resort: if a navigation isn't in the cache and the network is
// down, show the dedicated offline page instead of a browser error screen ---
setCatchHandler(async ({ request }) => {
  if (request.destination === 'document') {
    const cache = await caches.open('offline-fallback');
    return (await cache.match(OFFLINE_URL)) ?? Response.error();
  }
  return Response.error();
});

// Pre-warm the offline fallback page into its own cache at install time.
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('offline-fallback').then((cache) => cache.add(new Request(OFFLINE_URL, { cache: 'reload' })))
  );
});

// --- Update flow ---
// The page keeps the new worker "waiting" until the user accepts the
// "Update available" banner (see src/pwa/registerSW.js + UpdateToast),
// then posts this message to activate it immediately.
self.addEventListener('message', (event) => {
  if (event.data?.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
