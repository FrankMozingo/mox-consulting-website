/* MOX Consulting — main.js
   Smooth scroll · FAQ accordion · Mobile menu · Scroll-spy · Sticky-nav state · Year stamp
   Pure ES2018+. No dependencies. */

(function () {
  'use strict';

  const $  = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  /* -------- Year stamp -------- */
  const yearEl = $('#year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  /* -------- Mobile menu toggle -------- */
  const navToggle = $('.nav__toggle');
  const navLinks  = $('.nav__links');

  function closeMenu() {
    if (!navLinks || !navToggle) return;
    navLinks.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
  }

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeMenu();
    });
  }

  /* -------- Smooth scroll for in-page anchors --------
     Native CSS scroll-behavior covers most cases, but we want to:
     1) Offset for the sticky nav.
     2) Close the mobile menu after navigating. */
  const NAV_OFFSET = 72;

  function smoothScrollTo(targetId) {
    if (!targetId) return;
    if (targetId === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const target = document.getElementById(targetId);
    if (!target) return;
    const top = target.getBoundingClientRect().top + window.scrollY - NAV_OFFSET;
    window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
  }

  $$('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (!href || href === '#') return;
      const id = href.slice(1);
      const target = id === 'top' ? document.body : document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      smoothScrollTo(id);
      closeMenu();
      if (history.replaceState) history.replaceState(null, '', '#' + id);
    });
  });

  /* -------- FAQ accordion: only one open at a time -------- */
  const faqItems = $$('.faq__item');
  faqItems.forEach((item) => {
    item.addEventListener('toggle', () => {
      if (!item.open) return;
      faqItems.forEach((other) => {
        if (other !== item && other.open) other.open = false;
      });
    });
  });

  /* -------- Sticky nav scrolled state -------- */
  const navEl = $('#nav');
  function updateNavState() {
    if (!navEl) return;
    if (window.scrollY > 8) navEl.classList.add('is-scrolled');
    else navEl.classList.remove('is-scrolled');
  }
  updateNavState();
  window.addEventListener('scroll', updateNavState, { passive: true });

  /* -------- Active nav highlight on scroll -------- */
  const navAnchors = $$('.nav__links a[href^="#"]');
  const sectionMap = new Map();
  navAnchors.forEach((a) => {
    const id = (a.getAttribute('href') || '').slice(1);
    const sec = id ? document.getElementById(id) : null;
    if (sec) sectionMap.set(sec, a);
  });

  if ('IntersectionObserver' in window && sectionMap.size > 0) {
    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

      if (visible.length === 0) return;
      const activeLink = sectionMap.get(visible[0].target);
      if (!activeLink) return;

      navAnchors.forEach((a) => a.classList.remove('is-active'));
      activeLink.classList.add('is-active');
    }, {
      rootMargin: '-40% 0px -50% 0px',
      threshold: [0, 0.1, 0.25, 0.5]
    });

    sectionMap.forEach((_link, section) => observer.observe(section));
  }

})();
