export const profile = {
  callsign: 'ADITYA SAXENA',
  codename: 'PILOT-04052',
  role: 'BUILDER · SHIPPER · OPERATOR',
  tagline:
    'Engineering AI agents, sales automation and full-stack experiences that ship to real users.',
  bio: 'B.Tech EEE student turned product engineer. Currently building AI calling agents, sales automation pipelines and internal tools at GoComet — work that books real meetings, runs on real office TVs and reaches real CEOs.',
  location: 'BANGALORE, INDIA',
  geo: { lat: 12.9716, lng: 77.5946, label: 'BLR' },
  email: 'aditya.saxena4052@gmail.com',
  phone: '+91-8076280374',
  socials: {
    github: 'https://github.com/wanderingboxer',
    linkedin: 'https://www.linkedin.com/in/aditya-saxena-298474250/',
    leetcode: 'https://leetcode.com/u/AdityaSaxena4052/',
  },
};

export const navLinks = [
  { id: 1, key: '01', name: 'HOME', href: '#home' },
  { id: 2, key: '02', name: 'PROFILE', href: '#profile' },
  { id: 3, key: '03', name: 'MISSIONS', href: '#missions' },
  { id: 4, key: '04', name: 'LOG', href: '#log' },
  { id: 5, key: '05', name: 'COMMS', href: '#comms' },
];

export const stats = [
  { label: 'YRS BUILDING', value: '04', accent: 'cyan' },
  { label: 'PROJECTS SHIPPED', value: '20+', accent: 'magenta' },
  { label: 'AI AGENTS DEPLOYED', value: '04', accent: 'lime' },
  { label: 'MEETINGS BOOKED', value: '26', accent: 'amber' },
];

export const skills = {
  Languages: [
    { name: 'TypeScript', level: 92 },
    { name: 'JavaScript', level: 95 },
    { name: 'Python', level: 78 },
    { name: 'C / C++', level: 72 },
  ],
  Frameworks: [
    { name: 'React.js', level: 95 },
    { name: 'Next.js', level: 90 },
    { name: 'Three.js / R3F', level: 78 },
    { name: 'Express.js', level: 80 },
    { name: 'Tailwind CSS', level: 95 },
    { name: 'GSAP', level: 85 },
  ],
  'AI & Ops': [
    { name: 'LangChain', level: 78 },
    { name: 'Claude / Gemini Prompts', level: 88 },
    { name: 'n8n Automations', level: 90 },
    { name: 'ElevenLabs · Twilio', level: 82 },
    { name: 'Google Vertex AI', level: 75 },
  ],
  'Tools & Infra': [
    { name: 'Node.js', level: 88 },
    { name: 'MongoDB', level: 80 },
    { name: 'Git / GitHub', level: 92 },
    { name: 'LTspice', level: 70 },
  ],
};

export const achievements = [
  {
    code: 'ACH-01',
    title: 'Machine Learning Specialization',
    issuer: 'Stanford University',
    tier: 'GOLD',
  },
  {
    code: 'ACH-02',
    title: 'AI Product Manager',
    issuer: 'Microsoft',
    tier: 'GOLD',
  },
  {
    code: 'ACH-03',
    title: 'Product Manager',
    issuer: 'IBM',
    tier: 'SILVER',
  },
  {
    code: 'ACH-04',
    title: 'UX Design',
    issuer: 'Microsoft',
    tier: 'SILVER',
  },
  {
    code: 'ACH-05',
    title: 'Generative AI for Product Managers',
    issuer: 'PM School',
    tier: 'BRONZE',
  },
];

