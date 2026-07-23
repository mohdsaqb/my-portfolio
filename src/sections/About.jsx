import { motion } from 'framer-motion';
import { FiAward, FiBookOpen } from 'react-icons/fi';
import Reveal from '../components/ui/Reveal';
import SectionHeading from '../components/ui/SectionHeading';
import GlowCard from '../components/ui/GlowCard';
import useCountUp from '../hooks/useCountUp';
import { ABOUT, COUNTERS } from '../constants/data';

function Counter({ value, suffix, label, delay }) {
  const { ref, value: count } = useCountUp(value);

  return (
    <Reveal delay={delay}>
      <div ref={ref} className="glass rounded-2xl px-6 py-8 text-center">
        <p className="font-display text-3xl sm:text-4xl font-bold text-gradient">
          {count}
          {suffix}
        </p>
        <p className="mt-2 text-xs sm:text-sm text-gray-400">{label}</p>
      </div>
    </Reveal>
  );
}

export default function About() {
  return (
    <section id="about" className="relative py-24 sm:py-32">
      <div className="section-container">
        <SectionHeading eyebrow="About Me" title="Building things that matter" />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">
          <Reveal direction="right" className="lg:col-span-3">
            <p className="text-gray-300 leading-relaxed text-base sm:text-lg">{ABOUT.paragraph}</p>
          </Reveal>

          <Reveal direction="left" delay={0.1} className="lg:col-span-2">
            <GlowCard className="p-6 sm:p-7">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary-400">
                  <FiBookOpen size={20} />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Education</p>
                  <p className="font-display font-semibold text-white mt-1">{ABOUT.education.degree}</p>
                  <p className="text-sm text-gray-400 mt-1">{ABOUT.education.institute}</p>
                </div>
              </div>
              <div className="mt-5 grid grid-cols-2 gap-4 border-t border-white/10 pt-5">
                <div>
                  <p className="text-xs text-gray-500">Graduation</p>
                  <p className="font-display font-semibold text-white">{ABOUT.education.graduation}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">CGPA</p>
                  <p className="font-display font-semibold text-white flex items-center gap-1">
                    <FiAward className="text-accent" size={14} /> {ABOUT.education.cgpa}
                  </p>
                </div>
              </div>
            </GlowCard>
          </Reveal>
        </div>

        <motion.div
          className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        >
          {COUNTERS.map((counter, i) => (
            <Counter key={counter.label} {...counter} delay={i * 0.05} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
