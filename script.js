// Basic interactivity: nav toggle, form validation, year, scroll reveal
document.addEventListener('DOMContentLoaded', function () {
  // Year in footer
  const yearEls = [document.getElementById('year'), document.getElementById('year-2'), document.getElementById('year-3')];
  yearEls.forEach(el => { if (el) el.textContent = new Date().getFullYear(); });

  // Mobile nav toggle
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.getElementById('primary-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!expanded));
      nav.classList.toggle('show');
    });
  }

  // Simple form validation (client-side)
  const form = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      status.textContent = '';
      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const message = form.message.value.trim();

      if (name.length < 2) { status.textContent = 'Please enter your name.'; form.name.focus(); return; }
      if (!/^\S+@\S+\.\S+$/.test(email)) { status.textContent = 'Please enter a valid email.'; form.email.focus(); return; }
      if (message.length < 10) { status.textContent = 'Message should be at least 10 characters.'; form.message.focus(); return; }

      // In production you'd send this to a server or use Netlify forms / Formspree / similar.
      status.textContent = 'Thanks! Your message was validated locally (demo).';
      form.reset();
    });
  }

  // Scroll reveal for elements with .animate-on-scroll
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) e.target.classList.add('visible');
    });
  }, {threshold: 0.12});
  document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));
});