export const myProjects = [
  {
    id: 'M01',
    code: 'M-01',
    title: 'GoComet Townhall',
    sub: 'Kahoot-style multiplayer quiz & anonymous Q&A',
    status: 'DEPLOYED',
    impact: '~200 live participants · used by CEO',
    desc: 'Built a Kahoot-style multiplayer quiz platform deployed live at GoComet\'s company-wide townhall. ~200 employees played in real time, while anonymous Q&A let them submit questions openly — moderated and surfaced on stage for the CEO to answer live.',
    metrics: [
      { label: 'PARTICIPANTS', value: '200+' },
      { label: 'TOWNHALLS', value: 'COMPANY-WIDE' },
      { label: 'MODE', value: 'REALTIME' },
    ],
    href: 'https://github.com/wanderingboxer/GoComet-Townhall',
    texture: '/textures/project/Project1.mp4',
    accent: 'magenta',
    tags: ['React', 'TypeScript', 'Realtime', 'Tailwind'],
  },
  {
    id: 'M02',
    code: 'M-02',
    title: 'AE & BDR Sales Leaderboards',
    sub: 'Real-time dashboards on every office TV',
    status: 'LIVE · DAILY OPS',
    impact: 'Shipped to sales floor — visible to entire org',
    desc: 'Two production dashboards driving GoComet\'s sales culture. The BDR leaderboard tracks weekly meetings; the AE dashboard tracks monthly pipeline. Both render on office TVs across the sales floor — turning quotas into a live scoreboard the whole team plays against.',
    metrics: [
      { label: 'DASHBOARDS', value: '02' },
      { label: 'TEAMS', value: 'BDR + AE' },
      { label: 'SURFACE', value: 'OFFICE TVS' },
    ],
    href: 'https://github.com/wanderingboxer/AE-Meetings-Leaderboard',
    texture: '/textures/project/Project2.mp4',
    accent: 'lime',
    tags: ['Next.js', 'TypeScript', 'Realtime', 'OpsTooling'],
  },
  {
    id: 'M03',
    code: 'M-03',
    title: 'AI-Nexus',
    sub: 'LangChain + Claude chat with tool orchestration',
    status: 'SHIPPED',
    impact: 'Production-grade AI workspace',
    desc: 'A sophisticated AI chat application built with Next.js, featuring real-time conversations, advanced prompt caching, and intelligent tool orchestration powered by LangChain and Claude 3.5 Sonnet.',
    metrics: [
      { label: 'STACK', value: 'NEXT + LC' },
      { label: 'MODEL', value: 'CLAUDE 3.5' },
      { label: 'PATTERN', value: 'AGENT + TOOLS' },
    ],
    href: 'https://ai-nexus-gold.vercel.app/',
    texture: '/textures/project/project4.mp4',
    accent: 'cyan',
    tags: ['Next.js', 'LangChain', 'Claude', 'TypeScript'],
  },
  {
    id: 'M04',
    code: 'M-04',
    title: 'Imaginify',
    sub: 'AI image SaaS — edit, restore, generate, sell',
    status: 'SHIPPED',
    impact: 'End-to-end SaaS with payments + credits',
    desc: 'A SaaS platform that empowers users to create stunning photo manipulations using AI — image restoration, recolor, object removal, generative fill, background removal — paired with a credits model, Stripe payments and auth.',
    metrics: [
      { label: 'STACK', value: 'NEXT + TS' },
      { label: 'AI', value: 'CLOUDINARY' },
      { label: 'PAYMENTS', value: 'STRIPE' },
    ],
    href: 'https://imaginify-six-mu.vercel.app/',
    texture: '/textures/project/Project2.mp4',
    accent: 'violet',
    tags: ['Next.js', 'TypeScript', 'Cloudinary AI', 'Stripe'],
  },
  {
    id: 'M05',
    code: 'M-05',
    title: 'Super Saiyan Scroll',
    sub: 'Scroll-driven DBZ immersive experience',
    status: 'SHIPPED',
    impact: 'Showcase of motion + scroll storytelling',
    desc: 'An immersive web experience inspired by Dragon Ball Super, built with React, GSAP and Tailwind. Smooth scroll animations, dynamic transitions and high-energy visuals — the browsing equivalent of unlocking Ultra Instinct.',
    metrics: [
      { label: 'MOTION', value: 'GSAP' },
      { label: 'STACK', value: 'REACT' },
      { label: 'STYLE', value: 'KINETIC' },
    ],
    href: 'https://super-saiyan-scroll-809zuz1ks-aditya-saxenas-projects-14f18c2d.vercel.app/',
    texture: '/textures/project/Project1.mp4',
    accent: 'amber',
    tags: ['React', 'GSAP', 'Tailwind', 'JavaScript'],
  },
  {
    id: 'M06',
    code: 'M-06',
    title: 'Zenova',
    sub: 'Awwwards-inspired homage to Zentry',
    status: 'SHIPPED',
    impact: 'Reference build for animation craft',
    desc: 'An interactive site inspired by Zentry — Awwwards Site Of The Month — exploring scroll-driven storytelling, dynamic transitions and immersive visuals built with React, GSAP and Tailwind.',
    metrics: [
      { label: 'STACK', value: 'REACT' },
      { label: 'MOTION', value: 'GSAP' },
      { label: 'CRAFT', value: 'HIGH' },
    ],
    href: 'https://awwward-winning-website-2kfh7e50t.vercel.app/',
    texture: '/textures/project/project3.mp4',
    accent: 'cyan',
    tags: ['React', 'GSAP', 'Tailwind', 'JavaScript'],
  },
];

