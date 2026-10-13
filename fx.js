/* Message page effects: splits the text into words, adds sparkles */
(function(){
  const prev = hooks.unlock;
  hooks.unlock = function(){ if (prev) prev(); runMsgFx(); };

  function runMsgFx(){
    const h1 = document.querySelector('#unlock h1');
    const card = document.querySelector('.msg-card');
    if (!h1 || h1.dataset.fx) return;
    h1.dataset.fx = 1;

    // words (plain text) vs emoji get different effects
    const words = h1.textContent.trim().split(/\s+/);
    h1.textContent = '';
    words.forEach((t, i) => {
      const s = document.createElement('span');
      s.className = /^[\x00-\x7F]+$/.test(t) ? 'w' : 'e';
      s.textContent = t;
      s.style.setProperty('--i', i);
      h1.appendChild(s);
      if (i < words.length - 1) h1.appendChild(document.createTextNode(' '));
    });

    // twinkling sparkles around the card (x%, y%, delay s)
    [[-3,12,0],[97,20,.6],[6,93,1.1],[92,86,.3],[50,-5,1.5],[-4,55,.9],[98,58,1.8]].forEach(p => {
      const sp = document.createElement('i');
      sp.className = 'sp'; sp.textContent = '✦';
      sp.style.cssText = `left:${p[0]}%;top:${p[1]}%;animation-delay:${p[2]}s;font-size:${10 + (p[2]*4|0)}px`;
      card.appendChild(sp);
    });

    h1.classList.add('go');
    setTimeout(() => card.classList.add('done'), 500 + words.length * 280 + 900);
  }
})();
