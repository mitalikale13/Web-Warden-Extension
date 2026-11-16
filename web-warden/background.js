const IG = ["*://*.instagram.com/*"];
const today = () => { const d = new Date(); return d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate(); };

async function getState() {
  const s = await chrome.storage.local.get({ limit: 30, day: "", used: 0 });
  if (s.day !== today()) { s.day = today(); s.used = 0; await chrome.storage.local.set({ day: s.day, used: 0 }); }
  return s;
}
function startAlarm() { chrome.alarms.create("tick", { periodInMinutes: 0.5 }); }
chrome.runtime.onInstalled.addListener(startAlarm);
chrome.runtime.onStartup.addListener(startAlarm);

async function broadcast(s) {
  const left = s.limit - s.used;
  const tabs = await chrome.tabs.query({ url: IG });
  for (const t of tabs) {
    try { await chrome.tabs.sendMessage(t.id, { type: "status", left, limit: s.limit }); }
    catch (e) { if (left <= 0) chrome.tabs.remove(t.id); }
  }
}

chrome.alarms.onAlarm.addListener(async (a) => {
  if (a.name !== "tick") return;
  const s = await getState();
  const win = await chrome.windows.getLastFocused().catch(() => null);
  if (win && win.focused) {
    const act = await chrome.tabs.query({ url: IG, active: true, windowId: win.id });
    if (act.length) { s.used += 0.5; await chrome.storage.local.set({ used: s.used }); }
  }
  await broadcast(s);
});

// Pages loaded after the limit is hit get the same treatment
chrome.runtime.onMessage.addListener((m, sender, reply) => {
  if (m.type === "hello") { getState().then((s) => reply({ left: s.limit - s.used, limit: s.limit })); return true; }
  if (m.type === "close" && sender.tab) chrome.tabs.remove(sender.tab.id);
});
