/* Page 4: tap the gift box. Text comes from gift.txt (line 1 = title, rest = message) */
(function(){
  function pop(box){
    const r = box.getBoundingClientRect();
    const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
    for (let i = 0; i < 26; i++){
      const h = document.createElement('span');
      const a = Math.random() * Math.PI * 2, d = 80 + Math.random() * 150;
      h.className = 'confetti';
      h.textContent = Math.random() > .5 ? '♥' : '💗';
      h.style.cssText = `left:${cx}px;top:${cy}px;font-size:${12 + Math.random() * 14}px;` +
        `--dx:${Math.cos(a) * d}px;--dy:${Math.sin(a) * d - 40}px`;
      h.addEventListener('animationend', () => h.remove());
      document.body.appendChild(h);
    }
  }

  // tap handler first, so nothing else can break it
  document.addEventListener('click', function(e){
    const box = e.target.closest && e.target.closest('#giftbox');
    if (!box || box.classList.contains('open')) return;
    box.classList.add('open');
    const tap = document.getElementById('gifttap');
    if (tap) tap.style.opacity = 0;
    try { if (navigator.vibrate) navigator.vibrate(30); } catch (_) {}
    try { pop(box); } catch (_) {}
    try { if (typeof setHeartRate === 'function') setHeartRate(250); } catch (_) {}
    setTimeout(function(){
      const rev = document.getElementById('giftreveal');
      if (rev) rev.classList.add('show');
    }, 550);
  });

  // load the text (falls back to defaults if gift.txt is missing)
  let title = 'Happy Birthday 🎂', text = 'Your gift reveal message goes here.';
  fetch('gift.txt', { cache: 'no-store' })
    .then(r => r.ok ? r.text() : Promise.reject())
    .then(t => {
      const parts = t.trim().split('\n');
      title = parts.shift().trim();
      text = parts.join('\n').trim();
    })
    .catch(() => {})
    .then(() => {
      const a = document.getElementById('gifttitle'), b = document.getElementById('giftmsg');
      if (a) a.textContent = title;
      if (b) b.textContent = text;
    });
})();
