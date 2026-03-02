// === NAV SCROLL ===
const nav = document.querySelector('.nav');
let lastScroll = 0;
window.addEventListener('scroll', () => {
  if (!nav) return;
  const y = window.scrollY;
  nav.classList.toggle('scrolled', y > 50);
  lastScroll = y;
}, { passive: true });

// === MOBILE TOGGLE ===
const toggle = document.querySelector('.nav-toggle');
const links = document.querySelector('.nav-links');
if (toggle && links) {
  toggle.addEventListener('click', () => {
    links.classList.toggle('open');
    toggle.classList.toggle('active');
  });
  // Close on link click
  links.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      links.classList.remove('open');
      toggle.classList.remove('active');
    });
  });
}

// === FAQ ACCORDION ===
document.querySelectorAll('.faq-q').forEach(q => {
  q.addEventListener('click', () => {
    const item = q.parentElement;
    const wasOpen = item.classList.contains('open');
    // Close all in same list
    item.closest('.faq-list').querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
    if (!wasOpen) item.classList.add('open');
  });
});

// === SCROLL REVEAL ===
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const delay = e.target.dataset.delay || 0;
      e.target.style.transitionDelay = delay + 'ms';
      e.target.style.animation = 'fadeUp 0.7s cubic-bezier(0.4, 0, 0.2, 1) forwards';
      revealObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
document.querySelectorAll('.reveal').forEach((el, i) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.dataset.delay = (i % 4) * 80;
  revealObserver.observe(el);
});

// === COUNTER ANIMATION ===
const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const el = e.target;
      const target = el.dataset.count;
      const suffix = el.dataset.suffix || '';
      const prefix = el.dataset.prefix || '';
      const duration = 1800;
      const start = Date.now();
      const numTarget = parseFloat(target);
      const step = () => {
        const elapsed = Date.now() - start;
        const progress = Math.min(elapsed / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 4);
        const current = Math.round(numTarget * ease);
        el.textContent = prefix + current + suffix;
        if (progress < 1) requestAnimationFrame(step);
      };
      step();
      counterObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });
document.querySelectorAll('[data-count]').forEach(el => counterObserver.observe(el));

// === SMOOTH SCROLL FOR HASH LINKS ===
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
