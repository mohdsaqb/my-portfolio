import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { scroller } from 'react-scroll';
import { FiArrowRight, FiCommand, FiDownload, FiMail, FiMoon, FiSun } from 'react-icons/fi';
import useTheme from '../../hooks/useTheme';

const NAV_TARGETS = [
  { label: 'Go to Home', target: 'home' },
  { label: 'Go to About', target: 'about' },
  { label: 'Go to Skills', target: 'skills' },
  { label: 'Go to Experience', target: 'experience' },
  { label: 'Go to Projects', target: 'projects' },
  { label: 'Go to Achievements', target: 'achievements' },
  { label: 'Go to Leadership', target: 'leadership' },
  { label: 'Go to Contact', target: 'contact' },
];

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handler = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const actions = useMemo(
    () => [
      ...NAV_TARGETS.map((item) => ({
        icon: FiArrowRight,
        label: item.label,
        run: () => scroller.scrollTo(item.target, { smooth: true, duration: 600, offset: -80 }),
      })),
      {
        icon: theme === 'dark' ? FiSun : FiMoon,
        label: theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode',
        run: toggleTheme,
      },
      {
        icon: FiDownload,
        label: 'Download Resume',
        run: () => window.open('/resume.pdf', '_blank'),
      },
      {
        icon: FiMail,
        label: 'Send an Email',
        run: () => window.open('mailto:riyanahmad99@gmail.com'),
      },
    ],
    [theme, toggleTheme]
  );

  const filtered = actions.filter((a) => a.label.toLowerCase().includes(query.toLowerCase()));

  const runAction = (action) => {
    action.run();
    setOpen(false);
    setQuery('');
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[90] flex items-start justify-center bg-black/60 backdrop-blur-sm px-4 pt-28"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setOpen(false)}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            initial={{ opacity: 0, y: -20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.97 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg overflow-hidden rounded-2xl border border-white/10 bg-card shadow-2xl"
          >
            <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3">
              <FiCommand className="text-accent" aria-hidden="true" />
              <label htmlFor="command-palette-input" className="sr-only">
                Search commands
              </label>
              <input
                id="command-palette-input"
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type a command or search..."
                className="w-full bg-transparent text-sm text-white placeholder:text-gray-500 focus:outline-none"
              />
              <kbd className="rounded border border-white/10 px-1.5 py-0.5 text-[10px] text-gray-500">ESC</kbd>
            </div>
            <div className="max-h-80 overflow-y-auto py-2">
              {filtered.length === 0 && <p className="px-4 py-6 text-center text-sm text-gray-500">No results found.</p>}
              {filtered.map((action) => (
                <button
                  key={action.label}
                  onClick={() => runAction(action)}
                  className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm text-gray-300 hover:bg-white/5 hover:text-white transition-colors"
                >
                  <action.icon className="text-accent" />
                  {action.label}
                </button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
