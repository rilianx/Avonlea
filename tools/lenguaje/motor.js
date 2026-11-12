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
    let S = {}, registro = [], tareas = [], cola = [], porTras = [], escena = null, pregunta = null, fin = null, sigId = 1, charlas = [];
    let t = (escenario.dia ?? 2) * 1440 - 1440 + (escenario.hora ?? 14) * 60;   // (minutos desde el comienzo del día 1)
    let respuestas = escenario.respuestas ? [...escenario.respuestas] : null;
    const auto = !!escenario.auto, opcionesGuion = escenario.opciones || {};

    // ---------------------------------------------------------------- el estado
    const k = c => c.join('.');
    const dia = () => Math.floor(t / 1440) + 1, hora = () => (t % 1440) / 60;
    const SEMANA = ['domingo', 'lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado'];
    function defecto(c){
      if (c[0] === 'estado') return D.estados[c[1]]?.inicial;
      if (c[0] === 'cualidad') return D.cualidades[c[2]]?.inicial ?? 0;
      if (c[0] === 'mundo') return c[2] === 'en' ? 'nada' : c[2] === 'sigue' ? 'nadie' : c[2] === 'listo' ? 'no' : undefined;
      if (c[0] === 'tiempo') return c[1] === 'hora' ? hora() : c[1] === 'semana' ? SEMANA[dia() % 7] : dia();
      if (c[0] === 'intentos') return 0;
      if (c[0] === 'encargo') return 'pendiente';
      if (c[0] === 'historia') return 'no_empezada';
      if (c[0] === 'cosas') return D.cosas?.inicio?.[c[1]]?.[c[2]] ?? 0;   // (cuántas hay ahí al empezar)
      if (c[0] === 'cariño') return D.quiere?.[escenario.vidas]?.[c[1] + '>' + c[2]] ?? 0;   // (cuánto se quieren al empezar: quiereDe)
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
          if (c.op === '=' || c.op === '!=') return (a === b || (c.camino[0] === 'mundo' && c.camino[2] === 'lugar' && D.lugares[a]?.dentro === b)) === (c.op === '=');   // (estar en un lugar es estar en él o en algo de adentro: la cocina es Tejas Verdes)
          const x = ordinal(c.camino, a), y = ordinal(c.camino, b); if (x < 0 || y < 0) return false;
          return { '<': x < y, '<=': x <= y, '>': x > y, '>=': x >= y }[c.op];
        }
        case 'desde': { const d = get(c.camino); if (c.min) { const pas = d == null ? Infinity : t - d, n = aMin(c.valor); return { '<': pas < n, '<=': pas <= n, '>': pas > n, '>=': pas >= n, '=': pas === n }[c.op]; }   // (hizo: el minuto en que lo hizo)
          if (d == null) return false; const n = parseFloat(c.valor), u = c.valor.slice(-1), pas = u === 'd' ? dia() - d : (dia() - d) * 24;
          return { '<': pas < n, '<=': pas <= n, '>': pas > n, '>=': pas >= n, '=': pas === n }[c.op]; }
        case 'y': return c.de.every(cumple);
        case 'o': return c.de.some(cumple);
        case 'no': return !cumple(c.de);
        case 'f': return mundo.funciones[c.f](...c.args.map(val));
        case 'haciendo': return haciendo(c.quien).includes(c.verbo);
        case 'recado': return recadosDe(c.quien).some(r => r.hace.verbo === c.verbo && t <= r.hasta);
      }
      throw new Error('condición desconocida: ' + JSON.stringify(c));
    }
    function aplicar(e){
      if (e.verbo) return instantaneo(e);
      if (e.e === 'deja') set(e.camino, e.valor === undefined ? dia() : val(e.valor));
      else if (e.e === 'olvida') delete S[k(e.camino)];
      else if (e.e === 'suma' && e.camino[0] === 'cosas') set(e.camino, Math.max(0, get(e.camino) + e.n));   // (las cosas: nunca menos de cero)
      else if (e.e === 'suma' && e.camino[0] === 'cariño') { const a = get(e.camino), b = Math.max(-2, Math.min(5, a + e.n)); set(e.camino, b); if (a !== b) nota(`${e.n > 0 ? '💗' : '💔'} ${nombre(e.camino[1])} quiere a ${nombre(e.camino[2])}: ${a} → ${b}`, 'momento'); }   // (de −2 a 5, como en el juego)
      else if (e.e === 'si') { if (cumple(e.si)) for (const x of e.entonces) aplicar(x); }   // (un efecto que depende: si hay pan)
      else if (e.e === 'suma') { const d = D.cualidades[e.camino[2]], r = d ? d.rango : [-1e9, 1e9]; set(e.camino, Math.max(r[0], Math.min(r[1], get(e.camino) + e.n))); nota(`${nombre(e.camino[1])}: ${e.camino[2]}${e.camino[3] ? ' hacia ' + nombre(e.camino[3]) : ''} ${e.n > 0 ? '+' : ''}${e.n} → ${get(e.camino)}`); }
      else if (e.e === 'log') nota('📔 ' + e.texto);
      else if (e.e === 'marca') nota('📖 ' + e.id, 'momento');
      mundo.efecto?.(e);   // (el juego lo hace también en el suyo: sus hechos, sus estados, el diario)
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
    // (el texto de una línea: lo que va entre llaves, con su nombre —una cosa, su título; una persona, un lugar, el suyo—)
    const mostrar = v => D.cosas?.tipos?.[v]?.titulo ?? D.personas?.[v] ?? D.lugares?.[v]?.nombre ?? (v == null ? '…' : String(v));
    const textoDe = it => (it.vars ? it.t.replace(/\{(\d+)\}/g, (_, i) => mostrar(val(it.vars[+i]))) : it.t);
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
      if (mejor) { registro.push({ tipo: 'linea', q: ll.args[0], t: mejor.t, hora: reloj() }); mundo.voz?.(ll.args[0], mejor.t); }   // (en el juego, una burbuja)
    }
    const texto = (s, ll) => s.replace(/\{(\w+)\}/g, (_, n) => nombre(val(ll.args[D.verbos[ll.verbo].params.indexOf(n)])));

    // ---------------------------------------------------------------- los verbos: una pila de marcos
    // Una tarea (un encargo, o lo que hace la jugadora) es una pila de marcos: el verbo de abajo, y encima el paso que
    // está haciendo, y encima el paso de ese paso. Cada marco es datos: su llamada y en qué va (fase, paso, intento).
    // correr(T) avanza la tarea hasta que tenga que esperar, y devuelve qué espera: {min} —un rato—, {hasta} —que se
    // cumpla algo—, {pregunta} —la respuesta de Ana—, {accion} —que el mundo termine algo—; o {fin}, con lo que valió.
    // Un marco devuelve {vale} (terminó), {espera}, o nada (empujó un marco, o cambió de fase: se sigue).
    // (la operación de un primitivo —tomar, esperar, dar un recado…—: la declara el verbo, no su nombre)
    const opDe = ll => D.verbos[ll.verbo]?.opera;
    const def = ll => { const d = D.verbos[ll.verbo]; if (!d) throw new Error('verbo desconocido: ' + ll.verbo); return sub(d, { params: ll.args }); };
    const marco = (ll, ctx) => ({ k: 'verbo', ll, ctx, fase: 0 });
    const hijo = (padre, label) => ({ padre, label, encargo: padre.encargo, ruta: unir(padre.ruta, label) });
    const aMin = d => { const n = parseFloat(d), u = d.slice(-1); return u === 's' ? n / 60 : u === 'm' ? n : u === 'h' ? n * 60 : n * 1440; };
    const yaEs = e => e.e === 'deja' && e.valor !== undefined && get(e.camino) === val(e.valor);
    function correr(T){
      revisarMantiene(T); revisarElegir(T);
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
        if (F.fase === 2) { F.ok = ret; if (ret && D.personas[F.inst.quien]) { set(['hizo', F.inst.quien, F.ll.verbo], dia()); set(['hizo_t', F.inst.quien, F.ll.verbo], t); cumplirRecado(F.inst.quien, F.ll); }   // (lo que hizo: hizo(quien, verbo).hoy)
          emitir(F.inst, ret ? 'cumplido' : 'fallido'); F.fase = 3; return { espera: { min: 0 } }; }
        return { vale: F.ok };
      },
      // (lo hace el mundo, con lo que dura; al terminar, deja lo que deja)
      primitivo(F, T, ret){
        const ll = F.ll, d = def(ll);
        if (F.fase === 4) { if (!ret) return { vale: false }; F.fase = 0; }   // (fue hasta donde se hace)
        if (F.fase === 7) return { vale: ret };   // (hizo el recado, o no pudo)
        if (F.fase === 0 && opDe(ll) === 'acompañar') {   // (va con la otra: la sigue; lo que la otra hace ahora es el porqué)
          const [q, otra] = ll.args;
          if (!cumple(d.pide)) { nota(`✘ acompañar: ${nombre(q)} no está con ${nombre(otra)}`); return { vale: false }; }
          F.prop = proposito(otra); F.t0 = t; F.fase = 8; aplicar({ e: 'deja', camino: ['mundo', q, 'sigue'], valor: otra });
          nota(`👣 ${nombre(q)} acompaña a ${nombre(otra)}${F.prop ? ` (${F.prop.replace(/_/g, ' ')})` : ''}`, 'momento');
        }
        if (F.fase === 8) {
          const [q, otra, hasta] = ll.args, fin = (v, por) => { if (por) nota(`· ${nombre(q)} deja de acompañar a ${nombre(otra)}: ${por}`, 'momento'); aplicar({ e: 'deja', camino: ['mundo', q, 'sigue'], valor: 'nadie' }); return { vale: v }; };
          if (hasta && cumple(hasta)) return fin(true);
          if (get(['mundo', q, 'sigue']) !== otra) return fin(false, 'se soltó');
          if (F.prop ? !haciendo(otra).includes(F.prop) : t - F.t0 >= 30) return fin(!hasta, F.prop ? `${nombre(otra)} dejó de ${F.prop.replace(/_/g, ' ')}` : 'ya fue un rato');
          if (!cumple(d.pide)) return fin(false, 'se separaron');
          return { espera: { min: 1 } };
        }
        if (F.fase === 0 && opDe(ll) === 'charlar') {   // (charlar: elige qué charla, la empieza, y espera a que termine)
          const prio = T.vida ? Math.max(0, ...T.pila.filter(G => G.k === 'elegir' && G.fase === 1).map(G => G.prio ?? 0)) : Infinity;
          const c = charlaPara(ll.args[0], ll.args[1], prio); if (!c) return { vale: false };
          F.charla = empezarCharla(c, T.id); F.fase = 9;
        }
        if (F.fase === 9) { if (charlas.some(C => C.n === F.charla)) return { espera: { min: 1 } }; const r = get(['charla_fin', F.charla]); delete S[k(['charla_fin', F.charla])]; return { vale: r === 'dicha' }; }
        if (F.fase === 0 && opDe(ll) === 'hacer_recado') { const r = recadoPara(ll.args[0]); if (!r) return { vale: false }; F.fase = 7; T.pila.push(marco(r.hace, hijo(F.inst, 'recado'))); return; }
        if (F.fase === 0) {
          const q = ll.args[0];
          if (d.donde && !T.ya && !F.fue && !estaEn(q, d.donde)) { F.fue = true; F.fase = 4; T.pila.push(marco({ verbo: 'ir_a', args: [q, d.donde] }, hijo(F.inst, 'va'))); return; }   // (si no está donde se hace, primero va)
          if (opDe(ll) === 'esperar') { F.fase = 2; return cumple(d.pide) ? undefined : { espera: { hasta: d.pide } }; }
          if (opDe(ll) === 'quedarse') { F.fase = 5; F.lugar = lugarDe(q); return; }
          if (d.deja && d.deja.length && d.deja.every(yaEs)) return { vale: true };   // (lo que deja ya es cierto: se salta)
          if (d.pide && !cumple(d.pide)) { nota(`✘ ${ll.verbo}: no se puede (${nombre(ll.args[0])})`); return { vale: false }; }
          if (lleno(q, d)) { nota(`✘ ${ll.verbo}: ${d.junto_a} está ocupado (${nombre(q)})`); return { vale: false }; }
          { const x = faltaCosa(q, d, ll); if (x) { nota(`✘ ${ll.verbo}: no hay ${x} a mano (${nombre(q)})`); return { vale: false }; } }
          for (const e of d.empieza || []) aplicar(e);
          // (lo que usa de una clase —un libro—: el que venía usando, si lo tiene a mano; si no, otro de los suyos)
          for (const x of d.usa || []) { if (D.cosas?.tipos?.[x]) continue; const aqui = d.donde || lugarDe(q), tiene = deClase(x).filter(k => get(['cosas', q, k]) + get(['cosas', aqui, k]) > 0); if (!tiene.length) continue;
            const antes = get(['usa', q, x]); set(['usa', q, x], tiene.includes(antes) ? antes : tiene[Math.floor(azar() * tiene.length)]); }
          decir(ll);
          if (d.de_conversar && !T.ya) { const c = charlaPara(q, null, 0); if (c) empezarCharla(c, null, true); }   // (comer, coser…: si hay otro y algo que decirse, conversan mientras)
          F.fase = 3;
          if (d.dura) {
            // (lo que dejó a medias hoy, lo retoma: le falta lo que le faltaba)
            const r = resto(q, ll.verbo); F.dura = r ?? aMin(d.dura); F.t0 = t;
            if (r != null) nota(`↩ ${nombre(q)} retoma ${ll.verbo} (le faltan ${Math.round(r)} min)`, 'momento');
            delete S[k(['resto', q, ll.verbo])]; delete S[k(['resto_dia', q, ll.verbo])];
            F.acc = { quien: ll.args[0], verbo: ll.verbo, args: ll.args, dura: F.dura, ya: !!T.ya, ...(d.donde ? { donde: d.donde } : {}), ...(d.junto_a ? { junto_a: d.junto_a } : {}), ...(d.postura ? { postura: d.postura } : {}), ...(d.usa ? { usa: d.usa.map(x => (D.cosas?.tipos?.[x] ? x : get(['usa', ll.args[0], x]) ?? x)) } : {}) }; mundo.empezar(F.acc); F.fase = 1;   // (y lo que dice de sí, para el dibujo)   // (lo que usa: de una clase, cuál —«Ben-Hur»—)
          }
          return;
        }
        if (F.fase === 1) { if (!mundo.listo(F.acc)) return { espera: { accion: F.acc } }; mundo.terminar?.(F.acc); F.fase = 3; return; }
        if (F.fase === 2) return cumple(d.pide) ? { vale: true } : { espera: { hasta: d.pide } };   // (despertó a mirar otra cosa: si no, sigue esperando)
        if (F.fase === 5) {   // (quedarse: hasta que se cumpla, o hasta que se vaya —entonces no se cumplió—)
          if (lugarDe(ll.args[0]) !== F.lugar) return { vale: false };
          return cumple(d.pide) ? { vale: true } : { espera: { hasta: { c: 'o', de: [d.pide, { c: 'cmp', camino: ['mundo', ll.args[0], 'lugar'], op: '!=', valor: F.lugar }] } } };
        }
        for (const e of d.deja || []) aplicar(e);
        if (opDe(ll) === 'tomar' || opDe(ll) === 'poner') mover(ll);   // (la cosa va del lugar a quien, o de quien al lugar)
        if (opDe(ll) === 'dar_recado') darRecado(ll);
        return { vale: true };
      },
      // (ir hasta un lugar: el mundo busca el camino, y avisa al llegar)
      mapa(F, T){
        const ll = F.ll;
        if (F.fase === 0) {
          if (D.verbos[ll.verbo].a_pie) set(['mundo', ll.args[0], 'en'], 'nada');   // (correr: se baja de lo que va)
          decir(ll);
          const c = ll.args[1]?.camino, hacia = c && c[0] === 'mundo' && c[2] === 'lugar' ? c[1] : null;   // (adonde está alguien: el mundo sabe más fino dónde —en qué cuadrante—)
          F.acc = { quien: ll.args[0], verbo: ll.verbo, a: val(ll.args[1]), mapa: true, ya: !!T.ya, ...(hacia ? { hacia } : {}) };
          const P = T.pila[T.pila.length - 3]; if (P && P.k === 'receta' && P.lista) F.acc.de_paso = true;   // (una parada de un viaje: el «por cada» de una ruta)
          mundo.empezar(F.acc); F.fase = 1;
        }
        if (!mundo.listo(F.acc)) return { espera: { accion: F.acc } };
        mundo.terminar?.(F.acc); return { vale: true };
      },
      // (una secuencia fija de pasos, o un «por cada»; lo que mantiene lo revisa revisarMantiene)
      receta(F, T, ret){
        const d = def(F.ll);
        if (F.fase === 0) {
          if (d.pide && !cumple(d.pide)) return { vale: false };
          if (d.pasos.por_cada) { const tr = d.pasos.por_cada; F.lista = mundo.tramo(tr.por, val(tr.desde), tr.hasta, F.ll.args[0]); }   // (y quién va)
          F.i = 0; F.j = 0; F.fase = 1;
        }
        if (F.fallo) { dejar(F); return { vale: false }; }   // (no pudo reparar lo que se rompió, o lo dejó)
        if (F.fase === 2) { if (!ret) { dejar(F); return { vale: false }; } F.j++; F.fase = 1; }
        if (F.lista) {
          if (F.j >= F.lista.length) return { vale: true };
          const x = F.lista[F.j]; F.fase = 2; T.pila.push(marco(sub(d.pasos.hace, { elemento: x }), hijo(F.inst, x))); return;
        }
        const ks = Object.keys(d.pasos);
        for (;;) {
          if (F.i >= ks.length) return { vale: !d.cumplido || cumple(d.cumplido) };
          const p = d.pasos[ks[F.i]], lista = Array.isArray(p) ? p : [p];
          if (F.j < lista.length) { F.fase = 2; T.pila.push(pasoMarco(lista[F.j], hijo(F.inst, ks[F.i]))); return; }
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
      // (elegir: de lo que se puede —su «si», y lo que pide su verbo—, lo de más prioridad; entre lo de igual prioridad,
      // al azar, por peso. Mientras se hace, si algo de más prioridad se vuelve posible, revisarElegir lo corta)
      elegir(F, T, ret){
        if (F.fase === 1) return { vale: ret };
        const ops = F.p.elige.map((o, i) => ({ o, i })).filter(({ o }) => (o.si == null || cumple(o.si)) && puede(o.hace, o.prioridad || 0));
        if (!ops.length) return { vale: false };
        const pm = Math.max(...ops.map(x => x.o.prioridad || 0)), top = ops.filter(x => (x.o.prioridad || 0) === pm);
        const peso = x => (x.o.peso ?? 1) * (x.o.hace.verbo && resto(x.o.hace.args[0], x.o.hace.verbo) != null ? 4 : 1);   // (lo que dejó a medias, más probable)
        let r = azar() * top.reduce((n, x) => n + peso(x), 0), ch = top[top.length - 1];
        for (const x of top) { r -= peso(x); if (r < 0) { ch = x; break; } }
        F.prio = pm; F.cual = ch.i; F.fase = 1; T.pila.push(pasoMarco(ch.o.hace, F.ctx));
      },
      // (repetir: el paso, una y otra vez, mientras se cumpla «mientras»; si no hubo nada que hacer, o no tomó tiempo, un respiro)
      repetir(F, T){
        if (F.fase === 1) { F.fase = 0; if (t === F.t0) return { espera: { min: 5 } }; }
        if (F.p.mientras && !cumple(F.p.mientras)) return { vale: true };
        F.t0 = t; F.fase = 1; T.pila.push(pasoMarco(F.p.repite, F.ctx));
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
        if (m.si_se_rompe === 'dejar') { nota(`↯ ${F.ll.verbo}: se rompió lo que mantenía; lo deja`, 'momento'); cortarDesde(T, n); F.fallo = true; return; }
        nota(`↺ ${F.ll.verbo}: se rompió lo que mantenía; vuelve a «${m.si_se_rompe}»`, 'momento');
        for (const G of T.pila.slice(n + 1)) if (G.acc && !G.acc.parada) { mundo.parar(G.acc); G.acc.parada = true; }
        F.reparando = true; T.pila.push({ k: 'reparar', abajo: n, j: ks.indexOf(m.si_se_rompe), m: 0, fase: 0 });
        return;
      }
    }
    // (una elección en curso: si algo de más prioridad se volvió posible —la hora de comer, llegó Diana—, deja lo que
    // hacía y vuelve a elegir. Se mira cada vez que la tarea despierta: la que tiene algo así despierta cada tanto)
    function revisarElegir(T){
      for (let n = 0; n < T.pila.length; n++) {
        const F = T.pila[n]; if (F.k !== 'elegir' || F.fase !== 1) continue;
        const mejor = F.p.elige.find(o => (o.prioridad || 0) > F.prio && (o.si == null || cumple(o.si)) && puede(o.hace, o.prioridad || 0));
        if (!mejor) continue;
        nota(`⤳ ${nombre(T.quien)} deja lo que hacía, por ${mejor.hace.verbo}`, 'momento');
        cortarDesde(T, n); F.fase = 0; return;
      }
    }
    const conMejores = T => T.pila.some(F => F.k === 'elegir' && F.fase === 1 && F.p.elige.some(o => (o.prioridad || 0) > F.prio));
    const REVISAR = 5;   // (cada cuántos minutos se mira si hay algo más importante)
    // (cortar lo que hay encima de un marco: lo que el mundo estaba haciendo se cancela; las recetas a medias dejan lo suyo)
    function cortarDesde(T, n){
      for (const G of T.pila.slice(n + 1).reverse()) {
        if (G.k === 'primitivo' && G.fase === 8) { nota(`· ${nombre(G.ll.args[0])} deja de acompañar a ${nombre(G.ll.args[1])}`, 'momento'); aplicar({ e: 'deja', camino: ['mundo', G.ll.args[0], 'sigue'], valor: 'nadie' }); }   // (acompañaba: se suelta)
        if (G.acc && mundo.cancelar) mundo.cancelar(G.acc);
        if (G.k === 'receta') dejar(G);
        if (G.k === 'primitivo' && G.fase === 1 && G.acc) {   // (a medias: se guarda lo que le faltaba —lo retoma hoy—, y deja lo suyo)
          const hecho = t - G.t0, falta = G.dura - hecho, q = G.ll.args[0];
          if (hecho >= 1 && falta >= 1) { set(['resto', q, G.ll.verbo], falta); set(['resto_dia', q, G.ll.verbo], dia()); }
          for (const e of def(G.ll).si_se_deja || []) aplicar(e);
        }
      }
      T.pila.length = n + 1;
    }
    function dejar(F){ if (F.dejada) return; F.dejada = true; for (const e of def(F.ll).si_se_deja || []) aplicar(e); }
    const pasoMarco = (p, ctx) => (p.elige ? { k: 'elegir', p, ctx, fase: 0 } : p.repite ? { k: 'repetir', p, ctx, fase: 0 } : marco(p, ctx));
    const puede = (ll, prio = 0) => { if (ll.elige || ll.repite) return true; if (opDe(ll) === 'charlar') return !!charlaPara(ll.args[0], ll.args[1], prio, false); if (opDe(ll) === 'hacer_recado') return !!recadoPara(ll.args[0]); if (opDe(ll) === 'dar_recado') { const p = def(ll.args[2]).pide; if (p && !cumple(p)) return false; }   /* (no se pide lo que no se puede: entrar leña, si no hay) */    const d = def(ll); if (d.tipo === 'primitivo' && (lleno(ll.args[0], d) || faltaCosa(ll.args[0], d, ll))) return false; return !d.pide || d.tipo === 'primitivo' && (opDe(ll) === 'esperar' || opDe(ll) === 'quedarse') || cumple(d.pide); };
    // (los recados de alguien: los que le dieron —dar_recado—, hasta que los hace, vencen, o ya no hacen falta: lo que
    // pide su verbo ya no se cumple —no quedan huevos en el gallinero—)
    const recadosDe = q => S[k(['recados', q])] || [];
    const igual = (a, b) => JSON.stringify(a) === JSON.stringify(b);
    function darRecado(ll){
      const [de, a, hace, vence] = ll.args, L = recadosDe(a);
      if (L.some(r => igual(r.hace, hace))) return;   // (ya se lo habían pedido)
      S[k(['recados', a])] = [...L, { de, hace, desde: t, hasta: t + aMin(vence || '3h') }];
      nota(`✉ ${nombre(de)} le pide a ${nombre(a)}: ${hace.verbo.replace(/_/g, ' ')}`, 'momento');
    }
    function revisarRecados(q){
      const L = recadosDe(q); if (!L.length) return L;
      const quedan = L.filter(r => {
        if (t > r.hasta) { nota(`· ${nombre(q)} no hizo el recado de ${nombre(r.de)} (${r.hace.verbo.replace(/_/g, ' ')}): venció`, 'momento'); return false; }
        const p = def(r.hace).pide; if (p && !cumple(p)) { nota(`· el recado de ${nombre(r.de)} a ${nombre(q)} (${r.hace.verbo.replace(/_/g, ' ')}) ya no hace falta`, 'momento'); return false; }
        return true;
      });
      if (quedan.length !== L.length) S[k(['recados', q])] = quedan;
      return quedan;
    }
    const recadoPara = q => revisarRecados(q).find(r => puede(r.hace));
    // (alguien hizo un verbo: si era un recado suyo, está hecho —por su vida, por la jugadora, por lo que sea—)
    function cumplirRecado(q, ll){
      const L = recadosDe(q), r = L.find(x => igual(x.hace, ll)); if (!r) return;
      S[k(['recados', q])] = L.filter(x => x !== r);
      set(['recado_hecho', q, r.de], dia()); set(['recado_hecho_t', q, r.de], t);
      nota(`✔ ${nombre(q)} hizo el recado de ${nombre(r.de)} (${ll.verbo.replace(/_/g, ' ')})`, 'momento');
    }
    // (junto a un mueble: ¿ya están todos los que caben —el fregadero, de a uno—? Los muebles y cuántos caben: mueblesDe)
    const lleno = (q, d) => { const m = d.junto_a && d.donde ? D.muebles?.[d.donde]?.[d.junto_a] : null, cap = m && typeof m === 'object' ? m.caben : m; if (cap == null) return false;
      return tareas.filter(U => !U.fin && U.quien !== q && U.pila.some(G => G.k === 'primitivo' && G.fase === 1 && G.acc && G.acc.junto_a === d.junto_a && G.acc.donde === d.donde)).length >= cap; };
    // (lo que usa, si es una cosa: tiene que haber una a mano —la lleva, o está donde se hace—; tomar y poner, lo que mueven)
    // (las cosas de una clase —los libros—; una cosa declarada es su propia clase)
    const deClase = x => (D.cosas?.tipos?.[x] ? [x] : Object.keys(D.cosas?.tipos || {}).filter(k => D.cosas.tipos[k].es === x));
    function faltaCosa(q, d, ll){
      const aqui = d.donde || lugarDe(q), hay = x => deClase(x).reduce((n, k) => n + get(['cosas', q, k]) + get(['cosas', aqui, k]), 0);
      if (opDe(ll) === 'tomar' && get(['cosas', lugarDe(q), ll.args[1]]) < 1) return ll.args[1];
      if (opDe(ll) === 'poner' && get(['cosas', q, ll.args[1]]) < 1) return ll.args[1];
      for (const x of d.usa || []) if (deClase(x).length && hay(x) < 1) return x;
      return null;
    }
    // (tomar: del lugar a quien, las que haya, hasta n; poner: de quien al lugar)
    function mover(ll){
      const [q, x, n0] = ll.args, L = lugarDe(q), [de, a] = opDe(ll) === 'tomar' ? [L, q] : [q, L], n = Math.min(n0, get(['cosas', de, x]));
      if (n > 0) { aplicar({ e: 'suma', camino: ['cosas', de, x], n: -n }); aplicar({ e: 'suma', camino: ['cosas', a, x], n }); }
    }
    // LO QUE PASA SOLO (procesos de las vidas: las gallinas ponen a las seis): una vez al día, a su hora
    const PROCESOS = () => (escenario.vidas && D.procesos?.[escenario.vidas]) || [];
    function procesar(){ PROCESOS().forEach((p, i) => { const c = 'proceso.' + i; if (hora() >= p.hora && S[c] !== dia()) { S[c] = dia(); for (const e of p.deja) aplicar(e); } }); }
    const proxProceso = () => Math.min(...PROCESOS().map((p, i) => { const hoy = (dia() - 1) * 1440 + p.hora * 60; return S['proceso.' + i] === dia() || t >= hoy ? hoy + 1440 : hoy; }));
    // (lo que le faltaba a algo que dejó a medias hoy: los minutos; si no, nada)
    const resto = (q, v) => (get(['resto_dia', q, v]) === dia() ? get(['resto', q, v]) ?? null : null);
    const estaEn = (q, l) => lugarDe(q) === l;   // (donde se hace algo: ahí mismo —fumar en el porche no es en la cocina—)
    // (el azar, con semilla: la misma partida da lo mismo; se guarda con ella)
    function azar(){ let x = S['azar'] ?? ((escenario.semilla ?? 1) >>> 0); x = (Math.imul(x ^ 0x5bd1e995, 1664525) + 1013904223) >>> 0; S['azar'] = x; return x / 4294967296; }
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

    // ---------------------------------------------------------------- las vidas
    // (cada uno, lo de todos los días —docs/lenguaje/vidas/—: una tarea de fondo. Mientras otra cosa lo ocupa —un
    // encargo de una historia, lo que la jugadora le pide hacer, o que la jugadora lo maneja—, se suspende: lo que
    // hacía queda a medias, sin más. Cuando lo sueltan, vuelve a elegir qué hacer)
    const ocupadoAparte = q => !!get(['controla', q]) || tareas.some(U => !U.fin && !U.vida && U.quien === q);
    function revisarVidas(){
      for (const T of tareas) {
        if (!T.vida || T.fin) continue;
        const s = ocupadoAparte(T.quien);
        if (s && !T.susp) { T.susp = true; cortarDesde(T, -1); T.accion = null; T.hasta = null; nota(`⏸ ${nombre(T.quien)} deja su día: otra cosa la ocupa`, 'momento'); }
        else if (!s && T.susp) { T.susp = false; T.pila = [marco(T.vida, {})]; T.despierta = t; T.accion = null; T.hasta = null; nota(`▷ ${nombre(T.quien)} vuelve a su día`, 'momento'); }
      }
    }
    // (por qué hace lo que hace alguien: lo que eligió en su día —ir_a_clases—, o lo que le pidieron; nada, si nada)
    const proposito = q => { const T = tareas.find(U => !U.fin && !U.vida && U.quien === q) || tareas.find(U => !U.fin && U.vida && U.quien === q && !U.susp); if (!T) return null; const v = T.pila.filter(F => F.k === 'verbo').map(F => F.ll.verbo); return (T.vida ? v[1] : v[0]) || null; };
    // (lo que está haciendo alguien: los verbos de su tarea, de afuera hacia adentro —dia_de_ana › ir_a_clases › quedarse—)
    function haciendo(q){
      const T = tareas.find(U => !U.fin && !U.vida && U.quien === q) || tareas.find(U => !U.fin && U.vida && U.quien === q && !U.susp);
      return T ? T.pila.filter(F => F.k === 'verbo').map(F => F.ll.verbo) : [];
    }

    // ---------------------------------------------------------------- las historias, los encargos y las escenas
    function nuevaTarea(ll, extra){ tareas.push({ id: sigId++, pila: [marco(ll, extra.encargo ? { encargo: extra.encargo, ruta: '' } : {})], despierta: t, quien: ll.args[0], ...extra }); }
    function empezarEncargo(h, etiqueta){
      const e = D.historias[h].encargo[etiqueta];
      set(['encargo', h, etiqueta], 'en_curso');
      nuevaTarea(e.hace, { encargo: { historia: h, etiqueta }, h, etiqueta, quien: e.quien });
      mundo.encargo?.('empieza', e.quien, h + '.' + etiqueta);   // (en el juego: está ocupado, su rutina espera)
    }
    function revisarHistorias(){
      for (const [h, H] of Object.entries(D.historias)) {
        if (escenario.historias && !escenario.historias.includes(h)) continue;   // (solo las que corren aquí: en el juego, las que ya pasaron al lenguaje)
        const est = get(['historia', h]);
        if (est === 'no_empezada' && cumple(H.empieza)) {
          set(['historia', h], 'en_curso'); nota(`▶ empieza la historia «${H.titulo}»`, 'titulo'); cola.push({ tipo: 'historia', historia: h, momento: 'empieza' });
          for (const [et, e] of Object.entries(H.encargo)) if (!e.tras || !e.tras.length) empezarEncargo(h, et); else porTras.push({ h, et });
        } else if (est === 'en_curso' && !escena) {
          const termina = H.termina != null && cumple(H.termina), falla = H.falla && cumple(H.falla);   // (sin «termina»: de fondo, no termina)
          if (termina || falla) {
            set(['historia', h], termina ? 'terminada' : 'fallida');
            if (termina) for (const e of H.deja || []) aplicar(e);
            mundo.historia?.(termina ? 'termina' : 'falla', h);   // (en el juego: su punto para volver)
            for (const T of tareas) if (T.h === h && !T.fin) { T.fin = true; mundo.encargo?.('termina', T.quien, h + '.' + T.etiqueta); }
            nota(termina ? `■ termina la historia: ${(H.deja || []).map(e => e.camino.slice(-1)[0] + (e.valor !== undefined ? ' = ' + e.valor : '')).join(', ')}${H.punto ? ` (punto: ${H.punto.split('|').pop().trim()})` : ''}` : '✘ la historia se pierde', 'titulo');
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
      const momentos = interrumpe ? cola : cola.splice(0); let mejor = null, top = -Infinity, suyo = null; const otros = [];
      for (const mo of momentos) {
        if (!interrumpe && mo.tipo === 'tras') for (const p of porTras.filter(x => D.historias[x.h].encargo[x.et].tras.some(s => s.escena === mo.escena))) { porTras.splice(porTras.indexOf(p), 1); empezarEncargo(p.h, p.et); }
        for (const e of Object.values(D.escenas)) {
          if (interrumpe && !e.interrumpe) continue;
          if (interrumpe && escena && escena.id.split('.')[0] === e.escena.split('.')[0]) continue;   // (no corta a otra de su misma historia: son maneras de decir lo mismo; espera a que termine)
          if (escenario.omitir?.includes(e.escena)) continue;   // (las que este mundo hace a su manera: en el juego, las charlas del camino)
          const [h, id] = e.escena.split('.'), r = e.repetir || 'una_vez', dicha = get([h, 'dichas', id]);
          if (get(['historia', h]) !== 'en_curso' || (r === 'una_vez' && dicha != null) || (r === 'dia' && dicha === dia())) continue;
          if (!e.se_activa.some(a => coincide(a.activa, mo)) || !cumple(e.si)) continue;
          const o = D.historias[h].orden.findIndex(x => (Array.isArray(x) ? x : [x]).some(y => y.escena === e.escena));
          const s = (o >= 0 ? 1000 - o : 0) + cuenta(e.si);
          if (s > top) { top = s; mejor = e; suyo = mo; }
          otros.push({ e, mo });
        }
      }
      if (!mejor) return false;
      // (una escena por vez: los momentos de las otras que tocaban vuelven a la cola, para cuando esta termine)
      if (!interrumpe) for (const o of otros) if (o.e !== mejor && o.mo !== suyo && !cola.includes(o.mo)) cola.push(o.mo);
      if (interrumpe) cola.splice(cola.indexOf(suyo), 1);
      // (si corta otra escena, esa no sigue: queda dicha, a medias, y no hay «tras» de ella. Una que interrumpe corta
      // también una conversación del mundo —en el juego, una charla del guion de siempre—)
      if (escena) { const id = escena.id; cortar(); set(['escena', 'interrumpio'], id); }
      else if (mejor.interrumpe && mundo.cortar?.()) { nota('✂ se corta una conversación', 'momento'); set(['escena', 'interrumpio'], 'mundo'); }
      else delete S['escena.interrumpio'];
      const [h, id] = mejor.escena.split('.'); set([h, 'dichas', id], dia());
      nota(`🎬 ${id}: ${mejor.resumen}`, 'escena');
      escena = { id: mejor.escena, pila: [[...mejor.cuerpo]], acc: null, en_marcha: !!mejor.en_marcha, participan: [...mejor.hablan], ops: null };
      mundo.escena?.('empieza', escena.id);
      return true;
    }
    // el guion de la escena en curso: lo que sigue hasta una elección de la jugadora, o hasta que la próxima línea tenga
    // que esperar su minuto (o el final)
    // (cada línea, cada silencio, lo dice el mundo: en el juego, una burbuja o una tarjeta; la escena sigue cuando termina)
    function seguirEscena(){
      while (escena && (!escena.acc || mundo.listo(escena.acc))) {
        if (escena.acc) {
          const a = escena.acc; escena.acc = null; mundo.terminar?.(a);
          if (a.nombrar) { set(['nombres', a.nombrar], a.nombre); nota(`✎ Ana le pone nombre: ${a.nombre}`, 'momento'); }
          continue;
        }
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
        const hace = acc => { escena.acc = acc; mundo.empezar(acc); };
        if (it.q) { registro.push({ tipo: 'linea', q: it.q, t: textoDe(it), piensa: !!it.piensa, hora: reloj() }); hace({ decir: { q: it.q, t: textoDe(it), piensa: !!it.piensa } }); if (it.acto) { const d = def(it.acto); for (const e of d.deja || []) aplicar(e); } }
        else if (it.hace && it.hace.e === 'silencio') { registro.push({ tipo: 'silencio', t: it.hace.dura, hora: reloj() }); hace({ silencio: true, dura: aMin(it.hace.dura) }); }
        else if (it.hace && it.hace.e === 'nombrar') hace({ nombrar: it.hace.cosa, pedir: !!it.hace.pedir });
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
      mundo.escena?.('termina', id);
      cola.push({ tipo: 'tras', escena: id });
    }
    // (cortarla: no sigue, ni hay «tras» de ella; la corta otra escena, o el mundo —en el juego, una escena suya—)
    function cortar(){
      const id = escena.id; nota(`✂ se corta ${id.split('.')[1]}`, 'momento');
      if (escena.acc) mundo.cancelar?.(escena.acc);
      escena = null; delete S['escena.interrumpio']; mundo.escena?.('corta', id);
    }

    // ---------------------------------------------------------------- las charlas
    // LO QUE SE DICEN LOS QUE SE ENCUENTRAN (docs/lenguaje/charlas/): cuando dos quedan juntos —el mismo cuadrante, la
    // misma pieza: se ven—, si hay una charla para ellos que se pueda ahora (su «si», cada cuánto se repite), se la
    // dicen. Como una escena, pero de la vida de todos los días, y varias a la vez, cada una con los suyos; se dicen
    // mientras cada uno sigue en lo suyo. Si se separan, se corta. Si habla Ana y la maneja la jugadora, ella elige lo que
    // dice; si no, Ana dice lo suyo (#propia) o algo, al azar.
    const enCharla = q => charlas.some(C => C.quienes.includes(q));
    const juntosTodos = qs => qs.every((a, i) => qs.slice(i + 1).every(b => mundo.funciones?.ve?.(a, b)));
    function puedeCharla(c){
      const [amb, id] = c.charla.split('.'), r = c.repetir || 'una_vez', d = get([amb, 'dichas', id]);
      if ((r === 'una_vez' && d != null) || (r === 'dia' && d === dia())) return false;
      return cumple(c.si);
    }
    // CHARLAR ES UNA ACCIÓN (opera: 'charlar'): la elige la vida de alguien —o la jugadora— como cualquier otra, con su
    // prioridad. Elige qué charla corresponde: con alguien en particular, o con quien esté ahí; los otros tienen que estar
    // disponibles —no charlando ya, no de camino, y en algo que no importe más que esto (no se le habla a quien duerme o
    // está en clase)—. La charla la lleva la tarea de quien la empezó; los otros se detienen a escuchar.
    // (se le puede hablar a alguien si no está en algo callado —durmiendo, rezando—, ni en algo de una historia; a Ana, si
    // la maneja la jugadora, sí: ella decide)
    function callado(q){
      if (get(['controla', q])) return false;
      const T = tareas.find(U => !U.fin && !U.vida && U.quien === q) || tareas.find(U => !U.fin && U.vida && U.quien === q && !U.susp);
      if (!T) return false; if (!T.vida) return true;
      return T.pila.some(F => F.k === 'primitivo' && F.fase === 1 && def(F.ll).callado);
    }
    const disponible = (q, o) => !enCharla(o) && !mundo.funciones?.de_camino?.(o) && mundo.funciones?.ve?.(q, o) && !callado(o);
    // (una charla con roles —alguien, otro—, con las personas en su lugar: en «entre», en las condiciones, en el guion)
    const conRoles = (x, b) => Array.isArray(x) ? x.map(y => conRoles(y, b)) : x && typeof x === 'object' ? (x.rol && b[x.rol] ? b[x.rol] : Object.fromEntries(Object.entries(x).map(([k, v]) => [k, k === 'q' && b[v] ? b[v] : conRoles(v, b)]))) : x;
    // (las maneras de hacer una charla con los que están: cada rol, alguien que esté ahí, disponible, y que pueda —«de»—)
    function maneras(c, q, con){
      const ahi = Object.keys(D.personas).filter(o => o === q || disponible(q, o)), fijos = c.entre.filter(e => typeof e === 'string'), roles = c.entre.filter(e => typeof e === 'object');
      if (!fijos.every(o => ahi.includes(o))) return [];
      let L = [{}];
      for (const r of roles) L = L.flatMap(b => ahi.filter(o => !fijos.includes(o) && !Object.values(b).includes(o) && (!r.de || r.de.includes(o))).map(o => ({ ...b, [r.rol]: o })));
      return L.map(b => roles.length ? { ...conRoles(c, b), charla: c.charla, roles: b } : c).filter(x => x.entre.includes(q) && (!con || x.entre.includes(con)));
    }
    function charlaPara(q, con, prio, sortear = true){   // (sortear: elegir una al azar, por peso; si no, ¿hay alguna?)
      if (!escenario.vidas || !D.charlas || enCharla(q)) return null;
      const cands = Object.values(D.charlas).filter(c => c.charla.startsWith(escenario.vidas + '.')).flatMap(c => maneras(c, q, con)).filter(puedeCharla);
      if (!cands.length) return null; if (!sortear) return cands[0];
      let r = azar() * cands.reduce((n, c) => n + (c.peso ?? 1), 0), c = cands[cands.length - 1];
      for (const x of cands) { r -= x.peso ?? 1; if (r < 0) { c = x; break; } }
      return c;
    }
    function empezarCharla(c, tarea, mientras = false){
      const [amb, id] = c.charla.split('.'); set([amb, 'dichas', id], dia());
      nota(`💬 ${id}: ${c.resumen}${c.roles ? ` (${Object.values(c.roles).map(nombre).join(', ')})` : ''}`, 'charla');
      const C = { n: sigId++, id: c.charla, quienes: [...c.entre], pila: [[...c.cuerpo]], acc: null, ops: null, tarea, ocupa: [], resumen: c.resumen };
      if (!mientras) for (const q of C.quienes) { const a = { quien: q, verbo: 'charlar', dura: 60, charla: true }; mundo.empezar(a); C.ocupa.push(a); }   // (para el mundo: están conversando —si no conversan mientras hacen otra cosa—)
      charlas.push(C); return C.n;
    }
    function terminarCharla(C, cortada){
      for (const a of C.ocupa || []) mundo.cancelar?.(a);
      if (C.acc) mundo.cancelar?.(C.acc);
      set(['charla_fin', C.n], cortada ? 'cortada' : 'dicha'); charlas.splice(charlas.indexOf(C), 1);
    }
    // (cada charla, lo que sigue: hasta una elección de la jugadora, o hasta que la línea que se dice termine; devuelve si
    // alguna espera a la jugadora)
    function seguirCharlas(){
      for (const C of [...charlas]) {
        if (!juntosTodos(C.quienes)) { nota(`✂ se corta la charla ${C.id.split('.')[1]}: se separaron`, 'charla'); terminarCharla(C, true); continue; }
        while (!C.ops && (!C.acc || mundo.listo(C.acc))) {
          if (C.acc) { mundo.terminar?.(C.acc); C.acc = null; continue; }
          const top = C.pila[C.pila.length - 1];
          if (!top) { terminarCharla(C, false); break; }
          if (!top.length) { C.pila.pop(); continue; }
          const it = top[0];
          if (it.op !== undefined) {
            const ops = []; while (top.length && top[0].op !== undefined) ops.push(top.shift());
            if (C.quienes.includes('ana') && get(['controla', 'ana']) && !auto) { C.ops = ops; break; }   // (la jugadora elige)
            // (Ana sola: casi siempre lo suyo —#propia, tres veces más probable—, a veces otra cosa)
            const w = ops.map(o => (o.propia ? 3 : 1)); let r = azar() * w.reduce((a, b) => a + b, 0), i = ops.length - 1; for (let j = 0; j < ops.length; j++) { r -= w[j]; if (r < 0) { i = j; break; } }
            elegirEnCharla(C, ops, i); continue;
          }
          top.shift();
          if (it.q) { registro.push({ tipo: 'linea', q: it.q, t: textoDe(it), piensa: !!it.piensa, hora: reloj(), charla: C.id }); C.acc = { decir: { q: it.q, t: textoDe(it), piensa: !!it.piensa } }; mundo.empezar(C.acc); if (it.acto) for (const e of def(it.acto).deja || []) aplicar(e); }
          else if (it.hace && it.hace.e === 'silencio') { C.acc = { silencio: true, dura: aMin(it.hace.dura) }; mundo.empezar(C.acc); }
          else if (it.hace) aplicar(it.hace);
          else if (it.si) C.pila.push([...(cumple(it.si) ? it.cuerpo : it.sino)]);
        }
      }
      return charlas.some(C => C.ops);
    }
    function elegirEnCharla(C, ops, i){ const op = ops[i]; registro.push({ tipo: 'eleccion', t: op.op, hora: reloj(), charla: C.id }); C.ops = null; C.pila.push([...op.cuerpo]); }

    // ---------------------------------------------------------------- el paso del tiempo
    function responderAuto(q){
      if (respuestas && respuestas.length) return respuestas.shift();
      const r = D.ana_sola[q.acto]; return r === true || (r != null && cumple(sub(r, { params: [q.de] })));
    }
    const enPregunta = () => tareas.find(T => T.id === pregunta);
    // avanza hasta que haya algo que mostrar o decidir (una escena, una pregunta) o hasta el final; devuelve el estado.
    // (escenario.paso: para probar que se puede guardar en cualquier momento, se detiene cada tantas vueltas —pausa—)
    // (tope: en el juego, la hora del juego; el motor no se adelanta a ella)
    let tope = null;
    function avanzar(limite = escenario.paso || 5000){
      // (los encargos de quienes están en una escena que no va en marcha, esperan a que termine)
      const detenida = T => (escena && !escena.en_marcha && escena.participan.includes(T.quien)) || charlas.some(C => C.quienes.includes(T.quien) && C.tarea !== T.id);   // (y los que escuchan una charla: se detienen —la lleva la tarea de quien la empezó—)
      for (let vuelta = 0; vuelta < limite; vuelta++) {
        if (pregunta) return estadoUI();
        if (escena && !escena.ops) seguirEscena();   // (con opciones pendientes, la escena espera a que la jugadora elija)
        if (escena && escena.ops) return estadoUI();
        if (escena && cola.length && elegirEscena(true)) continue;   // (una que interrumpe: no espera)
        revisarHistorias();
        if (fin && tope == null) return estadoUI();   // (al probar, una historia que termina es el final; en el juego, el mundo sigue)
        if (!escena && cola.length && elegirEscena()) continue;
        revisarVidas(); procesar();
        if (seguirCharlas()) return estadoUI();   // (una charla en que la jugadora tiene que elegir qué dice Ana: espera)
        const lista = tareas.filter(T => !T.fin && !T.pregunta && !T.susp && !detenida(T) && ((T.accion && mundo.listo(T.accion)) || (T.hasta ? cumple(T.hasta) || (T.revisa && T.despierta <= t) : T.despierta <= t)));
        if (lista.length) {
          const T = lista[0]; T.hasta = null; T.accion = null;
          const w = correr(T);
          if ('fin' in w) { T.fin = true; if (T.etiqueta) { set(['encargo', T.h, T.etiqueta], w.fin ? 'cumplido' : 'fallido'); mundo.encargo?.('termina', T.quien, T.h + '.' + T.etiqueta); } continue; }
          if (w.min != null) T.despierta = t + w.min;
          else if (w.accion) { T.accion = w.accion; T.despierta = mundo.cuando(w.accion); }
          else if (w.hasta) T.hasta = w.hasta;
          T.revisa = conMejores(T);   // (algo más importante puede volverse posible: se mira cada tanto)
          if (T.revisa) T.despierta = Math.min(w.hasta ? Infinity : T.despierta ?? Infinity, t + REVISAR);
          else if (w.pregunta) {
            if (auto || (respuestas && respuestas.length)) { T.valor = responderAuto(w.pregunta); T.despierta = t; }
            else { T.pregunta = w.pregunta; pregunta = T.id; }
          }
          continue;
        }
        const prox = tareas.filter(T => !T.fin && !T.pregunta && !T.susp && (!T.hasta || T.revisa) && !detenida(T)).map(T => T.despierta);
        if (escena && escena.acc) prox.push(mundo.cuando(escena.acc));
        for (const C of charlas) if (C.acc) prox.push(mundo.cuando(C.acc));
        if (PROCESOS().length) prox.push(proxProceso());
        const prox1 = prox.length ? Math.min(...prox) : Infinity;
        if (tope != null && prox1 > tope) { t = Math.max(t, tope); return estadoUI(); }   // (lo que sigue es más tarde que la hora del juego)
        if (!prox.length) return estadoUI();   // (nada más que hacer: esperan algo que no va a pasar solo)
        t = Math.max(t, prox1);
      }
      if (escenario.paso) return { ...estadoUI(), pausa: true };
      throw new Error('el motor no avanza (¿un ciclo?)');
    }
    function estadoUI(){
      const P = enPregunta();
      return { escena: escena && { id: escena.id, resumen: D.escenas[escena.id].resumen, ops: escena.ops?.map(o => o.op) },
        pregunta: P && { de: nombre(P.pregunta.de), si: P.pregunta.si, no: P.pregunta.no }, fin, reloj: reloj(),
        charla: (C => C && { id: C.id, quienes: C.quienes, resumen: C.resumen, ops: C.ops.map(o => o.op) })(charlas.find(C => C.ops)) };
    }

    // ---------------------------------------------------------------- el comienzo: un escenario, o una partida guardada
    // (lo que trae el mundo —el simulado: el día de White Sands—, y encima lo del escenario: lugares y estado; null borra)
    if (guardado) ({ S, registro, tareas, cola, porTras, escena, pregunta, fin, sigId, t, respuestas, charlas = [] } = guardado);
    else {
      const ini = Mundo.inicio || {};
      for (const [x, l] of Object.entries({ ...(ini.lugares || {}), ...((escenario.vidas && D.inicio?.[escenario.vidas]) || {}), ...(escenario.lugares || {}) })) set(['mundo', x, 'lugar'], l);   // (y si hay vidas, donde empieza cada uno: inicioDe)
      for (const [c, v] of Object.entries({ ...(ini.estado || {}), ...(escenario.estado || {}) })) if (v === null) delete S[c]; else set(c.split('.'), v);
      // (las vidas de ese lugar —escenario.vidas: 'tejas_verdes'—: cada uno, su día; y donde duerme cada uno, si el escenario no dice)
      for (const [q, ll] of Object.entries((escenario.vidas && D.vidas?.[escenario.vidas]) || {})) tareas.push({ id: sigId++, pila: [marco(ll, {})], despierta: t, quien: q, vida: ll });
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
      // la jugadora maneja a alguien (Ana): su vida se suspende; al soltarla, vuelve a la suya
      controlar(q, si = true){ if (si) set(['controla', q], 1); else delete S[k(['controla', q])]; nota(si ? `(la jugadora maneja a ${nombre(q)})` : `(la jugadora suelta a ${nombre(q)})`); return avanzar(); },
      haciendo,
      // la jugadora elige lo que dice Ana en una charla (la que espera: estado().charla)
      elegirCharla(i){ const C = charlas.find(x => x.ops); if (C) elegirEnCharla(C, C.ops, i); return avanzar(); },
      charlas: () => charlas.map(C => ({ id: C.id, quienes: [...C.quienes] })),
      // los recados que tiene alguien: de quién, qué, hasta qué hora
      recados: q => revisarRecados(q).map(r => ({ ...r })),
      // lo que la jugadora hace por su cuenta (cuando no hay escena ni pregunta)
      irA(l){ nota(`(la jugadora: Ana va hasta ${nombre(l)})`); nuevaTarea({ verbo: 'ir_a', args: ['ana', l] }, {}); return avanzar(); },
      bajarse(){ nota('(la jugadora: Ana se baja de la calesa)'); instantaneo({ verbo: 'bajar', args: ['ana'] }); return avanzar(); },
      // cualquier verbo, de cualquiera (para probarlo: la consola del mundo mínimo, tools/mundo/consola.js)
      hacer(verbo, args){ if (!D.verbos[verbo]) throw new Error('el lenguaje no tiene el verbo «' + verbo + '»'); nota(`(se pide: ${verbo}(${args.join(', ')}))`); nuevaTarea({ verbo, args }, {}); return avanzar(); },
      esperar(m){ t += m; return avanzar(); },
      // en el juego: lo que toca hasta la hora del juego (en minutos desde el comienzo del día 1), y no más
      alTiempo(m){ if (tope == null) t = m; tope = m; return avanzar(); },   // (la primera vez, la hora es la del juego)
      // en el juego: el mundo cortó la escena en curso (una escena suya, más importante)
      cortarEscena(){ if (escena) cortar(); return avanzar(); },
      estado: () => estadoUI(),
      // quiénes tienen un encargo de una historia en curso (en el juego: están ocupados; su rutina espera)
      ocupados: () => [...new Set(tareas.filter(T => !T.fin && T.etiqueta).map(T => T.quien))],
      // el mundo avisa: alguien llegó a un lugar, o pasó por él (en el juego, cada vez que cambia el lugar de alguien);
      // con «ya_estaba», sin momento: es dónde estaba al empezar, no que haya llegado
      llega(q, a, ya_estaba){ if (ya_estaba) set(['mundo', q, 'lugar'], a); else llega(q, a); },
      // el mundo dice cómo está lo que es suyo (en qué va cada uno, la calesa lista, el afecto, un estado del juego); null lo borra
      vale(camino, v){ if (v == null) delete S[k(camino)]; else if (get(camino) !== v) set(camino, v); },
      // la partida entera, como datos (JSON): se vuelve a cargar con Motor.cargar
      guardar: () => JSON.stringify({ v: 1, escenario, S, registro, tareas, cola, porTras, escena, pregunta, fin, sigId, t, respuestas, charlas }),
      registro, get, nombre, lugares: () => Object.keys(D.lugares),
      encargos: () => Object.entries(D.historias).flatMap(([h, H]) => Object.keys(H.encargo).map(et => ({ historia: h, etiqueta: et, estado: get(['encargo', h, et]) }))),
      resumen: () => ({ reloj: reloj(), estado: get(['estado', 'ana_en_tv']), paciencia: get(['cualidad', 'marilla', 'paciencia', 'ana']),
        afecto: get(['cualidad', 'marilla', 'afecto', 'ana']), lugares: Object.fromEntries([...Object.keys(D.personas), ...Object.keys(D.medios)].map(p => [p, get(['mundo', p, 'lugar'])])),
        en: Object.fromEntries(Object.keys(D.personas).map(p => [p, get(['mundo', p, 'en'])]).filter(([, v]) => v !== 'nada')),
        hechos: Object.entries(S).filter(([c]) => /\.(hechos|dichas)\./.test(c)).map(([c]) => c) }),
    };
  }
  // una partida guardada (lo que devolvió guardar()), con los mismos datos y el mismo mundo
  // (cambios: lo que cambió del escenario desde que se guardó —en el juego, las historias que ya pasaron al lenguaje—)
  Motor.cargar = (D, json, Mundo = null, cambios = {}) => { const g = JSON.parse(json); return Motor(D, { ...g.escenario, ...cambios }, Mundo, g); };
  if (typeof module !== 'undefined' && module.exports) module.exports = { Motor };
  else raiz.Motor = Motor;
})(this);
