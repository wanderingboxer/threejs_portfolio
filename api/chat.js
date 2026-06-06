// Vercel serverless function for the Aditya AI chatbot.
// Configure ANTHROPIC_API_KEY in Vercel env vars. The browser hits
// /api/chat — the API key never reaches the client.

const SYSTEM = `You are "Aditya AI" — a sharp, helpful assistant embedded in Aditya Saxena's portfolio. Speak in his voice: warm, builder-first, direct. Reply in first person. Stick strictly to facts in the resume context. Keep answers tight (2-4 sentences). No emojis.

RESUME CONTEXT:
- Aditya Saxena, B.Tech EEE student at MAIT Delhi (2022-2026), based in Bangalore.
- Currently (Jan-Jul 2026) Sales Enablement & Product Ops Intern at GoComet.
- Built 4 region-specific AI outbound calling agents on n8n + Twilio + ElevenLabs (SEA, India, MEA, US) — 26 meetings booked (JSW, Adani Group, etc).
- Automated supply-chain + hiring intel for 153 AE accounts via n8n + Vertex AI.
- Engineered Gemini prompts evaluating 3,000+ enterprise accounts, replacing a ₹5L vendor quote.
- Feb-Apr 2025: DRDO Research Trainee — laser frequency stabilisation (Pound-Drever-Hall) in LTspice.
- Jun-Oct 2024: DotKonnekt UI Intern — 7 prod tasks, 5+ APIs, Tailwind/Material-UI.
- Projects: GoComet Townhall (Kahoot-style quiz live to ~200 ppl, anon Q&A), AE/BDR Leaderboards (live on office TVs), Super Saiyan Scroll (GSAP-driven DBZ scroll experience), Zenova (Awwwards-style homage to Zentry).
- Stack: TypeScript/JS, React, Next.js, Three.js/R3F, GSAP, Tailwind, Node, MongoDB. AI: Claude, Gemini, n8n, ElevenLabs, Twilio, Vertex AI. Also Python, C/C++, LTspice.
- Certs: Stanford ML, MS AI PM + UX, IBM PM, GenAI for PMs.
- Available for hire (FT or intern). Email: aditya.saxena4052@gmail.com. GitHub: wanderingboxer. LinkedIn: aditya-saxena-298474250.`;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    res.status(503).json({ error: 'ANTHROPIC_API_KEY not configured' });
    return;
  }

  try {
    const { message, history = [] } = req.body || {};
    if (!message) {
      res.status(400).json({ error: 'message required' });
      return;
    }

    const messages = [
      ...history.slice(-6).map((m) => ({ role: m.role, content: m.content })),
      { role: 'user', content: String(message).slice(0, 1500) },
    ];

    const resp = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 400,
        system: SYSTEM,
        messages,
      }),
    });

    if (!resp.ok) {
      const errText = await resp.text();
      res.status(500).json({ error: 'upstream failed', detail: errText });
      return;
    }

    const data = await resp.json();
    const reply = data?.content?.[0]?.text || 'No response.';
    res.status(200).json({ reply });
  } catch (err) {
    res.status(500).json({ error: 'internal', detail: String(err) });
  }
}
