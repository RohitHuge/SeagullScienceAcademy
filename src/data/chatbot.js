const WORKER_URL = import.meta.env.VITE_CHATBOT_WORKER_URL || "https://seagull-chatbot.seagullwebsite25.workers.dev";

export async function askBot(userMessage, messages = []) {
  const response = await fetch(WORKER_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: userMessage, history: messages }),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.error || `Worker error ${response.status}`);
  }

  const result = await response.json();
  return {
    role: "model",
    text: result.reply,
    timestamp: new Date(),
  };
}
