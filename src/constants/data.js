import {
  FiGithub,
  FiLinkedin,
  FiMail,
  FiPhone,
  FiTwitter,
  FiCode,
} from 'react-icons/fi';
import { SiLeetcode } from 'react-icons/si';

export const PERSONAL = {
  name: 'Mohd Saqib',
  headline: 'Software Engineer | Full Stack Developer | AI Enthusiast | Problem Solver',
  description:
    'I build scalable full-stack applications, interactive user experiences, and AI-powered solutions. Passionate about solving real-world problems through modern web technologies.',
  email: 'mo.saqib369@gmail.com',
  phone: '+91 9140579796',
  resumeUrl: '/resume.pdf',
  location: 'New Delhi, India',
};

export const TYPEWRITER_ROLES = [
  'React Developer',
  'Full Stack Engineer',
  'AI Enthusiast',
  'Problem Solver',
  'Open Source Learner',
];

export const SOCIAL_LINKS = [
  { name: 'GitHub', url: 'https://github.com/mohdsaqb/', icon: FiGithub },
  { name: 'LinkedIn', url: 'https://linkedin.com/mo-saqib/', icon: FiLinkedin },
  { name: 'LeetCode', url: 'https://leetcode.com/mosaqib369/', icon: SiLeetcode },
  { name: 'X (Twitter)', url: 'https://x.com/Mohd_Saqib_/', icon: FiTwitter },
  { name: 'Email', url: 'mailto:mo.saqib369@gmail.com', icon: FiMail },
];

export const CONTACT_CARDS = [
  { label: 'Email', value: 'mo.saqib369@gmail.com', href: 'mailto:mo.saqib369@gmail.com', icon: FiMail },
  { label: 'Phone', value: '+91 9140579796', href: 'tel:+919140579796', icon: FiPhone },
  { label: 'LinkedIn', value: '/in/mo-saqib', href: 'https://linkedin.com/', icon: FiLinkedin },
  { label: 'GitHub', value: '/mohdsaqb', href: 'https://github.com/', icon: FiGithub },
  { label: 'LeetCode', value: '/mosaqib369', href: 'https://leetcode.com/', icon: SiLeetcode },
  { label: 'X (Twitter)', value: '@Mohd_Saqib_', href: 'https://x.com/', icon: FiTwitter },
  { label: 'Portfolio', value: 'mohdsaqib.dev', href: '/', icon: FiCode },
];

export const ABOUT = {
  education: {
    degree: 'B.Tech, Electrical Engineering (Minor: EV Technology)',
    institute: 'Netaji Subhas University of Technology',
    graduation: '2027',
    cgpa: '7.84',
  },
  paragraph:
    "I'm a B.Tech student at Netaji Subhas University of Technology, graduating in 2027, majoring in Electrical Engineering with a minor in EV Technology, and currently holding a CGPA of 7.84. I love building scalable applications end-to-end, from pixel-perfect interfaces to resilient backend systems. Outside of shipping products, I spend my time solving DSA problems, competing in hackathons, and researching the intersection of AI and defence technologies — from sensor fusion to autonomous threat detection.",
};

export const COUNTERS = [
  { label: 'Problems Solved', value: 600, suffix: '+' },
  { label: 'Internships', value: 3, suffix: '' },
  { label: 'Projects', value: 2, suffix: '+' },
  { label: 'Technologies', value: 5, suffix: '+' },
];

export const SKILLS = [
  {
    category: 'Languages',
    items: ['Java', 'C++', 'JavaScript', 'SQL'],
  },
  {
    category: 'Frontend',
    items: ['React.js', 'Tailwind CSS', 'HTML5', 'CSS3'],
  },
  {
    category: 'Backend',
    items: ['Node.js', 'Express.js', 'REST APIs', 'MongoDB'],
  },
  {
    category: 'Tools',
    items: ['Git', 'GitHub', 'Netlify', 'VS Code'],
  },
  {
    category: 'Core',
    items: ['DSA', 'OOP', 'DBMS', 'Operating Systems', 'API Integration', 'UI/UX', 'Performance Optimization'],
  },
];

