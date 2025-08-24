// index.mjs (use ES modules)
import fetch from "node-fetch";

export default async function (req, res) {
  try {
    // 1) Parse payload from frontend
    let payload = {};
    try {
      payload = req.payload ? JSON.parse(req.payload) : {};
    } catch {
      return res.json({ error: "INVALID_PAYLOAD" }, 400);
    }

    const userMessage = (payload.message || "").trim();
    const history = Array.isArray(payload.history) ? payload.history : [];

    if (!userMessage) {
      return res.json({ error: "EMPTY_MESSAGE" }, 400);
    }

    // 2) Environment variables
    const API_KEY = process.env.GEMINI_API_KEY;
    const MODEL = process.env.MODEL || "gemini-1.5-flash";
    const SYSTEM_PROMPT =
    `You are Seagull Science Academy’s helpful assistant.  
    Seagull Science Academy is located in Maharashtra, India.  
    Contact details:  
    📞 Phone: +91-XXXXXXXXXX  
    📧 Email: seagullacademy@example.com  
    
    Your role is to assist students, parents, and guardians with information about:  
    - Courses offered (Foundation 6th-8th, 9th-10th, 11th-12th Science PCMB, IIT-JEE, NEET-UG, MHT-CET, NDA Preparation).  
    - Fees, batch timings, admission process, mentors, and achievements.  
    - General enquiries about Seagull Science Academy.  
    
    Guidelines:  
    1. Always keep answers concise, polite, and accurate.  
    2. Answer only about Seagull Academy.  
    3. If the user asks something outside your knowledge (not related to Seagull Academy), politely respond:  
       "I’m not sure about that. I can connect you to a Seagull Academy counselor for more details."  
    4. Use a friendly and approachable tone.  
    5. Never invent policies, fees, or mentor details that are not provided.  
    6. Provide contact details (phone/email) if the user wants to reach out directly.  
    `;

    if (!API_KEY) {
      return res.json({ error: "NO_API_KEY" }, 500);
    }

    // 3) Build Gemini request format
    const toGeminiTurn = (turn) => ({
      role: turn.role === "model" ? "model" : "user",
      parts: [{ text: String(turn.text || "") }],
    });

    const contents = [
      { role: "user", parts: [{ text: SYSTEM_PROMPT }] },
      ...history.map(toGeminiTurn),
      { role: "user", parts: [{ text: userMessage }] },
    ];

    // 4) Call Gemini API
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${API_KEY}`;

    const geminiResp = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents }),
    });

    const data = await geminiResp.json();

    if (!geminiResp.ok) {
      return res.json({ error: "GEMINI_ERROR", details: data }, 502);
    }

    const text =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Sorry, I couldn’t generate a response right now.";

    // 5) Return to frontend
    return res.json(
      {
        reply: text,
        model: MODEL,
      },
      200
    );
  } catch (err) {
    return res.json({ error: "FUNCTION_CRASH", details: String(err) }, 500);
  }
}
