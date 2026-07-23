import { useRef } from 'react';
import { motion } from 'framer-motion';

const VARIANTS = {
  primary:
    'bg-gradient-to-r from-primary to-accent text-white shadow-glow hover:shadow-glow-accent',
  outline: 'glass text-white hover:border-accent/60',
  ghost: 'text-gray-300 hover:text-white',
};

export default function Button({
  children,
  onClick,
  href,
  target,
  variant = 'primary',
  icon: Icon,
  className = '',
  type = 'button',
  ...props
}) {
  const ref = useRef(null);

  const createRipple = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const ripple = document.createElement('span');
    const size = Math.max(rect.width, rect.height);
    ripple.className = 'ripple';
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
    ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
    el.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
    onClick?.(e);
  };

  const classes = `relative overflow-hidden inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold tracking-wide transition-all duration-300 ${VARIANTS[variant]} ${className}`;

  const content = (
    <>
      {Icon && <Icon className="text-base" />}
      <span>{children}</span>
    </>
  );

  const motionProps = {
    whileHover: { scale: 1.045 },
    whileTap: { scale: 0.96 },
  };

  if (href) {
    return (
      <motion.a
        ref={ref}
        href={href}
        target={target}
        rel={target === '_blank' ? 'noopener noreferrer' : undefined}
        onClick={createRipple}
        className={classes}
        {...motionProps}
        {...props}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button ref={ref} type={type} onClick={createRipple} className={classes} {...motionProps} {...props}>
      {content}
    </motion.button>
  );
}
