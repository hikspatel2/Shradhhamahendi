/* ============================================================
   SHRADDHA MEHNDI & NAIL ART — script.js
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Navbar scroll ──────────────────────────────────────── */
  const navbar = document.querySelector('.navbar');
  const updateNav = () => {
    if (window.scrollY > 60) navbar?.classList.add('scrolled');
    else navbar?.classList.remove('scrolled');
  };
  window.addEventListener('scroll', updateNav, { passive: true });
  updateNav();

  /* ── Active nav link ────────────────────────────────────── */
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === page || (page === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  /* ── Hamburger menu ─────────────────────────────────────── */
  const burger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  const overlay = document.createElement('div');
  overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,.5);z-index:998;display:none;';
  document.body.appendChild(overlay);

  const toggleNav = () => {
    const open = navLinks?.classList.toggle('open');
    document.body.style.overflow = open ? 'hidden' : '';
    overlay.style.display = open ? 'block' : 'none';
  };
  burger?.addEventListener('click', toggleNav);
  overlay.addEventListener('click', toggleNav);
  document.querySelectorAll('.nav-link').forEach(l => l.addEventListener('click', () => {
    if (navLinks?.classList.contains('open')) toggleNav();
  }));

  /* ── Scroll animations (IntersectionObserver) ───────────── */
  const animEls = document.querySelectorAll('.fade-in, .fade-left, .fade-right');
  if (animEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('vis'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    animEls.forEach(el => io.observe(el));
  }

  /* ── Counter animation ──────────────────────────────────── */
  const counters = document.querySelectorAll('.stat-num');
  if (counters.length) {
    const countIO = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        const el = e.target;
        const target = parseInt(el.dataset.target || el.textContent, 10);
        const suffix = el.dataset.suffix || '';
        const dur = 1800;
        let start = null;
        const step = (ts) => {
          if (!start) start = ts;
          const prog = Math.min((ts - start) / dur, 1);
          const ease = 1 - Math.pow(1 - prog, 3);
          el.textContent = Math.round(target * ease) + suffix;
          if (prog < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
        countIO.unobserve(el);
      });
    }, { threshold: 0.5 });
    counters.forEach(c => countIO.observe(c));
  }

  /* ── Gallery filter ─────────────────────────────────────── */
  const filterBtns = document.querySelectorAll('.f-btn');
  const galItems   = document.querySelectorAll('.gal-item');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.dataset.filter;
      galItems.forEach(item => {
        if (cat === 'all' || item.dataset.category === cat) {
          item.classList.remove('hidden');
        } else {
          item.classList.add('hidden');
        }
      });
    });
  });

  /* ── Lightbox ───────────────────────────────────────────── */
  const lightbox = document.querySelector('.lightbox');
  const lbBg     = document.querySelector('.lb-bg');
  const lbSpan   = document.querySelector('.lb-info span');
  const lbSmall  = document.querySelector('.lb-info small');
  const lbClose  = document.querySelector('.lb-close');

  document.querySelectorAll('.gal-item').forEach(item => {
    item.addEventListener('click', () => {
      if (!lightbox) return;
      const bg    = item.querySelector('.g-bg');
      const title = item.querySelector('.g-title')?.textContent || '';
      const cat   = item.querySelector('.g-cat')?.textContent  || '';
      // Clone gradient bg into lightbox
      if (lbBg && bg) {
        lbBg.style.background = window.getComputedStyle(bg).background;
        lbBg.style.backgroundSize = '100% 100%';
      }
      if (lbSpan) lbSpan.textContent = title;
      if (lbSmall) lbSmall.textContent = cat;
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  lbClose?.addEventListener('click', closeLightbox);
  lightbox?.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeLightbox(); });

  function closeLightbox() {
    lightbox?.classList.remove('active');
    document.body.style.overflow = '';
  }

  /* ── Contact form ───────────────────────────────────────── */
  const form = document.querySelector('.booking-form form');
  const successMsg = document.querySelector('.f-success');
  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('.f-submit');
    btn.textContent = 'Sending…';
    btn.disabled = true;
    // Simulate async submit (replace with Formspree/Web3Forms in production)
    setTimeout(() => {
      form.reset();
      btn.textContent = 'Send Booking Request';
      btn.disabled = false;
      if (successMsg) {
        successMsg.style.display = 'block';
        setTimeout(() => successMsg.style.display = 'none', 5000);
      }
    }, 1500);
  });

  /* ── Smooth back-to-top on hero scroll-cue click ────────── */
  document.querySelector('.scroll-cue')?.addEventListener('click', () => {
    window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
  });

});
