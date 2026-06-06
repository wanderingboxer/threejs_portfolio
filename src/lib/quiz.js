// Townhall quiz — the actual playable version of the project Aditya built
// for GoComet's company-wide townhall. 7 career-themed questions.

export const QUIZ_QUESTIONS = [
  {
    q: 'Where is Aditya currently building?',
    options: ['GoComet', 'Microsoft', 'Razorpay', 'Zoho'],
    correct: 0,
    accent: 'magenta',
    detail: 'Sales Enablement & Product Ops Intern at GoComet — Jan to Jul 2026.',
  },
  {
    q: 'How many region-specific AI calling agents did he ship at GoComet?',
    options: ['1', '2', '4', '8'],
    correct: 2,
    accent: 'cyan',
    detail: '4 agents — SEA, India, MEA and US — on n8n + Twilio + ElevenLabs.',
  },
  {
    q: 'Which technique did he use for laser frequency stabilisation at DRDO?',
    options: ['Ramsey Spectroscopy', 'Pound–Drever–Hall', 'Doppler-free CPT', 'Allan Variance'],
    correct: 1,
    accent: 'lime',
    detail: 'Pound–Drever–Hall locking, simulated in LTspice at SSPL.',
  },
  {
    q: 'AI-Nexus is powered by which model?',
    options: ['GPT-4', 'Gemini Pro', 'Claude 3.5 Sonnet', 'Llama 3'],
    correct: 2,
    accent: 'violet',
    detail: 'Built on LangChain + Claude 3.5 Sonnet with prompt caching and tool use.',
  },
  {
    q: 'How many employees played the GoComet Townhall quiz live?',
    options: ['~50', '~100', '~200', '~500'],
    correct: 2,
    accent: 'amber',
    detail: '~200 employees played in real time. The CEO answered the anonymous Q&A live.',
  },
  {
    q: 'How many enterprise accounts did his Gemini prompt evaluations cover?',
    options: ['300+', '900+', '3,000+', '10,000+'],
    correct: 2,
    accent: 'magenta',
    detail: '3,000+ accounts in-house — replaced a ₹5 lakh vendor quote.',
  },
  {
    q: 'Which certification did Aditya earn from Stanford?',
    options: ['Deep Learning', 'NLP Specialization', 'ML Specialization', 'GenAI for Devs'],
    correct: 2,
    accent: 'cyan',
    detail: "Machine Learning Specialization — one of five certs in his trophy room.",
  },
];

export const QUIZ_DURATION = 12; // seconds per question
export const PERFECT_TIME_BONUS = true;

export const rankFor = (score, max) => {
  const pct = score / max;
  if (pct >= 0.95) return { rank: 'LEGEND', tier: 'S', accent: 'amber', praise: 'You know him better than his manager.' };
  if (pct >= 0.75) return { rank: 'PRO', tier: 'A', accent: 'magenta', praise: "You've clearly been paying attention." };
  if (pct >= 0.5) return { rank: 'SKILLED', tier: 'B', accent: 'cyan', praise: 'Solid run. Worth a second look.' };
  if (pct >= 0.25) return { rank: 'TRAINEE', tier: 'C', accent: 'violet', praise: 'Quick warm-up. Take another shot?' };
  return { rank: 'GUEST', tier: 'D', accent: 'lime', praise: 'First time on the floor. Try again.' };
};
