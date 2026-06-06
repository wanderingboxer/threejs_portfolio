// Curated knowledge base for the in-browser "Aditya AI" assistant.
// The local model uses keyword scoring against this corpus + templated
// responses to produce credible answers without an API. If a Claude
// API key is wired via /api/chat the chatbot upgrades silently.

export const personaSystem = `You are "Aditya AI" — a sharp, helpful assistant embedded in Aditya Saxena's portfolio. \
You speak in his voice: warm, builder-first, direct, no fluff. Always reply in first person ("I built...", "I'm currently..."). \
Stick strictly to facts from the resume below. If asked something not covered, say so honestly and pivot to what's relevant. \
Keep answers tight — 2-4 sentences max unless asked for detail. Avoid emojis.`;

export const knowledge = [
  {
    id: 'about',
    keywords: ['who', 'about', 'aditya', 'background', 'introduce', 'bio', 'tell me', 'yourself'],
    text: `I'm Aditya Saxena — B.Tech EEE student at MAIT (Delhi), based in Bangalore. I'm a builder/shipper/operator: I ship AI agents, sales automation and full-stack tools that real teams actually use every day. Currently interning at GoComet doing Sales Enablement + Product Ops.`,
  },
  {
    id: 'current',
    keywords: ['gocomet', 'current', 'now', 'currently', 'doing', 'job', 'working', 'where'],
    text: `Right now I'm at GoComet (Jan — Jul 2026) as a Sales Enablement & Product Ops Intern. I built 4 region-specific AI outbound calling agents (SEA, India, MEA, US) on n8n + Twilio + ElevenLabs — 26 meetings booked so far with companies like JSW and Adani. I also automate weekly supply-chain intel for 153 AE accounts and ship Gemini-prompt evaluations replacing a ₹5L vendor quote.`,
  },
  {
    id: 'townhall',
    keywords: ['townhall', 'kahoot', 'quiz', 'qa', 'ceo', 'live'],
    text: `GoComet Townhall — a Kahoot-style multiplayer quiz I built and deployed live to the whole company (~200 employees played in real time). It also has an anonymous Q&A channel — questions are moderated on stage and the CEO answers them live. React + TypeScript + realtime backend.`,
  },
  {
    id: 'leaderboards',
    keywords: ['leaderboard', 'leaderboards', 'dashboard', 'dashboards', 'sales', 'office tv', 'bdr', 'ae'],
    text: `AE & BDR Leaderboards — two realtime sales dashboards that run on the office TVs across GoComet's sales floor. The BDR board tracks weekly meetings; the AE board tracks monthly pipeline. They turned quotas into a live scoreboard the team plays against every day.`,
  },
  {
    id: 'ai-nexus',
    keywords: ['ai-nexus', 'nexus', 'langchain', 'claude', 'chat', 'chatbot'],
    text: `AI-Nexus is a Next.js AI chat app I built with LangChain + Claude 3.5 Sonnet. Real-time conversations, prompt caching, intelligent tool orchestration. Production-grade — feels like a workspace, not a toy demo.`,
  },
  {
    id: 'imaginify',
    keywords: ['imaginify', 'image', 'saas', 'stripe', 'payments', 'cloudinary'],
    text: `Imaginify is a SaaS for AI image manipulation — restoration, recolor, object removal, generative fill, background removal. Full-stack: Next.js + TypeScript + Cloudinary AI + Stripe payments + a credits model + auth.`,
  },
  {
    id: 'saiyan',
    keywords: ['saiyan', 'dragon', 'ball', 'scroll', 'gsap', 'super', 'dbz'],
    text: `Super Saiyan Scroll — an immersive scroll experience inspired by Dragon Ball Super. Built with React + GSAP + Tailwind. Dynamic transitions, kinetic motion. Showcase of scroll storytelling craft.`,
  },
  {
    id: 'zenova',
    keywords: ['zenova', 'zentry', 'awwwards', 'site of the month'],
    text: `Zenova is my homage to Zentry (Awwwards Site of the Month). Same DNA: scroll-driven storytelling, dynamic transitions, immersive visuals. React + GSAP + Tailwind.`,
  },
  {
    id: 'drdo',
    keywords: ['drdo', 'laser', 'physics', 'research', 'pound', 'drever', 'hall'],
    text: `Feb — Apr 2025 I was a Research Trainee at DRDO's Solid State Physics Lab. I designed a laser frequency stabilisation system using the Pound-Drever-Hall technique, simulated and analysed its performance in LTspice, and researched frequency drift mechanisms.`,
  },
  {
    id: 'dotkonnekt',
    keywords: ['dotkonnekt', 'sangria', 'ui intern', 'first', 'frontend'],
    text: `Jun — Oct 2024 I was a UI Intern at DotKonnekt on the Sangria platform. Shipped 7 production-ready tasks on internal tools, integrated 5+ APIs in React/Next, and built responsive UIs with Tailwind + Material-UI that lifted engagement and SEO.`,
  },
  {
    id: 'stack',
    keywords: ['stack', 'skills', 'technologies', 'tools', 'frameworks', 'tech', 'languages'],
    text: `Day-to-day stack: TypeScript/JavaScript with React, Next.js, Tailwind, Node, MongoDB. For motion: GSAP + Three.js / R3F. For AI work: LangChain, Claude/Gemini prompts, n8n automations, ElevenLabs, Twilio, Google Vertex AI. Also Python, C/C++, LTspice for hardware-side work.`,
  },
  {
    id: 'ai-experience',
    keywords: ['ai', 'agent', 'agents', 'llm', 'gemini', 'prompt', 'prompts', 'automation', 'n8n'],
    text: `Most of my recent work is AI-heavy: I build agents on n8n + Twilio + ElevenLabs for outbound calling (4 deployed across regions), engineer Gemini prompts that run evaluations across 3,000+ enterprise accounts, and built a LangChain + Claude 3.5 chat app. I treat AI as a tool to ship product, not a demo.`,
  },
  {
    id: 'education',
    keywords: ['education', 'school', 'college', 'degree', 'mait', 'btech', 'student'],
    text: `I'm pursuing a B.Tech in Electrical & Electronics Engineering at Maharaja Agrasen Institute of Technology, Delhi (2022 — 2026). Currently in my 4th year.`,
  },
  {
    id: 'certs',
    keywords: ['certificate', 'certification', 'stanford', 'microsoft', 'ibm', 'ml', 'machine learning', 'product manager'],
    text: `Stanford ML Specialization, Microsoft AI Product Manager + UX Design, IBM Product Manager, and Generative AI for Product Managers. I lean half-engineer, half-product.`,
  },
  {
    id: 'location',
    keywords: ['location', 'where', 'based', 'live', 'bangalore', 'india', 'remote', 'timezone'],
    text: `Based in Bangalore, India (IST). I'm flexible across timezones and open to remote roles worldwide.`,
  },
  {
    id: 'hire',
    keywords: ['hire', 'hiring', 'available', 'open', 'work', 'role', 'job', 'employment', 'opportunity'],
    text: `Yes — I'm available for full-time and intern roles. I move fast, ship to production, and care about real users (not just demos). Drop a message in the Comms section or email aditya.saxena4052@gmail.com.`,
  },
  {
    id: 'contact',
    keywords: ['contact', 'reach', 'email', 'phone', 'linkedin', 'github', 'connect'],
    text: `Easiest: email aditya.saxena4052@gmail.com or fill the form in the Comms section. Also on LinkedIn (aditya-saxena-298474250) and GitHub (@wanderingboxer). I respond within 24 hours.`,
  },
  {
    id: 'how-built',
    keywords: ['portfolio', 'built', 'how', 'this site', 'this website', 'made'],
    text: `This portfolio is React + Vite + Three.js / React-Three-Fiber + GSAP + Tailwind. The 3D crystals use MeshTransmissionMaterial. The chatbot you're talking to runs locally in your browser with a knowledge base — it can also be wired to Claude via a serverless endpoint. Same kind of stack I build agents with at GoComet.`,
  },
  {
    id: 'wow',
    keywords: ['cool', 'awesome', 'amazing', 'wow', 'love', 'nice', 'sick', 'fire'],
    text: `Thanks! Most of the visual craft is in the small details — gradient palette, kinetic typography, scroll-tied 3D camera, holographic player card with parallax foil, magnetic cursor, the works.`,
  },
];

