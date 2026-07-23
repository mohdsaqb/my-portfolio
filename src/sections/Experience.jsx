import { motion } from 'framer-motion';
import { FiBriefcase } from 'react-icons/fi';
import Reveal from '../components/ui/Reveal';
import SectionHeading from '../components/ui/SectionHeading';
import GlowCard from '../components/ui/GlowCard';
import { EXPERIENCE } from '../constants/data';

export default function Experience() {
  return (
    <section id="experience" className="relative py-24 sm:py-32">
      <div className="section-container">
        <SectionHeading
          eyebrow="Experience"
          title="Where I've worked"
          description="Hands-on roles spanning full stack engineering, applied AI, and defence-tech research."
        />

        <div className="relative mx-auto max-w-3xl">
          <div className="absolute left-[19px] sm:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-accent/50 to-transparent sm:-translate-x-1/2" />

          <div className="flex flex-col gap-12">
            {EXPERIENCE.map((exp, i) => (
              <div key={exp.company} className="relative flex sm:justify-center">
                <div
                  className={`w-full sm:w-1/2 pl-12 sm:pl-0 ${
                    i % 2 === 0 ? 'sm:pr-12 sm:text-right sm:self-start sm:mr-auto' : 'sm:pl-12 sm:ml-auto'
                  }`}
                >
                  <Reveal direction={i % 2 === 0 ? 'right' : 'left'}>
                    <GlowCard className="p-6">
                      <p className="text-xs font-medium tracking-widest text-accent uppercase mb-2">{exp.period}</p>
                      <h3 className="font-display text-lg font-semibold text-white">{exp.role}</h3>
                      <p className="text-sm text-gray-400 mb-4">{exp.company}</p>
                      <ul
                        className={`flex flex-wrap gap-2 ${i % 2 === 0 ? 'sm:justify-end' : ''}`}
                      >
                        {exp.highlights.map((h) => (
                          <li
                            key={h}
                            className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-gray-300"
                          >
                            {h}
                          </li>
                        ))}
                      </ul>
                    </GlowCard>
                  </Reveal>
                </div>

                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: 'spring', stiffness: 300, damping: 15, delay: 0.15 }}
                  className="absolute left-0 sm:left-1/2 top-6 flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent shadow-glow"
                >
                  <FiBriefcase className="text-white" size={16} />
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
