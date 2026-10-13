(function(){
  const _show = showPage;
  showPage = function(id){
    _show(id);
    const el = document.getElementById(id);
    if (el) el.scrollTop = 0;
  };
})();
