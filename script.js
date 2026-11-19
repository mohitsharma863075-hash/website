/* ============================================================
   MOHIT SHARMA — PORTFOLIO SCRIPT
   Sections: Config, Utils, Loader, Cursor, Nav, Theme, Hero BG,
   Reveal/Counters, Marquee, Mockup tilt, Portfolio data/render,
   Filters, Modal, Lightbox, Magnetic buttons, Contact form
   ============================================================ */

(function () {
  'use strict';

  const CONFIG = {
    isTouch: window.matchMedia('(hover: none), (max-width: 768px)').matches,
    reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,

    // WhatsApp number: country code ke saath, + ke bina
    whatsappNumber: '919258895817',  // ← Updated number
  };

  /* ---------------- UTILS ---------------- */
  const $ = (sel, ctx) => (ctx || document).querySelector(sel);
  const $$ = (sel, ctx) => Array.from((ctx || document).querySelectorAll(sel));
  const clamp = (v, min, max) => Math.max(min, Math.min(max, v));
  const lerp = (a, b, n) => a + (b - a) * n;
  function debounce(fn, wait) {
    let t;
    return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), wait); };
  }

  /* ============================================================
     PORTFOLIO DATA — edit projects, images and links here
     ============================================================ */
  const PORTFOLIO_DATA = [
    {
      id: 'jbh-growth',
      title: 'JBH Growth Main Power Pvt. Ltd.',
      category: 'web',
      categoryLabel: 'Web Design',
      description: 'A business website built for JBH Growth Main Power Pvt. Ltd.',
      tools: ['HTML', 'CSS', 'JavaScript'],
      image: 'images/projects/jbh-growth.jpg',
      liveUrl: 'https://mohitsharma863075-hash.github.io/JBH-GROWTH-MAIN-POWER-PVt.-Ltd/'
    },
    {
      id: 'hotel-imperial-empire',
      title: 'Hotel Imperial Empire',
      category: 'web',
      categoryLabel: 'Web Design',
      description: 'A hospitality website for Hotel Imperial Empire designed to showcase rooms and amenities with a clean, responsive layout.',
      tools: ['HTML', 'CSS', 'JavaScript'],
      image: 'images/projects/hotel-imperial-empire.jpg',
      liveUrl: 'https://mohitsharma863075-hash.github.io/Hotel-Imperial-Empire/'
    },
    {
      id: 'nirman-flex',
      title: 'NIRMAN FLEX',
      category: 'web',
      categoryLabel: 'Web Design / Printing Business',
      description: 'Website design for NIRMAN FLEX, a printing business, built to present their services clearly to local clients.',
      tools: ['HTML', 'CSS', 'JavaScript'],
      image: 'images/projects/nirman-flex.jpg',
      liveUrl: 'https://mohitsharma863075-hash.github.io/NIRMAN-FLEX/'
    },
    {
      id: 'hyphen-hotels',
      title: 'Hyphen Hotels Premier Meerut',
      category: 'web',
      categoryLabel: 'Web Design',
      description: 'A hotel website for Hyphen Hotels Premier Meerut, designed for an easy, modern browsing experience across devices.',
      tools: ['HTML', 'CSS', 'JavaScript'],
      image: 'images/projects/hyphen-hotels.jpg',
      liveUrl: 'https://www.hyphenhotels.com/'
    },
    {
      id: 'sain-printing-press',
      title: 'Sain Printing Press',
      category: 'web',
      categoryLabel: 'Web Design / Printing Business',
      description: 'A website for Sain Printing Press, presenting their printing services to local and regional clients.',
      tools: ['HTML', 'CSS', 'JavaScript'],
      image: 'images/projects/sain-printing-press.jpg',
      liveUrl: 'https://mohitsharma863075-hash.github.io/sain-printing-press/'
    },
    /* --- Editable graphic design placeholders: replace with real projects --- */
    {
      id: 'graphic-placeholder-1',
      title: 'Brand Identity Project (Lemon Made Drink)',
      category: 'branding',
      categoryLabel: 'Branding',
      description: 'Brand identity design created for Lemon Made Drink with a clean and attractive visual style.',
      tools: ['Photoshop', 'CorelDRAW'],
      image: 'images/designs/branding-project.jpg',
      liveUrl: ''
    },
    {
      id: 'graphic-placeholder-2',
      title: 'Poster Design Project (An Acadamy for it skill )',
      category: 'poster',
      categoryLabel: 'Posters',
      description: 'Creative poster design created for an IT skill academy with a professional promotional layout.',
      tools: ['Photoshop', 'Canva'],
      image: 'images/designs/poster-project.jpg',
      liveUrl: ''
    },
    {
      id: 'graphic-placeholder-3',
      title: 'Social Media Campaign (Lapis Furniture)',
      category: 'social',
      categoryLabel: 'Social Media',
      description: 'Social media design project for Lapis Furniture with engaging visuals and targeted messaging.',
      tools: ['Canva', 'Photoshop'],
      image: 'images/designs/social-campaign.jpg',
      liveUrl: ''
    },
    {
      id: 'graphic-placeholder-4',
      title: 'Print Design Project (print image )',
      category: 'print',
      categoryLabel: 'Print Design',
      description: 'Professional print design project including promotional and business print materials.',
      tools: ['CorelDRAW', 'Photoshop'],
      image: 'images/designs/print-project.jpg',
      liveUrl: ''
    },
    {
      id: 'graphic-placeholder-5',
      title: 'Logo Design Project (American Inn cafe)',
      category: 'graphic',
      categoryLabel: 'Graphic Design',
      description: 'Creative logo design project focused on a clean, memorable and professional brand identity.',
      tools: ['CorelDRAW', 'Illustrator'],
      image: 'images/designs/logo-project.jpg',
      liveUrl: ''
    }
  ];

  const SKILLS_DATA = [
    { name: 'Graphic Design', level: 85 },
    { name: 'Web Design', level: 80 },
    { name: 'Adobe Photoshop', level: 85 },
    { name: 'CorelDRAW', level: 80 },
    { name: 'Canva', level: 90 },
    { name: 'HTML', level: 80 },
    { name: 'CSS', level: 78 },
    { name: 'JavaScript', level: 65 },
    { name: 'UI Design', level: 70 },
    { name: 'Branding', level: 75 },
    { name: 'Responsive Design', level: 78 },
  ];

  /* ============================================================
     LOADER
     ============================================================ */
  function initLoader() {
    const loader = $('#loader');
    const fill = $('#loaderBarFill');
    if (!loader) return;
    let progress = 0;
    const timer = setInterval(() => {
      progress += Math.random() * 18 + 8;
      if (progress >= 100) {
        progress = 100;
        clearInterval(timer);
        setTimeout(() => {
          loader.classList.add('is-hidden');
          document.body.style.overflow = '';
          loader.addEventListener('transitionend', () => loader.remove(), { once: true });
        }, 280);
      }
      if (fill) fill.style.width = progress + '%';
    }, 140);
    document.body.style.overflow = 'hidden';
    // Safety fallback: never block the site for more than ~2.2s
    setTimeout(() => {
      if (document.body.contains(loader)) {
        loader.classList.add('is-hidden');
        document.body.style.overflow = '';
      }
    }, 2200);
  }

  /* ============================================================
     CUSTOM CURSOR SYSTEM
     ============================================================ */
  function initCursor() {
    if (CONFIG.isTouch) {
      document.body.classList.add('no-custom-cursor');
      return;
    }
    document.body.classList.add('cursor-active');

    const dot = $('#cursorDot');
    const ring = $('#cursorRing');
    const text = $('#cursorText');
    if (!dot || !ring || !text) return;

    let mouseX = window.innerWidth / 2, mouseY = window.innerHeight / 2;
    let dotX = mouseX, dotY = mouseY, ringX = mouseX, ringY = mouseY;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX; mouseY = e.clientY;
    });

    function raf() {
      dotX = lerp(dotX, mouseX, 0.35);
      dotY = lerp(dotY, mouseY, 0.35);
      ringX = lerp(ringX, mouseX, 0.14);
      ringY = lerp(ringY, mouseY, 0.14);
      dot.style.transform = `translate(${dotX}px, ${dotY}px) translate(-50%,-50%)`;
      ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%,-50%)`;
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Default text driven by current section (data-cursor-section)
    let sectionText = 'EXPLORE';
    const sectionEls = $$('[data-cursor-section]');
    if (sectionEls.length) {
      const obs = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.4) {
            sectionText = entry.target.getAttribute('data-cursor-section');
            updateCursorText();
          }
        });
      }, { threshold: [0.4, 0.6] });
      sectionEls.forEach((el) => obs.observe(el));
    }

    let hoverText = null;
    function updateCursorText() {
      const activeText = hoverText || sectionText || '';
      text.textContent = activeText;
      text.classList.toggle('is-visible', !!activeText);
    }
    updateCursorText();

    // Hover interactions on any [data-cursor] element
    $$('[data-cursor]').forEach((el) => {
      el.addEventListener('mouseenter', () => {
        hoverText = el.getAttribute('data-cursor');
        ring.classList.add('is-expand');
        if (el.closest('[data-cursor-section="WEB"]') || el.classList.contains('mockup') || hoverText === 'WEB') {
          ring.classList.add('is-web');
        }
        updateCursorText();
      });
      el.addEventListener('mouseleave', () => {
        hoverText = null;
        ring.classList.remove('is-expand', 'is-web');
        updateCursorText();
      });
    });
  }

  /* ============================================================
     NAVIGATION (scroll state, active link, mobile menu)
     ============================================================ */
  function initNav() {
    const navbar = $('#navbar');
    const links = $$('.nav-link');
    const burger = $('#navBurger');
    const navLinks = $('#navLinks');
    const sections = links.map((l) => document.querySelector(l.getAttribute('href'))).filter(Boolean);

    function onScroll() {
      navbar.classList.toggle('is-scrolled', window.scrollY > 30);

      let current = sections[0];
      const scrollPos = window.scrollY + window.innerHeight * 0.35;
      sections.forEach((sec) => { if (sec.offsetTop <= scrollPos) current = sec; });
      links.forEach((l) => l.classList.toggle('active-link', l.getAttribute('href') === '#' + current.id));

      const progress = $('#scrollProgress');
      const doc = document.documentElement;
      const pct = (window.scrollY / (doc.scrollHeight - doc.clientHeight)) * 100;
      if (progress) progress.style.width = clamp(pct, 0, 100) + '%';
    }
    document.addEventListener('scroll', debounce(onScroll, 10), { passive: true });
    onScroll();

    if (burger) {
      burger.addEventListener('click', () => {
        const open = navLinks.classList.toggle('is-open');
        burger.setAttribute('aria-expanded', open);
      });
      links.forEach((l) => l.addEventListener('click', () => {
        navLinks.classList.remove('is-open');
        burger.setAttribute('aria-expanded', false);
      }));
    }
  }

  /* ============================================================
     THEME TOGGLE (dark default, persisted via localStorage)
     ============================================================ */
  function initTheme() {
    const toggle = $('#themeToggle');
    const saved = localStorage.getItem('ms-theme');
    if (saved) document.body.setAttribute('data-theme', saved);

    function applyIcon() {
      const isDark = document.body.getAttribute('data-theme') !== 'light';
      if (toggle) toggle.querySelector('.theme-icon').textContent = isDark ? '\u2600' : '\u263D';
    }
    applyIcon();

    if (toggle) {
      toggle.addEventListener('click', () => {
        const current = document.body.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
        document.body.setAttribute('data-theme', current);
        localStorage.setItem('ms-theme', current);
        applyIcon();
      });
    }
  }

  /* ============================================================
     HERO INTERACTIVE BACKGROUND (spotlight + light particle canvas)
     ============================================================ */
  function initHeroBackground() {
    const hero = $('.hero');
    const spotlight = $('#heroSpotlight');
    if (hero && spotlight && !CONFIG.isTouch) {
      hero.addEventListener('mousemove', (e) => {
        const rect = hero.getBoundingClientRect();
        spotlight.style.setProperty('--mx', (e.clientX - rect.left) + 'px');
        spotlight.style.setProperty('--my', (e.clientY - rect.top) + 'px');
      });
    }

    const canvas = $('#heroCanvas');
    if (!canvas || CONFIG.reducedMotion) return;
    const ctx = canvas.getContext('2d');
    let w, h, particles;

    function resize() {
      w = canvas.width = canvas.offsetWidth;
      h = canvas.height = canvas.offsetHeight;
    }
    function makeParticles() {
      const count = Math.min(60, Math.floor((w * h) / 22000));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.6 + 0.4,
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.15,
      }));
    }
    function draw() {
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = 'rgba(124,92,255,0.5)';
      particles.forEach((p) => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      });
      requestAnimationFrame(draw);
    }
    resize(); makeParticles(); draw();
    window.addEventListener('resize', debounce(() => { resize(); makeParticles(); }, 200));
  }

  /* ============================================================
     SCROLL REVEAL + COUNT-UP STATS
     ============================================================ */
  function initReveal() {
    const revealEls = $$('.reveal, .service-card, .why-card, .tool-card, .stat-card');
    revealEls.forEach((el) => el.classList.add('reveal'));

    const obs = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach((el) => obs.observe(el));
  }

  function initCounters() {
    const counters = $$('.stat-num');
    if (!counters.length) return;
    const obs = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-count'), 10) || 0;
        const duration = 1400;
        const start = performance.now();
        function tick(now) {
          const progress = clamp((now - start) / duration, 0, 1);
          el.textContent = Math.floor(progress * target);
          if (progress < 1) requestAnimationFrame(tick);
          else el.textContent = target;
        }
        requestAnimationFrame(tick);
        observer.unobserve(el);
      });
    }, { threshold: 0.5 });
    counters.forEach((c) => obs.observe(c));
  }

  /* ============================================================
     GRAPHIC-DESIGN HORIZONTAL GALLERY — subtle cursor parallax
     ============================================================ */
  function initGalleryParallax() {
    const gallery = $('#designGallery');
    const track = $('#designTrack');
    if (!gallery || !track || CONFIG.isTouch || CONFIG.reducedMotion) return;
    gallery.addEventListener('mousemove', (e) => {
      const rect = gallery.getBoundingClientRect();
      const relX = (e.clientX - rect.left) / rect.width - 0.5;
      track.style.transform = `translateX(${relX * -20}px)`;
    });
    gallery.addEventListener('mouseleave', () => { track.style.transform = 'translateX(0)'; });
  }

  /* ============================================================
     WEB MOCKUP 3D TILT
     ============================================================ */
  function initMockupTilt() {
    const row = $('#mockupRow');
    if (!row || CONFIG.isTouch || CONFIG.reducedMotion) return;
    const items = $$('.mockup', row);
    row.addEventListener('mousemove', (e) => {
      const rect = row.getBoundingClientRect();
      const relX = (e.clientX - rect.left) / rect.width - 0.5;
      const relY = (e.clientY - rect.top) / rect.height - 0.5;
      items.forEach((item) => {
        item.style.transform = `rotateY(${relX * 8}deg) rotateX(${relY * -8}deg)`;
      });
    });
    row.addEventListener('mouseleave', () => {
      items.forEach((item) => { item.style.transform = 'rotateY(0) rotateX(0)'; });
    });
  }

  /* ============================================================
     MARQUEE — subtle mouse-reactive speed
     ============================================================ */
  function initMarquee() {
    const track = $('#marqueeTrack');
    if (!track || CONFIG.reducedMotion) return;
    document.addEventListener('mousemove', (e) => {
      const speedFactor = 1 + (e.clientX / window.innerWidth) * 0.6;
      track.style.animationDuration = (26 / speedFactor) + 's';
    });
  }

  /* ============================================================
     PORTFOLIO — render, filter
     ============================================================ */
  function renderPortfolio() {
    const grid = $('#portfolioGrid');
    if (!grid) return;
    grid.innerHTML = PORTFOLIO_DATA.map((item, i) => `
      <article class="portfolio-card reveal" data-category="${item.category}" data-index="${i}" tabindex="0" data-cursor="VIEW">
        <div class="portfolio-thumb">
          <img src="${item.image}" alt="${item.title}" loading="lazy"
               onerror="this.src='https://placehold.co/800x600?text=Project+Image'" />
          <div class="overlay"><span>View Project</span></div>
        </div>
        <div class="portfolio-info">
          <span class="cat">${item.categoryLabel.toUpperCase()}</span>
          <h3>${item.title}</h3>
          <p>${item.description.length > 90 ? item.description.slice(0, 90) + '\u2026' : item.description}</p>
        </div>
      </article>
    `).join('');

    $$('.portfolio-card', grid).forEach((card) => {
      const openHandler = () => openModal(PORTFOLIO_DATA[parseInt(card.dataset.index, 10)]);
      card.addEventListener('click', openHandler);
      card.addEventListener('keypress', (e) => { if (e.key === 'Enter') openHandler(); });
    });

    initReveal();
  }

  function initFilters() {
    const filters = $$('.filter-btn');
    const cards = () => $$('.portfolio-card');
    filters.forEach((btn) => {
      btn.addEventListener('click', () => {
        filters.forEach((b) => { b.classList.remove('is-active'); b.setAttribute('aria-selected', 'false'); });
        btn.classList.add('is-active');
        btn.setAttribute('aria-selected', 'true');
        const filter = btn.dataset.filter;
        cards().forEach((card) => {
          const show = filter === 'all' || card.dataset.category === filter;
          card.classList.toggle('is-hidden', !show);
        });
      });
    });
  }

  /* ============================================================
     PROJECT MODAL
     ============================================================ */
  function openModal(item) {
    const modal = $('#projectModal');
    if (!modal || !item) return;
    $('#modalImage').src = item.image;
    $('#modalImage').alt = item.title;
    $('#modalCategory').textContent = item.categoryLabel.toUpperCase();
    $('#modalTitle').textContent = item.title;
    $('#modalDescription').textContent = item.description;
    $('#modalTools').innerHTML = item.tools.map((t) => `<span>${t}</span>`).join('');

    const liveBtn = $('#modalLiveLink');
    if (item.liveUrl) {
      liveBtn.href = item.liveUrl;
      liveBtn.style.display = 'inline-flex';
    } else {
      liveBtn.style.display = 'none';
    }

    modal.hidden = false;
    requestAnimationFrame(() => modal.classList.add('is-open'));
    document.body.style.overflow = 'hidden';
  }
  function closeModal() {
    const modal = $('#projectModal');
    if (!modal) return;
    modal.classList.remove('is-open');
    document.body.style.overflow = '';
    setTimeout(() => { modal.hidden = true; }, 350);
  }
  function initModal() {
    const modal = $('#projectModal');
    if (!modal) return;
    $('#modalClose').addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && modal.classList.contains('is-open')) closeModal(); });
  }

  /* ============================================================
     LIGHTBOX (for the graphic design horizontal gallery images)
     ============================================================ */
  function initLightbox() {
    const lightbox = $('#lightbox');
    const imgs = $$('.hgallery-item img');
    if (!lightbox || !imgs.length) return;
    const lbImg = $('#lightboxImg');
    let index = 0;

    function show(i) {
      index = (i + imgs.length) % imgs.length;
      lbImg.src = imgs[index].src;
      lbImg.alt = imgs[index].alt;
    }
    function open(i) {
      show(i);
      lightbox.hidden = false;
      requestAnimationFrame(() => lightbox.classList.add('is-open'));
      document.body.style.overflow = 'hidden';
    }
    function close() {
      lightbox.classList.remove('is-open');
      document.body.style.overflow = '';
      setTimeout(() => { lightbox.hidden = true; }, 300);
    }

    imgs.forEach((img, i) => {
      img.parentElement.addEventListener('click', () => open(i));
      img.parentElement.style.cursor = CONFIG.isTouch ? 'pointer' : 'none';
    });

    $('#lightboxClose').addEventListener('click', close);
    $('#lightboxPrev').addEventListener('click', () => show(index - 1));
    $('#lightboxNext').addEventListener('click', () => show(index + 1));
    lightbox.addEventListener('click', (e) => { if (e.target === lightbox) close(); });
    document.addEventListener('keydown', (e) => {
      if (!lightbox.classList.contains('is-open')) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') show(index - 1);
      if (e.key === 'ArrowRight') show(index + 1);
    });
  }

  /* ============================================================
     CERTIFICATE VIEWER (click certificate to enlarge)
     ============================================================ */
  function initCertificate() {
    const openBtn = $('#certOpen');
    const viewer = $('#certViewer');
    if (!openBtn || !viewer) return;
    const img = $('#certImg');
    const big = $('#certViewerImg');

    function open() {
      big.src = img.currentSrc || img.src;
      big.alt = img.alt;
      viewer.hidden = false;
      requestAnimationFrame(() => viewer.classList.add('is-open'));
      document.body.style.overflow = 'hidden';
    }
    function close() {
      viewer.classList.remove('is-open');
      document.body.style.overflow = '';
      setTimeout(() => { viewer.hidden = true; }, 300);
    }

    openBtn.addEventListener('click', open);
    viewer.addEventListener('click', close);
    $('#certViewerClose').addEventListener('click', (e) => { e.stopPropagation(); close(); });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && viewer.classList.contains('is-open')) close();
    });
  }

  /* ============================================================
     SKILLS RENDER + ANIMATE ON VIEW
     ============================================================ */
  function renderSkills() {
    const grid = $('#skillsGrid');
    if (!grid) return;
    grid.innerHTML = SKILLS_DATA.map((s) => `
      <div class="skill-item">
        <div class="skill-top"><span>${s.name}</span><span>${s.level}%</span></div>
        <div class="skill-bar"><span data-level="${s.level}"></span></div>
      </div>
    `).join('');

    const bars = $$('.skill-bar span', grid);
    const obs = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.width = entry.target.dataset.level + '%';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });
    bars.forEach((b) => obs.observe(b));
  }

  /* ============================================================
     MAGNETIC BUTTONS
     ============================================================ */
  function initMagnetic() {
    if (CONFIG.isTouch || CONFIG.reducedMotion) return;
    $$('.magnetic').forEach((btn) => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = `translate(${x * 0.18}px, ${y * 0.3}px)`;
      });
      btn.addEventListener('mouseleave', () => { btn.style.transform = 'translate(0,0)'; });
    });
  }

  /* ============================================================
     CONTACT FORM — Formspree Backend + WhatsApp + Validation
     ============================================================ */
  function initContactForm() {
    const form = $('#contactForm');
    if (!form) return;
    const successEl = $('#formSuccess');
    const submitBtn = $('.form-submit', form);

    // Validation rules — keys match the actual field ids in index.html
    const rules = {
      'name': (v) => v.trim().length >= 2 || 'Please enter your name (minimum 2 characters).',
      'email': (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || 'Please enter a valid email address.',
      'phone': (v) => v.trim().length >= 8 || 'Please enter a valid phone number.',
      'service': (v) => v !== '' || 'Please select a service.',
      'message': (v) => v.trim().length >= 10 || 'Please add more details (minimum 10 characters).',
    };

    function validateField(field) {
      const rule = rules[field.id];
      if (!rule) return true;
      const result = rule(field.value);
      const group = field.closest('.form-group');
      const errorEl = group ? group.querySelector('.form-error') : null;
      if (result === true) {
        if (group) group.classList.remove('has-error');
        if (errorEl) errorEl.textContent = '';
        return true;
      }
      if (group) group.classList.add('has-error');
      if (errorEl) errorEl.textContent = result;
      return false;
    }

    // Attach blur validation
    Object.keys(rules).forEach((id) => {
      const field = $('#' + id);
      if (field) field.addEventListener('blur', () => validateField(field));
    });

    // Form submission
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      // Validate all fields
      let valid = true;
      Object.keys(rules).forEach((id) => {
        const field = $('#' + id);
        if (field && !validateField(field)) valid = false;
      });

      if (!valid) {
        successEl.textContent = '';
        return;
      }

      // Gather form data
      const name = $('#name').value.trim();
      const email = $('#email').value.trim();
      const phone = $('#phone').value.trim();
      const service = $('#service').value;
      const details = $('#message').value.trim();

      // Get current date and time
      const now = new Date();
      const dateTime = now.toLocaleString('en-IN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });

      if (submitBtn) submitBtn.disabled = true;
      successEl.textContent = 'Sending...';

      // ---- 1. Send data to your backend (Formspree) so it reaches your
      //         email + dashboard, and you know exactly who filled the form ----
      const formData = new FormData(form);
      fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      })
        .then((res) => {
          if (!res.ok) throw new Error('Formspree submission failed');
        })
        .catch((err) => {
          console.warn('Backend submission failed (check your Formspree ID):', err);
        })
        .finally(() => {
          // ---- 2. Also open WhatsApp so you get an instant notification ----
          const message =
`🚀 NEW PROJECT INQUIRY

