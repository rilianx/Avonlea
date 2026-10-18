// Los momentos de la historia (los hechos que ya pasaron, las metas cumplidas, el día, la estación): para mirar el
// juego en cada uno (tools/planilla.js: los huecos de frases; tools/cobertura.js: las situaciones).
const BASE = { inicio_juego: 1, llegada_tv: 1, primera_noche: 1, desayuno_prueba: 2 };
const MOMENTOS = [
  { id: 'dia2', titulo: 'Día 2 · recién llegada, a prueba', dia: 2, estacion: 0, hechos: {} },
  { id: 'dia4', titulo: 'Día 4 · ya se queda', dia: 4, estacion: 0, hechos: { a_prueba: 2, se_queda: 3 } },
  { id: 'dia16', titulo: 'Día 16 · vino la Sra. Lynde', dia: 16, estacion: 1, hechos: { a_prueba: 2, se_queda: 3, lynde_visita: 15 } },
  { id: 'dia20', titulo: 'Día 20 · amiga de Diana', dia: 20, estacion: 1, hechos: { a_prueba: 2, se_queda: 3, lynde_visita: 15, llego_diana: 18, barry_presenta: 18, conocidas_diana: 19 }, metas: { amigas: 19 } },
  { id: 'dia33', titulo: 'Día 33 · va a la escuela', dia: 33, estacion: 2, hechos: { a_prueba: 2, se_queda: 3, lynde_visita: 15, llego_diana: 18, barry_presenta: 18, conocidas_diana: 19, llego_gilbert: 32 }, metas: { amigas: 19, escuela: 28, escuela_dominical: 22 } },
  { id: 'dia45', titulo: 'Día 45 · primer invierno', dia: 45, estacion: 3, hechos: { a_prueba: 2, se_queda: 3, lynde_visita: 15, llego_diana: 18, barry_presenta: 18, conocidas_diana: 19, llego_gilbert: 32, llego_josephine: 43 }, metas: { amigas: 19, escuela: 28, escuela_dominical: 22 } },
  { id: 'dia65', titulo: 'Día 65 · llegan los Allan', dia: 65, estacion: 0, hechos: { a_prueba: 2, se_queda: 3, lynde_visita: 15, llego_diana: 18, barry_presenta: 18, conocidas_diana: 19, llego_gilbert: 32, llego_josephine: 43, se_fue_josephine: 57, llego_allan: 64, llego_sraallan: 64 }, metas: { amigas: 19, escuela: 28, escuela_dominical: 22 } },
  { id: 'dia86', titulo: 'Día 86 · la Srta. Stacy', dia: 86, estacion: 2, hechos: { a_prueba: 2, se_queda: 3, lynde_visita: 15, llego_diana: 18, barry_presenta: 18, conocidas_diana: 19, llego_gilbert: 32, llego_josephine: 43, se_fue_josephine: 57, llego_allan: 64, llego_sraallan: 64, se_fue_phillips: 71, se_fue_prissy: 71, llego_stacy: 85 }, metas: { amigas: 19, escuela: 28, escuela_dominical: 22 }, estudio: 30 },
];
// (en el juego, ?dev: pone la partida en ese momento; devuelve los hechos)
const PREPARAR = `(M => {
  const H = dlgHechos(); for (const k of Object.keys(H)) delete H[k]; Object.assign(H, ${JSON.stringify(BASE)}, M.hechos);
  const P = game.wm.perm ||= {}; for (const k of Object.keys(P)) if (k.startsWith('cuaderno:')) delete P[k]; for (const [m, d] of Object.entries(M.metas || {})) P['cuaderno:' + m] = d;
  ((game.wm.num ||= {}).ana ||= {}).estudio = M.estudio || 0;
  dayT = M.dia - 1 + 5 / 24; game.seasonShift = ((M.estacion - Math.floor(dayT / DIAS_ESTACION)) % 4 + 4) % 4; S = M.estacion;
  return H; })`;
// (en el juego: una escena como la ve el modelo, una fila de trazas/planilla.json: tools/planilla.js, tools/noche.js)
const FILA_ESCENA = `d => ({ id: d.id, canal: d.canal, disparo: d.disparo || '', prioridad: d.prioridad, interrumpe: !!d.interrumpe, grande: !!d.grande, repetir: typeof d.repetir === 'string' ? d.repetir : 'cada ' + (d.repetir?.cada || ''), si: [].concat(d.si || []).join(', '), en: Object.entries(d.en || {}).map(([k, v]) => k + '=' + v).join(', '), hablan: (() => { try { return d.hablan().join(', '); } catch (e) { return ''; } })(), lineas: (() => { try { return d.lineas().length; } catch (e) { return 0; } })(), primera: (() => { try { const l = d.lineas().find(l => !['!', '?'].includes(l[0])); return l ? l[0] + ': ' + l[1] : ''; } catch (e) { return ''; } })(), quienes: (d.quienes || []).map(String), con: d.con || '', una_vez: d.repetir === 'una_vez', texto: (() => { try { return d.lineas().filter(l => !['!', '?'].includes(l[0])).map(l => l[0] + ': ' + l[1]); } catch (e) { return []; } })() })`;
module.exports = { BASE, MOMENTOS, PREPARAR, FILA_ESCENA };
