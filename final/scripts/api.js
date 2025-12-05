// scripts/api.js
export async function fetchJSON(path) {
  try {
    const res = await fetch(path);
    if (!res.ok) throw new Error(`Network error: ${res.status}`);
    const data = await res.json();
    return data;
  } catch (err) {
    console.error('fetchJSON error:', err);
    return []; // graceful fallback
  }
}
