// El motor del lenguaje de las historias (docs/LENGUAJE.md §11): ejecuta los datos que arma tools/lenguaje/construir.js.
// Es la lógica: el estado y los momentos, los encargos con sus pasos y su reparación (mantiene), las búsquedas, los
// pedidos a Ana, las escenas y las voces. El mundo (dónde está cada uno, cuánto tarda, quién ve a quién) lo pone otro:
// el juego, o el mundo simulado (tools/lenguaje/mundo_simulado.js, que dice su interfaz) para probar una historia sin
// el juego, en la página trazas/lenguaje.html o en tools/lenguaje/probar.js.
// Todo lo que el motor recuerda son datos: los verbos en curso no son código suspendido sino una pila de marcos (qué
// verbo, en qué paso, qué intento), así que una partida se guarda (guardar) y se vuelve a cargar (Motor.cargar) en
// cualquier momento, aun a mitad de un viaje.
// Cada línea de una escena dura un minuto. Mientras una escena se dice, los encargos de quienes participan se
// detienen, salvo que la escena vaya «en marcha» (las charlas de la calesa). El planificador de las búsquedas es de un
// paso: entre los verbos de su «con» que logran el objetivo, el más barato; si falla, vuelve a planificar.
(function (raiz) {
  function Motor(D, escenario = {}, Mundo = null, guardado = null) {
    Mundo = Mundo || (typeof module !== 'undefined' && module.exports ? require('./mundo_simulado.js').MundoSimulado : raiz.MundoSimulado);
    let S = {}, registro = [], tareas = [], cola = [], porTras = [], escena = null, pregunta = null, fin = null, sigId = 1;
    let t = (escenario.dia ?? 2) * 1440 - 1440 + (escenario.hora ?? 14) * 60;   // (minutos desde el comienzo del día 1)
    let respuestas = escenario.respuestas ? [...escenario.respuestas] : null;
    const auto = !!escenario.auto, opcionesGuion = escenario.opciones || {};
    const MIN_LINEA = 1;   // (lo que dura una línea de una escena, en minutos de juego)

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
        case 'f': return mundo.funciones[c.f](...c.args.map(val));
      }
      throw new Error('condición desconocida: ' + JSON.stringify(c));
    }
    function aplicar(e){
      if (e.verbo) return instantaneo(e);
      if (e.e === 'deja') set(e.camino, e.valor === undefined ? dia() : val(e.valor));
      else if (e.e === 'olvida') delete S[k(e.camino)];
      else if (e.e === 'suma') { const d = D.cualidades[e.camino[2]], r = d ? d.rango : [-1e9, 1e9]; set(e.camino, Math.max(r[0], Math.min(r[1], get(e.camino) + e.n))); nota(`${nombre(e.camino[1])}: ${e.camino[2]}${e.camino[3] ? ' hacia ' + nombre(e.camino[3]) : ''} ${e.n > 0 ? '+' : ''}${e.n} → ${get(e.camino)}`); }
      else if (e.e === 'log') nota('📔 ' + e.texto);
    }

    // ---------------------------------------------------------------- el mundo
    const nombre = x => D.personas[x] || D.lugares[x]?.nombre || D.medios[x]?.nombre || x;
    // (lo que el mundo le dice al motor: alguien —o algo, un medio— llegó a un lugar, o pasó por él. Cada persona que
    // pasa por un lugar es un momento: «ana pasa camino_blanco»)
    function llega(q, a){
      if (lugarDe(q) === a) return;
      set(['mundo', q, 'lugar'], a);
      if (D.personas[q]) cola.push({ tipo: 'pasa', quien: q, lugar: a });
    }
    const mundo = Mundo({ D, get, set, llega, ahora: () => t });

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

    // ---------------------------------------------------------------- los verbos: una pila de marcos
    // Una tarea (un encargo, o lo que hace la jugadora) es una pila de marcos: el verbo de abajo, y encima el paso que
    // está haciendo, y encima el paso de ese paso. Cada marco es datos: su llamada y en qué va (fase, paso, intento).
    // correr(T) avanza la tarea hasta que tenga que esperar, y devuelve qué espera: {min} —un rato—, {hasta} —que se
    // cumpla algo—, {pregunta} —la respuesta de Ana—, {accion} —que el mundo termine algo—; o {fin}, con lo que valió.
    // Un marco devuelve {vale} (terminó), {espera}, o nada (empujó un marco, o cambió de fase: se sigue).
    const def = ll => { const d = D.verbos[ll.verbo]; if (!d) throw new Error('verbo desconocido: ' + ll.verbo); return sub(d, { params: ll.args }); };
    const marco = (ll, ctx) => ({ k: 'verbo', ll, ctx, fase: 0 });
    const hijo = (padre, label) => ({ padre, label, encargo: padre.encargo, ruta: unir(padre.ruta, label) });
    const aMin = d => { const n = parseFloat(d), u = d.slice(-1); return u === 's' ? n / 60 : u === 'm' ? n : u === 'h' ? n * 60 : n * 1440; };
    const yaEs = e => e.e === 'deja' && e.valor !== undefined && get(e.camino) === val(e.valor);
    function correr(T){
      revisarMantiene(T);
      let ret;
      for (;;) {
        const F = T.pila[T.pila.length - 1];
        if (!F) return { fin: ret };
        if (F.acc && F.acc.parada) { F.acc.parada = false; mundo.seguir(F.acc); }
        const r = MARCOS[F.k](F, T, ret); ret = undefined;
        if (!r) continue;
        if (r.espera) return r.espera;
        T.pila.pop(); ret = r.vale;
      }
    }
    const MARCOS = {
      // (todo verbo: sus momentos —empieza, cumplido o fallido— y, entre ellos, lo que hace según su tipo)
      verbo(F, T, ret){
        if (F.fase === 0) {
          const ll = F.ll, c = F.ctx;
          F.inst = { verbo: ll.verbo, ll, quien: ll.args[0], encargo: c.encargo, ruta: c.ruta || '',
            anc: c.padre ? [...c.padre.anc.map(x => ({ inst: x.inst, rel: unir(x.rel, c.label) })), { inst: c.padre, rel: c.label }] : [] };
          emitir(F.inst, 'empieza'); F.fase = 1;
          return { espera: { min: 0 } };   // (cada momento se atiende cuando ocurre: sus escenas van antes de seguir)
        }
        if (F.fase === 1) { F.fase = 2; T.pila.push({ k: def(F.ll).tipo, ll: F.ll, inst: F.inst, fase: 0 }); return; }
        if (F.fase === 2) { F.ok = ret; emitir(F.inst, ret ? 'cumplido' : 'fallido'); F.fase = 3; return { espera: { min: 0 } }; }
        return { vale: F.ok };
      },
      // (lo hace el mundo, con lo que dura; al terminar, deja lo que deja)
      primitivo(F, T){
        const ll = F.ll, d = def(ll);
        if (F.fase === 0) {
          if (ll.verbo === 'esperar') { F.fase = 2; return cumple(d.pide) ? undefined : { espera: { hasta: d.pide } }; }
          if (d.deja && d.deja.length && d.deja.every(yaEs)) return { vale: true };   // (lo que deja ya es cierto: se salta)
          if (d.pide && !cumple(d.pide)) { nota(`✘ ${ll.verbo}: no se puede (${nombre(ll.args[0])})`); return { vale: false }; }
          decir(ll);
          F.fase = 3;
          if (d.dura) { F.acc = { quien: ll.args[0], verbo: ll.verbo, args: ll.args, dura: aMin(d.dura), ya: !!T.ya }; mundo.empezar(F.acc); F.fase = 1; }
          return;
        }
        if (F.fase === 1) { if (!mundo.avanzar(F.acc)) return { espera: { accion: F.acc } }; F.fase = 3; return; }
        if (F.fase === 2) return { vale: true };
        for (const e of d.deja || []) aplicar(e);
        return { vale: true };
      },
      // (ir hasta un lugar: el mundo busca el camino, y avisa al llegar)
      mapa(F, T){
        const ll = F.ll;
        if (F.fase === 0) {
          if (ll.verbo === 'correr_a') set(['mundo', ll.args[0], 'en'], 'nada');
          decir(ll);
          F.acc = { quien: ll.args[0], verbo: ll.verbo, a: val(ll.args[1]), mapa: true, ya: !!T.ya }; mundo.empezar(F.acc); F.fase = 1;
        }
        return mundo.avanzar(F.acc) ? { vale: true } : { espera: { accion: F.acc } };
      },
      // (una secuencia fija de pasos, o un «por cada»; lo que mantiene lo revisa revisarMantiene)
      receta(F, T, ret){
        const d = def(F.ll);
        if (F.fase === 0) {
          if (d.pide && !cumple(d.pide)) return { vale: false };
          if (d.pasos.por_cada) { const tr = d.pasos.por_cada; F.lista = mundo.tramo(tr.por, val(tr.desde), tr.hasta); }
          F.i = 0; F.j = 0; F.fase = 1;
        }
        if (F.fallo) return { vale: false };   // (no pudo reparar lo que se rompió)
        if (F.fase === 2) { if (!ret) return { vale: false }; F.j++; F.fase = 1; }
        if (F.lista) {
          if (F.j >= F.lista.length) return { vale: true };
          const x = F.lista[F.j]; F.fase = 2; T.pila.push(marco(sub(d.pasos.hace, { elemento: x }), hijo(F.inst, x))); return;
        }
        const ks = Object.keys(d.pasos);
        for (;;) {
          if (F.i >= ks.length) return { vale: !d.cumplido || cumple(d.cumplido) };
          const p = d.pasos[ks[F.i]], lista = Array.isArray(p) ? p : [p];
          if (F.j < lista.length) { F.fase = 2; T.pila.push(marco(lista[F.j], hijo(F.inst, ks[F.i]))); return; }
          F.i++; F.j = 0;
        }
      },
      // (rehacer los pasos de una receta desde el que consigue lo que se rompió; después, se sigue donde iba)
      reparar(F, T, ret){
        const R = T.pila[F.abajo], d = def(R.ll), ks = Object.keys(d.pasos), iD = ks.indexOf(d.mantiene.desde);
        if (F.fase === 1) {
          if (!ret) {   // (no pudo: la receta falla, y lo que estaba haciendo queda atrás)
            for (const G of T.pila.slice(F.abajo + 1)) if (G.acc && mundo.cancelar) mundo.cancelar(G.acc);
            T.pila.length = F.abajo + 1; R.fallo = true; R.reparando = false; return;
          }
          F.m++; F.fase = 0;
        }
        for (;;) {
          if (F.j > iD) { emitir(R.inst, 'sigue'); R.reparando = false; return { vale: true }; }
          const p = d.pasos[ks[F.j]], lista = Array.isArray(p) ? p : [p];
          if (F.m < lista.length) break;
          F.j++; F.m = 0;
        }
        const p = d.pasos[ks[F.j]];
        F.fase = 1; T.pila.push(marco((Array.isArray(p) ? p : [p])[F.m], hijo(R.inst, ks[F.j])));
      },
      // (una búsqueda: si ya se cumple, listo; si no, el plan más barato entre los verbos de «con»; si falla —Ana no
      // quiso—, otro intento: con «intentos» más alto, el plan cambia —ordenar, ir a buscarla—)
      busca(F, T, ret){
        const d = def(F.ll), quien = F.ll.args[0], otro = F.ll.args[1];
        if (F.fase === 0) { F.n = 0; F.fallas = {}; F.fase = 1; }
        else if (F.fase === 2) { if (!ret) F.fallas[F.plan] = (F.fallas[F.plan] || 0) + 1; F.n++; F.fase = 1; }   // (lo que ya falló cuesta más)
        if (F.n >= d.intentos) return { vale: cumple(d.objetivo) };
        if (cumple(d.objetivo)) return { vale: true };
        set(['intentos'], F.n);
        const plan = planificar(quien, otro, d.objetivo, d.con, F.fallas);
        if (!plan) { nota(`✘ ${nombre(quien)} no encuentra cómo`); F.n++; return { espera: { min: 1 } }; }
        nota(`🧭 ${nombre(quien)} (intento ${F.n + 1}): ${describir(plan)}`, 'momento');
        F.plan = plan.verbo; F.fase = 2; T.pila.push(marco(plan, hijo(F.inst, plan.verbo)));
      },
      // (decir algo; si es un pedido, el otro decide: si es Ana, la jugadora)
      acto(F, T, ret){
        const ll = F.ll, d = def(ll);
        if (F.fase === 0) {
          if (d.pide && !cumple(d.pide)) return { vale: false };
          decir(ll);
          for (const e of d.deja || []) aplicar(e);
          if (!d.pedido) return { vale: true };
          const v = d.pedido.hace; F.fase = 1;
          if (d.pedido.a === 'ana') return { espera: { pregunta: { de: ll.args[0], acto: ll.verbo, hace: v, si: texto(D.verbos[v.verbo].opcion, v), no: D.opcion_no } } };
          T.valor = true; return;
        }
        if (F.fase === 1) {
          const a = d.pedido.a, acepta = !!T.valor; T.valor = undefined;
          cola.push({ tipo: 'responde', quien: a, r: acepta ? 'acepta' : 'rechaza', acto: ll.verbo, hace: d.pedido.hace.verbo });
          nota(`${nombre(a)} ${acepta ? 'acepta' : 'rechaza'} (${ll.verbo})`, 'momento');
          if (!acepta) { F.fase = 2; return { espera: { min: 1 } }; }   // (un respiro: lo que pasa cuando Ana dice que no)
          F.fase = 3; T.pila.push(marco(d.pedido.hace, hijo(F.inst, 'hace'))); return;
        }
        return { vale: F.fase === 2 ? false : ret };
      },
    };
    // (lo que mantiene una receta: si se rompió mientras hace uno de sus pasos —entre «desde» y «hasta»—, lo que estaba
    // haciendo se detiene, y encima va la reparación. Se mira cada vez que la tarea despierta, de afuera hacia adentro)
    function revisarMantiene(T){
      for (let n = 0; n < T.pila.length; n++) {
        const F = T.pila[n]; if (F.k !== 'receta' || F.fase !== 2 || F.reparando || F.lista) continue;
        const d = def(F.ll), m = d.mantiene; if (!m) continue;
        const ks = Object.keys(d.pasos), iD = ks.indexOf(m.desde), iH = m.hasta ? ks.indexOf(m.hasta) : ks.length - 1;
        if (F.i <= iD || F.i > iH || cumple(m.si)) continue;
        nota(`↺ ${F.ll.verbo}: se rompió lo que mantenía; vuelve a «${m.si_se_rompe}»`, 'momento');
        for (const G of T.pila.slice(n + 1)) if (G.acc && !G.acc.parada) { mundo.parar(G.acc); G.acc.parada = true; }
        F.reparando = true; T.pila.push({ k: 'reparar', abajo: n, j: ks.indexOf(m.si_se_rompe), m: 0, fase: 0 });
        return;
      }
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
          cand.push({ ll: { verbo: n, args: [quien, otro, val(obj.valor)] }, costo: (d0.cuesta ?? 3) + mundo.minutos(lugarDe(quien), lugarDe(otro)) / 3 });
      }
      for (const c of cand) c.costo += 5 * (fallas[c.ll.verbo] || 0);
      cand.sort((a, b) => a.costo - b.costo);
      return cand[0]?.ll;
    }
    const describir = ll => D.verbos[ll.verbo].tipo === 'receta' ? `${ll.verbo.replace(/_/g, ' ')} a ${nombre(ll.args[1])} (hasta ${nombre(ll.args[2])})`
      : `${ll.verbo} a ${nombre(ll.args[1])}: «${texto(D.verbos[ll.args[2].verbo].opcion, ll.args[2])}»`;
    // (un verbo dicho en una escena —<<correr_a('ana', 'orilla')>>—: se hace en el acto, sin tiempo)
    function instantaneo(ll){
      const T = { id: 0, pila: [marco(ll, {})], ya: true };
      for (let n = 0; n < 1000; n++) { const w = correr(T); if ('fin' in w) return; if (w.pregunta) T.valor = true; }
      throw new Error('un verbo instantáneo que no termina: ' + ll.verbo);
    }

    // ---------------------------------------------------------------- las historias, los encargos y las escenas
    function nuevaTarea(ll, extra){ tareas.push({ id: sigId++, pila: [marco(ll, extra.encargo ? { encargo: extra.encargo, ruta: '' } : {})], despierta: t, quien: ll.args[0], ...extra }); }
    function empezarEncargo(h, etiqueta){
      const e = D.historias[h].encargo[etiqueta];
      set(['encargo', h, etiqueta], 'en_curso');
      nuevaTarea(e.hace, { encargo: { historia: h, etiqueta }, h, etiqueta, quien: e.quien });
    }
    function revisarHistorias(){
      for (const [h, H] of Object.entries(D.historias)) {
        const est = get(['historia', h]);
        if (est === 'no_empezada' && cumple(H.empieza)) {
          set(['historia', h], 'en_curso'); nota(`▶ empieza la historia «${H.titulo}»`, 'titulo'); cola.push({ tipo: 'historia', historia: h, momento: 'empieza' });
          for (const [et, e] of Object.entries(H.encargo)) if (!e.tras || !e.tras.length) empezarEncargo(h, et); else porTras.push({ h, et });
        } else if (est === 'en_curso' && !escena) {
          const termina = H.termina != null && cumple(H.termina), falla = H.falla && cumple(H.falla);   // (sin «termina»: de fondo, no termina)
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
      if (a.pasa) return mo.tipo === 'pasa' && mo.quien === a.quien && mo.lugar === a.pasa;
      if (a.responde) return mo.tipo === 'responde' && mo.quien === a.quien && mo.r === a.responde && mo.acto === a.acto && (!a.hace || mo.hace === a.hace);
      if (a.encargo) return mo.tipo === 'encargo' && mo.historia === a.encargo.estado.camino[1] && mo.etiqueta === a.encargo.etiqueta && mo.paso === a.paso && mo.momento === a.momento;
      if (a.verbo) return mo.tipo === 'verbo' && mo.quien === a.quien && mo.verbo === a.verbo && mo.paso === a.paso && mo.momento === a.momento;
      return false;
    }
    const cuenta = c => (!c || c === true ? 0 : c.c === 'y' || c.c === 'o' ? c.de.reduce((n, x) => n + cuenta(x), 0) : 1);
    // (de los momentos que pasaron, la escena que va: la primera del «orden» de su historia; si no, la más específica.
    // Mientras se dice una escena, los momentos esperan a que termine; solo una que «interrumpe» la corta: entonces se
    // miran solo esas, y los demás momentos siguen esperando)
    function elegirEscena(interrumpe = false){
      const momentos = interrumpe ? cola : cola.splice(0); let mejor = null, top = -Infinity, suyo = null;
      for (const mo of momentos) {
        if (!interrumpe && mo.tipo === 'tras') for (const p of porTras.filter(x => D.historias[x.h].encargo[x.et].tras.some(s => s.escena === mo.escena))) { porTras.splice(porTras.indexOf(p), 1); empezarEncargo(p.h, p.et); }
        for (const e of Object.values(D.escenas)) {
          if (interrumpe && !e.interrumpe) continue;
          const [h, id] = e.escena.split('.'), r = e.repetir || 'una_vez', dicha = get([h, 'dichas', id]);
          if (get(['historia', h]) !== 'en_curso' || (r === 'una_vez' && dicha != null) || (r === 'dia' && dicha === dia())) continue;
          if (!e.se_activa.some(a => coincide(a.activa, mo)) || !cumple(e.si)) continue;
          const o = D.historias[h].orden.findIndex(x => (Array.isArray(x) ? x : [x]).some(y => y.escena === e.escena));
          const s = (o >= 0 ? 1000 - o : 0) + cuenta(e.si);
          if (s > top) { top = s; mejor = e; suyo = mo; }
        }
      }
      if (!mejor) return false;
      if (interrumpe) cola.splice(cola.indexOf(suyo), 1);
      // (si corta otra escena, esa no sigue: queda dicha, a medias, y no hay «tras» de ella)
      if (escena) { nota(`✂ se corta ${escena.id.split('.')[1]}`, 'momento'); set(['escena', 'interrumpio'], escena.id); }
      else delete S['escena.interrumpio'];
      const [h, id] = mejor.escena.split('.'); set([h, 'dichas', id], dia());
      nota(`🎬 ${id}: ${mejor.resumen}`, 'escena');
      escena = { id: mejor.escena, pila: [[...mejor.cuerpo]], proxima: t, en_marcha: !!mejor.en_marcha, participan: [...mejor.hablan], ops: null };
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
          if (auto || opcionesGuion[escena.id] != null) { const i = opcionesGuion[escena.id] ?? Math.max(0, ops.findIndex(o => o.propia)); elegir(i); continue; }
          return;
        }
        top.shift();
        if (it.q) { escena.proxima = t + MIN_LINEA; registro.push({ tipo: 'linea', q: it.q, t: it.t, piensa: !!it.piensa, hora: reloj() }); if (it.acto) { const d = def(it.acto); for (const e of d.deja || []) aplicar(e); } }
        else if (it.hace && it.hace.e === 'silencio') { escena.proxima = t + aMin(it.hace.dura); registro.push({ tipo: 'silencio', t: it.hace.dura, hora: reloj() }); }
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
      const id = escena.id; escena = null; delete S['escena.interrumpio'];
      cola.push({ tipo: 'tras', escena: id });
    }

    // ---------------------------------------------------------------- el paso del tiempo
    function responderAuto(q){
      if (respuestas && respuestas.length) return respuestas.shift();
      const r = D.ana_sola[q.acto]; return r === true || (r != null && cumple(sub(r, { params: [q.de] })));
    }
    const enPregunta = () => tareas.find(T => T.id === pregunta);
    // avanza hasta que haya algo que mostrar o decidir (una escena, una pregunta) o hasta el final; devuelve el estado.
    // (escenario.paso: para probar que se puede guardar en cualquier momento, se detiene cada tantas vueltas —pausa—)
    function avanzar(limite = escenario.paso || 5000){
      // (los encargos de quienes están en una escena que no va en marcha, esperan a que termine)
      const detenida = T => escena && !escena.en_marcha && escena.participan.includes(T.quien);
      for (let vuelta = 0; vuelta < limite; vuelta++) {
        if (pregunta) return estadoUI();
        if (escena) { seguirEscena(); if (escena && escena.ops) return estadoUI(); }
        if (escena && cola.length && elegirEscena(true)) continue;   // (una que interrumpe: no espera)
        revisarHistorias();
        if (fin) return estadoUI();
        if (!escena && cola.length && elegirEscena()) continue;
        const lista = tareas.filter(T => !T.fin && !T.pregunta && !detenida(T) && (T.hasta ? cumple(T.hasta) : T.despierta <= t));
        if (lista.length) {
          const T = lista[0]; T.hasta = null;
          const w = correr(T);
          if ('fin' in w) { T.fin = true; if (T.etiqueta) set(['encargo', T.h, T.etiqueta], w.fin ? 'cumplido' : 'fallido'); continue; }
          if (w.min != null) T.despierta = t + w.min;
          else if (w.accion) T.despierta = mundo.cuando(w.accion);
          else if (w.hasta) T.hasta = w.hasta;
          else if (w.pregunta) {
            if (auto || (respuestas && respuestas.length)) { T.valor = responderAuto(w.pregunta); T.despierta = t; }
            else { T.pregunta = w.pregunta; pregunta = T.id; }
          }
          continue;
        }
        const prox = tareas.filter(T => !T.fin && !T.pregunta && !T.hasta && !detenida(T)).map(T => T.despierta);
        if (escena) prox.push(escena.proxima);
        if (!prox.length) return estadoUI();   // (nada más que hacer: esperan algo que no va a pasar solo)
        t = Math.max(t, Math.min(...prox));
      }
      if (escenario.paso) return { ...estadoUI(), pausa: true };
      throw new Error('el motor no avanza (¿un ciclo?)');
    }
    function estadoUI(){
      const P = enPregunta();
      return { escena: escena && { id: escena.id, resumen: D.escenas[escena.id].resumen, ops: escena.ops?.map(o => o.op) },
        pregunta: P && { de: nombre(P.pregunta.de), si: P.pregunta.si, no: P.pregunta.no }, fin, reloj: reloj() };
    }

    // ---------------------------------------------------------------- el comienzo: un escenario, o una partida guardada
    if (guardado) ({ S, registro, tareas, cola, porTras, escena, pregunta, fin, sigId, t, respuestas } = guardado);
    else {
      // (por defecto: el día de White Sands. Un escenario cambia lugares y estado; null borra)
      const ini = { ana: 'cocina', marilla: 'cocina', matthew: 'corral', calesa: 'corral', srapye: 'aldea', spencer: 'hotel_white_sands', blewett: 'hotel_white_sands', ...(escenario.lugares || {}) };
      for (const [x, l] of Object.entries(ini)) set(['mundo', x, 'lugar'], l);
      set(['comun', 'hechos', 'primera_noche'], 1); set(['estado', 'ana_en_tv'], 'en_prueba');
      for (const [c, v] of Object.entries(escenario.estado || {})) if (v === null) delete S[c]; else set(c.split('.'), v);
    }

    return {
      avanzar,
      responder(si){ const T = enPregunta(), q = T.pregunta; pregunta = null; T.pregunta = null; T.valor = si; T.despierta = t; registro.push({ tipo: 'eleccion', t: si ? q.si : q.no, hora: reloj() }); return avanzar(); },
      elegir(i){ elegir(i); return avanzar(); },
      // Ana decide sola lo que hay que decidir ahora (lo que le piden, según comun/ana.ts; en una escena, lo suyo: #propia)
      decideSola(){
        if (pregunta) return this.responder(responderAuto(enPregunta().pregunta));
        if (escena && escena.ops) { elegir(Math.max(0, escena.ops.findIndex(o => o.propia))); return avanzar(); }
        return avanzar();
      },
      // lo que la jugadora hace por su cuenta (cuando no hay escena ni pregunta)
      irA(l){ nota(`(la jugadora: Ana va hasta ${nombre(l)})`); nuevaTarea({ verbo: 'ir_a', args: ['ana', l] }, {}); return avanzar(); },
      bajarse(){ nota('(la jugadora: Ana se baja de la calesa)'); instantaneo({ verbo: 'bajar', args: ['ana'] }); return avanzar(); },
      esperar(m){ t += m; return avanzar(); },
      // la partida entera, como datos (JSON): se vuelve a cargar con Motor.cargar
      guardar: () => JSON.stringify({ v: 1, escenario, S, registro, tareas, cola, porTras, escena, pregunta, fin, sigId, t, respuestas }),
      registro, get, nombre, lugares: () => Object.keys(D.lugares),
      encargos: () => Object.entries(D.historias).flatMap(([h, H]) => Object.keys(H.encargo).map(et => ({ historia: h, etiqueta: et, estado: get(['encargo', h, et]) }))),
      resumen: () => ({ reloj: reloj(), estado: get(['estado', 'ana_en_tv']), paciencia: get(['cualidad', 'marilla', 'paciencia', 'ana']),
        afecto: get(['cualidad', 'marilla', 'afecto', 'ana']), lugares: Object.fromEntries([...Object.keys(D.personas), ...Object.keys(D.medios)].map(p => [p, get(['mundo', p, 'lugar'])])),
        en: Object.fromEntries(Object.keys(D.personas).map(p => [p, get(['mundo', p, 'en'])]).filter(([, v]) => v !== 'nada')),
        hechos: Object.entries(S).filter(([c]) => /\.(hechos|dichas)\./.test(c)).map(([c]) => c) }),
    };
  }
  // una partida guardada (lo que devolvió guardar()), con los mismos datos y el mismo mundo
  Motor.cargar = (D, json, Mundo = null) => { const g = JSON.parse(json); return Motor(D, g.escenario, Mundo, g); };
  if (typeof module !== 'undefined' && module.exports) module.exports = { Motor };
  else raiz.Motor = Motor;
})(this);
