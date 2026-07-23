import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'react-scroll';
import { FiCommand, FiDownload, FiMenu, FiMoon, FiSun, FiX } from 'react-icons/fi';
import useTheme from '../../hooks/useTheme';
import { PERSONAL } from '../../constants/data';
import InstallButton from '../../pwa/InstallButton';

const NAV_LINKS = [
  { label: 'Home', target: 'home' },
  { label: 'About', target: 'about' },
  { label: 'Skills', target: 'skills' },
  { label: 'Experience', target: 'experience' },
  { label: 'Projects', target: 'projects' },
  { label: 'Achievements', target: 'achievements' },
  { label: 'Leadership', target: 'leadership' },
  { label: 'Contact', target: 'contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
  }, [mobileOpen]);

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'py-3 glass shadow-card' : 'py-5 bg-transparent'
      }`}
    >
      <nav className="section-container flex items-center justify-between">
        <Link
          to="home"
          smooth
          duration={500}
          className="cursor-pointer font-display text-xl font-bold text-white"
        >
          Mohd<span className="text-gradient">.Saqib</span>
        </Link>

        <ul className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <li key={link.target}>
              <Link
                to={link.target}
                smooth
                duration={500}
                offset={-80}
                spy
                activeClass="text-white bg-white/10"
                className="cursor-pointer rounded-full px-4 py-2 text-sm font-medium text-gray-300 transition-colors hover:text-white hover:bg-white/5"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden lg:flex items-center gap-3">
          <InstallButton />
          <button
            onClick={() => window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', ctrlKey: true }))}
            aria-label="Open command palette"
            className="flex items-center gap-2 rounded-full glass px-3 py-1.5 text-xs text-gray-400 hover:text-white transition-colors"
          >
            <FiCommand aria-hidden="true" /> <span>K</span>
          </button>
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="flex h-9 w-9 items-center justify-center rounded-full glass text-gray-300 hover:text-white transition-colors"
          >
            {theme === 'dark' ? <FiSun /> : <FiMoon />}
          </button>
          <a
            href={PERSONAL.resumeUrl}
            download
            className="flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-accent px-4 py-2 text-sm font-semibold text-white shadow-glow hover:shadow-glow-accent transition-shadow"
          >
            <FiDownload /> Resume
          </a>
        </div>

        <button
          className="lg:hidden flex h-10 w-10 items-center justify-center rounded-full glass text-white"
          onClick={() => setMobileOpen(true)}
          aria-label="Open menu"
        >
          <FiMenu size={20} />
        </button>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-bg/95 backdrop-blur-xl lg:hidden"
          >
            <div className="flex justify-end p-5">
              <button
                onClick={() => setMobileOpen(false)}
                className="flex h-10 w-10 items-center justify-center rounded-full glass text-white"
                aria-label="Close menu"
              >
                <FiX size={20} />
              </button>
            </div>
            <motion.ul
              className="flex flex-col items-center gap-6 px-6 pt-10"
              initial="hidden"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.06 } } }}
            >
              {NAV_LINKS.map((link) => (
                <motion.li
                  key={link.target}
                  variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                >
                  <Link
                    to={link.target}
                    smooth
                    duration={500}
                    offset={-60}
                    onClick={() => setMobileOpen(false)}
                    className="cursor-pointer font-display text-2xl font-semibold text-gray-200 hover:text-white"
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
              <motion.div
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                className="flex items-center gap-4 pt-6"
              >
                <button
                  onClick={toggleTheme}
                  aria-label="Toggle theme"
                  className="flex h-11 w-11 items-center justify-center rounded-full glass text-gray-200"
                >
                  {theme === 'dark' ? <FiSun /> : <FiMoon />}
                </button>
                <a
                  href={PERSONAL.resumeUrl}
                  download
                  className="flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-accent px-5 py-3 text-sm font-semibold text-white shadow-glow"
                >
                  <FiDownload /> Resume
                </a>
              </motion.div>
              <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
                <InstallButton className="flex items-center gap-2 rounded-full glass px-4 py-2 text-sm text-gray-200" />
              </motion.div>
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
