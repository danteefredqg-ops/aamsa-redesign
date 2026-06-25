// AAMSA — interacciones compartidas
document.addEventListener('DOMContentLoaded', () => {

  // Menú móvil
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('nav.primary');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      nav.classList.toggle('open');
      toggle.textContent = nav.classList.contains('open') ? '✕' : '☰';
    });
    nav.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        nav.classList.remove('open');
        toggle.textContent = '☰';
      });
    });
  }

  // Revelado al hacer scroll
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('in'));
  }

  // Header: sombra al hacer scroll
  const header = document.querySelector('header.site');
  if (header) {
    window.addEventListener('scroll', () => {
      header.style.boxShadow = window.scrollY > 10 ? '0 8px 20px rgba(0,0,0,.35)' : 'none';
    });
  }

  // Formulario de cotización → mailto
  document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      const nombre  = form.querySelector('[type="text"]')?.value.trim()  || '';
      const correo  = form.querySelector('[type="email"]')?.value.trim() || '';
      const tel     = form.querySelector('[type="tel"]')?.value.trim()   || '';
      const asunto  = form.querySelectorAll('[type="text"]')[1]?.value.trim() || '';
      const mensaje = form.querySelector('textarea')?.value.trim()       || '';

      const cuerpo =
        `Nombre: ${nombre}\n` +
        `Correo: ${correo}\n` +
        `Teléfono: ${tel}\n\n` +
        `Mensaje:\n${mensaje}`;

      const asuntoFinal = asunto || 'Solicitud de cotización — AAMSA';

      window.location.href =
        'mailto:ventas@aamsa.com' +
        '?subject=' + encodeURIComponent(asuntoFinal) +
        '&body='    + encodeURIComponent(cuerpo);
    });
  });
});
