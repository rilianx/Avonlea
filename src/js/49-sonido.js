/* ---------- sound: a few soft notes ---------- */
let AC = null;
function audio(){ if (!AC) try { AC = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) {} }
function note(f, d, vol = .03, type = 'sine', at = 0){ if (!AC) return; const o = AC.createOscillator(), v = AC.createGain(), t = AC.currentTime + at; o.type = type; o.frequency.value = f; v.gain.setValueAtTime(0, t); v.gain.linearRampToValueAtTime(vol, t + .02); v.gain.exponentialRampToValueAtTime(.0001, t + d); o.connect(v); v.connect(AC.destination); o.start(t); o.stop(t + d); }
const sfx = { happy: () => { note(660, .3); note(880, .35, .03, 'sine', .12); note(990, .4, .025, 'sine', .24); }, water: () => { for (let k = 0; k < 4; k++) note(1200 + k * 160, .08, .015, 'triangle', k * .05); }, cook: () => note(330, .5, .02, 'triangle'), blip: () => note(420 + Math.random() * 160, .07, .012, 'triangle'), done: () => { note(523, .25); note(659, .25, .03, 'sine', .1); note(784, .4, .03, 'sine', .2); } };
