// Las mini-misiones (src/datos/misiones.txt), partidas como las lee el juego (src/js/20-misiones.js): lo de cada una
// va al guion, a las conversaciones o al cuaderno, para que el grafo (tools/grafo.js) y el modelo (tools/modelo.js) las
// revisen con todo lo demás. textos(raiz) da los tres textos de una copia del repositorio (esta, o una con más cosas).
const fs = require('fs'), path = require('path'), vm = require('vm');
const RAIZ = path.join(__dirname, '..');
function leer(raiz = RAIZ){
  const f = path.join(raiz, 'src/datos/misiones.txt'); if (!fs.existsSync(f)) return { lista: [], guion: '', conversaciones: '', cuaderno: '' };
  const codigo = fs.readFileSync(path.join(raiz, 'src/js/20-misiones.js'), 'utf8').replace(/^const MISIONES = .*$/m, '');   // (the game's own reader)
  const ctx = { document: { getElementById: () => null } }; vm.runInNewContext(codigo + '\nthis.misionesLeer = misionesLeer;', ctx);
  return ctx.misionesLeer(fs.readFileSync(f, 'utf8'));
}
// what each data file is, with the missions' parts added (the cuaderno's in a group of their own, as in the game)
function textos(raiz = RAIZ){
  const M = leer(raiz), t = r => fs.readFileSync(path.join(raiz, r), 'utf8');
  return { 'src/datos/guion.txt': t('src/datos/guion.txt') + '\n' + M.guion, 'src/datos/conversaciones.txt': t('src/datos/conversaciones.txt') + '\n' + M.conversaciones,
    'src/datos/cuaderno.txt': t('src/datos/cuaderno.txt') + (M.cuaderno.trim() ? '\n== Misiones\n' + M.cuaderno : '') };
}
module.exports = { leer, textos };
