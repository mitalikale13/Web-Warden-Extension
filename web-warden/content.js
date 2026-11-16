(function () {
  if (window.__webWarden) return; window.__webWarden = true;
  var box = document.createElement("div");
  box.style.cssText = "position:fixed;right:14px;bottom:14px;z-index:2147483647;display:flex;align-items:center;gap:8px;background:#14141c;color:#fff;border:3px solid #d62839;padding:6px 10px;font:700 13px monospace;box-shadow:3px 3px 0 #1d4e9e;pointer-events:none";
  var c = document.createElement("canvas"); c.style.cssText = "image-rendering:pixelated"; drawHero(c, 2);
  var t = document.createElement("span"); box.appendChild(c); box.appendChild(t); document.body.appendChild(box);
  var over = null, closing = false;

  function stop() {
    if (closing) return; closing = true;
    over = document.createElement("div");
    over.style.cssText = "position:fixed;inset:0;z-index:2147483647;background:#0d1226;color:#fff;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:16px;font:700 20px monospace;text-align:center;padding:20px";
    var big = document.createElement("canvas"); big.style.cssText = "image-rendering:pixelated"; drawHero(big, 10);
    var m = document.createElement("div"); m.textContent = "Time’s up! Swinging this tab away in 5…";
    over.appendChild(big); over.appendChild(m); document.body.appendChild(over);
    var n = 5; var iv = setInterval(function () {
      n--; m.textContent = "Time’s up! Swinging this tab away in " + n + "…";
      if (n <= 0) { clearInterval(iv); chrome.runtime.sendMessage({ type: "close" }); }
    }, 1000);
  }
  function show(s) {
    var left = Math.ceil(s.left);
    if (s.left <= 0) { t.textContent = "0 min left"; stop(); return; }
    t.textContent = left + " min left today";
    box.style.borderColor = s.left <= 5 ? "#ffd23f" : "#d62839";
    if (s.left <= 5) t.textContent = "Only " + left + " min left!";
  }
  chrome.runtime.onMessage.addListener(function (m) { if (m.type === "status") show(m); });
  chrome.runtime.sendMessage({ type: "hello" }, function (s) { if (s) show(s); });
})();
