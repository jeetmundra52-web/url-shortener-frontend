const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

export const shortenUrl = (originalUrl, customCode, expiryDays) =>
  fetch(`${API_BASE}/api/shorten`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ originalUrl, customCode, expiryDays })
  }).then(r => r.json());

export const getStats = code =>
  fetch(`${API_BASE}/api/stats/${code}`).then(r => r.json());