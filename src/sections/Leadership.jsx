import { FiUsers } from 'react-icons/fi';
import Reveal from '../components/ui/Reveal';
import SectionHeading from '../components/ui/SectionHeading';
import GlowCard from '../components/ui/GlowCard';
import { LEADERSHIP } from '../constants/data';

export default function Leadership() {
  return (
    <section id="leadership" className="relative py-24 sm:py-32">
      <div className="section-container">
        <SectionHeading
          eyebrow="Leadership & Activities"
          title="Beyond the code"
          description="Contributing to campus tech communities and giving back through volunteering."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {LEADERSHIP.map((item, i) => (
            <Reveal key={item.org} delay={i * 0.08}>
              <GlowCard className="h-full p-6 flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/15 text-primary-400">
                    <FiUsers size={20} />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-white">{item.org}</h3>
                    <p className="text-xs text-gray-500">{item.role}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-400 leading-relaxed">{item.description}</p>
                <div className="flex flex-wrap gap-2 mt-auto pt-2">
                  {item.tags.map((tag) => (
                    <span key={tag} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-gray-300">
                      {tag}
                    </span>
                  ))}
                </div>
              </GlowCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
