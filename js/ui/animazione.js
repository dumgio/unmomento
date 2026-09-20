// La «vista dall'alto» disegnata su un canvas: si sale dalla stanza fino allo spazio e si torna giù.
// u è il livello (da 0 a 5): 0 stanza, 1 casa e strada, 2 città, 3 paese e mare, 4 la Terra, 5 lo spazio.

const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
const liscia = (x) => { const t = clamp(x); return t * t * (3 - 2 * t); };
const mescola = (a, b, t) => a + (b - a) * t;
const casuale = (i, j) => { const x = Math.sin(i * 127.1 + j * 311.7) * 43758.5453; return x - Math.floor(x); };

function colore(da, a, t) {
  const c = da.map((v, k) => Math.round(mescola(v, a[k], t)));
  return `rgb(${c[0]},${c[1]},${c[2]})`;
}

function sfondo(ctx, w, h, u) {
  const t = liscia((u - 2.6) / 2.2);
  const g = ctx.createLinearGradient(0, 0, 0, h);
  g.addColorStop(0, colore([239, 233, 219], [12, 22, 40], t));
  g.addColorStop(1, colore([226, 216, 194], [22, 36, 62], t));
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, w, h);
  const stelle = liscia((u - 3.4) / 1.4);
  if (stelle > 0) {
    ctx.fillStyle = `rgba(255,255,255,${(0.85 * stelle).toFixed(3)})`;
    for (let i = 0; i < 70; i += 1) {
      const r = 0.6 + casuale(i, 3) * 1.4;
      ctx.beginPath();
      ctx.arc(casuale(i, 1) * w, casuale(i, 2) * h, r, 0, Math.PI * 2);
      ctx.fill();
    }
  }
}

// Il punto che rappresenta chi guarda: resta al centro di ogni livello.
function tu(ctx, raggio = 0.045) {
  ctx.fillStyle = '#E8845F';
  ctx.beginPath(); ctx.arc(0, 0, raggio, 0, Math.PI * 2); ctx.fill();
  ctx.strokeStyle = 'rgba(232,132,95,.35)'; ctx.lineWidth = 0.012;
  ctx.beginPath(); ctx.arc(0, 0, raggio * 2, 0, Math.PI * 2); ctx.stroke();
}

function stanza(ctx) {
  ctx.fillStyle = '#F6F1E6'; ctx.strokeStyle = '#35494C'; ctx.lineWidth = 0.03;
  ctx.beginPath(); ctx.roundRect(-0.85, -0.6, 1.7, 1.2, 0.06); ctx.fill(); ctx.stroke();
  ctx.fillStyle = '#D8CDB4';
  ctx.fillRect(-0.7, -0.45, 0.5, 0.3);            // letto
  ctx.fillRect(0.35, -0.45, 0.32, 0.2);           // scrivania
  ctx.fillStyle = '#B9CBD6'; ctx.fillRect(-0.3, -0.62, 0.6, 0.05); // finestra
  tu(ctx);
}

function casa(ctx) {
  ctx.fillStyle = '#B7B0A0'; ctx.fillRect(-1.5, -0.12, 3, 0.24); ctx.fillRect(-0.12, -1.5, 0.24, 3); // strade
  for (let i = -2; i <= 2; i += 1) {
    for (let j = -2; j <= 2; j += 1) {
      if (i === 0 || j === 0) continue;
      const x = i * 0.62 - Math.sign(i) * 0.12, y = j * 0.5 - Math.sign(j) * 0.1;
      ctx.fillStyle = casuale(i, j) > 0.5 ? '#C9745A' : '#9C6B58';
      ctx.fillRect(x - 0.2, y - 0.16, 0.4, 0.32);
      ctx.strokeStyle = 'rgba(0,0,0,.25)'; ctx.lineWidth = 0.012;
      ctx.beginPath(); ctx.moveTo(x - 0.2, y); ctx.lineTo(x + 0.2, y); ctx.stroke();
    }
  }
  ctx.fillStyle = '#AD5537'; ctx.fillRect(-0.34, -0.2, 0.22, 0.16);
  tu(ctx, 0.04);
}

function citta(ctx) {
  ctx.fillStyle = '#9A9482'; ctx.fillRect(-1.6, -1.6, 3.2, 3.2);
  for (let i = -6; i <= 6; i += 1) {
    for (let j = -6; j <= 6; j += 1) {
      const x = i * 0.26, y = j * 0.26;
      ctx.fillStyle = casuale(i, j) > 0.3 ? '#D8CDB4' : '#B7C4A8';
      ctx.fillRect(x - 0.1, y - 0.1, 0.2, 0.2);
      if (casuale(j, i) > 0.7) { ctx.fillStyle = '#F2C46B'; ctx.fillRect(x - 0.02, y - 0.02, 0.04, 0.04); }
    }
  }
  tu(ctx, 0.05);
}

