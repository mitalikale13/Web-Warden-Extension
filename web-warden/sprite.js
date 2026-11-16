// Original pixel web-slinger (R red, B blue, K web lines, W eyes)
var HERO = [
"....RRRRRR....","...RRRKKRRR...","..RRKRRRRKRR..","..RWWKRRKWWR..",
"..RWWWKKWWWR..","...RRKRRKRR...","....RRRRRR....","..BBRRKKRRBB..",
".BBBRKRRKRBBB.",".BBBRRKKRRBBB.","..BBRKRRKRBB..","...BBRRRRBB...",
"...BBB..BBB...","...BBB..BBB...","...BBB..BBB...","...RRR..RRR...","..RRRR..RRRR.."];
var HCOL = { R: "#d62839", B: "#1d4e9e", K: "#14141c", W: "#ffffff" };
function drawHero(canvas, scale) {
  canvas.width = 14 * scale; canvas.height = 17 * scale;
  var x = canvas.getContext("2d"); x.imageSmoothingEnabled = false;
  HERO.forEach(function (row, y) {
    for (var i = 0; i < row.length; i++) {
      var c = HCOL[row[i]];
      if (c) { x.fillStyle = c; x.fillRect(i * scale, y * scale, scale, scale); }
    }
  });
}