export const calculateSizes = (isSmall, isMobile, isTablet) => {
  return {
    deskScale: isSmall ? 0.05 : isMobile ? 0.06 : 0.065,
    deskPosition: isMobile ? [0.5, -4.5, 0] : [0.25, -5.5, 0],
  };
};

export const workExperiences = [
  {
    id: 1,
    code: 'LOG-2026',
    timestamp: 'JAN 2026 — JUL 2026',
    status: 'ONGOING',
    company: 'GoComet',
    role: 'Sales Enablement & Product Ops Intern',
    location: 'BANGALORE',
    icon: '/assets/star.png',
    animation: 'victory',
    summary:
      'Building AI agents, automations and prompt pipelines that move real revenue.',
    objectives: [
      'Shipped 4 region-specific AI outbound calling agents (SEA, India, MEA, US) on n8n + Twilio + ElevenLabs — booked 26 meetings with companies like JSW and Adani Group.',
      'Automated weekly supply chain and hiring intelligence for 153 AE-owned accounts using n8n + Google Vertex AI, delivering Slack summaries to each AE\'s dedicated channel.',
      'Contributed to GoComet\'s Book of Business — engineered Gemini prompts and ran in-house evaluations across 3,000+ enterprise accounts, replacing a ₹5 lakh vendor quote.',
    ],
  },
  {
    id: 2,
    code: 'LOG-2025',
    timestamp: 'FEB 2025 — APR 2025',
    status: 'COMPLETE',
    company: 'DRDO',
    role: 'Research Trainee — Solid State Physics Lab',
    location: 'DELHI',
    icon: '/assets/DRDO.png',
    animation: 'clapping',
    summary:
      'Hardware-side mission: laser frequency stabilisation using the Pound-Drever-Hall technique.',
    objectives: [
      'Designed a laser frequency stabilisation locking system using the Pound-Drever-Hall technique.',
      'Simulated and analysed performance in LTspice; researched drift mechanisms and stabilisation factors.',
    ],
  },
  {
    id: 3,
    code: 'LOG-2024',
    timestamp: 'JUN 2024 — OCT 2024',
    status: 'COMPLETE',
    company: 'DotKonnekt',
    role: 'UI Intern — Sangria Platform',
    location: 'REMOTE',
    icon: '/assets/dotkonnekt.jpeg',
    animation: 'salute',
    summary:
      'Frontend mission: ship production UI on internal tools, scale features, lift SEO.',
    objectives: [
      'Delivered 7 production-ready tasks on internal tools — optimised platform functionality and lifted SEO.',
      'Developed and integrated 5+ APIs with React.js and Next.js to enhance feature scalability.',
      'Built responsive interfaces in Tailwind CSS and Material-UI, improving engagement and accessibility.',
    ],
  },
];

export const education = {
  school: 'Maharaja Agrasen Institute of Technology',
  degree: 'B.Tech — Electrical & Electronics Engineering',
  duration: '2022 — 2026',
  status: '4TH YEAR / IN PROGRESS',
};
