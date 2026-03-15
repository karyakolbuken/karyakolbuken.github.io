const TOTAL = 12; // spread 0–11
let current = 0;
let animating = false;
let lang = 'tr';

// ── DOTS ──
const dotsEl = document.getElementById('dots');
for (let i = 0; i < TOTAL; i++) {
  const d = document.createElement('div');
  d.className = 'page-dot' + (i === 0 ? ' active' : '');
  d.onclick = () => goToSpread(i);
  dotsEl.appendChild(d);
}

function updateDots() {
  document.querySelectorAll('.page-dot').forEach((d, i) => {
    d.classList.toggle('active', i === current);
  });
}

function updateArrows() {
  document.getElementById('prevBtn').disabled = current === 0;
  document.getElementById('nextBtn').disabled = current === TOTAL - 1;
}

// ── SPREAD NAVİGASYON ──
function showSpread(idx, direction) {
  if (animating) return;
  if (idx < 0 || idx >= TOTAL || idx === current) return;
  animating = true;

  const outEl = document.getElementById('spread-' + current);
  const inEl  = document.getElementById('spread-' + idx);

  const outClass = direction === 'fwd' ? 'flip-out-fwd' : 'flip-out-back';
  const inClass  = direction === 'fwd' ? 'flip-in-fwd'  : 'flip-in-back';

  outEl.classList.add(outClass);

  setTimeout(() => {
    outEl.classList.remove('active', outClass);
    inEl.classList.add('active', inClass);
    setTimeout(() => {
      inEl.classList.remove(inClass);
      animating = false;
    }, 380);
  }, 340);

  current = idx;
  updateDots();
  updateArrows();
}

function nextSpread() { showSpread(current + 1, 'fwd'); }
function prevSpread() { showSpread(current - 1, 'back'); }
function goToSpread(idx) {
  const dir = idx > current ? 'fwd' : 'back';
  showSpread(idx, dir);
}

// ── KLAVYE ──
document.addEventListener('keydown', e => {
  if (e.key === 'ArrowRight') nextSpread();
  if (e.key === 'ArrowLeft')  prevSpread();
});

// ── DİL DEĞİŞTİRME ──
function setLang(l) {
  lang = l;
  document.querySelectorAll('.lang-btn').forEach(b => {
    b.classList.toggle('active', b.textContent === l.toUpperCase());
  });

  document.querySelectorAll('[data-tr]').forEach(el => {
    const val = el.getAttribute('data-' + l);
    if (val !== null) {
      if (el.tagName === 'INPUT') el.placeholder = val;
      else el.innerHTML = val;
    }
  });

  document.documentElement.lang = l;
}