/* Yenlik Abdissattar — Issue 01
   Turns vertical wheel movement into sideways page turning, keeps the
   page counter and progress line in sync, lazy-plays the films, and
   opens the three-line story text. No libraries. */
(() => {
  const root = document.scrollingElement || document.documentElement;
  const wide = window.matchMedia('(min-width: 721px)');
  const calm = window.matchMedia('(prefers-reduced-motion: reduce)');
  const index = document.getElementById('index');
  const pages = [...document.querySelectorAll('.issue > section')];
  const countN = document.querySelector('.count-n');
  const bar = document.querySelector('.progress span');

  const horizontal = () => wide.matches;
  const pos = () => (horizontal() ? root.scrollLeft : root.scrollTop);
  const offsetOf = (el) => (horizontal() ? el.offsetLeft : el.offsetTop);

  /* wheel → sideways */
  window.addEventListener('wheel', (e) => {
    if (!horizontal() || index.open || e.ctrlKey) return;
    if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;
    const inner = e.target.closest('.story-body');
    if (inner && inner.scrollHeight > inner.clientHeight) {
      const atTop = inner.scrollTop <= 0 && e.deltaY < 0;
      const atEnd = inner.scrollTop + inner.clientHeight >= inner.scrollHeight - 1 && e.deltaY > 0;
      if (!atTop && !atEnd) return;            // let long story text scroll first
    }
    e.preventDefault();
    const step = e.deltaMode === 1 ? 32 : e.deltaMode === 2 ? window.innerWidth : 1;
    root.scrollLeft += e.deltaY * step;
  }, { passive: false });

  /* keys: page down / up turn one page */
  const go = (el) => el && el.scrollIntoView({ behavior: calm.matches ? 'auto' : 'smooth', inline: 'start', block: 'start' });
  const current = () => {
    const p = pos() + 4;
    let i = 0;
    pages.forEach((el, k) => { if (offsetOf(el) <= p) i = k; });
    return i;
  };
  window.addEventListener('keydown', (e) => {
    if (!horizontal() || index.open) return;
    if (e.target.closest('input, textarea, select, button, a') && e.key === ' ') return;
    const next = ['PageDown', 'ArrowDown', ' '].includes(e.key) && !e.shiftKey;
    const prev = ['PageUp', 'ArrowUp'].includes(e.key) || (e.key === ' ' && e.shiftKey);
    if (e.key === 'Home') { e.preventDefault(); go(pages[0]); }
    else if (e.key === 'End') { e.preventDefault(); go(pages[pages.length - 1]); }
    else if (next) { e.preventDefault(); go(pages[Math.min(current() + 1, pages.length - 1)]); }
    else if (prev) { e.preventDefault(); go(pages[Math.max(current() - 1, 0)]); }
  });

  /* counter + progress */
  let ticking = false;
  const update = () => {
    ticking = false;
    const p = pos();
    const max = horizontal() ? root.scrollWidth - window.innerWidth : root.scrollHeight - window.innerHeight;
    bar.style.transform = `scaleX(${max > 0 ? Math.min(p / max, 1) : 0})`;
    if (max > 0 && p >= max - 2) { countN.textContent = pages[pages.length - 1].dataset.n; return; }
    const el = pages[current()];
    const n = Number(el.dataset.n);
    if (el.classList.contains('cover')) { countN.textContent = 'Cover'; return; }
    const w = Number(el.dataset.w) || 1;
    const within = horizontal() && w === 2 && p - el.offsetLeft > el.offsetWidth / 2 - 4 ? 1 : 0;
    countN.textContent = String(n + within);
  };
  const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } };
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  update();

  /* in-issue links */
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const target = document.getElementById(a.getAttribute('href').slice(1));
    if (!target) return;
    e.preventDefault();
    if (index.open) index.close();
    go(target);
    history.replaceState(null, '', a.getAttribute('href'));
  });

  /* index dialog */
  const ixBtn = document.querySelector('.ix-btn');
  ixBtn.addEventListener('click', () => { index.showModal(); ixBtn.setAttribute('aria-expanded', 'true'); });
  index.querySelector('.ix-close').addEventListener('click', () => index.close());
  index.addEventListener('close', () => { ixBtn.setAttribute('aria-expanded', 'false'); ixBtn.focus(); });

  /* story text: three lines, then open */
  document.querySelectorAll('.more').forEach((m) => {
    const btn = m.nextElementSibling;
    const check = () => { if (!m.classList.contains('open')) btn.hidden = m.scrollHeight <= m.clientHeight + 1; };
    check();
    window.addEventListener('resize', check);
    btn.addEventListener('click', () => {
      const open = m.classList.toggle('open');
      btn.setAttribute('aria-expanded', String(open));
      btn.textContent = open ? 'Show less' : 'Read more';
    });
  });

  /* films: load and play only while on screen */
  const vids = [...document.querySelectorAll('video[data-src]')];
  const io = new IntersectionObserver((entries) => {
    entries.forEach(({ target: v, isIntersecting }) => {
      if (isIntersecting) {
        if (!v.src) v.src = v.dataset.src;
        if (!calm.matches || v.dataset.user === '1') v.play().catch(() => {});
      } else if (!v.paused) v.pause();
    });
  }, { rootMargin: '0px 50% 0px 50%', threshold: 0.25 });
  vids.forEach((v) => io.observe(v));

  document.querySelectorAll('.sound').forEach((b) => {
    b.addEventListener('click', () => {
      const v = b.closest('figure').querySelector('video');
      if (!v.src) v.src = v.dataset.src;
      v.muted = !v.muted;
      v.dataset.user = '1';
      if (!v.muted) v.play().catch(() => {});
      b.setAttribute('aria-pressed', String(!v.muted));
      b.textContent = v.muted ? 'Sound on' : 'Sound off';
    });
  });
})();
