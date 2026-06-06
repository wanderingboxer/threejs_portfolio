export const profile = {
  callsign: 'ADITYA SAXENA',
  handle: '@WANDERINGBOXER',
  classType: 'BUILDER · SHIPPER · OPERATOR',
  level: 22,
  xp: 84,
  rank: 'S',
  tagline:
    'I build AI agents, sales automation and full-stack experiences that ship to real users.',
  bio: "B.Tech EEE student turned product engineer. Currently shipping AI calling agents, sales automation pipelines and internal tools at GoComet — work that books real meetings, runs on real office TVs, and lands in front of real CEOs.",
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
  { id: 1, key: '01', name: 'START', href: '#home' },
  { id: 2, key: '02', name: 'STATS', href: '#profile' },
  { id: 3, key: '03', name: 'QUESTS', href: '#missions' },
  { id: 4, key: '04', name: 'HISTORY', href: '#log' },
  { id: 5, key: '05', name: 'SAY HI', href: '#comms' },
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

// Tier S/A/B/C — game-style rarity tiers
export const achievements = [
  {
    code: 'TROPHY · 01',
    title: 'Machine Learning Specialization',
    issuer: 'Stanford University',
    tier: 'S',
    label: 'LEGENDARY',
  },
  {
    code: 'TROPHY · 02',
    title: 'AI Product Manager',
    issuer: 'Microsoft',
    tier: 'S',
    label: 'LEGENDARY',
  },
  {
    code: 'TROPHY · 03',
    title: 'Product Manager',
    issuer: 'IBM',
    tier: 'A',
    label: 'EPIC',
  },
  {
    code: 'TROPHY · 04',
    title: 'UX Design',
    issuer: 'Microsoft',
    tier: 'A',
    label: 'EPIC',
  },
  {
    code: 'TROPHY · 05',
    title: 'Generative AI for Product Managers',
    issuer: 'PM School',
    tier: 'B',
    label: 'RARE',
  },
];

export const myProjects = [
  {
    id: 'Q01',
    code: 'QUEST · 01',
    title: 'GoComet Townhall',
    sub: 'Kahoot-style multiplayer quiz · live anonymous Q&A',
    status: 'SHIPPED',
    badge: 'BOSS FIGHT',
    impact: '~200 live players · CEO answered Qs live',
    desc: "A Kahoot-style multiplayer quiz platform deployed live at GoComet's company-wide townhall. ~200 employees played in real time, while an anonymous Q&A let them submit questions openly — moderated and surfaced on stage for the CEO to answer live.",
    metrics: [
      { label: 'PLAYERS', value: '200+' },
      { label: 'SCOPE', value: 'COMPANY-WIDE' },
      { label: 'MODE', value: 'REALTIME' },
    ],
    href: 'https://github.com/wanderingboxer/GoComet-Townhall',
    texture: '/textures/project/project4.mp4',
    accent: 'magenta',
    tags: ['React', 'TypeScript', 'Realtime', 'Tailwind'],
  },
  {
    id: 'Q02',
    code: 'QUEST · 02',
    title: 'AE & BDR Sales Leaderboards',
    sub: 'Realtime scoreboards live on every office TV',
    status: 'DAILY OPS',
    badge: 'DAILY DRIVER',
    impact: 'Shipped to the sales floor · visible org-wide',
    desc: "Two production dashboards driving GoComet's sales culture. The BDR leaderboard tracks weekly meetings; the AE dashboard tracks monthly pipeline. Both render on office TVs across the sales floor — turning quotas into a live scoreboard the whole team plays against.",
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
    id: 'Q03',
    code: 'QUEST · 03',
    title: 'Super Saiyan Scroll',
    sub: 'Scroll-driven DBZ immersive experience',
    status: 'SHIPPED',
    badge: 'MOTION CRAFT',
    impact: 'Showcase of scroll + motion storytelling',
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
    id: 'Q04',
    code: 'QUEST · 04',
    title: 'Zenova',
    sub: 'Awwwards-inspired homage to Zentry',
    status: 'SHIPPED',
    badge: 'AWWWARDS-CORE',
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
    code: 'CHAPTER · 03',
    timestamp: 'JAN — JUL 2026',
    status: 'ONGOING',
    company: 'GoComet',
    role: 'Sales Enablement & Product Ops Intern',
    location: 'BANGALORE',
    icon: '/assets/star.png',
    animation: 'victory',
    accent: 'magenta',
    summary:
      'Shipping AI agents, automations and prompt pipelines that move real revenue.',
    objectives: [
      'Built 4 region-specific AI outbound calling agents (SEA, India, MEA, US) on n8n + Twilio + ElevenLabs — booked 26 meetings with companies like JSW and Adani Group.',
      'Automated weekly supply chain + hiring intelligence across 153 AE-owned accounts using n8n + Google Vertex AI, delivering Slack summaries to each AE\'s dedicated channel.',
      'Contributed to the Book of Business — engineered Gemini prompts and ran in-house evaluations across 3,000+ enterprise accounts, replacing a ₹5 lakh vendor quote.',
    ],
  },
  {
    id: 2,
    code: 'CHAPTER · 02',
    timestamp: 'FEB — APR 2025',
    status: 'COMPLETE',
    company: 'DRDO',
    role: 'Research Trainee — Solid State Physics Lab',
    location: 'DELHI',
    icon: '/assets/DRDO.png',
    animation: 'clapping',
    accent: 'cyan',
    summary:
      'Hardware-side quest: laser frequency stabilisation using the Pound-Drever-Hall technique.',
    objectives: [
      'Designed a laser frequency stabilisation locking system using the Pound-Drever-Hall technique.',
      'Simulated and analysed performance in LTspice; researched drift mechanisms and stabilisation factors.',
    ],
  },
  {
    id: 3,
    code: 'CHAPTER · 01',
    timestamp: 'JUN — OCT 2024',
    status: 'COMPLETE',
    company: 'DotKonnekt',
    role: 'UI Intern — Sangria Platform',
    location: 'REMOTE',
    icon: '/assets/dotkonnekt.jpeg',
    animation: 'salute',
    accent: 'lime',
    summary:
      'Frontend quest: shipped production UI on internal tools, scaled features, lifted SEO.',
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
  status: 'IN PROGRESS',
};
