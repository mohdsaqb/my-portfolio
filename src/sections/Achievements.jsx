import { FiAward } from 'react-icons/fi';
import Reveal from '../components/ui/Reveal';
import SectionHeading from '../components/ui/SectionHeading';
import GlowCard from '../components/ui/GlowCard';
import { ACHIEVEMENTS } from '../constants/data';

export default function Achievements() {
  return (
    <section id="achievements" className="relative py-24 sm:py-32">
      <div className="section-container">
        <SectionHeading eyebrow="Achievements" title="Milestones along the way" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {ACHIEVEMENTS.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.06}>
              <GlowCard className="h-full p-6 flex flex-col gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 text-accent">
                  <FiAward size={20} />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-white mb-1.5">{item.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{item.description}</p>
                </div>
              </GlowCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
