import { useRef } from 'react';
import { motion } from 'framer-motion';

export default function GlowCard({ children, className = '', ...props }) {
  const ref = useRef(null);

  const handleMouseMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${e.clientX - rect.left}px`);
    el.style.setProperty('--my', `${e.clientY - rect.top}px`);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      whileHover={{ y: -8 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={`group relative rounded-2xl border border-white/10 bg-card/80 backdrop-blur-sm shadow-card overflow-hidden ${className}`}
      style={{ '--mx': '50%', '--my': '50%' }}
      {...props}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            'radial-gradient(400px circle at var(--mx) var(--my), rgba(59,130,246,0.15), transparent 60%)',
        }}
      />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
