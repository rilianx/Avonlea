/* ---------- what grows, and Ana's own little garden. Things grow as they really do: slowly. A bed grows only at night,
   and only if it was watered that day: a seed needs days of water to come up, and about two weeks to flower
   (ETAPA_DIAS: the watered nights from one stage to the next). Ana's little garden goes where she wants it, with the
   seeds Matthew gives her (src/datos/conversaciones.txt, «conv_matthew_huerta»). ---------- */
const ETAPA_DIAS = [3, 4, 5];   // (seed to sprout, sprout to leaves, leaves to flowers)
function crecerDeNoche(){   // (true when something grew)
  let n = 0;
  for (const b of BEDS) { if (b.wet && S !== 3 && b.stage < 3 && ++b.dias >= ETAPA_DIAS[b.stage]) { b.stage++; b.dias = 0; n++; } b.wet = 0; b.grow = 0; }
  return n;
}
const ETAPA_TXT = ['Todavía no sale nada: las semillas duermen bajo la tierra.', 'Asomaron los brotes, chiquititos.', 'Ya tiene hojas. Las flores se hacen esperar.'];
// where it can go: on the grass, not on a road, not against a house, a fence, the water or the other beds
const sitioHuertito = (x, y) => !nearPath(x, y, 34) && !inHouses(x, y, 30) && !inBrook(x, y, 20) && !inLake(x, y, 30) && !inAreas(x, y, 20) && clearOfBeds(x, y) && !blockedOut(x, y);
function huertitoPoner(h){
  if (BEDS.some(b => b.ana)) return;
  BEDS.push({ x: h.x, y: h.y, stage: h.stage ?? 0, wet: 0, grow: 0, dias: h.dias || 0, kind: 3, ana: true });
  PLACES.huertito = ['el huertito de Ana', h.x, h.y + 30];
}
function hacerHuertito(){
  close();
  if (S === 3) return anaSays(dicho('huertito_helado'));
  const x = ana.x, y = ana.y - 20;
  if (!sitioHuertito(x, y)) return anaSays(nearPath(x, y, 34) ? dicho('huertito_camino') : dicho('huertito_no_aqui'));
  game.inv.semillas--; game.huertito = { x, y, dia: today() }; huertitoPoner(game.huertito);
  ana.crouch = true; ana.dir = 0; setTimeout(() => { ana.crouch = false; }, 3000);
  anaSays(dicho('huertito_hecho'));
  logEv('Ana hizo su huertito y sembró las semillas que le dio Matthew.', witnesses()); save();
}
if (game.huertito) huertitoPoner(game.huertito);
if (game.canteros) game.canteros.forEach(([st, w, d], i) => { if (BEDS[i]) Object.assign(BEDS[i], { stage: st, wet: w, dias: d }); });
