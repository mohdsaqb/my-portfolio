import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FiExternalLink, FiGithub, FiX } from 'react-icons/fi';

export default function ProjectModal({ project, onClose }) {
  useEffect(() => {
    if (!project) return;
    const onKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[90] flex items-center justify-center bg-black/70 backdrop-blur-sm px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-2xl border border-white/10 bg-card p-7 sm:p-9 shadow-2xl"
          >
            <button
              onClick={onClose}
              aria-label="Close project details"
              className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full glass text-gray-300 hover:text-white"
            >
              <FiX size={18} />
            </button>

            {project.subtitle && (
              <p className="text-xs font-medium tracking-widest text-accent uppercase mb-2">{project.subtitle}</p>
            )}
            <h3 id="project-modal-title" className="font-display text-2xl sm:text-3xl font-bold text-white mb-4 pr-10">
              {project.title}
            </h3>
            <p className="text-gray-300 leading-relaxed mb-6">{project.description}</p>

            <div className="mb-6">
              <p className="text-sm font-semibold text-white mb-2">Tech Stack</p>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span key={t} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-gray-300">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <p className="text-sm font-semibold text-white mb-2">Key Features</p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {project.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-gray-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent" /> {f}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-full glass px-5 py-2.5 text-sm font-medium text-white hover:border-accent/60 transition-colors"
              >
                <FiGithub /> GitHub
              </a>
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-accent px-5 py-2.5 text-sm font-semibold text-white shadow-glow"
              >
                <FiExternalLink /> Live Demo
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
