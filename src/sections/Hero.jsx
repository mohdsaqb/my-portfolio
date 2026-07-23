import { motion } from 'framer-motion';
import { Link } from 'react-scroll';
import { FiArrowRight, FiDownload, FiMail } from 'react-icons/fi';
import Button from '../components/ui/Button';
import TechOrbit from '../components/effects/TechOrbit';
import useTypewriter from '../hooks/useTypewriter';
import { PERSONAL, TYPEWRITER_ROLES } from '../constants/data';

export default function Hero() {
  const typedText = useTypewriter(TYPEWRITER_ROLES);

  return (
    <section id="home" className="relative flex min-h-screen items-center pt-28 pb-16">
      <div className="section-container grid grid-cols-1 lg:grid-cols-2 items-center gap-14">
        <div className="flex flex-col items-start gap-6 text-left">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="glass rounded-full px-4 py-1.5 text-xs font-medium tracking-widest text-accent uppercase"
          >
            Available for opportunities
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-4xl sm:text-5xl md:text-6xl font-bold leading-tight text-white"
          >
            Hi, I'm <span className="text-gradient">{PERSONAL.name}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-base sm:text-lg font-medium text-gray-300 max-w-xl"
          >
            {PERSONAL.headline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.28 }}
            className="flex h-7 items-center gap-2 font-display text-lg text-accent"
          >
            <span>&gt;</span>
            <span>{typedText}</span>
            <span className="inline-block h-5 w-0.5 animate-pulse bg-accent" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.34 }}
            className="max-w-xl text-sm sm:text-base leading-relaxed text-gray-400"
          >
            {PERSONAL.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.42 }}
            className="flex flex-wrap items-center gap-4 pt-2"
          >
            <Link to="projects" smooth duration={500} offset={-80}>
              <Button variant="primary" icon={FiArrowRight}>
                View Projects
              </Button>
            </Link>
            <Button variant="outline" icon={FiDownload} href={PERSONAL.resumeUrl} target="_blank">
              Download Resume
            </Button>
            <Link to="contact" smooth duration={500} offset={-80}>
              <Button variant="ghost" icon={FiMail}>
                Contact Me
              </Button>
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="hidden md:flex justify-center"
        >
          <TechOrbit />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-500"
      >
        <span className="text-[10px] uppercase tracking-widest">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.6 }}
          className="h-8 w-5 rounded-full border border-gray-600 flex items-start justify-center p-1"
        >
          <div className="h-1.5 w-1.5 rounded-full bg-accent" />
        </motion.div>
      </motion.div>
    </section>
  );
}
