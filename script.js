/* =============================================
   TRUE GROWTH — script.js
   Animações de scroll e interações
   ============================================= */

// ── Partículas orbitando o ícone 3D ──
(function() {
  const cx = 250, cy = 250, r = 210;
  const particles = [
    { el: null, offset: 0,    speed: 1 },
    { el: null, offset: 0.13, speed: 1 },
    { el: null, offset: 0.26, speed: 1 },
  ];
  const ids = ['.p1', '.p2', '.p3'];
  let startTime = null;

  function init() {
    particles.forEach((p, i) => {
      p.el = document.querySelector(ids[i]);
    });
    if (particles[0].el) requestAnimationFrame(animate);
  }

  function animate(ts) {
    if (!startTime) startTime = ts;
    const elapsed = (ts - startTime) / 1000; // seconds
    const period = 3; // seconds per revolution

    particles.forEach((p) => {
      const angle = ((elapsed / period) + p.offset) * 2 * Math.PI;
      const x = cx + r * Math.cos(angle);
      const y = cy + r * Math.sin(angle);
      if (p.el) {
        p.el.setAttribute('cx', x.toFixed(2));
        p.el.setAttribute('cy', y.toFixed(2));
      }
    });
    requestAnimationFrame(animate);
  }

  document.addEventListener('DOMContentLoaded', init);
})();

// ── Fade-in ao fazer scroll ──
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
);

document.querySelectorAll(
  '.servico-card, .pstep, .res-card, .dep-card, .problema-item'
).forEach((el) => {
  el.classList.add('fade-up');
  observer.observe(el);
});

// ── CSS para as animações (injetado via JS) ──
const style = document.createElement('style');
style.textContent = `
  .fade-up {
    opacity: 0;
    transform: translateY(28px);
    transition: opacity 0.6s cubic-bezier(0.4,0,0.2,1),
                transform 0.6s cubic-bezier(0.4,0,0.2,1);
  }
  .fade-up.visible {
    opacity: 1;
    transform: translateY(0);
  }
  .servico-card:nth-child(2) { transition-delay: 0.1s; }
  .servico-card:nth-child(3) { transition-delay: 0.2s; }
  .servico-card:nth-child(4) { transition-delay: 0.3s; }
  .pstep:nth-child(2) { transition-delay: 0.12s; }
  .pstep:nth-child(3) { transition-delay: 0.24s; }
  .pstep:nth-child(4) { transition-delay: 0.36s; }
  .dep-card:nth-child(2) { transition-delay: 0.1s; }
  .dep-card:nth-child(3) { transition-delay: 0.2s; }
`;
document.head.appendChild(style);

// ── Destacar link ativo na nav ──
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  const scrollY = window.pageYOffset;
  sections.forEach((section) => {
    const top = section.offsetTop - 100;
    const bottom = top + section.offsetHeight;
    const id = section.getAttribute('id');
    if (scrollY >= top && scrollY < bottom) {
      navLinks.forEach((a) => {
        a.style.color = a.getAttribute('href') === `#${id}` ? '#f5f2ec' : '';
      });
    }
  });
}, { passive: true });
