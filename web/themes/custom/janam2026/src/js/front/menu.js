function toggleMenu() {
  var links = document.getElementById('navLinks');
  var btn = document.getElementById('navHamburger');
  if (links) links.classList.toggle('open');
  if (btn) btn.classList.toggle('open');
}
function closeMenu() {
  var links = document.getElementById('navLinks');
  var btn = document.getElementById('navHamburger');
  if (links) links.classList.remove('open');
  if (btn) btn.classList.remove('open');
}

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
