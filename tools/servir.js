// Serves the game on your own computer, so it can be played on it and on a phone in the same Wi-Fi, with the two
// headers that the browser asks for before it lets the game use threads (Z3, the logic solver, in the browser):
//   Cross-Origin-Opener-Policy: same-origin · Cross-Origin-Embedder-Policy: require-corp
// The browser only gives threads to a "secure" page: on the computer itself, http://localhost is enough; from the
// phone it has to be https. So:
//   node tools/servir.js                 → http://localhost:8000 (the computer) and http://<your ip>:8000 (the phone, without threads)
//   node tools/servir.js --crear-cert    → makes a certificate of its own for your ip (once; needs openssl), in tools/cert/
//   node tools/servir.js --https         → https://<your ip>:8443 (the phone, with threads: the first time it warns that
//                                           the certificate is not known; «Advanced → continue» and it is remembered)
// No packages to install: only Node. Ctrl+C to stop it.
const http = require('http'), https = require('https'), fs = require('fs'), path = require('path'), os = require('os'), { execFileSync } = require('child_process');
const RAIZ = path.join(__dirname, '..'), CERT = path.join(__dirname, 'cert'), arg = process.argv.slice(2);
const ips = () => Object.values(os.networkInterfaces()).flat().filter(i => i && i.family === 'IPv4' && !i.internal).map(i => i.address);
if (arg.includes('--crear-cert')) {
  fs.mkdirSync(CERT, { recursive: true });
  const san = ['DNS:localhost', 'IP:127.0.0.1', ...ips().map(ip => 'IP:' + ip)].join(',');
  execFileSync('openssl', ['req', '-x509', '-newkey', 'rsa:2048', '-nodes', '-days', '825', '-subj', '/CN=Avonlea local', '-addext', 'subjectAltName=' + san,
    '-keyout', path.join(CERT, 'clave.pem'), '-out', path.join(CERT, 'cert.pem')], { stdio: 'inherit' });
  console.log('Certificado listo en tools/cert/ (para ' + san + '). Ahora: node tools/servir.js --https');
  process.exit(0);
}
const TIPOS = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.mjs': 'text/javascript; charset=utf-8', '.json': 'application/json; charset=utf-8',
  '.wasm': 'application/wasm', '.css': 'text/css; charset=utf-8', '.png': 'image/png', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml', '.pdf': 'application/pdf', '.md': 'text/plain; charset=utf-8', '.txt': 'text/plain; charset=utf-8' };
function atender(q, r){
  let f = path.normalize(path.join(RAIZ, decodeURIComponent(q.url.split('?')[0])));
  if (!f.startsWith(RAIZ)) { r.writeHead(403); return r.end(); }   // (nothing outside the game's folder)
  if (fs.existsSync(f) && fs.statSync(f).isDirectory()) f = path.join(f, 'index.html');
  if (!fs.existsSync(f)) { r.writeHead(404); return r.end('No está: ' + q.url); }
  r.writeHead(200, { 'Content-Type': TIPOS[path.extname(f)] || 'application/octet-stream', 'Cross-Origin-Opener-Policy': 'same-origin', 'Cross-Origin-Embedder-Policy': 'require-corp', 'Cross-Origin-Resource-Policy': 'same-origin', 'Cache-Control': 'no-cache' });
  fs.createReadStream(f).pipe(r);
}
if (arg.includes('--https')) {
  if (!fs.existsSync(path.join(CERT, 'cert.pem'))) { console.log('Primero: node tools/servir.js --crear-cert'); process.exit(1); }
  const port = +(arg[arg.indexOf('--puerto') + 1]) || 8443;
  https.createServer({ key: fs.readFileSync(path.join(CERT, 'clave.pem')), cert: fs.readFileSync(path.join(CERT, 'cert.pem')) }, atender).listen(port, () => {
    console.log('Avonlea, con https:'); for (const ip of ['localhost', ...ips()]) console.log('  https://' + ip + ':' + port + '/');
    console.log('(la primera vez el navegador avisa que el certificado no es conocido: «Avanzado → continuar»)'); });
} else {
  const port = +(arg[arg.indexOf('--puerto') + 1]) || 8000;
  http.createServer(atender).listen(port, () => {
    console.log('Avonlea:'); console.log('  en este computador: http://localhost:' + port + '/');
    for (const ip of ips()) console.log('  en el celular (misma Wi-Fi): http://' + ip + ':' + port + '/   (sin hilos: para la IA con Z3, usar --https)'); });
}
