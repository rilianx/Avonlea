// El modelo lógico de las interacciones: busca huecos e incoherencias con un solucionador (Z3).
// The core of tools/modelo.py, ported line by line so that both give the same answers: it takes the texts of the data
// files and trazas/planilla.json, and a Z3 context (z3-solver), and uses no Node API, so the same file runs in Node
// (tools/modelo.js) and in the browser (a plain <script>, with z3-built.js and the z3-solver bundle).
//   const r = await modeloAvonlea.modelo({ Z3ctx, textos: { 'src/datos/guion.txt': '…', … }, datos: { planilla } })
// textos: each file by its path from the repo root; the sayings, every 'src/datos/dichos/*.txt' wanted.
// incremental: false asks each question of a new solver, as modelo.py does (slower; the same answers).
(function () {
  'use strict';

  // Python's \w and \b know accents (niño, otoño); JS's do not, even with the u flag
  const W = '[\\p{L}\\p{N}_]';
  const rx = (s, f = '') => new RegExp(s.replace(/\\w/g, W), 'u' + f);
  const NOT_W_BEFORE = '(?<!' + W + ')', NOT_W_AFTER = '(?!' + W + ')';
  const reEscape = s => s.replace(/[\\^$.*+?()[\]{}|/]/g, '\\$&');
  const ws = s => s.split(/\s+/u).filter(Boolean);   // (str.split() with no argument)
  const comas = s => s.split(',').map(c => c.trim()).filter(Boolean);
  const cut = (s, n) => Array.from(s).slice(0, n).join('');   // (slices by code point, as Python)
  const pyFloat = n => Number.isInteger(n) ? n.toFixed(1) : String(n);

  // ---------------------------------------------------------------- tools/bloques.py: what the model uses of it
  const BLOQUE = /^===\s*(.+?)\s*===$/u;
  function partir(texto) {
    const partes = []; let actual = null, suelto = [];
    for (const l of texto.split('\n')) {
      const m = BLOQUE.exec(l.trim());
      if (m) {
        if (actual) partes.push(actual);
        if (suelto.length) { partes.push(['texto', suelto]); suelto = []; }
        actual = ['bloque', m[1], [l], [], false];
        continue;
      }
      if (actual === null) { suelto.push(l); continue; }
      if (actual[4]) actual[3].push(l);
      else if (l.trim() === '---') { actual[4] = true; actual[3].push(l); }
      else actual[2].push(l);
    }
    if (actual) partes.push(actual);
    if (suelto.length) partes.push(['texto', suelto]);
    const out = [];
    for (const p of partes) {
      if (p[0] === 'texto') { out.push(p); continue; }
      const [, id, cab, cuerpo] = p, cola = [];
      const zona = cuerpo.length ? cuerpo : cab;   // (the trailing comments and blank lines: of the next block)
      while (zona.length > (zona === cab ? 1 : 0) && (!zona[zona.length - 1].trim() || zona[zona.length - 1].trim().startsWith('#'))) cola.unshift(zona.pop());
      out.push(['bloque', id, cab, cuerpo]);
      if (cola.length) out.push(['texto', cola]);
    }
    return out;
  }
  function campos(cab, clasificar) {
    const out = [];
    for (const l of cab.slice(1)) {
      const s = l.trim();
      if (!s || s.startsWith('#')) continue;
      const kv = clasificar(s);
      if (kv) out.push(kv);
    }
    return out;
  }
  const BANDERAS = ['interrumpe', 'grande', 'tambien', 'al_paso'];
  function guionClasificar(s) {
    if (BANDERAS.includes(s)) return [s, 'sí'];
    const i = s.indexOf(':');
    if (i < 0) return [s, 'sí'];
    return [s.slice(0, i).trim(), s.slice(i + 1).trim()];
  }
  function llegadasClasificar(s) {
    const m = /^(llega si|se va si|de visita|al llegar|al irse):\s*(.*)$/u.exec(s);
    return m ? [m[1], m[2]] : null;
  }

  // ---------------------------------------------------------------- las reglas (src/datos/reglas.txt)
  function reglasLeer(txt) {
    const out = { espera: [], nunca: [], referencia: [], solo: [], laguna: [] }; let r = null;
    for (const raw of txt.split('\n')) {
      const l = raw.trim();
      if (!l || l.startsWith('#')) continue;
      let m = /^===\s*(espera|nunca|referencia|solo|laguna):\s*(.+?)\s*===$/u.exec(l);
      if (m) { r = { nombre: m[2] }; out[m[1]].push(r); continue; }
      m = /^(quiénes|cuando|hay|si|palabras|exige|salvo|pide|de):\s*(.*)$/u.exec(l);
      if (r !== null && m) {
        const [, k, v] = m;
        if (k === 'exige') (r.exige = r.exige || []).push(comas(v));   // (several lines: one or the other)
        else r[k] = k === 'palabras' ? v.split('|').map(x => x.trim()) : k === 'hay' || k === 'de' ? v : comas(v);
      }
    }
    return out;
  }

  async function modelo({ Z3ctx: Z, textos, datos, incremental = true, partida = null }) {
    const leer = r => {
      if (typeof textos[r] !== 'string') throw new Error('Falta el texto de ' + r);
      return textos[r].replace(/\r\n?/g, '\n');   // (Python reads with universal newlines)
    };
    const D = datos.planilla, G = D.grafo;
    const And = xs => Z.And(...xs), Or = xs => Z.Or(...xs), Not = x => Z.Not(x), T = () => Z.Bool.val(true), F = () => Z.Bool.val(false);
    const isFalse = e => Z.isFalse(e), isTrue = e => Z.isTrue(e);

    // ---------------------------------------------------------------- el mundo: lugares y gente
    const LUGARES = ['ga', 'gg', 'patio', 'camino', 'os', 'rl', 'hh', 'tl', 'es', 'ig', 'cp', 'sa'];
    const NOMBRE_LUGAR = { ga: 'su pieza', gg: 'la cocina de Tejas Verdes', patio: 'el patio de Tejas Verdes', camino: 'el camino o la aldea', os: 'La Cuesta del Huerto',
      rl: 'la casa de la Sra. Lynde', hh: 'la casa del Sr. Harrison', tl: 'la tienda de Lawson', es: 'la escuela', ig: 'la iglesia', cp: 'la casa parroquial', sa: 'el salón' };
    const AFUERA = ['patio', 'camino'];
    const GRUPOS_LUGAR = { tejas: ['ga', 'gg', 'patio'], casa: ['gg', 'patio'], dentro: LUGARES.filter(l => !AFUERA.includes(l)), arroyo: ['camino'], out: AFUERA, afuera: AFUERA,
      publico: ['es', 'ig', 'tl', 'sa', 'cp'] };
    const L = Object.fromEntries(LUGARES.map((l, i) => [l, i]));
    const has = (o, k) => Object.prototype.hasOwnProperty.call(o, k), enL = l => has(L, l);
    const gente = new Map();   // (the groups are not people: their lines go to each one)
    for (const g of D.gente) if (g.grupo !== 'grupos') gente.set(g.id, g);
    const NOMBRE = new Map([...gente].map(([k, g]) => [k, g.nombre])); NOMBRE.set('ana', 'Ana');
    const nombre = k => NOMBRE.has(k) ? NOMBRE.get(k) : k;
    const CASA = new Map();   // where each one lives
    for (const c of D.casas) for (const v of c.viven) CASA.set(v.split('f:').join(''), c.id);
    for (const [k, v] of [['diana', 'os'], ['matthew', 'gg'], ['marilla', 'gg']]) CASA.set(k, v);
    const NINOS = new Set([...[...gente].filter(([, g]) => g.grupo === 'niños').map(([k]) => k), 'diana', 'minnie', 'niño']);
    const ADULTOS = new Set([...gente.keys()].filter(k => !NINOS.has(k) && k !== 'niño'));
    const CONOCE_BASE = new Set(['marilla', 'matthew', 'spencer']);
    const CONOCE_POR = { diana: 'hecho:conocidas_diana', barry: 'hecho:barry_presenta', lynde: 'hecho:lynde_visita', josephine: 'hecho:cama_josephine' };
    const SIN_NOMBRE = new Set(['vecino', 'niño']);

    // ---------------------------------------------------------------- las variables de una situación
    const dia = Z.Int.const('dia'), hora = Z.Real.const('hora');
    const estacion = dia.sub(1).div(14).mod(4);
    const EST = { primavera: 0, verano: 1, 'otoño': 2, invierno: 3 };
    const V = new Map();
    const B_ = n => { if (!V.has(n)) V.set(n, Z.Bool.const(n)); return V.get(n); };
    const I_ = n => { if (!V.has(n)) V.set(n, Z.Int.const(n)); return V.get(n); };
    const lugar = k => I_('L_' + k);
    let OLVIDABLES;
    // (a fact, by time t: it happened, and on or before that day; t undefined is Python's None, and dia itself is
    // told apart from any other day, as modelo.py does with «is»)
    function hecho(x, t) {
      const h = B_('h_' + x), d = I_('d_' + x);
      if (t !== undefined && t !== dia && OLVIDABLES.has(x)) return And([B_('e_' + x), d.le(t)]);   // (in the past: it happened then, even if it is forgotten now)
      return t === undefined ? h : And([h, d.le(t)]);
    }

    // the arrivals (src/datos/llegadas.txt): who is in Avonlea, and since when
    const LLEG = new Map();
    for (const p of partir(leer('src/datos/llegadas.txt'))) {
      if (p[0] !== 'bloque') continue;
      const e = { llega: [], seva: [], visita: false };
      for (const [k, v] of campos(p[2], llegadasClasificar)) {
        if (k === 'llega si') e.llega.push(comas(v));
        else if (k === 'se va si') e.seva.push(comas(v));
        else if (k === 'de visita') e.visita = true;
      }
      LLEG.set(p[1], e);
    }
    // who leaves each fact (the scenes, with their conditions; or the code)
    const QUIEN_DEJA = new Map(), DEJA = new Map(), CUENTA = new Map();   // (fact → scenes; scene → facts it leaves; scene → news heard at its start)
    const DECIDE = new Map(), SIEMPRE = new Map();   // (a fact only an option of Ana's leaves → that scene and option; scene → what it leaves whatever she chooses)
    const addTo = (m, k, v) => { if (!m.has(k)) m.set(k, new Set()); m.get(k).add(v); };
    const esHecho = (k, v) => (k === 'al_terminar' || k === 'al_empezar') && ws(v)[0] === 'hecho' && ws(v).length > 1;
    for (const archivo of ['src/datos/guion.txt', 'src/datos/conversaciones.txt']) {
      for (const p of partir(leer(archivo))) {
        if (p[0] !== 'bloque') continue;
        const f = campos(p[2], guionClasificar);
        const si = f.filter(([k]) => k === 'si').flatMap(([, v]) => comas(v));
        const hablan = new Set();
        for (const l of p[3]) { const m = rx('^\\s*(\\w+):').exec(l); if (m && !['ana', 'narra', 'carta'].includes(m[1])) hablan.add(m[1]); }
        for (const h of hablan) if (LLEG.has(h)) si.push('presente:' + h);   // (who speaks in it was here)
        const deja = f.filter(([k, v]) => esHecho(k, v)).map(([, v]) => ws(v)[1]);
        for (const l of p[3]) { const m = rx('^\\s*!\\s*hecho\\s+(\\w+)').exec(l); if (m) deja.push(m[1]); }
        const siempre = f.filter(([k, v]) => esHecho(k, v)).map(([, v]) => ws(v)[1]);   // (what it leaves whatever she chooses)
        SIEMPRE.set(p[1], new Set(siempre));
        let op = null;   // (the option a line is under: its lines are indented)
        for (const l of p[3]) {
          const o = /^\s*->\*?\s*(.*)$/u.exec(l); if (o) { op = o[1].trim(); continue; }
          if (!/^\s/u.test(l) && l.trim()) op = null;
          const m = rx('^\\s+!\\s*hecho\\s+(\\w+)').exec(l);
          if (m && op && !siempre.includes(m[1]) && !DECIDE.has(m[1])) DECIDE.set(m[1], { escena: p[1], opcion: op });
        }
        for (const x of deja) {
          if (!QUIEN_DEJA.has(x)) QUIEN_DEJA.set(x, []);
          QUIEN_DEJA.get(x).push([p[1], si, siempre.filter(y => y !== x)]); addTo(DEJA, p[1], x);
        }
        if (!CUENTA.has(p[1])) CUENTA.set(p[1], new Set());
        for (const [k, v] of f) if (k === 'al_empezar' && ws(v)[0] === 'contar' && ws(v).length > 2) CUENTA.get(p[1]).add('sabe:' + ws(v).slice(1, 3).join(':'));   // (someone hears it there: «ésta es Ana»)
      }
    }
    const EXCLUYE = [], excluyeVisto = new Set();
    for (const archivo of ['src/datos/guion.txt', 'src/datos/conversaciones.txt']) {
      for (const p of partir(leer(archivo))) {
        if (p[0] !== 'bloque') continue;
        const f = campos(p[2], guionClasificar);
        const olv = f.filter(([k, v]) => (k === 'al_terminar' || k === 'al_empezar') && ws(v)[0] === 'olvidar' && ws(v).length > 1).map(([, v]) => ws(v)[1]);
        const dej = f.filter(([k, v]) => esHecho(k, v)).map(([, v]) => ws(v)[1]);
        for (const x of olv) for (const y of dej) if (!excluyeVisto.has(x + '\n' + y)) { excluyeVisto.add(x + '\n' + y); EXCLUYE.push([x, y]); }
      }
    }
    OLVIDABLES = new Set([...(leer('src/datos/guion.txt') + leer('src/datos/conversaciones.txt')).matchAll(rx('olvidar\\s+(\\w+)', 'g'))].map(m => m[1]));   // (facts that can be forgotten: one cannot say they stay)
    const DEL_CODIGO = new Set(Object.entries(G.hechos).filter(([, w]) => w.some(x => x === 'código' || x.startsWith('habilidad') || x === 'llegadas')).map(([h]) => h));
    const METAS = new Set(G.metas);

    const RE_CUALIDAD = rx('^(\\w+):(\\w+)(?::(\\w+))?([<>]=?)(\\d+)$');
    // una condición del guion → una fórmula (t: en qué día se mira, si no es hoy)
    function atomo(c, k, t) {
      c = c.trim().split('{k}').join(k || '');
      if (c.startsWith('!')) return Not(atomo(c.slice(1), k, t));
      const now = t === undefined ? dia : t;
      const m = RE_CUALIDAD.exec(c);   // a quality: «afecto:diana:ana>=4», «estudio:ana>=20»
      if (m) {
        const v = I_('q_' + [m[1], m[2], m[3]].filter(Boolean).join('_')), n = parseInt(m[5], 10);
        return { '>=': () => v.ge(n), '<=': () => v.le(n), '>': () => v.gt(n), '<': () => v.lt(n) }[m[4]]();
      }
      const i = c.indexOf(':'), key = i < 0 ? c : c.slice(0, i), a = (i < 0 ? '' : c.slice(i + 1)).split(':');
      if (key === 'hecho') return hecho(a[0], now);
      if (key === 'horas_desde') return atomo('hecho:' + a[0], k, t);   // (the hours do not matter to the model: that it happened)
      if (key === 'dias_desde') {
        const x = a[0], n = parseInt(a[1], 10);
        if (METAS.has(x) && !has(G.hechos, x)) return And([B_('m_' + x), now.sub(I_('dm_' + x)).ge(n)]);
        return And([t !== undefined && OLVIDABLES.has(x) ? B_('e_' + x) : B_('h_' + x), now.sub(I_('d_' + x)).ge(n)]);
      }
      if (key === 'cuaderno') return And([B_('m_' + a[0]), I_('dm_' + a[0]).le(now)]);
      if (key === 'dia_juego') return now.ge(parseInt(a[0], 10));
      if (key === 'estacion') return now.sub(1).div(14).mod(4).eq(has(EST, a[0]) ? EST[a[0]] : -1);
      if (key === 'dia_estacion') return now.sub(1).mod(14).add(1).eq(parseInt(a[0], 10));
      if (key === 'hora') {
        const [x, y] = a[0].split('-').map(Number);
        return y <= 26 ? And([hora.ge(x), hora.lt(y)]) : And([hora.ge(x)]);
      }
      if (key === 'conoce') return conoce(a[0]);
      if (key === 'presente') return presente(a[0], t);
      if (key === 've') return ve(a[0]);
      if (key === 'donde') {
        const quien = a[0], l = a[1];
        if (l === 'propia') return And([lugar(quien).eq(CASA.has(quien) ? (enL(CASA.get(quien)) ? L[CASA.get(quien)] : -1) : L.camino), lugar('ana').eq(lugar(quien))]);
        const ls = has(GRUPOS_LUGAR, l) ? GRUPOS_LUGAR[l] : enL(l) ? [l] : [];
        return ls.length ? Or(ls.map(x => lugar(quien).eq(L[x]))) : F();
      }
      if (key === 'ana') return B_('ana_' + a[0]);
      if (key === 'escena_ana') return enL(a[0]) ? lugar('ana').eq(L[a[0]]) : (a[0] === 'out' ? Or(AFUERA.map(x => lugar('ana').eq(L[x]))) : F());
      if (key === 'ana_visible') return T();
      if (key === 'sabe') {
        const b = B_('sabe_' + a[0] + '_' + a[1]);
        if (a.length > 2 && /^\d+$/u.test(a[2])) return And([b, I_('v_' + a[0] + '_' + a[1]).ge(parseInt(a[2], 10))]);
        if (a.length > 2 && a[2] === 'contada') return And([b, B_('contada_' + a[0] + '_' + a[1])]);   // (someone told them: they did not see it themselves)
        return b;
      }
      if (key === 'capitulo') return F();   // (the book's first chapter: before the game proper)
      return B_('x_' + c);   // (anything else: free, either way)
    }
    const todos = (cs, k, t) => cs && cs.length ? And(cs.map(c => atomo(c, k, t))) : T();
    // (a unit holds: its conditions; and, for a group's line, none of one's own lines for the same thing)
    const vale = (u, k) => And([todos(u.conds, k), ...(u.cede || []).map(p => Not(todos(p.conds, k)))]);
    function presente(k, t) {
      const e = LLEG.get(k); t = t === undefined ? dia : t;
      if (!e) return T();
      if (e.visita) return And([e.llega.length ? Or(e.llega.map(g => todos(g, undefined, t))) : T(), e.seva.length ? Not(Or(e.seva.map(g => todos(g, undefined, t)))) : T()]);
      const llego = e.llega.length ? hecho('llego_' + k, t) : T();
      const seFue = e.seva.length ? hecho('se_fue_' + k, t) : F();
      return And([llego, Not(seFue)]);
    }
    function conoce(k) {
      if (CONOCE_BASE.has(k)) return T();
      const f = B_('conoce_' + k);
      return has(CONOCE_POR, k) ? Or([f, atomo(CONOCE_POR[k])]) : f;
    }
    const ve = k => And([presente(k), lugar(k).eq(lugar('ana'))]);
    function puedeEstar(k) {
      if (k === 'marilla' || k === 'matthew') return new Set(LUGARES);
      const ok = new Set(['camino', 'patio', 'ig', 'cp', 'sa', 'tl']);
      if (SIN_NOMBRE.has(k)) { if (k === 'niño') ok.add('es'); return ok; }
      if (CASA.get(k)) ok.add(CASA.get(k));
      if (ADULTOS.has(k)) for (const x of ['gg', 'os', 'rl', 'hh']) ok.add(x);
      if (NINOS.has(k)) ok.add('es');
      if (k === 'phillips' || k === 'stacy') ok.add('es');
      if (k === 'diana') { ok.add('ga'); ok.add('gg'); }
      return ok;
    }

    const REGLAS = reglasLeer(leer('src/datos/reglas.txt'));

    // ---------------------------------------------------------------- lo que siempre vale (las restricciones)
    const RE_SUPONE = /^(hecho|cuaderno|dias_desde|dia_juego|presente):/u;
    function restricciones(quienes) {
      const R = [dia.ge(1), dia.le(140), hora.ge(6), hora.le(26)];
      for (const k of [...quienes, 'ana']) R.push(And([lugar(k).ge(0), lugar(k).lt(LUGARES.length)]));
      // the beginning: as the book (the game starts with Ana's arrival)
      R.push(B_('h_inicio_juego'), I_('d_inicio_juego').eq(1));
      for (const [x, d, desde] of [['llegada_tv', 1, 2], ['primera_noche', 1, 2], ['desayuno_prueba', 2, 3]])   // (the first night and morning, as the book)
        R.push(Z.Implies(B_('h_' + x), I_('d_' + x).eq(d)), Z.Implies(dia.ge(desde), B_('h_' + x)));
      R.push(Z.Implies(B_('h_primera_noche'), B_('h_llegada_tv')), Z.Implies(B_('h_desayuno_prueba'), B_('h_primera_noche')));
      // where each one can be (Ana's room: the Cuthberts and Diana; a house: who lives there and the grown-ups who visit;
      // the school: the children and the teacher; the vecinos without a name: out of doors and in the public places)
      for (const k of quienes) R.push(Or([...puedeEstar(k)].map(x => lugar(k).eq(L[x]))));
      // what each fact supposes: one of the scenes that leave it could happen, by that day (or the code left it)
      const hechos = new Set([...V.keys()].filter(n => n.startsWith('h_') || n.startsWith('d_')).map(n => n.slice(2)));
      for (const x of [...hechos].sort()) {
        R.push(Z.Implies(B_('h_' + x), And([I_('d_' + x).ge(1), I_('d_' + x).le(dia)])));
        if (OLVIDABLES.has(x)) R.push(Z.Implies(B_('h_' + x), B_('e_' + x)), Z.Implies(B_('e_' + x), And([I_('d_' + x).ge(1), I_('d_' + x).le(dia)])));
        if (x.startsWith('llego_') || x.startsWith('se_fue_')) {
          const k = x.startsWith('llego_') ? x.slice('llego_'.length) : x.slice('se_fue_'.length);
          const e = LLEG.get(k);
          if (e) {
            const gs = x.startsWith('llego_') ? e.llega : e.seva;
            if (gs.length) {
              R.push(Z.Implies(B_('h_' + x), Or(gs.map(g => todos(g, undefined, I_('d_' + x))))));   // (it holds on the day they came)
              R.push(Z.Implies(Or(gs.map(g => todos(g))), B_('h_' + x)));   // (and if it holds now, they have come)
            }
          }
          continue;
        }
        if (DEL_CODIGO.has(x) || !QUIEN_DEJA.has(x)) continue;
        R.push(Z.Implies(B_('h_' + x), Or(QUIEN_DEJA.get(x).map(([, si, junto]) => {
          const cs = [...si.filter(c => RE_SUPONE.test(c)).map(c => atomo(c, undefined, I_('d_' + x))),
            ...junto.filter(y => !OLVIDABLES.has(y)).map(y => And([B_('h_' + y), I_('d_' + y).eq(I_('d_' + x))]))];   // (and the facts the same scene leaves, the same day)
          return And(cs.length ? cs : [T()]);
        }))));
      }
      for (const n of [...V.keys()]) if (n.startsWith('dm_')) R.push(Z.Implies(B_('m_' + n.slice(3)), And([V.get(n).ge(1), V.get(n).le(dia)])));
      // whom Ana knows, they know there is a girl at Green Gables
      for (const k of quienes) if (!SIN_NOMBRE.has(k)) R.push(Z.Implies(conoce(k), B_('sabe_' + k + '_nina_cuthbert')));
      R.push(B_('sabe_lynde_nina_cuthbert'), ...[...CONOCE_BASE].map(k => B_(`sabe_${k}_nina_cuthbert`)));
      // a neighbour's house: Ana is only inside if someone who lives there is at home
      for (const h of ['os', 'rl', 'hh', 'tl']) {
        const viven = [...CASA].filter(([k, c]) => c === h && quienes.has(k)).map(([k]) => k);
        R.push(Z.Implies(lugar('ana').eq(L[h]), viven.length ? Or(viven.map(ve)) : F()));
      }
      // whoever is not in Avonlea is nowhere here
      for (const k of quienes) R.push(Z.Implies(Not(presente(k)), lugar(k).neq(lugar('ana'))));
      // Ana, at night: home, or about (not in the school, the church, the shop)
      R.push(Z.Implies(Or([B_('ana_en_cama'), B_('ana_sentada')]), T()));
      for (const r of REGLAS.nunca) R.push(Not(todos(r.si)));
      // a scene that forgets X and leaves Y: after it, not both (the apology forgets the offense)
      for (const [x, y] of EXCLUYE) R.push(Not(And([hecho(x), hecho(y)])));
      return R;
    }

    function grupo(qs) {
      const s = new Set();
      const G_ = { todos: new Set(gente.keys()), adultos: ADULTOS, 'niños': NINOS, casa: new Set([...gente].filter(([, g]) => g.grupo === 'casa').map(([k]) => k)),
        pueblo: new Set([...gente].filter(([, g]) => g.grupo === 'pueblo').map(([k]) => k)) };
      for (const q of qs) for (const x of (has(G_, q) ? G_[q] : [q])) s.add(x);
      return [...s].filter(x => gente.has(x));
    }

    // ---------------------------------------------------------------- lo que cada uno le puede decir a Ana
    const UNIDADES = new Map();   // k → [{tipo, id, texto, conds}]
    const U = k => { if (!UNIDADES.has(k)) UNIDADES.set(k, []); return UNIDADES.get(k); };   // (a defaultdict: looking it up makes it)
    const RE_NOMBRA = new RegExp(NOT_W_BEFORE + '(Ana|Shirley)' + NOT_W_AFTER, 'u');
    function agregarFrase(k, tipo, conds, texto) {
      conds = [...conds, ...(tipo === 'dice' ? [] : ['estacion:' + tipo])];
      if (RE_NOMBRA.test(texto.replace(/\([^)]*\)/gu, '')) && !CONOCE_BASE.has(k)) conds.push('conoce:' + k);   // (a stage direction is not saying it)   // (whoever does not know her does not say her name)
      U(k).push({ tipo: tipo === 'dice' ? 'frase' : 'frase de ' + tipo, id: `${k}·${cut(texto, 40)}`, texto, conds: [...conds, 've:' + k] });
    }
    const GRUPO_FRASES = [];
    let q = null;
    for (const raw of leer('src/datos/frases.txt').split('\n')) {
      const l = raw.trim();
      let m = /^===\s*(.+?)\s*===$/u.exec(l);
      if (m) { q = m[1]; continue; }
      m = /^(dice|primavera|verano|otoño|invierno):\s*(?:\[([^\]]+)\]\s*)?(.*)$/u.exec(l);
      if (q && m) {
        const conds = comas(m[2] || '');
        if (q === 'adultos' || q === 'niños') GRUPO_FRASES.push([q, m[1], conds, m[3]]);
        else agregarFrase(q, m[1], conds, m[3]);
      }
    }
    // the sayings (src/datos/dichos/*.txt): the ones whose group says who says them («quien: marilla»), as their lines
    // (the conditions with blanks, which the code fills, are left out: the line may hold in any of its cases)
    const DICHOS = 'src/datos/dichos/';
    for (const nombreArchivo of Object.keys(textos).filter(r => r.startsWith(DICHOS) && !r.slice(DICHOS.length).includes('/')).map(r => r.slice(DICHOS.length)).sort()) {
      if (!nombreArchivo.endsWith('.txt')) continue;
      let q = null, siG = [];
      for (const raw of leer(DICHOS + nombreArchivo).split('\n')) {
        const l = raw.trim();
        if (!l || l[0] === '#') continue;
        let m = /^===\s*(.+?)\s*===$/u.exec(l);
        if (m) { q = null; siG = []; continue; }
        m = /^quien:\s*(\S+)/u.exec(l);
        if (m) { q = m[1]; continue; }
        m = /^si:\s*(.*)$/u.exec(l);
        if (m) { siG = comas(m[1]); continue; }
        m = /^-\s*(?:\[([^\]]*)\]\s*)?(.+)$/u.exec(l);
        if (m && q && gente.has(q)) {
          const conds = [...siG, ...comas(m[1] || '')].filter(c => !c.includes('{'));
          agregarFrase(q, 'dice', conds, m[2]); const us = U(q); us[us.length - 1].tipo = 'dicho';
        }
      }
    }
    // the notebook's winks (src/datos/cuaderno.txt, «guiño quien:»): what someone says while a goal is open and not done
    // (its «requiere» done). A goal done is its fact, if it is one («meta: hecho se_queda»), or else «cuaderno:id»
    const CUAD = new Map();
    for (const b of leer('src/datos/cuaderno.txt').split(/^(?==== )/mu)) {
      const m = /^=== (\S+) ===/u.exec(b);
      if (!m) continue;
      const r = /^requiere: (.*)$/mu.exec(b), h = /^meta: hecho (\S+)/mu.exec(b);
      CUAD.set(m[1], { req: r ? r[1].split(',').map(x => x.trim()) : [], hecho: h ? h[1] : null, guinos: [...b.matchAll(/^guiño (\S+): (.*)$/gmu)].map(x => [x[1], x[2]]) });
    }
    const hecha = k => CUAD.get(k).hecho ? 'hecho:' + CUAD.get(k).hecho : 'cuaderno:' + k;
    for (const [k, c] of CUAD) {
      const abierta = [...c.req.map(x => CUAD.has(x) ? hecha(x) : x), '!' + hecha(k)];
      for (const [quien, texto0] of c.guinos) {
        const mc = /^\[([^\]]+)\]\s*(.*)$/u.exec(texto0), propias = mc ? mc[1].split(',').map(x => x.trim()) : [], texto = mc ? mc[2] : texto0;
        if (UNIDADES.has(quien) || NOMBRE.has(quien)) { agregarFrase(quien, 'dice', [...abierta, ...propias], texto); const us = U(quien); us[us.length - 1].tipo = 'guiño del cuaderno'; }
      }
    }
    // a group's lines: each one of them; but a group's line gives way to one's own voice (as the game: lineasConVoz): it
    // holds only when none of one's own lines for the same thing (ana:camison, the hour) holds
    const RE_CLAVE = rx('^(ana:\\w+|hora:2\\d)');
    const claves = cs => new Set(cs.map(c => RE_CLAVE.exec(c)).filter(Boolean).map(m => m[1]));   // (what a line reacts to: «ana:camison», «hora:21»; not «!donde:ana:tejas»)
    for (const [g, tipo, conds, texto] of GRUPO_FRASES) {
      for (const k of [...gente.keys()].filter(x => NINOS.has(x) === (g === 'niños'))) {
        const cg = claves(conds);
        const propias = U(k).filter(u => u.tipo.startsWith('frase') && !u.grupo && [...claves(u.conds)].some(x => cg.has(x)));
        agregarFrase(k, tipo, conds, texto);
        Object.assign(U(k)[U(k).length - 1], { grupo: true, cede: propias });
      }
    }
    const RE_CON_ANA = /(^|, )!?(ana:|ve:|donde:ana:)/u;
    for (const e of D.escenas) {
      if (['objeto', 'menu', 'comentario', 'lugar'].includes(e.disparo)) continue;
      const hablan = e.hablan.split(',').map(x => x.trim()).filter(Boolean);
      const conAna = e.quienes.includes('ana') || e.con || e.en.includes('ana') || e.texto.some(t => t.startsWith('ana:') || t.startsWith('?')) || RE_CON_ANA.test(e.si);
      if (!conAna) continue;
      const quienes = new Set([...hablan, ...e.quienes, ...(e.con ? [e.con] : [])].filter(x => !['ana', 'narra', 'carta'].includes(x)));
      const si = comas(e.si);
      const en = e.en.split(', ').filter(x => x.includes('=')).map(x => `donde:${x.split('=')[0]}:${x.split('=')[1]}`);
      const canal = [];   // («canal:» is the queue of talk, not a place: the scene plays wherever its «si:» and «en:» hold)
      for (const k of quienes) {
        if (!gente.has(k)) continue;
        const tipo = { conversar: 'conversación', encuentro: 'escena al encontrarse', primera: 'escena' }[e.disparo] || 'escena';
        const pres = hablan.filter(h => LLEG.has(h) && h !== k).map(h => 'presente:' + h);
        U(k).push({ tipo, id: e.id, texto: cut(e.primera || '', 80), conds: [...si, ...en, ...canal, ...pres, 've:' + k], textos: e.texto, deja: DEJA.get(e.id) || new Set() });
      }
    }
    for (const k of gente.keys())
      if (!CONOCE_BASE.has(k) && !SIN_NOMBRE.has(k)) U(k).push({ tipo: 'presentación', id: 'presenta:' + k, texto: '(se presenta: es la primera vez)', conds: ['!conoce:' + k, 've:' + k] });

    // por qué ninguna vale: lo primero que le falta a cada una (lo más común primero)
    function explicar(m, k, us) {
      const falta = new Map(), ej = new Map();
      for (const u of us) {
        for (const c of u.conds) {
          if (isFalse(m.eval(atomo(c, k), true))) { falta.set(c, (falta.get(c) || 0) + 1); if (!ej.has(c)) ej.set(c, u.texto || u.id); break; }
        }
      }
      return [...falta].sort((x, y) => y[1] - x[1]).slice(0, 6).map(([c, n]) => [c, n, ej.get(c)]);   // (a stable sort: as Counter.most_common)
    }
    const num = e => { const s = e.asString ? e.asString() : String(e); const [n, d] = s.split('/'); return d ? Number(n) / Number(d) : Number(n); };
    function situacion(m, k) {
      const v = x => m.eval(x, true);
      const d = Number(v(dia).value()), h = Math.trunc(num(v(hora)));
      const est = ['primavera', 'verano', 'otoño', 'invierno'][Math.floor((d - 1) / 14) % 4];
      const s = { 'día': d, 'estación': est, hora: `${h % 24}:00`, 'Ana en': NOMBRE_LUGAR[LUGARES[Number(v(lugar('ana')).value())]] };
      if (isTrue(v(B_('ana_camison')))) s.Ana = 'en camisón';
      else if (isTrue(v(B_('ana_sin_sombrero')))) s.Ana = 'sin sombrero';
      if (k) s['conoce a ' + nombre(k)] = isTrue(v(conoce(k))) ? 'sí' : 'no';
      return s;
    }

    // ---------------------------------------------------------------- las preguntas
    const t0 = Date.now();
    const hallazgos = { huecos: [], incoherencias: [], imposibles: [] };
    const todosQuienes = new Set(gente.keys());
    for (const [k, us] of [...UNIDADES]) for (const u of us) for (const c of u.conds) atomo(c, k);   // (all the variables, before the restrictions)
    for (const e of [...REGLAS.espera, ...REGLAS.solo]) for (const k of grupo(e['quiénes'] || ['todos'])) for (const c of e.cuando || []) atomo(c, k);
    const R = restricciones(todosQuienes);
    const base = new Z.Solver(); base.add(...R);
    if (await base.check() !== 'sat') throw new Error('Las restricciones se contradicen: el modelo no tiene ninguna situación posible (revisar src/datos/reglas.txt).');
    // each question: the restrictions and what it adds. modelo.py makes a new solver each time; here one solver keeps R
    // and each question goes in a push/pop (the same answers, several times faster in wasm). If the incremental solver
    // ever says «unknown», the question is asked again of a fresh one, as modelo.py would.
    const nuevo = () => {
      if (!incremental) { const S = new Z.Solver(); S.add(...R); return S; }
      base.push(); const puesto = []; let S = base;
      return {
        add: x => { puesto.push(x); S.add(x); },
        async check() {
          let r = await S.check();
          if (r === 'unknown' && S === base) { S = new Z.Solver(); S.add(...R, ...puesto); r = await S.check(); }
          return r;
        },
        model: () => S.model(),
        release: () => { if (S !== base) S.release(); base.pop(); },
      };
    };

    if (partida) { const r = await lagunas(); base.release(); return r; }

    // las lagunas de una partida (src/datos/reglas.txt, «laguna:»): desde lo que ya pasó en ella, ¿puede todavía darse
    // algo que siga? Lo que ya pasó queda como pasó (sus hechos, sus días); lo que no, solo puede pasar desde hoy
    async function lagunas() {
      const hoy = partida.dia, H = partida.hechos || {}, M = partida.metas || {}, dichas = new Set(partida.dichas || []);
      const P = [dia.ge(hoy)], aun = [];   // (aun: what has not happened yet, as [name, «only from today»])
      for (const x of Object.keys(H)) { B_('h_' + x); I_('d_' + x); }
      for (const n of [...V.keys()]) {
        if (n.startsWith('h_')) {
          const x = n.slice(2), e = OLVIDABLES.has(x) ? B_('e_' + x) : B_('h_' + x);
          if (has(H, x)) P.push(And([e, I_('d_' + x).eq(H[x])])); else aun.push([x, Z.Implies(e, I_('d_' + x).ge(hoy))]);
        } else if (n.startsWith('m_')) {
          const x = n.slice(2);
          if (has(M, x)) P.push(And([B_('m_' + x), I_('dm_' + x).eq(M[x])])); else aun.push(['cuaderno:' + x, Z.Implies(B_('m_' + x), I_('dm_' + x).ge(hoy))]);
        }
      }
      const conocidos = [...new Set([...CONOCE_BASE, ...(partida.conoce || [])])].filter(k => gente.has(k) && !SIN_NOMBRE.has(k));
      for (const k of conocidos) P.push(conoce(k));
      // what has not happened yet happens only from today; unless, for the model, what did happen needs it before (a fact
      // the code leaves, or a save from before a scene changed): then it is left free, and told («supone»)
      const S0 = new Z.Solver(); S0.add(...R, ...P);
      const posible = await S0.check() === 'sat', supone = [];
      if (posible) for (const [x, c] of aun) { S0.push(); S0.add(c); if (await S0.check() === 'sat') P.push(c); else { S0.pop(); supone.push(x); } }
      const jugada = u => dichas.has(u.id) || [...(SIEMPRE.get(u.id) || [])].some(x => has(H, x));   // (played: it says so, or what it always leaves is there)
      const ESCENA = new Set(['escena', 'conversación', 'escena al encontrarse', 'carta']);
      const CARTAS = new Map();   // (the answers to Ana's letters, «canal: respuesta»: what is still to come with whoever writes them)
      for (const p of partir(leer('src/datos/guion.txt'))) {
        if (p[0] !== 'bloque') continue;
        const f = campos(p[2], guionClasificar), v = k => (f.find(([x]) => x === k) || [])[1];
        if (v('canal') === 'respuesta' && v('de')) { if (!CARTAS.has(v('de'))) CARTAS.set(v('de'), []); CARTAS.get(v('de')).push({ tipo: 'carta', id: p[1], conds: f.filter(([x]) => x === 'si').flatMap(([, c]) => comas(c)) }); }
      }
      const puede = async (u, k) => { const S = nuevo(); for (const x of [...P, vale(u, k)]) S.add(x); const r = await S.check() === 'sat'; S.release(); return r; };
      const out = [];
      for (const r of REGLAS.laguna) {
        if (r.de === 'decisiones') {   // lo que Ana decidió: algo que todavía puede darse lo toma en cuenta
          const borrado = x => EXCLUYE.some(([a, y]) => a === x && has(H, y));   // (what a later scene forgot: the apology forgets the offense)
          for (const x of Object.keys(H).filter(x => DECIDE.has(x) && !borrado(x)).sort()) {
            const toma = c => c === 'hecho:' + x || c.startsWith('dias_desde:' + x + ':');
            let hay = null;
            for (const [k, us] of UNIDADES) { for (const u of us) if (u.conds.some(toma) && !(ESCENA.has(u.tipo) && jugada(u)) && await puede(u, k)) { hay = u; break; } if (hay) break; }
            if (!hay) out.push({ regla: r.nombre, de: 'decisiones', hecho: x, dia: H[x], ...DECIDE.get(x) });
          }
        } else if (r.de === 'conocidos') {   // con quien Ana conoce: queda alguna escena o conversación que todavía puede darse
          for (const k of conocidos.sort()) {
            let hay = null;
            for (const u of [...(UNIDADES.get(k) || []), ...(CARTAS.get(k) || [])]) if (ESCENA.has(u.tipo) && !jugada(u) && await puede(u, k)) { hay = u; break; }
            if (!hay) out.push({ regla: r.nombre, de: 'conocidos', quien: k, nombre: nombre(k) });
          }
        }
      }
      S0.release();
      const seg = Math.round((Date.now() - t0) / 100) / 10;
      return { lagunas: out, posible, supone, segundos: seg, variables: V.size, resumen: `lagunas: ${out.length}${posible ? '' : ' (¡lo que pasó en la partida no es posible para el modelo!)'}${supone.length ? ` · supone que ya pasó: ${supone.join(', ')}` : ''} · ${V.size} variables · ${pyFloat(seg)} s` };
    }

    // 1. lo que debería haber: ¿hay una situación en que no hay nada?
    for (const e of REGLAS.espera) {
      const hay = e.hay !== undefined ? e.hay : 'algo';
      for (const k of grupo(e['quiénes'] || ['todos']).sort()) {
        let us = UNIDADES.get(k) || [];
        if (hay.startsWith('reacción')) {
          const a = hay.trim().replace(/^\S+\s+/u, '');   // (hay.split(None, 1)[1])
          us = us.filter(u => u.conds.some(c => c === a || (a === 'hora' && c.startsWith('hora:') && Number(c.split(':')[1].split('-')[0]) >= 20)));
        }
        const S = nuevo(); S.add(todos(e.cuando || [], k)); S.add(us.length ? Not(Or(us.map(u => vale(u, k)))) : T());
        const casos = [];
        while (casos.length < 4 && await S.check() === 'sat') {
          const m = S.model();
          casos.push({ 'situación': situacion(m, k), 'por qué': explicar(m, k, us) });
          // another one, different in what matters: where, when, how she is, whether they know each other
          S.add(Or([lugar('ana').neq(m.eval(lugar('ana'), true)), estacion.neq(m.eval(estacion, true)),
            conoce(k).neq(m.eval(conoce(k), true)), B_('ana_camison').neq(m.eval(B_('ana_camison'), true))]));
        }
        S.release();
        if (casos.length) hallazgos.huecos.push({ regla: e.nombre, quien: k, nombre: nombre(k), tiene: us.length, casos });
      }
    }

    // 2. lo que una frase supone: ¿hay una situación en que se dice sin que se cumpla?
    for (const r of REGLAS.referencia) {
      const pat = new RegExp(r.palabras.map(p => NOT_W_BEFORE + reEscape(p)).join('|'), 'u');   // (as written: «Pasa,» is not «pasa,»)
      for (const [k, us] of UNIDADES) {
        if ((r.salvo || []).includes(k)) continue;
        for (const u of us) {
          const textos_ = u.tipo.startsWith('frase') ? [u.texto] : (u.textos || []).filter(t => t.split(':')[0] === k);
          const hit = textos_.find(t => pat.test(t));
          if (hit === undefined) continue;
          if (r.exige.some(g => g.some(c => (c.startsWith('hecho:') && (u.deja || new Set()).has(c.slice(6))) || (CUENTA.get(u.id) || new Set()).has(c.split('{k}').join(k))))) continue;   // (the scene that makes it happen, or tells it)
          const S = nuevo(); S.add(vale(u, k)); S.add(Not(Or(r.exige.map(g => todos(g, k)))));
          if (await S.check() === 'sat')
            hallazgos.incoherencias.push({ regla: r.nombre, quien: k, nombre: nombre(k), tipo: u.tipo, id: u.id, texto: hit, exige: r.exige.map(g => g.join(', ')).join(' o ').split('{k}').join(k), 'situación': situacion(S.model(), k) });
          S.release();
        }
      }
    }

    // 2b. mientras pasa algo, solo lo que lo tiene en cuenta: ¿hay una situación en que vale otra cosa?
    for (const r of REGLAS.solo) {
      for (const k of grupo(r['quiénes'] || ['todos']).sort()) {
        for (const u of UNIDADES.get(k) || []) {
          if (u.tipo === 'presentación' || (r.pide || []).some(p => u.conds.some(c => c.includes(p)))) continue;
          const S = nuevo(); S.add(todos(r.cuando || [], k)); S.add(vale(u, k));
          if (await S.check() === 'sat')
            hallazgos.incoherencias.push({ regla: r.nombre, quien: k, nombre: nombre(k), tipo: u.tipo, id: u.id, texto: u.texto, exige: 'que pida ' + (r.pide || []).join(' o '), 'situación': situacion(S.model(), k) });
          S.release();
        }
      }
    }

    // 3. lo que nunca puede decirse (sus condiciones se contradicen con el mundo)
    for (const [k, us] of UNIDADES) {
      for (const u of us) {
        if (u.grupo) continue;   // (a group's line that always gives way to one's own: as it should)
        const S = nuevo(); S.add(vale(u, k));
        if (await S.check() === 'unsat')
          hallazgos.imposibles.push({ quien: k, nombre: nombre(k), tipo: u.tipo, id: u.id, texto: u.texto, conds: u.conds });
        S.release();
      }
    }

    base.release();
    const seg = Math.round((Date.now() - t0) / 100) / 10;
    const unidades = Object.fromEntries([...UNIDADES].map(([k, v]) => [k, v.length]));
    const json = { generado: D.generado, segundos: seg, unidades, variables: V.size, ...hallazgos };

    // ---------------------------------------------------------------- el informe
    const total = [...UNIDADES.values()].reduce((s, v) => s + v.length, 0);
    let md = ['# El modelo de las interacciones: huecos e incoherencias', '',
      `Lo genera \`python3 tools/modelo.py\` con un solucionador lógico (Z3): para cada regla de \`src/datos/reglas.txt\` le pregunta si existe alguna ` +
      `situación posible del juego en que no se cumple, y la muestra. ${V.size} variables, ${total} cosas que alguien le puede decir a Ana, ` +
      `${pyFloat(seg)} s. Ver \`docs/MODELO_INTERACCIONES.md\`.`, '',
      '| Qué | Cuántos |', '|---|---|', `| Huecos (situaciones sin nada que decir o sin reacción) | ${hallazgos.huecos.length} |`,
      `| Incoherencias (una frase que supone algo que puede no cumplirse) | ${hallazgos.incoherencias.length} |`, `| Frases o escenas que nunca pueden darse | ${hallazgos.imposibles.length} |`, ''];
    const fmt = s => Object.entries(s).map(([a, b]) => `${a}: ${b}`).join(' · ');
    const porregla = new Map();
    for (const h of hallazgos.huecos) { if (!porregla.has(h.regla)) porregla.set(h.regla, []); porregla.get(h.regla).push(h); }
    for (const [regla, hs] of porregla) {
      md.push(`## Hueco: ${regla}`, '', `${hs.length} persona(s): una situación posible en que no tiene nada, y lo que piden las que tiene (todas las situaciones: trazas/modelo.json).`, '',
        '| Quién | Tiene | Una situación sin nada | Lo que piden las que tiene (cuántas) |', '|---|---|---|---|');
      for (const h of hs) {
        const c = h.casos[0];
        const pq = c['por qué'].map(([c_, n]) => `\`${c_}\` (${n})`).join('; ') || 'no tiene ninguna';
        md.push(`| ${h.nombre} | ${h.tiene} | ${fmt(c['situación'])}` + (h.casos.length > 1 ? ` (y ${h.casos.length - 1} más)` : '') + ` | ${pq} |`);
      }
      md.push('');
    }
    if (hallazgos.incoherencias.length) {
      md.push('## Incoherencias', '', '| Regla | Quién | Dónde | Frase | Exige | Se puede decir en |', '|---|---|---|---|---|---|');
      md.push(...hallazgos.incoherencias.map(h => `| ${h.regla} | ${h.nombre} | ${h.tipo} | ${cut(h.texto, 70)} | \`${h.exige}\` | ${fmt(h['situación'])} |`), '');
    }
    if (hallazgos.imposibles.length) {
      md.push('## Nunca pueden darse', '', '| Quién | Qué | Texto | Condiciones |', '|---|---|---|---|');
      md.push(...hallazgos.imposibles.map(h => `| ${h.nombre} | ${h.tipo} | ${cut(h.texto, 60)} | \`${h.conds.join(', ')}\` |`), '');
    }
    md = md.join('\n');
    const resumen = `→ trazas/modelo.md · huecos: ${hallazgos.huecos.length} · incoherencias: ${hallazgos.incoherencias.length} · nunca pueden darse: ${hallazgos.imposibles.length} · ${V.size} variables · ${pyFloat(seg)} s`;
    return { json, md, resumen, huecos: hallazgos.huecos, incoherencias: hallazgos.incoherencias, nunca: hallazgos.imposibles, variables: V.size, unidades, segundos: seg };
  }

  const api = { modelo, partir, campos, reglasLeer };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else globalThis.modeloAvonlea = api;
})();
