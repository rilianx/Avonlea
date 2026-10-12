/* Un día en Avonlea: a first look at a calm game inspired by "Anne of Green Gables" (L. M. Montgomery, 1908). No
   missions: Ana lives at Green Gables with Matthew and Marilla, and spends the days as she likes: watering the
   kitchen garden, picking berries and apples, cooking in the kitchen, visiting her bosom friend Diana at Orchard
   Slope across the brook, walking down to the Lake of Shining Waters, petting Pelusa the cat...
   - Seen from above and in front ("fake 3D"): everything is drawn in the order of its feet.
   - Drawn by hand: pencil outlines that wobble a little and "boil" (redrawn a few times a second, like hand-drawn
     animation), watercolour fills that do not quite meet the line, and paper grain over everything.
   - The day lasts an hour: morning, a golden evening, a night with lit windows and fireflies, dawn.
   - The seasons turn every two days: apple blossom in spring, berries and fireflies in summer, red leaves falling
     in autumn, snow and a frozen lake in winter (and everyone in scarves).
   - Indoors: the kitchen at Green Gables, and Diana's parlour at Orchard Slope, where they take tea by the fire.
   - A map of Avonlea (M), drawn on a sheet of paper, with where everyone is.
   - Optionally (✒), the conversations are written by Claude, with the game's journal of what has happened and what
     each one remembers; without it, or if it fails, the written lines are used.
   - What she has, what has grown and how fond everyone is of her are kept in the browser. */
(() => {
'use strict';
const cv = document.getElementById('cv'), g = cv.getContext('2d');
const MIN_S = 5;   // (a minute of the game lasts five real seconds: an hour, five minutes; a whole day, two hours)
const T = 32, K = 2.5, U = T * K, WW = 96 * U, WH = 84 * U, AX = 0, AW = WW, TAU = Math.PI * 2, KK = K * K;   // (U: the unit of distances outdoors; T: the size of things)
// the interiors, drawn in Tiled (src/mapas/*.tmj, put in here by tools/build.js): where each thing is in each room
const MAPAS = /*@mapas*/;
const mapaObjs = (mapa, nombre) => (MAPAS[mapa]?.layers || []).flatMap(l => l.objects || []).filter(o => o.name === nombre).map(o => ({ x: o.x, y: o.y }));
const lugar = (mapa, nombre) => { const o = mapaObjs(mapa, nombre)[0]; if (!o) throw new Error(`el mapa «${mapa}» no tiene «${nombre}»`); return o; };
function rng(seed){ return () => { seed |= 0; seed = seed + 0x6D2B79F5 | 0; let t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
const R = rng(18780228);
const clamp = (v, a, b) => Math.max(a, Math.min(b, v)), lerp = (a, b, k) => a + (b - a) * k, dist = (a, b, c, d) => Math.hypot(a - c, b - d);
const $ = id => document.getElementById(id);
