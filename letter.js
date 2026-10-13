/* 1) every Next button appears the moment its page opens
   2) letter page: envelope waits in the middle, opens on tap */
(function(){
  const _show = showPage;
  showPage = function(id){
    _show(id);
    if (id !== 'letter') document.querySelectorAll('#' + id + ' .btn').forEach(b => b.classList.add('show'));
  };

  let built = false;
  hooks.letter = function(){
    if (built) return;
    built = true;
    const env = document.getElementById('envelope');
    const paper = document.getElementById('paper');
    const box = document.getElementById('lines');

    document.getElementById('dear').textContent = 'Dear ' + HER_NAME + ',';
    box.innerHTML = '';
    LETTER_TEXT.split('\n').map(s => s.trim()).filter(Boolean).forEach(t => {
      const p = document.createElement('p');
      p.textContent = t;
      box.appendChild(p);
    });

    const tap = document.createElement('p');
    tap.className = 'gift-tap';
    tap.textContent = 'tap to open';
    document.querySelector('#letter .stage').after(tap);

    let opened = false;
    env.addEventListener('click', function(){
      if (opened) return;
      opened = true;
      document.getElementById('next2').classList.add('show');
      try { if (navigator.vibrate) navigator.vibrate(30); } catch (_) {}
      tap.style.opacity = 0;
      env.classList.add('open');                                      // flap opens, sheet rises
      setTimeout(() => env.classList.add('gone'), 1300);              // envelope fades away
      setTimeout(() => paper.classList.add('present'), 1500);         // letter takes its place
      setTimeout(() => paper.classList.add('show'), 1560);
      [...box.children].forEach((p, i) =>
        setTimeout(() => p.classList.add('in'), 2300 + i * 900));     // lines fade in
    });
  };
})();
