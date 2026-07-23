import { motion } from 'framer-motion';
import { Link } from 'react-scroll';
import { FiHeart } from 'react-icons/fi';
import { SOCIAL_LINKS, PERSONAL } from '../../constants/data';

export default function Footer() {
  return (
    <footer className="relative border-t border-white/10 py-10">
      <div className="section-container flex flex-col items-center gap-6 text-center">
        <Link
          to="home"
          smooth
          duration={500}
          className="cursor-pointer font-display text-xl font-bold text-white"
        >
          Mohd<span className="text-gradient">.Saqib</span>
        </Link>

        <div className="flex items-center gap-3">
          {SOCIAL_LINKS.map((social) => (
            <motion.a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.name}
              whileHover={{ y: -4, scale: 1.1 }}
              className="flex h-10 w-10 items-center justify-center rounded-full glass text-gray-300 hover:text-white hover:border-accent/50 transition-colors"
            >
              <social.icon size={16} />
            </motion.a>
          ))}
        </div>

        <p className="flex items-center gap-1.5 text-sm text-gray-500">
          Made with
          <motion.span
            animate={{ scale: [1, 1.25, 1] }}
            transition={{ repeat: Infinity, duration: 1.4 }}
            className="text-red-500"
          >
            <FiHeart className="fill-current" />
          </motion.span>
          by {PERSONAL.name}
        </p>
        <p className="text-xs text-gray-600">© {new Date().getFullYear()} {PERSONAL.name}. All rights reserved.</p>
      </div>
    </footer>
  );
}
