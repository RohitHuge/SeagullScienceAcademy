import fetch from "node-fetch";

export default async function (context) {
  try {
    // 1) Parse payload
    let payload = {};
    try {
      payload = context.req.bodyRaw ? JSON.parse(context.req.bodyRaw) : {};
    } catch {
      context.log("Invalid payload");
      return context.res.send(
        { error: "INVALID_PAYLOAD" },
        400,
        { "Content-Type": "application/json" }
      );
    }

    const userMessage = (payload.message || "").trim();
    const history = Array.isArray(payload.history) ? payload.history : [];

    if (!userMessage) {
      context.log("Empty message");
      return context.res.send(
        { error: "EMPTY_MESSAGE" },
        400,
        { "Content-Type": "application/json" }
      );
    }

    // 2) Env vars
    const API_KEY = "AIzaSyDh9wnmdJsmFgKT_TUGp_YxRYrnBfvhKqI";
    const MODEL = "gemini-1.5-flash";
    const SYSTEM_PROMPT =
      `You are Seagull Science Academy's helpful assistant. Only answer about Seagull Science Academy (courses, fees, mentors, admissions).
       If unsure, say you can connect them to a counselor.`;

    if (!API_KEY) {
      context.log("No API key");
      return context.res.send(
        { error: "NO_API_KEY" },
        500,
        { "Content-Type": "application/json" }
      );
    }

    // 3) Build Gemini request
    const toGeminiTurn = (turn) => ({
      role: turn.role === "model" ? "model" : "user",
      parts: [{ text: String(turn.text || "") }],
    });

    const contents = [
      { role: "user", parts: [{ text: SYSTEM_PROMPT }] },
      ...history.map(toGeminiTurn),
      { role: "user", parts: [{ text: userMessage }] },
    ];

    // 4) Call Gemini
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${API_KEY}`;

    const geminiResp = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents }),
    });

    const data = await geminiResp.json();

    if (!geminiResp.ok) {
      context.log("Gemini error", data);
      return context.res.send(
        { error: "GEMINI_ERROR", details: data },
        502,
        { "Content-Type": "application/json" }
      );
    }

    const text =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Sorry, I couldn’t generate a response right now.";

    // 5) Respond
    context.log(text);
    return context.res.send(
      {
        reply: text,
        model: MODEL,
      },
      200,
      { "Content-Type": "application/json" }
    );
  } catch (err) {
    context.log("Function crashed", err.message);
    return context.res.send(
      { error: "FUNCTION_CRASH", details: String(err) },
      500,
      { "Content-Type": "application/json" }
    );
  }
}
