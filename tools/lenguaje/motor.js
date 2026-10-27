// El motor mínimo del lenguaje de las historias (docs/LENGUAJE.md §11): ejecuta los datos que arma
// tools/lenguaje/construir.js. Sirve para probar una historia sin el juego: en la página trazas/lenguaje.html (la
// jugadora contesta y elige) o en tools/lenguaje/probar.js (de punta a punta, sola o con un guion de respuestas).
// El mundo va simplificado: los lugares por nombre y los minutos entre ellos (15 entre paradas de una ruta, 2 dentro de
// un mismo lugar, 3 a uno cercano, 10 si no); y cada línea de una escena, un minuto. Mientras una escena se dice, los
// encargos de quienes participan se detienen, salvo que la escena vaya «en marcha» (las charlas de la calesa). El planificador de las búsquedas es de un paso: entre los verbos de su
// «con» que logran el objetivo, el más barato; si falla, vuelve a planificar. No es todavía el A* del juego.
(function (raiz) {
  function Motor(D, escenario = {}) {
    const S = {}, registro = [], tareas = [], cola = [], porTras = [];
    let t = (escenario.dia ?? 2) * 1440 - 1440 + (escenario.hora ?? 14) * 60;   // (minutos desde el comienzo del día 1)
    let escena = null, pregunta = null, auto = !!escenario.auto, fin = null;
    const MIN_LINEA = 1;   // (lo que dura una línea de una escena, en minutos de juego)
    const respuestas = escenario.respuestas ? [...escenario.respuestas] : null, opcionesGuion = escenario.opciones || {};

    // ---------------------------------------------------------------- el estado
    const k = c => c.join('.');
    const dia = () => Math.floor(t / 1440) + 1, hora = () => (t % 1440) / 60;
    function defecto(c){
      if (c[0] === 'estado') return D.estados[c[1]]?.inicial;
      if (c[0] === 'cualidad') return D.cualidades[c[2]]?.inicial ?? 0;
      if (c[0] === 'mundo') return c[2] === 'en' ? 'nada' : c[2] === 'sigue' ? 'nadie' : c[2] === 'listo' ? 'no' : undefined;
      if (c[0] === 'tiempo') return c[1] === 'hora' ? hora() : dia();
      if (c[0] === 'intentos') return 0;
      if (c[0] === 'encargo') return 'pendiente';
      if (c[0] === 'historia') return 'no_empezada';
    }
    const get = c => (k(c) in S ? S[k(c)] : defecto(c));
    const set = (c, v) => { S[k(c)] = v; };
    // (los parámetros de una definición, y el elemento de un «por cada», por sus valores)
    function sub(x, env){
      if (Array.isArray(x)) return x.map(y => sub(y, env));
      if (x && typeof x === 'object') {
        if ('param' in x && Object.keys(x).length === 1) return env.params ? env.params[x.param] : x;
        if (x.elemento === true && Object.keys(x).length === 1) return 'elemento' in env ? env.elemento : x;   // (solo en su «por cada»)
        const o = {}; for (const [a, b] of Object.entries(x)) o[a] = sub(b, env); return o;
      }
      return x;
    }
    // (un valor: tal cual, o lo que hay en otro lugar del estado —{ref}, o un campo {camino}—)
    function val(v){
      if (v && typeof v === 'object' && !Array.isArray(v)) { if (v.ref) return get(v.ref); if (Array.isArray(v.camino) && !('c' in v) && !('e' in v)) return get(v.camino); }
      return v;
    }
    const lugarDe = p => get(['mundo', p, 'lugar']);
    function ordinal(camino, v){ const d = camino[0] === 'estado' && D.estados[camino[1]]; return d && d.orden ? d.orden.indexOf(v) : v; }
    function cumple(c){
      if (c === true || c == null) return true;
      switch (c.c) {
        case 'existe': { const v = get(c.camino); return c.ventana === 'hoy' ? v === dia() : v != null; }
        case 'cmp': {
          const a = get(c.camino), b = val(c.valor);
          if (c.op === '=') return a === b; if (c.op === '!=') return a !== b;
          const x = ordinal(c.camino, a), y = ordinal(c.camino, b); if (x < 0 || y < 0) return false;
          return { '<': x < y, '<=': x <= y, '>': x > y, '>=': x >= y }[c.op];
        }
        case 'desde': { const d = get(c.camino); if (d == null) return false; const n = parseFloat(c.valor), u = c.valor.slice(-1), pas = u === 'd' ? dia() - d : (dia() - d) * 24;
          return { '<': pas < n, '<=': pas <= n, '>': pas > n, '>=': pas >= n, '=': pas === n }[c.op]; }
        case 'y': return c.de.every(cumple);
        case 'o': return c.de.some(cumple);
        case 'no': return !cumple(c.de);
        case 'f': return funciones[c.f](...c.args.map(val));
      }
      throw new Error('condición desconocida: ' + JSON.stringify(c));
    }
    // (lo que el mundo calcula: verse y oírse, en el mismo lugar)
    const juntos = (a, b) => lugarDe(a) === lugarDe(b);
    const funciones = { ve: juntos, oye: juntos };
    function aplicar(e){
      if (e.verbo) return instantaneo(e);
      if (e.e === 'deja') set(e.camino, e.valor === undefined ? dia() : val(e.valor));
      else if (e.e === 'olvida') delete S[k(e.camino)];
      else if (e.e === 'suma') { const d = D.cualidades[e.camino[2]], r = d ? d.rango : [-1e9, 1e9]; set(e.camino, Math.max(r[0], Math.min(r[1], get(e.camino) + e.n))); nota(`${nombre(e.camino[1])}: ${e.camino[2]}${e.camino[3] ? ' hacia ' + nombre(e.camino[3]) : ''} ${e.n > 0 ? '+' : ''}${e.n} → ${get(e.camino)}`); }
      else if (e.e === 'log') nota('📔 ' + e.texto);
    }

    // ---------------------------------------------------------------- el mapa
    const nombre = x => D.personas[x] || D.lugares[x]?.nombre || D.medios[x]?.nombre || x;
    function minutos(a, b){
      if (a === b) return 0;
      for (const r of Object.values(D.rutas)) { const i = r.indexOf(a), j = r.indexOf(b); if (i >= 0 && j >= 0) return 15 * Math.abs(i - j); }
      const L = x => D.lugares[x] || {};
      if (L(a).dentro === b || L(b).dentro === a || (L(a).dentro && L(a).dentro === L(b).dentro)) return 2;
      if (L(a).cerca === b || L(b).cerca === a) return 3;
      return 10;
    }
    // (quien va en un medio lo lleva, con los que van en él; quien lo sigue, va detrás)
    function mover(p, a){
      set(['mundo', p, 'lugar'], a);
      const m = get(['mundo', p, 'en']);
      if (m !== 'nada') { set(['mundo', m, 'lugar'], a); for (const q of Object.keys(D.personas)) if (get(['mundo', q, 'en']) === m) set(['mundo', q, 'lugar'], a); }
      for (const q of Object.keys(D.personas)) if (get(['mundo', q, 'sigue']) === p && get(['mundo', q, 'en']) === 'nada') set(['mundo', q, 'lugar'], a);
    }
    function tramo(tr){
      const r = D.rutas[tr.por], en = x => (r.includes(x) ? x : D.lugares[x]?.dentro || D.lugares[x]?.cerca);
      const i = r.indexOf(en(val(tr.desde))), j = r.indexOf(tr.hasta);
      return i <= j ? r.slice(i + 1, j + 1) : r.slice(j, i).reverse();
    }

    // ---------------------------------------------------------------- los momentos, el registro y las voces
    const nota = (txt, tipo = 'nota') => registro.push({ tipo, t: txt, hora: reloj() });
    const reloj = () => { const m = Math.round(t % 1440); return `día ${dia()}, ${String(Math.floor(m / 60)).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`; };
    const unir = (a, b) => (a && b ? a + '.' + b : a || b);
    function emitir(inst, momento){
      for (const { inst: A, rel } of [...inst.anc, { inst, rel: '' }]) cola.push({ tipo: 'verbo', quien: A.quien, verbo: A.verbo, paso: rel, momento });
      if (inst.encargo) { cola.push({ tipo: 'encargo', historia: inst.encargo.historia, etiqueta: inst.encargo.etiqueta, paso: inst.ruta, momento });
        if (!inst.ruta && momento !== 'empieza' && momento !== 'sigue') set(['encargo', inst.encargo.historia, inst.encargo.etiqueta], momento);
        if (!inst.ruta) nota(`◆ ${inst.encargo.etiqueta}: ${momento}`, 'momento'); else if (momento !== 'fallido') nota(`· ${inst.encargo.etiqueta}.${inst.ruta} ${momento}`, 'momento'); }
      if (momento === 'cumplido') for (const { inst: A, rel } of inst.anc) if (rel) decir(A.ll, rel);
    }
    function patron(p, x){
      if (p && p.comodin) return 0;
      if (p && typeof p === 'object' && p.verbo) { if (!x || x.verbo !== p.verbo) return -1; let n = 1; for (let i = 0; i < p.args.length; i++) { const r = patron(p.args[i], x.args[i]); if (r < 0) return -1; n += r; } return n; }
      return p === val(x) ? 1 : -1;
    }
    // (la voz de un verbo o un acto: la línea más específica que se cumpla; las de una historia en curso, primero)
    function decir(ll, paso = ''){
      let mejor = null, top = -1;
      for (const v of D.voces) {
        if ((v.paso || '') !== paso || (v.de !== 'comun' && get(['historia', v.de]) !== 'en_curso')) continue;
        const p = patron(v.llamada, ll); if (p < 0) continue;
        for (const l of v.lineas) if (cumple(l.si)) { const s = p * 10 + (v.de !== 'comun' ? 100 : 0) + (l.si !== true ? 1 : 0); if (s > top) { top = s; mejor = l; } }
      }
      if (mejor) registro.push({ tipo: 'linea', q: ll.args[0], t: mejor.t, hora: reloj() });
    }
    const texto = (s, ll) => s.replace(/\{(\w+)\}/g, (_, n) => nombre(val(ll.args[D.verbos[ll.verbo].params.indexOf(n)])));

    // ---------------------------------------------------------------- los verbos (cada uno, un generador)
    // (lo que cede: {min} —esperar ese tiempo—, {hasta} —hasta que se cumpla—, {pregunta} —la respuesta de Ana—)
    function* ejecutar(ll, ctx){
      const d0 = D.verbos[ll.verbo]; if (!d0) throw new Error('verbo desconocido: ' + ll.verbo);
      const d = sub(d0, { params: ll.args });
      const inst = { verbo: ll.verbo, ll, quien: ll.args[0], encargo: ctx.encargo, ruta: ctx.ruta || '',
        anc: ctx.padre ? [...ctx.padre.anc.map(x => ({ inst: x.inst, rel: unir(x.rel, ctx.label) })), { inst: ctx.padre, rel: ctx.label }] : [] };
      emitir(inst, 'empieza'); yield { min: 0 };   // (cada momento se atiende cuando ocurre: sus escenas van antes de seguir)
      const ok = yield* ({ primitivo, mapa, receta, busca, acto })[d.tipo](d, ll, inst);
      emitir(inst, ok ? 'cumplido' : 'fallido'); yield { min: 0 };
      return ok;
    }
    const hijo = (ll, padre, label) => ejecutar(ll, { padre, label, encargo: padre.encargo, ruta: unir(padre.ruta, label) });
    const aMin = d => { const n = parseFloat(d), u = d.slice(-1); return u === 's' ? n / 60 : u === 'm' ? n : u === 'h' ? n * 60 : n * 1440; };
    const yaEs = e => e.e === 'deja' && e.valor !== undefined && get(e.camino) === val(e.valor);
    function* primitivo(d, ll){
      if (ll.verbo === 'esperar') { if (!cumple(d.pide)) yield { hasta: d.pide }; return true; }
      if (d.deja && d.deja.length && d.deja.every(yaEs)) return true;   // (lo que deja ya es cierto: se salta)
      if (d.pide && !cumple(d.pide)) { nota(`✘ ${ll.verbo}: no se puede (${nombre(ll.args[0])})`); return false; }
      decir(ll);
      if (d.dura) yield { min: aMin(d.dura) };
      for (const e of d.deja || []) aplicar(e);
      return true;
    }
    function* mapa(d, ll){
      const quien = ll.args[0], a = val(ll.args[1]);
      if (ll.verbo === 'correr_a') set(['mundo', quien, 'en'], 'nada');
      decir(ll);
      const m = minutos(lugarDe(quien), a);
      for (let i = 0; i < m; i++) yield { min: Math.min(1, m - i) };   // (de a un minuto: si algo se rompe en el camino, se nota enseguida)
      mover(quien, a);
      return true;
    }
    function* receta(d, ll, inst){
      if (d.pide && !cumple(d.pide)) return false;
      if (d.pasos.por_cada) {
        for (const x of tramo(d.pasos.por_cada)) if (!(yield* hijo(sub(d.pasos.hace, { elemento: x }), inst, x))) return false;
        return true;
      }
      const ks = Object.keys(d.pasos), m = d.mantiene;
      const iD = m ? ks.indexOf(m.desde) : -1, iH = m ? (m.hasta ? ks.indexOf(m.hasta) : ks.length - 1) : -1, iR = m ? ks.indexOf(m.si_se_rompe) : -1;
      const paso = function* (i){ const p = d.pasos[ks[i]]; for (const x of Array.isArray(p) ? p : [p]) if (!(yield* hijo(x, inst, ks[i]))) return false; return true; };
      for (let i = 0; i < ks.length; i++) {
        const g = paso(i); let r = g.next();
        while (!r.done) {
          const v = yield r.value;
          if (m && i > iD && i <= iH && !cumple(m.si)) {   // (se rompió lo que mantiene: vuelve al paso que lo consigue, y sigue donde iba)
            nota(`↺ ${ll.verbo}: se rompió lo que mantenía; vuelve a «${m.si_se_rompe}»`, 'momento');
            for (let j = iR; j <= iD; j++) if (!(yield* paso(j))) return false;
            emitir(inst, 'sigue');
          }
          r = g.next(v);
        }
        if (r.value === false) return false;
      }
      return !d.cumplido || cumple(d.cumplido);
    }
    // (una búsqueda: si ya se cumple, listo; si no, el plan más barato entre los verbos de «con»; si falla —Ana no quiso—,
    // otro intento: con «intentos» más alto, el plan cambia —ordenar, ir a buscarla—)
    function* busca(d, ll, inst){
      const quien = ll.args[0], otro = ll.args[1], fallas = {};
      for (let n = 0; n < d.intentos; n++) {
        if (cumple(d.objetivo)) return true;
        set(['intentos'], n);
        const plan = planificar(quien, otro, d.objetivo, d.con, fallas);
        if (!plan) { nota(`✘ ${nombre(quien)} no encuentra cómo`); yield { min: 1 }; continue; }
        nota(`🧭 ${nombre(quien)} (intento ${n + 1}): ${describir(plan)}`, 'momento');
        if (!(yield* hijo(plan, inst, plan.verbo))) fallas[plan.verbo] = (fallas[plan.verbo] || 0) + 1;   // (lo que ya falló cuesta más: la próxima vez, otra cosa)
      }
      return cumple(d.objetivo);
    }
    // (lo que hace el otro para que se cumpla el objetivo: el verbo cuyo efecto lo deja así —subir: en la calesa; ir_a: en un lugar—)
    function logran(otro, obj){
      if (obj.c !== 'cmp' || obj.op !== '=' || obj.camino[0] !== 'mundo' || obj.camino[1] !== otro) return [];
      const b = val(obj.valor), out = [];
      if (obj.camino[2] === 'lugar') for (const [n, v] of Object.entries(D.verbos)) if (v.tipo === 'mapa' && v.opcion) out.push({ verbo: n, args: [otro, b] });
      for (const [n, v] of Object.entries(D.verbos)) if (v.tipo === 'primitivo' && v.opcion) for (const e of v.deja || [])
        if (e.camino[0] === 'mundo' && e.camino[1]?.param === 0 && e.camino[2] === obj.camino[2] && e.valor?.param != null) { const a = [otro]; a[e.valor.param] = b; out.push({ verbo: n, args: a }); }
      return out;
    }
    function planificar(quien, otro, obj, con, fallas = {}){
      const cand = [];
      for (const n of con) {
        const d0 = D.verbos[n];
        if (d0.tipo === 'acto' && d0.pedido) for (const v of logran(otro, obj)) {   // (pedirle al otro lo que lo deja así)
          const ll = { verbo: n, args: [quien, otro, v] }, d = sub(d0, { params: ll.args });
          if (cumple(d.pide)) cand.push({ ll, costo: d.cuesta ?? 1 });
        }
        // (una receta de quien, el otro y un destino —ir a buscarla, traerla—: para que el otro quede en un lugar)
        if (d0.tipo === 'receta' && d0.params.length === 3 && obj.camino?.[2] === 'lugar' && obj.camino[1] === otro)
          cand.push({ ll: { verbo: n, args: [quien, otro, val(obj.valor)] }, costo: (d0.cuesta ?? 3) + minutos(lugarDe(quien), lugarDe(otro)) / 3 });
      }
      for (const c of cand) c.costo += 5 * (fallas[c.ll.verbo] || 0);
      cand.sort((a, b) => a.costo - b.costo);
      return cand[0]?.ll;
    }
    const describir = ll => D.verbos[ll.verbo].tipo === 'receta' ? `${ll.verbo.replace(/_/g, ' ')} a ${nombre(ll.args[1])} (hasta ${nombre(ll.args[2])})`
      : `${ll.verbo} a ${nombre(ll.args[1])}: «${texto(D.verbos[ll.args[2].verbo].opcion, ll.args[2])}»`;
    function* acto(d, ll, inst){
      if (d.pide && !cumple(d.pide)) return false;
      decir(ll);
      for (const e of d.deja || []) aplicar(e);
      if (!d.pedido) return true;
      const a = d.pedido.a, v = d.pedido.hace;
      const acepta = a === 'ana' ? yield { pregunta: { de: ll.args[0], acto: ll.verbo, hace: v, si: texto(D.verbos[v.verbo].opcion, v), no: D.opcion_no } } : true;
      cola.push({ tipo: 'responde', quien: a, r: acepta ? 'acepta' : 'rechaza', acto: ll.verbo, hace: v.verbo });
      nota(`${nombre(a)} ${acepta ? 'acepta' : 'rechaza'} (${ll.verbo})`, 'momento');
      if (!acepta) { yield { min: 1 }; return false; }   // (un respiro: lo que pasa cuando Ana dice que no, antes de volver a intentar)
      return yield* hijo(v, inst, 'hace');
    }
    // (un verbo dicho en una escena —<<correr_a('ana', 'orilla')>>—: se hace en el acto, sin tiempo)
    function instantaneo(ll){
      const g = ejecutar(ll, {}); let r = g.next();
      while (!r.done) r = g.next(r.value.pregunta ? true : undefined);
    }

    // ---------------------------------------------------------------- las historias, los encargos y las escenas
    function empezarEncargo(h, etiqueta, e){
      set(['encargo', h, etiqueta], 'en_curso');
      tareas.push({ gen: ejecutar(e.hace, { encargo: { historia: h, etiqueta }, ruta: '' }), despierta: t, h, etiqueta, quien: e.quien });
    }
    function revisarHistorias(){
      for (const [h, H] of Object.entries(D.historias)) {
        const est = get(['historia', h]);
        if (est === 'no_empezada' && cumple(H.empieza)) {
          set(['historia', h], 'en_curso'); nota(`▶ empieza la historia «${H.titulo}»`, 'titulo'); cola.push({ tipo: 'historia', historia: h, momento: 'empieza' });
          for (const [et, e] of Object.entries(H.encargo)) if (!e.tras || !e.tras.length) empezarEncargo(h, et, e); else porTras.push({ h, et, e });
        } else if (est === 'en_curso' && !escena) {
          const termina = cumple(H.termina), falla = H.falla && cumple(H.falla);
          if (termina || falla) {
            set(['historia', h], termina ? 'terminada' : 'fallida');
            if (termina) for (const e of H.deja || []) aplicar(e);
            for (const T of tareas) if (T.h === h) T.fin = true;
            nota(termina ? `■ termina la historia: ${(H.deja || []).map(e => e.camino.slice(-1)[0] + (e.valor !== undefined ? ' = ' + e.valor : '')).join(', ')}${H.punto ? ` (punto: ${H.punto})` : ''}` : '✘ la historia se pierde', 'titulo');
            fin = termina ? 'terminada' : 'fallida';
          }
        }
      }
    }
    function coincide(a, mo){
      if (a.tras) return mo.tipo === 'tras' && mo.escena === a.tras.escena;
      if (a.responde) return mo.tipo === 'responde' && mo.quien === a.quien && mo.r === a.responde && mo.acto === a.acto && (!a.hace || mo.hace === a.hace);
      if (a.encargo) return mo.tipo === 'encargo' && mo.historia === a.encargo.estado.camino[1] && mo.etiqueta === a.encargo.etiqueta && mo.paso === a.paso && mo.momento === a.momento;
      if (a.verbo) return mo.tipo === 'verbo' && mo.quien === a.quien && mo.verbo === a.verbo && mo.paso === a.paso && mo.momento === a.momento;
      return false;
    }
    const cuenta = c => (!c || c === true ? 0 : c.c === 'y' || c.c === 'o' ? c.de.reduce((n, x) => n + cuenta(x), 0) : 1);
    // (de los momentos que pasaron, la escena que va: la primera del «orden» de su historia; si no, la más específica)
    function elegirEscena(){
      const momentos = cola.splice(0); let mejor = null, top = -Infinity;
      for (const mo of momentos) {
        if (mo.tipo === 'tras') for (const p of porTras.filter(x => x.e.tras.some(s => s.escena === mo.escena))) { porTras.splice(porTras.indexOf(p), 1); empezarEncargo(p.h, p.et, p.e); }
        for (const e of Object.values(D.escenas)) {
          const [h, id] = e.escena.split('.');
          if (get(['historia', h]) !== 'en_curso' || ((e.repetir || 'una_vez') === 'una_vez' && get([h, 'dichas', id]) != null)) continue;
          if (!e.se_activa.some(a => coincide(a.activa, mo)) || !cumple(e.si)) continue;
          const o = D.historias[h].orden.findIndex(x => (Array.isArray(x) ? x : [x]).some(y => y.escena === e.escena));
          const s = (o >= 0 ? 1000 - o : 0) + cuenta(e.si);
          if (s > top) { top = s; mejor = e; }
        }
      }
      if (!mejor) return false;
      const [h, id] = mejor.escena.split('.'); set([h, 'dichas', id], dia());
      nota(`🎬 ${id}: ${mejor.resumen}`, 'escena');
      escena = { e: mejor, pila: [[...mejor.cuerpo]], proxima: t, en_marcha: !!mejor.en_marcha, participan: new Set(mejor.hablan) };
      return true;
    }
    // el guion de la escena en curso: lo que sigue hasta una elección de la jugadora, o hasta que la próxima línea tenga
    // que esperar su minuto (o el final)
    function seguirEscena(){
      while (escena && escena.proxima <= t) {
        const pila = escena.pila, top = pila[pila.length - 1];
        if (!top) { terminarEscena(); return; }
        if (!top.length) { pila.pop(); continue; }
        const it = top[0];
        if (it.op !== undefined) {   // (una elección: las opciones seguidas, juntas)
          const ops = []; while (top.length && top[0].op !== undefined) ops.push(top.shift());
          escena.ops = ops;
          if (auto || opcionesGuion[escena.e.escena] != null) { const i = opcionesGuion[escena.e.escena] ?? Math.max(0, ops.findIndex(o => o.propia)); elegir(i); continue; }
          return;
        }
        top.shift();
        if (it.q) { escena.proxima = t + MIN_LINEA; registro.push({ tipo: 'linea', q: it.q, t: it.t, piensa: !!it.piensa, hora: reloj() }); if (it.acto) { const d = sub(D.verbos[it.acto.verbo], { params: it.acto.args }); for (const e of d.deja || []) aplicar(e); } }
        else if (it.hace) aplicar(it.hace);
        else if (it.si) pila.push([...(cumple(it.si) ? it.cuerpo : it.sino)]);
      }
    }
    function elegir(i){
      const op = escena.ops[i]; escena.ops = null;
      registro.push({ tipo: 'eleccion', t: op.op, hora: reloj() });
      escena.pila.push([...op.cuerpo]);
    }
    function terminarEscena(){
      const id = escena.e.escena; escena = null;
      cola.push({ tipo: 'tras', escena: id });
    }

    // ---------------------------------------------------------------- el paso del tiempo
    function responderAuto(q){
      if (respuestas && respuestas.length) return respuestas.shift();
      const r = D.ana_sola[q.acto]; return r === true || (r != null && cumple(sub(r, { params: [q.de] })));
    }
    // avanza hasta que haya algo que mostrar o decidir (una escena, una pregunta) o hasta el final; devuelve el estado
    function avanzar(limite = 5000){
      // (los encargos de quienes están en una escena que no va en marcha, esperan a que termine)
      const detenida = T => escena && !escena.en_marcha && escena.participan.has(T.quien);
      for (let vuelta = 0; vuelta < limite; vuelta++) {
        if (pregunta) return estadoUI();
        if (escena) { seguirEscena(); if (escena && escena.ops) return estadoUI(); }
        revisarHistorias();
        if (fin) return estadoUI();
        if (!escena && cola.length && elegirEscena()) continue;
        const lista = tareas.filter(T => !T.fin && !T.pregunta && !detenida(T) && (T.hasta ? cumple(T.hasta) : T.despierta <= t));
        if (lista.length) {
          const T = lista[0]; T.hasta = null;
          const r = T.gen.next(T.valor); T.valor = undefined;
          if (r.done) { T.fin = true; if (T.etiqueta) set(['encargo', T.h, T.etiqueta], r.value ? 'cumplido' : 'fallido'); continue; }
          const y = r.value;
          if (y.min != null) T.despierta = t + y.min;
          else if (y.hasta) T.hasta = y.hasta;
          else if (y.pregunta) {
            if (auto || (respuestas && respuestas.length)) { T.valor = responderAuto(y.pregunta); T.despierta = t; }
            else { T.pregunta = y.pregunta; pregunta = T; }
          }
          continue;
        }
        const prox = tareas.filter(T => !T.fin && !T.pregunta && !T.hasta && !detenida(T)).map(T => T.despierta);
        if (escena) prox.push(escena.proxima);
        if (!prox.length) return estadoUI();   // (nada más que hacer: esperan algo que no va a pasar solo)
        t = Math.max(t, Math.min(...prox));
      }
      throw new Error('el motor no avanza (¿un ciclo?)');
    }
    function estadoUI(){
      return { escena: escena && { id: escena.e.escena, resumen: escena.e.resumen, ops: escena.ops?.map(o => o.op) },
        pregunta: pregunta && { de: nombre(pregunta.pregunta.de), si: pregunta.pregunta.si, no: pregunta.pregunta.no }, fin, reloj: reloj() };
    }

    // ---------------------------------------------------------------- el escenario inicial
    const ini = { ana: 'cocina', marilla: 'cocina', matthew: 'corral', calesa: 'corral', srapye: 'aldea', spencer: 'hotel_white_sands', blewett: 'hotel_white_sands', ...(escenario.lugares || {}) };
    for (const [x, l] of Object.entries(ini)) set(['mundo', x, 'lugar'], l);
    set(['comun', 'hechos', 'primera_noche'], 1); set(['estado', 'ana_en_tv'], 'en_prueba');
    for (const [c, v] of Object.entries(escenario.estado || {})) set(c.split('.'), v);

    return {
      avanzar,
      responder(si){ const T = pregunta, q = T.pregunta; pregunta = null; T.pregunta = null; T.valor = si; T.despierta = t; registro.push({ tipo: 'eleccion', t: si ? q.si : q.no, hora: reloj() }); return avanzar(); },
      elegir(i){ elegir(i); return avanzar(); },
      // Ana decide sola lo que hay que decidir ahora (lo que le piden, según comun/ana.ts; en una escena, lo suyo: #propia)
      decideSola(){
        if (pregunta) return this.responder(responderAuto(pregunta.pregunta));
        if (escena && escena.ops) { elegir(Math.max(0, escena.ops.findIndex(o => o.propia))); return avanzar(); }
        return avanzar();
      },
      // lo que la jugadora hace por su cuenta (cuando no hay escena ni pregunta)
      irA(l){ nota(`(la jugadora: Ana va hasta ${nombre(l)})`); tareas.push({ gen: ejecutar({ verbo: 'ir_a', args: ['ana', l] }, {}), despierta: t, quien: 'ana' }); return avanzar(); },
      bajarse(){ nota('(la jugadora: Ana se baja de la calesa)'); instantaneo({ verbo: 'bajar', args: ['ana'] }); return avanzar(); },
      esperar(m){ t += m; return avanzar(); },
      registro, get, nombre, lugares: () => Object.keys(D.lugares),
      encargos: () => Object.entries(D.historias).flatMap(([h, H]) => Object.keys(H.encargo).map(et => ({ historia: h, etiqueta: et, estado: get(['encargo', h, et]) }))),
      resumen: () => ({ reloj: reloj(), estado: get(['estado', 'ana_en_tv']), paciencia: get(['cualidad', 'marilla', 'paciencia', 'ana']),
        afecto: get(['cualidad', 'marilla', 'afecto', 'ana']), lugares: Object.fromEntries([...Object.keys(D.personas), ...Object.keys(D.medios)].map(p => [p, get(['mundo', p, 'lugar'])])),
        en: Object.fromEntries(Object.keys(D.personas).map(p => [p, get(['mundo', p, 'en'])]).filter(([, v]) => v !== 'nada')),
        hechos: Object.entries(S).filter(([c]) => /\.(hechos|dichas)\./.test(c)).map(([c]) => c) }),
    };
  }
  if (typeof module !== 'undefined' && module.exports) module.exports = { Motor };
  else raiz.Motor = Motor;
})(this);