━━━━━━━━━━━━━━━━━━━━

👤 CLIENT DETAILS

Name: ${name}
Email: ${email}
Phone: ${phone || 'Not provided'}

━━━━━━━━━━━━━━━━━━━━

💼 PROJECT DETAILS

Service: ${service}

Project Details:
${details}

━━━━━━━━━━━━━━━━━━━━

🌐 Received from:
Mohit Sharma Portfolio Website

⏰ Submitted:
${dateTime}`;

          const whatsappURL = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
          window.open(whatsappURL, '_blank');

          // Show success message
          successEl.textContent = "✅ Your inquiry has been sent! I'll get back to you shortly.";
          if (submitBtn) submitBtn.disabled = false;

          // Reset form
          form.reset();
          $$('.form-group', form).forEach((g) => g.classList.remove('has-error'));

          // Clear success message after 6 seconds
          setTimeout(() => { successEl.textContent = ''; }, 6000);
        });
    });
  }

  /* ============================================================
     NEW FEATURE: FAQ ACCORDION
     ============================================================ */
  function initFAQ() {
    const items = $$('.faq-item');
    if (!items.length) return;
    items.forEach((item) => {
      const question = $('.faq-question', item);
      if (!question) return;
      question.addEventListener('click', () => {
        const isOpen = item.classList.contains('is-open');
        // Close all other items (single-open accordion)
        items.forEach((other) => {
          other.classList.remove('is-open');
          const q = $('.faq-question', other);
          if (q) q.setAttribute('aria-expanded', 'false');
        });
        if (!isOpen) {
          item.classList.add('is-open');
          question.setAttribute('aria-expanded', 'true');
        }
      });
    });
  }

  /* ============================================================
     NEW FEATURE: VISIT COUNTER (no signup needed — countapi.xyz)
     ============================================================ */
  function initVisitCounter() {
    const el = $('#visitCount');
    if (!el) return;
    // Unique namespace/key so this counter belongs only to this site.
    // Change 'mohit-sharma-portfolio' if you ever need a fresh counter.
    fetch('https://api.countapi.xyz/hit/mohit-sharma-portfolio/visits')
      .then((res) => res.json())
      .then((data) => { el.textContent = data.value.toLocaleString('en-IN'); })
      .catch(() => { el.textContent = 'N/A'; });
  }

  /* ============================================================
     BACK TO TOP
     ============================================================ */
  function initBackToTop() {
    const btn = $('#backToTop');
    if (!btn) return;
    btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: CONFIG.reducedMotion ? 'auto' : 'smooth' }));
  }

  /* ============================================================
     INIT
     ============================================================ */
  document.addEventListener('DOMContentLoaded', () => {
    initLoader();
    initCursor();
    initNav();
    initTheme();
    initHeroBackground();
    initMarquee();
    initGalleryParallax();
    initMockupTilt();
    renderPortfolio();
    initFilters();
    initModal();
    initLightbox();
    initCertificate();
    renderSkills();
    initCounters();
    initReveal();
    initMagnetic();
    initContactForm();
    initBackToTop();
    initFAQ();
    initVisitCounter();
  });
})();// ===============================
// CUSTOM COPY SIGNATURE
// ===============================
document.addEventListener("copy", function (e) {
    const selectedText = window.getSelection().toString().trim();

    if (!selectedText) return;

    const signature = `

