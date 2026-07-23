import { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { motion } from 'framer-motion';
import { FiCheckCircle, FiLoader, FiSend, FiXCircle } from 'react-icons/fi';
import Reveal from '../components/ui/Reveal';
import SectionHeading from '../components/ui/SectionHeading';
import GlowCard from '../components/ui/GlowCard';
import { CONTACT_CARDS } from '../constants/data';
import { EMAILJS_CONFIG } from '../utils/emailjs';

const FIELDS = [
  { name: 'name', label: 'Name', type: 'text', placeholder: 'Your name' },
  { name: 'email', label: 'Email', type: 'email', placeholder: 'you@example.com' },
  { name: 'subject', label: 'Subject', type: 'text', placeholder: "Let's collaborate" },
];

export default function Contact() {
  const formRef = useRef(null);
  const [status, setStatus] = useState('idle');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');

    try {
      if (EMAILJS_CONFIG.serviceId.startsWith('YOUR_')) {
        throw new Error('EmailJS not configured');
      }
      await emailjs.sendForm(
        EMAILJS_CONFIG.serviceId,
        EMAILJS_CONFIG.templateId,
        formRef.current,
        EMAILJS_CONFIG.publicKey
      );
      setStatus('success');
      formRef.current.reset();
    } catch (err) {
      console.error('EmailJS send failed:', err);
      setStatus('error');
    } finally {
      setTimeout(() => setStatus('idle'), 4000);
    }
  };

  return (
    <section id="contact" className="relative py-24 sm:py-32">
      <div className="section-container">
        <SectionHeading
          eyebrow="Contact"
          title="Let's build something together"
          description="Have a role, project, or idea in mind? My inbox is always open."
        />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <Reveal direction="right" className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
            {CONTACT_CARDS.map((card) => (
              <motion.a
                key={card.label}
                href={card.href}
                target={card.href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                whileHover={{ y: -4 }}
                className="glass flex items-center gap-4 rounded-2xl px-5 py-4 hover:border-accent/50 transition-colors"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary-400">
                  <card.icon size={17} />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-gray-500">{card.label}</p>
                  <p className="text-sm text-white truncate">{card.value}</p>
                </div>
              </motion.a>
            ))}
          </Reveal>

          <Reveal direction="left" delay={0.1} className="lg:col-span-3">
            <GlowCard className="p-7 sm:p-9">
              <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {FIELDS.slice(0, 2).map((field) => (
                    <div key={field.name} className="flex flex-col gap-2">
                      <label htmlFor={field.name} className="text-sm text-gray-300">
                        {field.label}
                      </label>
                      <input
                        id={field.name}
                        name={field.name}
                        type={field.type}
                        required
                        placeholder={field.placeholder}
                        className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow"
                      />
                    </div>
                  ))}
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="subject" className="text-sm text-gray-300">
                    Subject
                  </label>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    required
                    placeholder="Let's collaborate"
                    className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="message" className="text-sm text-gray-300">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    placeholder="Tell me about your project..."
                    className="resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow"
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={status === 'sending'}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-primary to-accent px-6 py-3.5 text-sm font-semibold text-white shadow-glow disabled:opacity-70 transition-shadow hover:shadow-glow-accent"
                >
                  {status === 'sending' && (
                    <>
                      <FiLoader className="animate-spin" /> Sending...
                    </>
                  )}
                  {status === 'success' && (
                    <>
                      <FiCheckCircle /> Message Sent!
                    </>
                  )}
                  {status === 'error' && (
                    <>
                      <FiXCircle /> Try Again Later
                    </>
                  )}
                  {status === 'idle' && (
                    <>
                      <FiSend /> Send Message
                    </>
                  )}
                </motion.button>
              </form>
            </GlowCard>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
