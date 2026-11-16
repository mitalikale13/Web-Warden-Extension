drawHero(document.getElementById("h"), 5);
var day = function () { var d = new Date(); return d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate(); };
function load() {
  chrome.storage.local.get({ limit: 30, day: "", used: 0 }, function (s) {
    var used = s.day === day() ? s.used : 0;
    document.getElementById("lim").value = s.limit;
    document.getElementById("info").textContent = "Instagram today: " + Math.floor(used) + " / " + s.limit + " min";
    document.getElementById("fill").style.width = Math.min(100, used / s.limit * 100) + "%";
  });
}
document.getElementById("save").onclick = function () {
  var v = Math.max(5, Math.min(600, parseInt(document.getElementById("lim").value, 10) || 30));
  chrome.storage.local.set({ limit: v }, load);
};
document.getElementById("reset").onclick = function () { chrome.storage.local.set({ day: day(), used: 0 }, load); };
load();
