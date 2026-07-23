import { useRegisterSW } from 'virtual:pwa-register/react';
import { FiRefreshCw, FiWifi, FiX } from 'react-icons/fi';

/**
 * Registers the service worker and surfaces its two lifecycle states:
 *  - `needRefresh`: a new deployment has been fetched and is waiting to take
 *    over. We never swap it in automatically (that would yank the page out
 *    from under someone mid-scroll) - the user has to hit "Reload".
 *  - `offlineReady`: first-time install finished precaching, so the app now
 *    works without a network connection.
 */
export default function UpdateToast() {
  const {
    offlineReady: [offlineReady, setOfflineReady],
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegisteredSW(_url, registration) {
      if (!registration) return;
      // Long-lived open tabs won't otherwise notice a new deploy until the
      // next full navigation, so poll periodically for a fresh worker.
      setInterval(() => registration.update(), 60 * 60 * 1000);
    },
    onRegisterError(error) {
      console.error('Service worker registration failed:', error);
    },
  });

  const dismiss = () => {
    setOfflineReady(false);
    setNeedRefresh(false);
  };

  if (!offlineReady && !needRefresh) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed inset-x-0 bottom-4 z-[100] flex justify-center px-4 sm:justify-end sm:right-6 sm:px-0"
    >
      <div className="glass flex w-full max-w-sm items-start gap-3 rounded-2xl border border-white/10 p-4 shadow-2xl">
        <div className="mt-0.5 flex h-8 w-8 flex-none items-center justify-center rounded-full bg-gradient-to-r from-primary to-accent text-white">
          {needRefresh ? <FiRefreshCw size={16} aria-hidden="true" /> : <FiWifi size={16} aria-hidden="true" />}
        </div>

        <div className="flex-1">
          <p className="text-sm font-semibold text-white">
            {needRefresh ? 'Update available' : 'Ready to work offline'}
          </p>
          <p className="mt-0.5 text-xs text-gray-400">
            {needRefresh
              ? 'A new version of this site has been downloaded.'
              : "This site has been cached and now loads without a connection."}
          </p>

          {needRefresh && (
            <button
              type="button"
              onClick={() => updateServiceWorker(true)}
              className="mt-3 rounded-full bg-gradient-to-r from-primary to-accent px-4 py-1.5 text-xs font-semibold text-white shadow-glow transition-shadow hover:shadow-glow-accent"
            >
              Reload to update
            </button>
          )}
        </div>

        <button
          type="button"
          onClick={dismiss}
          aria-label="Dismiss notification"
          className="flex h-7 w-7 flex-none items-center justify-center rounded-full text-gray-400 transition-colors hover:text-white"
        >
          <FiX size={16} />
        </button>
      </div>
    </div>
  );
}
