import { localAnswer, fallback } from './knowledge.js';

// Try the serverless endpoint (if /api/chat is wired). Fall back to the local
// keyword model on any failure. Either way the caller gets a stream of text.

export async function askAditya(message, history = []) {
  // Try edge route first
  try {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, history }),
    });
    if (res.ok) {
      const data = await res.json();
      if (data && typeof data.reply === 'string') return data.reply;
    }
  } catch {
    // ignore — fall through to local
  }

  const local = localAnswer(message);
  return local || fallback;
}
