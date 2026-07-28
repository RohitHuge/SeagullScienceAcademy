const API = "https://seagull-dashboard.seagullwebsite25.workers.dev";

export async function sendMessage(name, subject, phone, email, message) {
  try {
    const res = await fetch(`${API}/enquiries`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, subject, phone, email, message }),
    });
    if (!res.ok) throw new Error(`Error ${res.status}`);
    return { success: true, message: "Message sent successfully!" };
  } catch (err) {
    console.error("Error sending message:", err);
    return { success: false, error: err.message };
  }
}

export async function sendApplication(name, course, phone, email, message) {
  try {
    const res = await fetch(`${API}/applications`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, course, phone, email, message }),
    });
    if (!res.ok) throw new Error(`Error ${res.status}`);
    return { success: true, message: "Application sent successfully!" };
  } catch (err) {
    console.error("Error sending application:", err);
    return { success: false, error: err.message };
  }
}

export function getToken() {
  return localStorage.getItem("seagull_admin_token");
}

export async function apiFetch(path, options = {}) {
  const token = getToken();
  const res = await fetch(`${API}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || `API error ${res.status}`);
  }
  return res.json();
}