function paese(ctx) {
  ctx.fillStyle = '#5E8FB4'; ctx.fillRect(-1.6, -1.6, 3.2, 3.2);
  ctx.fillStyle = '#9DB08A';
  ctx.beginPath();
  for (let a = 0; a <= 64; a += 1) {
    const th = (a / 64) * Math.PI * 2;
    const r = 0.95 + 0.14 * Math.sin(th * 3 + 1) + 0.08 * Math.sin(th * 7) + 0.05 * Math.sin(th * 13 + 2);
    const x = Math.cos(th) * r * 1.15, y = Math.sin(th) * r * 0.85;
    if (a === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
  }
  ctx.closePath(); ctx.fill();
  ctx.fillStyle = '#7C8F6E';
  for (let i = 0; i < 9; i += 1) {
    const x = (casuale(i, 5) - 0.5) * 1.6, y = (casuale(i, 6) - 0.5) * 1.0;
    ctx.beginPath(); ctx.moveTo(x - 0.1, y + 0.08); ctx.lineTo(x, y - 0.1); ctx.lineTo(x + 0.1, y + 0.08); ctx.closePath(); ctx.fill();
  }
  ctx.fillStyle = '#F2C46B';
  for (let i = 0; i < 6; i += 1) { ctx.beginPath(); ctx.arc((casuale(i, 8) - 0.5) * 1.5, (casuale(i, 9) - 0.5) * 0.9, 0.02, 0, Math.PI * 2); ctx.fill(); }
  tu(ctx, 0.045);
}

function terra(ctx) {
  const alone = ctx.createRadialGradient(0, 0, 0.7, 0, 0, 1.05);
  alone.addColorStop(0, 'rgba(120,180,255,.55)'); alone.addColorStop(1, 'rgba(120,180,255,0)');
  ctx.fillStyle = alone; ctx.beginPath(); ctx.arc(0, 0, 1.05, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#2F5D8A'; ctx.beginPath(); ctx.arc(0, 0, 0.78, 0, Math.PI * 2); ctx.fill();
  ctx.save(); ctx.beginPath(); ctx.arc(0, 0, 0.78, 0, Math.PI * 2); ctx.clip();
  ctx.fillStyle = '#6E9A6A';
  [[-0.25, -0.2, 0.32, 0.22], [0.3, 0.15, 0.26, 0.3], [-0.1, 0.4, 0.2, 0.14], [0.35, -0.4, 0.15, 0.1]].forEach(([x, y, rx, ry]) => {
    ctx.beginPath(); ctx.ellipse(x, y, rx, ry, 0.5, 0, Math.PI * 2); ctx.fill();
  });
  ctx.strokeStyle = 'rgba(255,255,255,.5)'; ctx.lineWidth = 0.04; ctx.lineCap = 'round';
  [[-0.5, 0.1, 0.3], [0.05, -0.5, 0.35], [0.3, 0.55, 0.3]].forEach(([x, y, l]) => { ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + l, y + 0.05); ctx.stroke(); });
  ctx.restore();
  tu(ctx, 0.03);
}

function spazio(ctx) {
  const alone = ctx.createRadialGradient(0, 0, 0, 0, 0, 0.5);
  alone.addColorStop(0, 'rgba(150,190,255,.45)'); alone.addColorStop(1, 'rgba(150,190,255,0)');
  ctx.fillStyle = alone; ctx.beginPath(); ctx.arc(0, 0, 0.5, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#7FB0E6'; ctx.beginPath(); ctx.arc(0, 0, 0.055, 0, Math.PI * 2); ctx.fill();
}

const LIVELLI = [stanza, casa, citta, paese, terra, spazio];

export function disegnaVista(ctx, w, h, u) {
  sfondo(ctx, w, h, u);
  const unit = Math.min(w, h) / 2;
  LIVELLI.forEach((livello, i) => {
    const alpha = liscia(1 - Math.abs(u - i) * 1.15);
    if (alpha <= 0.01) return;
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.translate(w / 2, h / 2);
    const s = 4 ** (i - u) * unit;
    ctx.scale(s, s);
    livello(ctx);
    ctx.restore();
  });
}

// Livello (0-5) al tempo t, dato il piano della meditazione. Ogni segmento va da livello[0] a livello[1].
export function livelloAl(piano, t) {
  const seg = piano.find((x) => t >= x.inizio && t < x.fine) || piano[piano.length - 1];
  if (!seg.livello) return 0;
  const frac = clamp((t - seg.inizio) / (seg.fine - seg.inizio));
  return mescola(seg.livello[0], seg.livello[1], liscia(frac));
}
