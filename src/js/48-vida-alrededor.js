/* ---------- life about: butterflies, birds, fireflies, clouds ---------- */
const butterflies = Array.from({ length: Math.round(16 * KK) }, (_, k) => ({ x: R() * WW, y: R() * WH, ph: R() * TAU, c: ['#fff3a8', '#ffd0e4', '#bfe3ff', '#ffb58a'][k % 4], tx: R() * WW, ty: R() * WH }));
const fireflies = Array.from({ length: 34 }, () => ({ x: R() * 400 - 200, y: R() * 300 - 150, ph: R() * TAU }));
// snow in winter, falling leaves in autumn, petals in spring (in screen space)
const weather = Array.from({ length: 110 }, () => ({ x: Math.random(), y: Math.random(), ph: Math.random() * TAU, s: .5 + Math.random(), c: Math.floor(Math.random() * 4) }));
const clouds = Array.from({ length: Math.round(8 * KK) }, () => ({ x: R() * WW, y: R() * WH, r: 120 + R() * 170 }));
let birds = [], nextBirds = 6;
let dayT = .3;   // 0 dawn (6:00), .25 noon, .5 evening (18:00), the night, back to dawn
function light(){
  // (in the chapter it is June: the sun sets an hour and a half later)
  const d = dayT % 1 - (CAP1.on && !CAP1.done ? .06 : 0), night = d < .52 ? 0 : d < .62 ? (d - .52) / .1 : d < .9 ? 1 : 1 - (d - .9) / .1;
  const dusk = Math.max(0, 1 - Math.abs(d - .5) / .07) + Math.max(0, 1 - Math.abs(d - .96) / .06) * .7;
  return { night: clamp(night, 0, 1), dusk: clamp(dusk, 0, 1) };
}
