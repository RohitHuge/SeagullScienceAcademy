const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PATCH, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json", ...CORS },
  });
}

// ── JWT (HS256 via Web Crypto) ──────────────────────────────────────────────

function b64url(buf) {
  return btoa(String.fromCharCode(...new Uint8Array(buf)))
    .replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
}
function b64urlDecode(str) {
  return atob(str.replace(/-/g, "+").replace(/_/g, "/"));
}

async function signJWT(payload, secret) {
  const enc = (v) => btoa(JSON.stringify(v)).replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
  const header = enc({ alg: "HS256", typ: "JWT" });
  const body = enc(payload);
  const data = `${header}.${body}`;
  const key = await crypto.subtle.importKey(
    "raw", new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" }, false, ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(data));
  return `${data}.${b64url(sig)}`;
}

async function verifyJWT(token, secret) {
  const parts = token.split(".");
  if (parts.length !== 3) throw new Error("malformed");
  const [header, body, sig] = parts;
  const key = await crypto.subtle.importKey(
    "raw", new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" }, false, ["verify"]
  );
  const sigBytes = Uint8Array.from(b64urlDecode(sig), (c) => c.charCodeAt(0));
  const valid = await crypto.subtle.verify("HMAC", key, sigBytes, new TextEncoder().encode(`${header}.${body}`));
  if (!valid) throw new Error("invalid signature");
  const payload = JSON.parse(b64urlDecode(body));
  if (payload.exp < Math.floor(Date.now() / 1000)) throw new Error("expired");
  return payload;
}

async function authenticate(request, env) {
  const auth = request.headers.get("Authorization") || "";
  const token = auth.startsWith("Bearer ") ? auth.slice(7) : null;
  if (!token) throw new Error("missing token");
  return verifyJWT(token, env.JWT_SECRET);
}

// ── Helpers ─────────────────────────────────────────────────────────────────

function toDoc(row) {
  return { ...row, $id: row.id, $createdAt: row.created_at };
}

function buildWhereClause(conditions) {
  if (conditions.length === 0) return { where: "", bindings: [] };
  return {
    where: "WHERE " + conditions.map((c) => c[0]).join(" AND "),
    bindings: conditions.map((c) => c[1]),
  };
}

// ── Router ───────────────────────────────────────────────────────────────────

export default {
  async fetch(request, env) {
    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: CORS });
    }

    const url = new URL(request.url);
    const path = url.pathname;
    const method = request.method;

    // ── POST /auth/login ──────────────────────────────────────────────────
    if (method === "POST" && path === "/auth/login") {
      let body;
      try { body = await request.json(); } catch { return json({ error: "INVALID_BODY" }, 400); }
      const { email, password } = body;
      if (email !== env.ADMIN_EMAIL || password !== env.ADMIN_PASSWORD) {
        return json({ error: "INVALID_CREDENTIALS" }, 401);
      }
      const token = await signJWT(
        { sub: "admin", email, exp: Math.floor(Date.now() / 1000) + 86400 },
        env.JWT_SECRET
      );
      return json({ token, user: { email } });
    }

    // ── GET /stats ────────────────────────────────────────────────────────
    if (method === "GET" && path === "/stats") {
      try { await authenticate(request, env); } catch (e) { return json({ error: e.message }, 401); }
      const [eq, ap] = await Promise.all([
        env.DB.prepare("SELECT COUNT(*) as total, SUM(CASE WHEN status='Pending' THEN 1 ELSE 0 END) as pending FROM enquiries").first(),
        env.DB.prepare("SELECT COUNT(*) as total, SUM(CASE WHEN status='Pending' THEN 1 ELSE 0 END) as pending FROM applications").first(),
      ]);
      return json({
        enquiries: { total: eq.total, pending: eq.pending || 0 },
        applications: { total: ap.total, pending: ap.pending || 0 },
      });
    }

    // ── POST /enquiries (public – contact form) ───────────────────────────
    if (method === "POST" && path === "/enquiries") {
      let body;
      try { body = await request.json(); } catch { return json({ error: "INVALID_BODY" }, 400); }
      const { name, email, phone, subject, message } = body;
      if (!name || !email || !phone || !subject || !message) {
        return json({ error: "MISSING_FIELDS" }, 400);
      }
      const id = crypto.randomUUID();
      await env.DB.prepare(
        "INSERT INTO enquiries (id, name, email, phone, subject, message) VALUES (?, ?, ?, ?, ?, ?)"
      ).bind(id, name, email, phone, subject, message).run();
      const doc = await env.DB.prepare("SELECT * FROM enquiries WHERE id = ?").bind(id).first();
      return json(toDoc(doc), 201);
    }

    // ── GET /enquiries ────────────────────────────────────────────────────
    if (method === "GET" && path === "/enquiries") {
      try { await authenticate(request, env); } catch (e) { return json({ error: e.message }, 401); }
      const page = parseInt(url.searchParams.get("page") || "1");
      const pageSize = 10;
      const offset = (page - 1) * pageSize;
      const conditions = [];
      const subject = url.searchParams.get("subject");
      const status = url.searchParams.get("status");
      const outcome = url.searchParams.get("outcome");
      if (subject) conditions.push(["subject = ?", subject]);
      if (status) conditions.push(["status = ?", status]);
      if (outcome) conditions.push(["outcome = ?", outcome]);
      const { where, bindings } = buildWhereClause(conditions);
      const [rows, countRow] = await Promise.all([
        env.DB.prepare(`SELECT * FROM enquiries ${where} ORDER BY created_at DESC LIMIT ? OFFSET ?`)
          .bind(...bindings, pageSize, offset).all(),
        env.DB.prepare(`SELECT COUNT(*) as total FROM enquiries ${where}`)
          .bind(...bindings).first(),
      ]);
      return json({ documents: rows.results.map(toDoc), total: countRow.total });
    }

    // ── PATCH /enquiries/:id ──────────────────────────────────────────────
    const enquiryMatch = path.match(/^\/enquiries\/([^/]+)$/);
    if (method === "PATCH" && enquiryMatch) {
      try { await authenticate(request, env); } catch (e) { return json({ error: e.message }, 401); }
      const id = enquiryMatch[1];
      let body;
      try { body = await request.json(); } catch { return json({ error: "INVALID_BODY" }, 400); }
      const allowed = ["status", "outcome", "addressedBy"];
      const sets = [];
      const vals = [];
      for (const key of allowed) {
        if (body[key] !== undefined) { sets.push(`${key} = ?`); vals.push(body[key]); }
      }
      if (sets.length === 0) return json({ error: "NOTHING_TO_UPDATE" }, 400);
      vals.push(id);
      await env.DB.prepare(`UPDATE enquiries SET ${sets.join(", ")} WHERE id = ?`).bind(...vals).run();
      const doc = await env.DB.prepare("SELECT * FROM enquiries WHERE id = ?").bind(id).first();
      return json(toDoc(doc));
    }

    // ── POST /applications (public – course form) ─────────────────────────
    if (method === "POST" && path === "/applications") {
      let body;
      try { body = await request.json(); } catch { return json({ error: "INVALID_BODY" }, 400); }
      const { name, email, phone, course, message } = body;
      if (!name || !email || !phone || !course || !message) {
        return json({ error: "MISSING_FIELDS" }, 400);
      }
      const id = crypto.randomUUID();
      await env.DB.prepare(
        "INSERT INTO applications (id, name, email, phone, course, message) VALUES (?, ?, ?, ?, ?, ?)"
      ).bind(id, name, email, phone, course, message).run();
      const doc = await env.DB.prepare("SELECT * FROM applications WHERE id = ?").bind(id).first();
      return json(toDoc(doc), 201);
    }

    // ── GET /applications ─────────────────────────────────────────────────
    if (method === "GET" && path === "/applications") {
      try { await authenticate(request, env); } catch (e) { return json({ error: e.message }, 401); }
      const page = parseInt(url.searchParams.get("page") || "1");
      const pageSize = 10;
      const offset = (page - 1) * pageSize;
      const conditions = [];
      const course = url.searchParams.get("course");
      const status = url.searchParams.get("status");
      const interest = url.searchParams.get("interest");
      const outcome = url.searchParams.get("outcome");
      if (course) conditions.push(["course = ?", course]);
      if (status) conditions.push(["status = ?", status]);
      if (interest) conditions.push(["interest = ?", interest]);
      if (outcome) conditions.push(["outcome = ?", outcome]);
      const { where, bindings } = buildWhereClause(conditions);
      const [rows, countRow] = await Promise.all([
        env.DB.prepare(`SELECT * FROM applications ${where} ORDER BY created_at DESC LIMIT ? OFFSET ?`)
          .bind(...bindings, pageSize, offset).all(),
        env.DB.prepare(`SELECT COUNT(*) as total FROM applications ${where}`)
          .bind(...bindings).first(),
      ]);
      return json({ documents: rows.results.map(toDoc), total: countRow.total });
    }

    // ── PATCH /applications/:id ───────────────────────────────────────────
    const appMatch = path.match(/^\/applications\/([^/]+)$/);
    if (method === "PATCH" && appMatch) {
      try { await authenticate(request, env); } catch (e) { return json({ error: e.message }, 401); }
      const id = appMatch[1];
      let body;
      try { body = await request.json(); } catch { return json({ error: "INVALID_BODY" }, 400); }
      const allowed = ["status", "interest", "outcome"];
      const sets = [];
      const vals = [];
      for (const key of allowed) {
        if (body[key] !== undefined) { sets.push(`${key} = ?`); vals.push(body[key]); }
      }
      if (sets.length === 0) return json({ error: "NOTHING_TO_UPDATE" }, 400);
      vals.push(id);
      await env.DB.prepare(`UPDATE applications SET ${sets.join(", ")} WHERE id = ?`).bind(...vals).run();
      const doc = await env.DB.prepare("SELECT * FROM applications WHERE id = ?").bind(id).first();
      return json(toDoc(doc));
    }

    return json({ error: "NOT_FOUND" }, 404);
  },
};
