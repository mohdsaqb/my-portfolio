import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { FiExternalLink, FiFileText, FiGithub } from 'react-icons/fi';
import Reveal from '../components/ui/Reveal';
import SectionHeading from '../components/ui/SectionHeading';
import GlowCard from '../components/ui/GlowCard';
import ProjectModal from '../components/ui/ProjectModal';
import { PROJECTS, PROJECT_FILTERS } from '../constants/data';

export default function Projects() {
  const [filter, setFilter] = useState('All');
  const [activeProject, setActiveProject] = useState(null);

  const filteredProjects = useMemo(() => {
    if (filter === 'All') return PROJECTS;
    return PROJECTS.filter((p) => p.tags.includes(filter));
  }, [filter]);

  return (
    <section id="projects" className="relative py-24 sm:py-32">
      <div className="section-container">
        <SectionHeading
          eyebrow="Projects"
          title="Selected work"
          description="A mix of full stack platforms and AI-driven products built to solve real problems."
        />

        <Reveal className="flex flex-wrap justify-center gap-3 mb-12">
          {PROJECT_FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                filter === f
                  ? 'bg-gradient-to-r from-primary to-accent text-white shadow-glow'
                  : 'glass text-gray-400 hover:text-white'
              }`}
            >
              {f}
            </button>
          ))}
        </Reveal>

        <motion.div layout className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredProjects.map((project, i) => (
            <Reveal key={project.title} delay={i * 0.08}>
              <GlowCard className="h-full flex flex-col p-7">
                {project.subtitle && (
                  <p className="text-xs font-medium tracking-widest text-accent uppercase mb-2">{project.subtitle}</p>
                )}
                <h3 className="font-display text-xl sm:text-2xl font-bold text-white mb-3">{project.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-5 flex-1">{project.description}</p>

                <div className="flex flex-wrap gap-2 mb-5">
                  {project.tech.map((t) => (
                    <span key={t} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-gray-300">
                      {t}
                    </span>
                  ))}
                </div>

                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 mb-6">
                  {project.features.slice(0, 4).map((f) => (
                    <li key={f} className="flex items-center gap-2 text-xs text-gray-400">
                      <span className="h-1 w-1 rounded-full bg-accent" /> {f}
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap items-center gap-3 mt-auto pt-2 border-t border-white/10">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-sm text-gray-300 hover:text-white transition-colors"
                  >
                    <FiGithub size={15} /> GitHub
                  </a>
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-sm text-gray-300 hover:text-white transition-colors"
                  >
                    <FiExternalLink size={15} /> Live Demo
                  </a>
                  <button
                    onClick={() => setActiveProject(project)}
                    className="flex items-center gap-1.5 text-sm text-accent hover:text-white transition-colors ml-auto"
                  >
                    <FiFileText size={15} /> Case Study
                  </button>
                </div>
              </GlowCard>
            </Reveal>
          ))}
        </motion.div>
      </div>

      <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
    </section>
  );
}
