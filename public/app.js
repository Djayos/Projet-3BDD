function $(id) {
  return document.getElementById(id);
}

function setStatus(el, msg, type) {
  el.textContent = msg || "";
  el.classList.remove("status--ok", "status--err");
  if (type === "ok") el.classList.add("status--ok");
  if (type === "err") el.classList.add("status--err");
}

async function safeJson(res) {
  const text = await res.text();
  try {
    return JSON.parse(text);
  } catch {
    return { raw: text };
  }
}

// PostgreSQL
async function loadUsers() {
  const status = $("usersStatus");
  setStatus(status, "Loading users…");

  try {
    const res = await fetch("/users");
    const data = await safeJson(res);

    if (!res.ok) throw new Error(data.error || "Failed to fetch users");

    $("usersOut").textContent = JSON.stringify(data, null, 2);
    setStatus(status, `Loaded ${data.length} user(s).`, "ok");
  } catch (err) {
    setStatus(status, err.message, "err");
  }
}

async function createUser(payload) {
  const status = $("usersStatus");
  setStatus(status, "Creating user…");

  try {
    const res = await fetch("/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await safeJson(res);

    if (!res.ok) throw new Error(data.error || "Failed to create user");

    setStatus(status, `User created (id=${data.id}).`, "ok");
    await loadUsers();
  } catch (err) {
    setStatus(status, err.message, "err");
  }
}

// MongoDB
async function loadLogs() {
  const status = $("logsStatus");
  setStatus(status, "Loading logs…");

  try {
    const res = await fetch("/activity");
    const data = await safeJson(res);

    if (!res.ok) throw new Error(data.error || "Failed to fetch logs");

    $("logsOut").textContent = JSON.stringify(data, null, 2);
    setStatus(status, `Loaded ${data.length} log(s).`, "ok");
  } catch (err) {
    setStatus(status, err.message, "err");
  }
}

async function createLog(payload) {
  const status = $("logsStatus");
  setStatus(status, "Creating log…");

  try {
    const res = await fetch("/activity", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await safeJson(res);

    if (!res.ok) throw new Error(data.error || "Failed to create log");

    setStatus(status, "Log created.", "ok");
    await loadLogs();
  } catch (err) {
    setStatus(status, err.message, "err");
  }
}

// Redis
async function incrVisits() {
  const status = $("visitsStatus");
  setStatus(status, "Incrementing…");

  try {
    const res = await fetch("/stats/visits");
    const data = await safeJson(res);

    if (!res.ok) throw new Error(data.error || "Failed to increment visits");

    $("visitsOut").textContent = JSON.stringify(data, null, 2);
    $("visitsNumber").textContent = String(data.visits ?? "—");
    setStatus(status, "Updated.", "ok");
  } catch (err) {
    setStatus(status, err.message, "err");
  }
}

async function readVisits() {
  const status = $("visitsStatus");
  setStatus(status, "Reading…");

  try {
    const res = await fetch("/stats/visits/value");
    const data = await safeJson(res);

    if (!res.ok) throw new Error(data.error || "Failed to read visits");

    $("visitsOut").textContent = JSON.stringify(data, null, 2);
    $("visitsNumber").textContent = String(data.visits ?? "—");
    setStatus(status, "Read OK.", "ok");
  } catch (err) {
    setStatus(status, err.message, "err");
  }
}

// ---------- Wire UI
window.addEventListener("DOMContentLoaded", () => {
  $("btnUsersRefresh").addEventListener("click", loadUsers);
  $("btnUsersAdd").addEventListener("click", () => {
    createUser({ email: `demo_${Date.now()}@mail.com`, name: "Demo User" });
  });

  $("formUser").addEventListener("submit", (e) => {
    e.preventDefault();
    const email = $("userEmail").value.trim() || `demo_${Date.now()}@mail.com`;
    const name = $("userName").value.trim() || "Demo User";
    createUser({ email, name });
  });

  $("btnLogsRefresh").addEventListener("click", loadLogs);
  $("btnLogsAdd").addEventListener("click", () => {
    createLog({ userId: 1, action: "login" });
  });

  $("formLog").addEventListener("submit", (e) => {
    e.preventDefault();
    const userId = Number($("logUserId").value) || 1;
    const action = $("logAction").value.trim() || "login";
    createLog({ userId, action });
  });

  $("btnVisitsIncr").addEventListener("click", incrVisits);
  $("btnVisitsRead").addEventListener("click", readVisits);

  // initial load
  loadUsers();
  loadLogs();
  readVisits();
});
