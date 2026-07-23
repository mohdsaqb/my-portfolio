import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const NAV_OFFSET = 80; // matches the `offset={-80}` react-scroll uses for in-page nav links

/**
 * Scrolls to the section matching the URL hash (e.g. `#projects`) on load
 * and whenever the hash changes. Needed because entry points that arrive
 * with a hash already set - manifest shortcuts, a shared link, a browser
 * back/forward through history - land here via a plain navigation, not a
 * react-scroll click, so react-scroll's own handlers never fire for them.
 */
export default function useScrollToHash() {
  const { hash } = useLocation();

  useEffect(() => {
    if (!hash) return;

    const id = decodeURIComponent(hash.slice(1));

    // Section content mounts synchronously, but wait a tick so the loading
    // screen/entrance animations aren't mid-layout when we measure position.
    const timeout = setTimeout(() => {
      const el = document.getElementById(id);
      if (!el) return;
      const top = el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET;
      window.scrollTo({ top, behavior: 'smooth' });
    }, 120);

    return () => clearTimeout(timeout);
  }, [hash]);
}
