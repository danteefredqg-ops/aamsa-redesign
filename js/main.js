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

  // Parallax suave en hero
  const heroBg = document.querySelector('.hero .hero-bg');
  if (heroBg) {
    window.addEventListener('scroll', () => {
      heroBg.style.transform = `translateY(${window.scrollY * 0.28}px)`;
    }, { passive: true });
  }

  // Contadores animados en stat strip
  function animateValue(el, from, to, duration, prefix, suffix, decimals) {
    const t0 = performance.now();
    const tick = (now) => {
      const p = Math.min((now - t0) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      const v = from + (to - from) * eased;
      el.textContent = prefix + (decimals ? v.toFixed(decimals) : Math.round(v)) + suffix;
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  const statStrip = document.querySelector('.stat-strip');
  if (statStrip) {
    let counted = false;
    new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !counted) {
        counted = true;
        const nums = statStrip.querySelectorAll('.stat .num');
        if (nums[0]) animateValue(nums[0], 0,    45,   1800, '+', '',  0);
        if (nums[1]) animateValue(nums[1], 1990, 1997,  1400, '',  '',  0);
        if (nums[3]) animateValue(nums[3], 0,    4.4,  1600, '',  '★', 1);
      }
    }, { threshold: 0.6 }).observe(statStrip);
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
