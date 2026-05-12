/* ─────────────────────────────────────────────
   MADURO / PIRES ADVOCACIA — Main JS
   ───────────────────────────────────────────── */

'use strict';

// ── NAVBAR scroll effect ──────────────────────
const navbar = document.getElementById('navbar');
const scrollThreshold = 60;

function handleNavbarScroll() {
  navbar.classList.toggle('scrolled', window.scrollY > scrollThreshold);
}
window.addEventListener('scroll', handleNavbarScroll, { passive: true });
handleNavbarScroll();

// ── HAMBURGER MENU ────────────────────────────
const hamburger = document.getElementById('hamburger');
const navMenu   = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
  const isOpen = navMenu.classList.toggle('open');
  hamburger.classList.toggle('active', isOpen);
  hamburger.setAttribute('aria-expanded', String(isOpen));
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

// Close menu on nav link click
navMenu.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('open');
    hamburger.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  });
});

// ── ACTIVE NAV LINK (section spy) ────────────
const sections  = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-link');

const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinks.forEach(link => {
        const matches = link.getAttribute('href') === `#${id}`;
        link.style.color = matches ? 'var(--gold)' : '';
      });
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(s => sectionObserver.observe(s));

// ── SCROLL ANIMATIONS ─────────────────────────
const animObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el    = entry.target;
      const delay = parseInt(el.dataset.delay || '0', 10);
      setTimeout(() => el.classList.add('is-visible'), delay);
      animObserver.unobserve(el);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('[data-animate]').forEach(el => animObserver.observe(el));

// ── COUNTER ANIMATION ─────────────────────────
function animateCount(el) {
  const target   = parseInt(el.dataset.count, 10);
  const duration = 1600;
  const fps      = 60;
  const step     = target / (duration / (1000 / fps));
  let   current  = 0;

  const timer = setInterval(() => {
    current = Math.min(current + step, target);
    el.textContent = Math.floor(current);
    if (current >= target) clearInterval(timer);
  }, 1000 / fps);
}

const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('[data-count]').forEach(animateCount);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

const statGrid = document.querySelector('.sobre-stat-grid');
if (statGrid) counterObserver.observe(statGrid);

// ── SMOOTH ANCHOR SCROLL ──────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const targetId = anchor.getAttribute('href').slice(1);
    if (!targetId) return;
    const target = document.getElementById(targetId);
    if (!target) return;
    e.preventDefault();
    const offset = parseInt(getComputedStyle(document.documentElement)
      .getPropertyValue('--nav-h'), 10) || 80;
    window.scrollTo({
      top: target.getBoundingClientRect().top + window.scrollY - offset,
      behavior: 'smooth'
    });
  });
});

// ── PARTICLES (subtle floating dots) ─────────
(function createParticles() {
  const container = document.getElementById('particles');
  if (!container) return;

  const count = window.innerWidth < 768 ? 18 : 36;

  for (let i = 0; i < count; i++) {
    const dot = document.createElement('span');
    const size = Math.random() * 2 + 1;

    Object.assign(dot.style, {
      position: 'absolute',
      width:    `${size}px`,
      height:   `${size}px`,
      left:     `${Math.random() * 100}%`,
      top:      `${Math.random() * 100}%`,
      borderRadius: '50%',
      background: `rgba(201, 168, 76, ${Math.random() * 0.3 + 0.05})`,
      animation: `float ${6 + Math.random() * 10}s ease-in-out ${Math.random() * 5}s infinite`,
      pointerEvents: 'none',
    });

    container.appendChild(dot);
  }

  // Inject keyframes once
  if (!document.getElementById('particle-style')) {
    const style = document.createElement('style');
    style.id = 'particle-style';
    style.textContent = `
      @keyframes float {
        0%, 100% { transform: translateY(0) scale(1); opacity: 0.6; }
        33%  { transform: translateY(-18px) scale(1.1); opacity: 1; }
        66%  { transform: translateY(10px) scale(0.9); opacity: 0.4; }
      }
    `;
    document.head.appendChild(style);
  }
})();

// ── CONTACT FORM ──────────────────────────────
const form    = document.getElementById('contatoForm');
const success = document.getElementById('formSuccess');

if (form && success) {
  // Telefone mask
  const telefoneInput = form.querySelector('#telefone');
  if (telefoneInput) {
    telefoneInput.addEventListener('input', e => {
      let v = e.target.value.replace(/\D/g, '').slice(0, 11);
      if (v.length > 10) {
        v = v.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
      } else if (v.length > 6) {
        v = v.replace(/^(\d{2})(\d{4})(\d*)$/, '($1) $2-$3');
      } else if (v.length > 2) {
        v = v.replace(/^(\d{2})(\d*)$/, '($1) $2');
      } else if (v.length > 0) {
        v = v.replace(/^(\d*)$/, '($1');
      }
      e.target.value = v;
    });
  }

  form.addEventListener('submit', e => {
    e.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const btn = form.querySelector('button[type="submit"]');
    btn.disabled  = true;
    btn.textContent = 'Enviando…';

    // Build WhatsApp message from form data
    const nome      = form.nome.value.trim();
    const telefone  = form.telefone.value.trim();
    const email     = form.email.value.trim();
    const area      = form.area.options[form.area.selectedIndex].text;
    const mensagem  = form.mensagem.value.trim();

    const msg = [
      `*Contato pelo site — Maduro / Pires Advocacia*`,
      ``,
      `*Nome:* ${nome}`,
      `*Telefone:* ${telefone}`,
      email ? `*E-mail:* ${email}` : null,
      area !== 'Selecione uma área' ? `*Área:* ${area}` : null,
      `*Mensagem:* ${mensagem}`,
    ].filter(Boolean).join('\n');

    // Simulate brief delay then redirect to WhatsApp
    setTimeout(() => {
      const url = `https://wa.me/5516997225518?text=${encodeURIComponent(msg)}`;
      window.open(url, '_blank', 'noopener,noreferrer');
      form.hidden  = true;
      success.hidden = false;
    }, 800);
  });
}

// ── WHATSAPP FLOAT visibility ─────────────────
const waFloat = document.getElementById('whatsappFloat');
if (waFloat) {
  let lastScrollY = window.scrollY;
  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const currentY  = window.scrollY;
        const scrollDown = currentY > lastScrollY;
        waFloat.style.transform = scrollDown && currentY > 300
          ? 'scale(0.85) translateY(4px)'
          : '';
        lastScrollY = currentY;
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
}
