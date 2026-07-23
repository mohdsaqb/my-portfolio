import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { FiSearch } from 'react-icons/fi';
import Reveal from '../components/ui/Reveal';
import SectionHeading from '../components/ui/SectionHeading';
import GlowCard from '../components/ui/GlowCard';
import { SKILLS } from '../constants/data';

export default function Skills() {
  const [query, setQuery] = useState('');

  const filteredSkills = useMemo(() => {
    if (!query.trim()) return SKILLS;
    const q = query.toLowerCase();
    return SKILLS.map((group) => ({
      ...group,
      items: group.items.filter((item) => item.toLowerCase().includes(q)),
    })).filter((group) => group.items.length > 0);
  }, [query]);

  return (
    <section id="skills" className="relative py-24 sm:py-32">
      <div className="section-container">
        <SectionHeading
          eyebrow="Skills"
          title="Tools I build with"
          description="A growing toolkit spanning languages, frameworks, and the fundamentals that hold it all together."
        />

        <Reveal className="mx-auto mb-12 max-w-md">
          <div className="relative">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search skills e.g. React, MongoDB..."
              className="w-full glass rounded-full py-3 pl-11 pr-4 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow"
            />
          </div>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSkills.map((group, i) => (
            <Reveal key={group.category} delay={i * 0.06}>
              <GlowCard className="h-full p-6">
                <h3 className="font-display text-lg font-semibold text-white mb-4">{group.category}</h3>
                <div className="flex flex-wrap gap-2.5">
                  {group.items.map((skill) => (
                    <motion.span
                      key={skill}
                      whileHover={{ y: -4, scale: 1.06 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 12 }}
                      className="rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-sm text-gray-200 hover:border-accent/60 hover:text-white transition-colors"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </GlowCard>
            </Reveal>
          ))}
          {filteredSkills.length === 0 && (
            <p className="col-span-full text-center text-gray-500">No skills match "{query}".</p>
          )}
        </div>
      </div>
    </section>
  );
}