export const suggestions = [
  'What does Aditya do at GoComet?',
  'Tell me about the Townhall project',
  'Is he available for hire?',
  'How was this portfolio built?',
];

// ---- Local "model" ----------------------------------------------------------
// Token-level keyword scoring. Cheap, fast, deterministic. Good enough for a
// curated bio. Adds template glue + politeness fallback.

const tokenise = (s) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter(Boolean);

export const localAnswer = (query) => {
  const tokens = tokenise(query);
  if (!tokens.length) return null;

  const scored = knowledge.map((entry) => {
    let score = 0;
    for (const kw of entry.keywords) {
      const kwTokens = kw.split(/\s+/);
      const phraseHit = query.toLowerCase().includes(kw);
      if (phraseHit) score += kwTokens.length * 2.5;
      for (const t of tokens) {
        if (kwTokens.includes(t)) score += 1;
      }
    }
    return { entry, score };
  });

  scored.sort((a, b) => b.score - a.score);
  const top = scored[0];
  if (!top || top.score < 1) return null;

  // If multiple entries score high, stack them lightly
  const followup = scored[1] && scored[1].score >= top.score * 0.7 && scored[1].entry.id !== top.entry.id
    ? `\n\n${scored[1].entry.text}`
    : '';

  return top.entry.text + followup;
};

export const fallback = `I'm a curated assistant built from Aditya's resume — that one's just outside my map. Try asking about his GoComet work, the Townhall quiz, AI-Nexus, his stack, or whether he's hiring. Or just email him directly: aditya.saxena4052@gmail.com.`;
