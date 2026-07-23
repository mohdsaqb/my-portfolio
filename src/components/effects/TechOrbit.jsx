import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import {
  FiCode,
} from 'react-icons/fi';
import {
  SiReact,
  SiNodedotjs,
  SiMongodb,
  SiTailwindcss,
  SiJavascript,
  SiExpress,
} from 'react-icons/si';

const ORBIT_ICONS = [
  { Icon: SiReact, color: '#61DAFB', radius: 150, duration: 20, offset: 0 },
  { Icon: SiNodedotjs, color: '#3C873A', radius: 150, duration: 20, offset: 60 },
  { Icon: SiMongodb, color: '#47A248', radius: 150, duration: 20, offset: 120 },
  { Icon: SiTailwindcss, color: '#38BDF8', radius: 220, duration: 28, offset: 30 },
  { Icon: SiJavascript, color: '#F7DF1E', radius: 220, duration: 28, offset: 150 },
  { Icon: SiExpress, color: '#FFFFFF', radius: 220, duration: 28, offset: 270 },
];

export default function TechOrbit() {
  const wrapperRef = useRef(null);
  const orbitRef = useRef(null);

  // GSAP-powered mouse parallax: the orbit gently drifts toward the cursor
  // for a sense of depth, then eases back to center when the mouse leaves.
  useEffect(() => {
    const wrapper = wrapperRef.current;
    const orbit = orbitRef.current;
    if (!wrapper || !orbit || window.matchMedia('(pointer: coarse)').matches) return;

    const xTo = gsap.quickTo(orbit, 'x', { duration: 0.9, ease: 'power3.out' });
    const yTo = gsap.quickTo(orbit, 'y', { duration: 0.9, ease: 'power3.out' });
    const rotateTo = gsap.quickTo(orbit, 'rotate', { duration: 0.9, ease: 'power3.out' });

    const handleMove = (e) => {
      const rect = wrapper.getBoundingClientRect();
      const relX = (e.clientX - rect.left - rect.width / 2) / rect.width;
      const relY = (e.clientY - rect.top - rect.height / 2) / rect.height;
      xTo(relX * 24);
      yTo(relY * 24);
      rotateTo(relX * 4);
    };
    const reset = () => {
      xTo(0);
      yTo(0);
      rotateTo(0);
    };

    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseleave', reset);
    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseleave', reset);
    };
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="relative mx-auto flex h-[340px] w-[340px] sm:h-[420px] sm:w-[420px] items-center justify-center"
    >
      <div ref={orbitRef} className="absolute inset-0 flex items-center justify-center will-change-transform">
        {[150, 220].map((radius) => (
          <div
            key={radius}
            className="absolute rounded-full border border-white/10"
            style={{ width: radius * 2, height: radius * 2 }}
          />
        ))}

        <motion.div
          animate={{ y: [0, -14, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="relative z-10 flex h-28 w-28 sm:h-36 sm:w-36 items-center justify-center rounded-3xl gradient-border glass shadow-glow"
        >
          <FiCode className="text-4xl sm:text-5xl text-gradient" />
        </motion.div>

        {ORBIT_ICONS.map(({ Icon, color, radius, duration, offset }, i) => (
          <motion.div
            key={i}
            className="absolute h-full w-full"
            style={{ animation: `spin ${duration}s linear infinite`, animationDelay: `-${(offset / 360) * duration}s` }}
          >
            <div
              className="absolute flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-2xl glass shadow-card"
              style={{
                top: `calc(50% - ${radius}px - 20px)`,
                left: 'calc(50% - 20px)',
              }}
            >
              <div style={{ animation: `spin ${duration}s linear infinite reverse` }}>
                <Icon size={20} color={color} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
