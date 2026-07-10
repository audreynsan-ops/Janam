/*function toggleMenu() {
  var links = document.getElementById('navLinks');
  var btn = document.getElementById('navHamburger');
  links.classList.toggle('open');
  btn.classList.toggle('open');
}
function closeMenu() {
  document.getElementById('navLinks').classList.remove('open');
  document.getElementById('navHamburger').classList.remove('open');
}

// Active link on scroll
(function() {
  var sections = ['origines','soins','programme','bebe','tarif','faq'];
  var links = document.querySelectorAll('.nav-link');
  function onScroll() {
    var scrollY = window.scrollY + 90;
    var current = '';
    sections.forEach(function(id) {
      var el = document.getElementById(id);
      if (el && el.offsetTop <= scrollY) current = id;
    });
    links.forEach(function(l) {
      l.classList.toggle('active', l.getAttribute('href') === '#' + current);
    });
  }
  window.addEventListener('scroll', onScroll, {passive: true});
})();*/



document.addEventListener("DOMContentLoaded", function() {
  // FAQ accordion
  document.querySelectorAll('.faq-q').forEach(function(q) {
    q.addEventListener('click', function(e) {
      e.preventDefault();
      (this.closest('.faq-item') || this.parentNode).classList.toggle('open');
    });
    q.addEventListener('keydown', function(e) {
      if(e.key==='Enter'||e.key===' '){e.preventDefault();(this.closest('.faq-item')||this.parentNode).classList.toggle('open');}
    });
  });

  // Modal
  window.ouvrirModal = function() {
    var m = document.getElementById('modalListeAttente');
    if(m) { m.classList.add('open'); document.body.style.overflow='hidden'; }
  };
  window.fermerModal = function() {
    var m = document.getElementById('modalListeAttente');
    if(m) { m.classList.remove('open'); document.body.style.overflow=''; }
    setTimeout(function() {
      var f=document.getElementById('modalForm');
      var s=document.getElementById('modalSuccess');
      if(f) f.style.display='block';
      if(s) s.style.display='none';
    }, 300);
  };
  window.soumettreFormulaire = function(e) {
    e.preventDefault();
    var f=document.getElementById('modalForm');
    var s=document.getElementById('modalSuccess');
    if(f) f.style.display='none';
    if(s) s.style.display='block';
  };

  document.addEventListener('keydown', function(e) {
    if(e.key==='Escape') fermerModal();
  });
  var overlay = document.getElementById('modalListeAttente');
  if(overlay) overlay.addEventListener('click', function(e) {
    if(e.target===this) fermerModal();
  });

  // Active nav link on scroll
  var sectionIds = ['origines','soins','programme','bebe','tarif','faq'];
  var navLinks = document.querySelectorAll('.nav-link');
  function onScroll() {
    var scrollY = window.scrollY + 90;
    var current = '';
    sectionIds.forEach(function(id) {
      var el = document.getElementById(id);
      if (el && el.offsetTop <= scrollY) current = id;
    });
    navLinks.forEach(function(l) {
      l.classList.toggle('active', l.getAttribute('href') === '#' + current);
    });
  }
  window.addEventListener('scroll', onScroll, {passive: true});
});


