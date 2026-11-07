// La huella de lo que define la geografía del mundo mínimo (tools/mundo/geografia.json): el mapa, los caminos largos,
// los lugares del planificador y los del lenguaje. Si cambia, hay que exportar de nuevo (tools/mundo/exportar.js).
const fs = require('fs'), path = require('path'), crypto = require('crypto');
const RAIZ = path.resolve(__dirname, '..', '..');
const FUENTES = ['src/mapas/avonlea.tmj', 'src/js/02-mapa-avonlea.js', 'src/js/03-corrales-y-campos.js', 'src/js/17-camino-bright-river.js', 'src/js/58-fichas-y-planificador.js', 'docs/lenguaje/comun/mundo.ts'];
const huella = () => crypto.createHash('sha1').update(FUENTES.map(f => fs.readFileSync(path.join(RAIZ, f))).join('\n')).digest('hex').slice(0, 12);
module.exports = { huella };