© Designed by Mohit Sharma
🌐 designedbymohit.netlify.app`;

    e.clipboardData.setData(
        "text/plain",
        selectedText + signature
    );

    e.preventDefault();
});
// ========================================
// DYNAMIC GREETING
// ========================================

(function () {

    const greeting = document.getElementById("dynamic-greeting");

    if (!greeting) return;

    const hour = new Date().getHours();

    if (hour >= 5 && hour < 12) {
        greeting.textContent = "Good Morning 👋";
    }
    else if (hour >= 12 && hour < 17) {
        greeting.textContent = "Good Afternoon ☀️";
    }
    else if (hour >= 17 && hour < 21) {
        greeting.textContent = "Good Evening ✨";
    }
    else {
        greeting.textContent = "Good Night 🌙";
    }

})();
// ========================================
// ONLINE / OFFLINE DETECTION
// ========================================

(function () {

    const status = document.getElementById("network-status");
    const title = document.getElementById("network-title");
    const message = document.getElementById("network-message");
    const icon = document.getElementById("network-icon");

    if (!status) return;

    function updateNetworkStatus() {

        if (!navigator.onLine) {

            icon.textContent = "📡";
            title.textContent = "You're offline";
            message.textContent =
                "Some features may not be available.";

            status.classList.add("show");

        } else {

            icon.textContent = "✓";
            title.textContent = "Back online";
            message.textContent =
                "Your connection has been restored.";

            status.classList.add("show");

            setTimeout(() => {
                status.classList.remove("show");
            }, 2500);
        }
    }

    window.addEventListener("offline", updateNetworkStatus);
    window.addEventListener("online", updateNetworkStatus);

})();// ========================================
// SECRET EASTER EGG
// ↑ ↑ ↓ ↓ ← → ← →
// ========================================

(function () {

    const secretCode = [
        "ArrowUp",
        "ArrowUp",
        "ArrowDown",
        "ArrowDown",
        "ArrowLeft",
        "ArrowRight",
        "ArrowLeft",
        "ArrowRight"
    ];

    let input = [];

    const easterEgg =
        document.getElementById("easter-egg");

    const closeButton =
        document.getElementById("close-easter");

    if (!easterEgg) return;

    document.addEventListener("keydown", function (e) {

        input.push(e.key);

        if (input.length > secretCode.length) {
            input.shift();
        }

        const matched =
            input.length === secretCode.length &&
            input.every(
                (key, index) =>
                    key === secretCode[index]
            );

        if (matched) {

            easterEgg.classList.add("show");

            input = [];
        }

    });

    if (closeButton) {

        closeButton.addEventListener("click", function () {
            easterEgg.classList.remove("show");
        });

    }

    easterEgg.addEventListener("click", function (e) {

        if (e.target === easterEgg) {
            easterEgg.classList.remove("show");
        }

    });

})();// ========================================
// SERVICE WORKER / PWA
// ========================================

if ("serviceWorker" in navigator) {

    window.addEventListener("load", function () {

        navigator.serviceWorker
            .register("/service-worker.js")
            .then(() => {
                console.log("PWA service worker registered.");
            })
            .catch(error => {
                console.log(
                    "Service worker registration failed:",
                    error
                );
            });

    });

}