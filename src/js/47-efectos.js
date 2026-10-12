/* ---------- little effects: words that float up, hearts, water drops ---------- */
let fx = [];
const float = (text, x, y) => fx.push({ kind: 'text', text, x, y, t: 0 });
const hearts = (x, y) => { for (let k = 0; k < 4; k++) fx.push({ kind: 'heart', x: x + (k - 1.5) * 7, y, t: -k * .12 }); };
const drops = (x, y) => { for (let k = 0; k < 10; k++) fx.push({ kind: 'drop', x: x - 10 + Math.random() * 20, y: y - 20 - Math.random() * 8, vy: Math.random() * 20, t: 0 }); };
