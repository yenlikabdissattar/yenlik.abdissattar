/* Yenlik Abdissattar — Issue 01
   - Vertical wheel movement slides the issue sideways; when it stops,
     the issue settles on the nearest column line of the 8-column screen.
   - Project panels show one image at a time: hover a thumbnail to look,
     click to keep it.
   - Counter, progress line, films that play only on screen, and the
     three-line project text. No libraries. */
(() => {
  const CLOUD = 'https://res.cloudinary.com/dnarrwa1m';
  const root = document.scrollingElement || document.documentElement;
  const wide = window.matchMedia('(min-width: 721px)');
  const calm = window.matchMedia('(prefers-reduced-motion: reduce)');
  const index = document.getElementById('index');
  const panels = [...document.querySelectorAll('.issue > .panel')];
  const countN = document.querySelector('.count-n');
  const countT = document.querySelector('.count-t');
  const bar = document.querySelector('.progress span');

  const horizontal = () => wide.matches;
  const col = () => window.innerWidth / 8;
  const behavior = () => (calm.matches ? 'auto' : 'smooth');

  /* ---- wheel → sideways, then settle on a column line ---- */
  let settleTimer;
  const settle = () => {
    clearTimeout(settleTimer);
    settleTimer = setTimeout(() => {
      if (!horizontal()) return;
      const c = col();
      const max = root.scrollWidth - window.innerWidth;
      const target = Math.min(Math.round(root.scrollLeft / c) * c, max);
      if (Math.abs(target - root.scrollLeft) > 1) root.scrollTo({ left: target, behavior: behavior() });
    }, 160);
  };

  window.addEventListener('wheel', (e) => {
    if (!horizontal() || index.open || e.ctrlKey) return;
    const inner = e.target.closest('.text');
    if (inner && inner.scrollHeight > inner.clientHeight + 1) {
      const up = e.deltaY < 0;
      const atTop = inner.scrollTop <= 0;
      const atEnd = inner.scrollTop + inner.clientHeight >= inner.scrollHeight - 1;
      if ((up && !atTop) || (!up && !atEnd)) return;   // let open project text scroll first
    }
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      e.preventDefault();
      const step = e.deltaMode === 1 ? 32 : e.deltaMode === 2 ? window.innerWidth : 1;
      root.scrollLeft += e.deltaY * step;
    }
    settle();
  }, { passive: false });
  window.addEventListener('touchend', settle, { passive: true });

  /* ---- keys: one panel at a time ---- */
  const currentIndex = () => {
    const p = (horizontal() ? root.scrollLeft : root.scrollTop) + 4;
    let i = 0;
    panels.forEach((el, k) => { if ((horizontal() ? el.offsetLeft : el.offsetTop) <= p) i = k; });
    return i;
  };
  const go = (el) => el && el.scrollIntoView({ behavior: behavior(), inline: 'start', block: 'start' });
  window.addEventListener('keydown', (e) => {
    if (!horizontal() || index.open) return;
    if (e.key === ' ' && e.target.closest('button, a, input, textarea, select')) return;
    const next = ['PageDown', 'ArrowDown'].includes(e.key) || (e.key === ' ' && !e.shiftKey);
    const prev = ['PageUp', 'ArrowUp'].includes(e.key) || (e.key === ' ' && e.shiftKey);
    if (e.key === 'Home') { e.preventDefault(); go(panels[0]); }
    else if (e.key === 'End') { e.preventDefault(); go(panels[panels.length - 1]); }
    else if (next) { e.preventDefault(); go(panels[Math.min(currentIndex() + 1, panels.length - 1)]); }
    else if (prev) { e.preventDefault(); go(panels[Math.max(currentIndex() - 1, 0)]); }
    else if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') settle();
  });

  /* ---- counter + progress ---- */
  let ticking = false;
  const update = () => {
    ticking = false;
    const h = horizontal();
    const p = h ? root.scrollLeft : root.scrollTop;
    const max = h ? root.scrollWidth - window.innerWidth : root.scrollHeight - window.innerHeight;
    bar.style.transform = `scaleX(${max > 0 ? Math.min(p / max, 1) : 0})`;
    const el = panels[currentIndex()];
    const num = el.querySelector('.num');
    countN.textContent = num ? num.textContent : el.dataset.label;
    countT.hidden = !num;
  };
  const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } };
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', () => { onScroll(); settle(); });
  update();

  /* ---- links inside the issue ---- */
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

  /* ---- index ---- */
  const ixBtn = document.querySelector('.ix-btn');
  ixBtn.addEventListener('click', () => { index.showModal(); ixBtn.setAttribute('aria-expanded', 'true'); });
  index.querySelector('.ix-close').addEventListener('click', () => index.close());
  index.addEventListener('close', () => { ixBtn.setAttribute('aria-expanded', 'false'); ixBtn.focus(); });

  /* ---- three-line text ---- */
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

  /* ---- films: load and play only while on screen ---- */
  const io = new IntersectionObserver((entries) => {
    entries.forEach(({ target: v, isIntersecting }) => {
      if (isIntersecting) {
        if (!v.src && v.dataset.src) v.src = v.dataset.src;
        if (!calm.matches || v.dataset.user === '1') v.play().catch(() => {});
      } else if (!v.paused) v.pause();
    });
  }, { threshold: 0.25 });
  const watch = (v) => v && v.dataset.src && io.observe(v);
  document.querySelectorAll('video[data-src]').forEach(watch);

  document.addEventListener('click', (e) => {
    const b = e.target.closest('.sound');
    if (!b) return;
    const v = b.closest('.panel').querySelector('.runway video, .stage video');
    if (!v) return;
    if (!v.src) v.src = v.dataset.src;
    v.muted = !v.muted;
    v.dataset.user = '1';
    if (!v.muted) v.play().catch(() => {});
    b.setAttribute('aria-pressed', String(!v.muted));
    b.textContent = v.muted ? 'Sound on' : 'Sound off';
  });

  /* ---- one image at a time: hover to look, click to keep ---- */
  const imgURL = (pid, w) => `${CLOUD}/image/upload/f_auto,q_auto,c_limit,w_${w}/${pid}`;
  const vidURL = (pid) => `${CLOUD}/video/upload/q_auto,vc_auto,w_1280/${pid}.mp4`;
  const posterURL = (pid) => `${CLOUD}/video/upload/so_2,f_auto,q_auto,w_1280/${pid}.jpg`;

  document.querySelectorAll('.strip').forEach((strip) => {
    const panel = strip.closest('.panel');
    const stage = panel.querySelector('.stage');
    const capI = panel.querySelector('.cap-i');
    const capT = panel.querySelector('.cap-t');
    const thumbs = [...strip.querySelectorAll('.thumb')];
    const title = panel.dataset.label;
    let kept = thumbs[0];
    let shown = thumbs[0];

    const show = (t) => {
      if (t === shown) return;
      shown = t;
      const d = t.dataset;
      let el;
      if (d.type === 'video') {
        el = document.createElement('video');
        Object.assign(el, { muted: true, loop: true, playsInline: true, poster: posterURL(d.pid) });
        el.dataset.src = vidURL(d.pid);
        el.setAttribute('aria-label', `${title}, film`);
      } else {
        el = document.createElement('img');
        el.src = imgURL(d.pid, 1200);
        el.srcset = [640, 1200, 2000].filter((w) => w <= Math.max(+d.w, 640)).map((w) => `${imgURL(d.pid, w)} ${w}w`).join(', ');
        el.sizes = '(max-width: 720px) 100vw, 50vw';
        el.alt = `${title}, ${d.cap.toLowerCase()}`;
        el.decoding = 'async';
      }
      el.width = +d.w; el.height = +d.h;
      const old = stage.firstElementChild;
      if (old && old.tagName === 'VIDEO') io.unobserve(old);
      stage.replaceChildren(el);
      if (el.tagName === 'VIDEO') watch(el);
      if (capI) capI.textContent = `${+d.i + 1} / ${thumbs.length}`;
      if (capT) capT.textContent = d.cap;
    };

    thumbs.forEach((t) => {
      t.addEventListener('mouseenter', () => show(t));
      t.addEventListener('focus', () => show(t));
      t.addEventListener('click', () => {
        kept.setAttribute('aria-pressed', 'false');
        kept = t;
        t.setAttribute('aria-pressed', 'true');
        show(t);
      });
    });
    strip.addEventListener('mouseleave', () => show(kept));
    strip.addEventListener('focusout', (e) => { if (!strip.contains(e.relatedTarget)) show(kept); });

    /* arrow keys move through the thumbnails */
    strip.addEventListener('keydown', (e) => {
      if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
      const i = thumbs.indexOf(document.activeElement);
      if (i < 0) return;
      e.preventDefault(); e.stopPropagation();
      const n = thumbs[(i + (e.key === 'ArrowRight' ? 1 : -1) + thumbs.length) % thumbs.length];
      n.focus(); n.click();
    });
  });
})();