export const EXPERIENCE = [
  {
    role: 'Technical Research Intern',
    company: 'Indian Army',
    period: 'May 2026 – Jul 2026',
    highlights: [
      'Researched Hybrid Active Protection Systems',
      'Studied battlefield threats',
      'Sensor fusion',
      'Drone reconnaissance',
      'Electronic countermeasures',
      'Thermal imaging',
      'Ground penetrating radar',
    ],
  },
  {
    role: 'Software Development Engineer Intern',
    company: 'CorporateGyft',
    period: 'Dec 2025 – Jan 2026',
    highlights: [
      'Built a full stack CRM',
      'React, Node, Express',
      'REST APIs',
      'Authentication',
      'Role Based Access',
      'CRUD operations',
    ],
  },
  {
    role: 'Software Engineering Intern',
    company: 'OneArc Space Technologies',
    period: 'Mar 2026 – May 2026',
    highlights: [
      'AI-powered OSINT platform',
      'LLMs & NLP',
      'Computer Vision',
      'GIS integration',
      'Microservices architecture',
      'Deployment & DevOps',
    ],
  },
];

export const PROJECTS = [
  {
    title: 'Ocean Hazard Reporting & Analytics Platform',
    description:
      'A real-time platform for monitoring and reporting ocean hazards, combining live dashboards with social media analytics to surface emerging threats faster.',
    tech: ['React', 'Node', 'Express', 'MongoDB', 'JWT', 'Tailwind'],
    features: [
      'Real-time monitoring',
      'Interactive dashboard',
      'Ocean hazard reporting',
      'Social media analytics',
      'Modern UI',
    ],
    tags: ['Full Stack', 'AI/ML'],
    github: 'https://github.com/',
    demo: 'https://example.com/',
    caseStudy: '#',
  },
  {
    title: 'MediFlowAI',
    subtitle: 'AI Healthcare Platform',
    description:
      'An AI-driven healthcare platform designed to streamline patient flow — from triage chatbot conversations to real-time ambulance tracking and hospital bed availability.',
    tech: ['HTML', 'CSS', 'JavaScript'],
    features: [
      'Medical chatbot',
      'AI queue management',
      'Ambulance tracking',
      'Hospital vacancy detection',
    ],
    tags: ['AI/ML', 'Frontend'],
    github: 'https://github.com/',
    demo: 'https://example.com/',
    caseStudy: '#',
  },
];

export const PROJECT_FILTERS = ['All', 'Full Stack', 'AI/ML', 'Frontend'];

export const ACHIEVEMENTS = [
  { title: '600+ DSA Problems Solved', description: 'Consistent problem solving across LeetCode, Codeforces and GFG.' },
  { title: 'Hacknovate 6.0 Participant', description: 'Built and pitched a product within a 24-hour hackathon sprint.' },
  { title: 'SIH Internal Hackathon Selection', description: 'Ocean Hazard Reporting platform selected in the SIH internal round.' },
  { title: 'Rank 7 / 130 — AMIMUN 2026', description: 'Ranked 7th among 130 participants at AMIMUN 2026.' },
  { title: 'Embedded Systems Workshop', description: 'Hands-on embedded systems workshop at NSUT.' },
];

export const LEADERSHIP = [
  {
    org: 'NSUT IIF',
    role: 'Technical Team',
    description: 'Built the official website using React & Tailwind CSS.',
    tags: ['React', 'Tailwind'],
  },
  {
    org: 'TDR NSUT',
    role: 'Technical Team',
    description: 'Led website enhancement initiatives with rich motion design.',
    tags: ['Anime.js', 'React', 'Tailwind'],
  },
  {
    org: 'NSS NSUT',
    role: 'Community Intern',
    description: '84 hours of service across 5+ community outreach programs.',
    tags: ['84 Hours', '5+ Outreach Programs'],
  },
];
