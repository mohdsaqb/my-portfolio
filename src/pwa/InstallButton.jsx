import { useEffect, useState } from 'react';
import { FiDownload } from 'react-icons/fi';

function isRunningStandalone() {
  return (
    window.matchMedia?.('(display-mode: standalone)').matches ||
    // iOS Safari's pre-standard flag for "launched from home screen"
    window.navigator.standalone === true
  );
}

/**
 * Renders nothing until the browser fires `beforeinstallprompt` (Chrome/Edge
 * on Android, Windows, macOS), then shows an "Install App" button that
 * triggers the native install dialog. Hides itself permanently once the app
 * is installed or already running standalone.
 *
 * iOS Safari never fires `beforeinstallprompt` - there install is manual via
 * Share > Add to Home Screen, which the manifest + apple-touch-icon meta
 * tags in index.html already support without any JS.
 */
export default function InstallButton({ className }) {
  const [installPrompt, setInstallPrompt] = useState(null);
  const [installed, setInstalled] = useState(false);

  useEffect(() => {
    setInstalled(isRunningStandalone());

    const onBeforeInstallPrompt = (event) => {
      event.preventDefault();
      setInstallPrompt(event);
    };
    const onInstalled = () => {
      setInstalled(true);
      setInstallPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', onBeforeInstallPrompt);
    window.addEventListener('appinstalled', onInstalled);
    return () => {
      window.removeEventListener('beforeinstallprompt', onBeforeInstallPrompt);
      window.removeEventListener('appinstalled', onInstalled);
    };
  }, []);

  if (installed || !installPrompt) return null;

  const handleInstall = async () => {
    installPrompt.prompt();
    const { outcome } = await installPrompt.userChoice;
    if (outcome === 'accepted') setInstalled(true);
    setInstallPrompt(null);
  };

  return (
    <button
      type="button"
      onClick={handleInstall}
      aria-label="Install this app on your device"
      className={className ?? 'flex items-center gap-2 rounded-full glass px-3 py-1.5 text-xs text-gray-300 transition-colors hover:text-white'}
    >
      <FiDownload aria-hidden="true" /> <span>Install App</span>
    </button>
  );
}
