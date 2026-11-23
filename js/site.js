// Menu, floating blind contours, page preview on hover, lightbox, films that loop while in view.
(function(){
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Contents menu: three lines, opens on click, and on hover where there is a mouse */
  var btn = document.querySelector('.burger'), menu = document.getElementById('menu'), t;
  function setMenu(open){ if(!menu) return; menu.classList.toggle('open', open); btn.setAttribute('aria-expanded', open); }
  if(btn && menu){
    var hoverAt = 0;
    btn.addEventListener('click', function(){
      var open = menu.classList.contains('open');
      if(open && Date.now() - hoverAt < 900) return; // opened by hover a moment ago: a click keeps it open
      setMenu(!open);
    });
    if(matchMedia('(hover:hover)').matches){
      btn.addEventListener('mouseenter', function(){ clearTimeout(t); if(!menu.classList.contains('open')) hoverAt = Date.now(); setMenu(true); });
      [btn, menu].forEach(function(el){
        el.addEventListener('mouseleave', function(){ t = setTimeout(function(){ setMenu(false); }, 260); });
        el.addEventListener('mouseenter', function(){ clearTimeout(t); });
      });
    }
    addEventListener('keydown', function(e){ if(e.key === 'Escape'){ setMenu(false); closeLb(); } });
  }

  /* Header: clear over the landing, solid after */
  var head = document.querySelector('.head'), landing = document.querySelector('.landing');
  function onScroll(){
    var y = scrollY;
    if(head && landing) head.classList.toggle('clear', y < innerHeight * .6);
    if(landing){ var f = Math.max(0, 1 - y / (innerHeight * .7)); landing.style.opacity = f; }
  }
  addEventListener('scroll', onScroll, {passive:true}); onScroll();

  /* Floating blind contours */
  if(landing){
    var els = [].slice.call(landing.querySelectorAll('.float')), W, H, items = [];
    function size(){ W = landing.clientWidth; H = landing.clientHeight; }
    size(); addEventListener('resize', size);
    els.forEach(function(el, i){
      var face = el.classList.contains('has-eyes');
      var w = W < 640 ? (face ? 34 : 24) + Math.random() * 16 : (face ? 14 : 9) + Math.random() * (face ? 9 : 8); // vw: faces larger, so their eyes read
      el.style.width = 'calc(' + w + 'vw * var(--bc-scale, 1))';
      var it = { el: el, x: Math.random(), y: Math.random(), vx: (Math.random() - .5) * .00022, vy: (Math.random() - .5) * .00022 };
      items.push(it);
      setTimeout(function(){ el.classList.add('in'); }, 120 + i * 90);
    });
    var last = performance.now();
    function frame(now){
      var dt = Math.min(48, now - last); last = now;
      items.forEach(function(it){
        var w = it.el.offsetWidth, h = it.el.offsetHeight || w;
        if(!reduce){
          var sp = window.YA_BC_SPEED != null ? window.YA_BC_SPEED : 1;
          it.x += it.vx * dt * sp; it.y += it.vy * dt * sp;
          if(it.x < -.05 || it.x > 1.05) it.vx *= -1;
          if(it.y < -.05 || it.y > 1.05) it.vy *= -1;
        }
        it.el.style.transform = 'translate3d(' + (it.x * (W - w)) + 'px,' + (it.y * (H - h)) + 'px,0)';
      });
      if(scrollY < innerHeight) requestAnimationFrame(frame); else idle = true;
    }
    var idle = false;
    requestAnimationFrame(frame);
    addEventListener('scroll', function(){ if(idle && scrollY < innerHeight){ idle = false; last = performance.now(); requestAnimationFrame(frame); } }, {passive:true});
  }

  /* Watching eyes and the pointer in the middle: both look at your cursor */
  var eyes = [].slice.call(document.querySelectorAll('.eye')), nav = document.querySelector('.pointer-nav');
  var arrow = nav && nav.querySelector('.arrow'), mx = innerWidth / 2, my = innerHeight / 3, held = null, looking = false;
  function look(){
    looking = false;
    eyes.forEach(function(e){
      var r = e.getBoundingClientRect(); if(!r.width) return;
      var cx = r.left + r.width / 2, cy = r.top + r.height / 2, dx = mx - cx, dy = my - cy, d = Math.hypot(dx, dy) || 1;
      var k = Math.min(r.width * .26, d / 10) / d;
      e.firstChild.style.setProperty('--px', (dx * k).toFixed(1) + 'px'); e.firstChild.style.setProperty('--py', (dy * k).toFixed(1) + 'px');
    });
    if(arrow){
      var a = arrow.getBoundingClientRect(), tx = mx, ty = my;
      if(held){ var h = held.getBoundingClientRect(); tx = h.left + h.width / 2; ty = h.top + h.height / 2; }
      var ang = Math.atan2(ty - (a.top + a.height / 2), tx - (a.left + a.width / 2)) * 180 / Math.PI;
      arrow.style.setProperty('--rot', (ang + 124).toFixed(1) + 'deg'); // the drawn tip points at -124°
    }
  }
  function queue(){ if(!looking){ looking = true; requestAnimationFrame(look); } }
  if(eyes.length || arrow){
    addEventListener('pointermove', function(e){ mx = e.clientX; my = e.clientY; queue(); }, {passive:true});
    addEventListener('pointerdown', function(e){ mx = e.clientX; my = e.clientY; queue(); }, {passive:true});
    (function tick(){ if(scrollY < innerHeight) queue(); setTimeout(tick, 120); })(); // keep eyes on you while the faces drift
    if(nav) nav.querySelectorAll('a').forEach(function(a){
      a.addEventListener('mouseenter', function(){ held = a; queue(); }); a.addEventListener('focus', function(){ held = a; queue(); });
      a.addEventListener('mouseleave', function(){ held = null; queue(); }); a.addEventListener('blur', function(){ held = null; queue(); });
    });
  }

  /* Editorial, Video and AI open the index filtered to that section */
  var ROUTE = {editorial: '1', video: '4', ai: '3'};
  function route(){
    var k = location.hash.replace('#', ''), f = ROUTE[k]; if(!f) return;
    var b = document.querySelector('.flt[data-f="' + f + '"]'); if(b) b.click();
    var t = document.getElementById('ix-h'); if(t) t.scrollIntoView({behavior: reduce ? 'auto' : 'smooth'});
  }
  addEventListener('hashchange', route); setTimeout(route, 0);

  /* Page preview: hovering a project shows its case study in miniature */
  var peek = document.querySelector('.peek');
  if(peek && matchMedia('(hover:hover)').matches){
    var cards = document.querySelectorAll('.card[data-peek]');
    cards.forEach(function(c){
      c.addEventListener('mouseenter', function(){
        var d = JSON.parse(c.getAttribute('data-peek'));
        var pre = c.getAttribute('data-pre') || '';
        peek.innerHTML = '<div class="ph"><span>Case study ' + d.n + '</span><span>' + d.cat + '</span></div>' +
          '<div class="pt">' + d.t + '</div><div class="pl">' + d.l + '</div>' +
          '<div class="plate"><img src="' + (/^http/.test(d.h) ? d.h : pre + 'rmedia/' + d.h) + '" alt=""></div>' +
          '<div class="pp">' + d.p.map(function(s){ return '<div class="plate"><img src="' + (/^http/.test(s) ? s : pre + 'rmedia/' + s) + '" alt=""></div>'; }).join('') + '</div>';
        peek.classList.add('on');
      });
      c.addEventListener('mouseleave', function(){ peek.classList.remove('on'); });
      c.addEventListener('mousemove', function(e){
        var x = e.clientX + 24, y = e.clientY + 24, w = 320, h = peek.offsetHeight;
        if(x + w > innerWidth - 12) x = e.clientX - w - 24;
        if(y + h > innerHeight - 12) y = innerHeight - h - 12;
        peek.style.transform = 'translate3d(' + x + 'px,' + y + 'px,0)';
      });
    });
  }

  /* Index filter by section */
  var flts = document.querySelectorAll('.flt');
  flts.forEach(function(b){ b.addEventListener('click', function(){
    var f = b.getAttribute('data-f');
    flts.forEach(function(x){ x.setAttribute('aria-pressed', x === b); });
    document.querySelectorAll('#cards .card').forEach(function(c){
      var off = f !== 'all' && c.getAttribute('data-cat') !== f;
      c.classList.toggle('dim', off); if(off) c.setAttribute('tabindex','-1'); else c.removeAttribute('tabindex');
    });
  }); });

  /* Films: muted, looping, playing only while on screen */
  if('IntersectionObserver' in window){
    var vo = new IntersectionObserver(function(es){ es.forEach(function(e){
      var v = e.target;
      if(e.isIntersecting && !reduce){ if(v.preload === 'none') v.preload = 'auto'; var p = v.play(); if(p && p.catch) p.catch(function(){}); }
      else v.pause();
    }); }, {threshold: .25});
    document.querySelectorAll('video[data-loop]').forEach(function(v){
      var st = parseFloat(v.getAttribute('data-start'));
      if(st) v.addEventListener('loadedmetadata', function(){ if(v.currentTime < 1) v.currentTime = st; }, {once:true}); // open on the chosen still, not a black intro
      vo.observe(v);
    });
  }

  /* Flipbooks: drag a page and it follows the pointer; click, swipe or arrow keys also turn */
  document.querySelectorAll('.flip').forEach(function(root){
    var pages = JSON.parse(root.getAttribute('data-pages')), ratio = parseFloat(root.getAttribute('data-ratio')) || .72;
    var pre = root.getAttribute('data-pre') || '';
    var book = root.querySelector('.fb-book'), stage = root.querySelector('.fb-stage');
    var prevB = root.querySelector('.fb-prev'), nextB = root.querySelector('.fb-next'), count = root.querySelector('.fb-count');
    if(pages.length % 2) pages.push(['', 'blank']);
    var n = pages.length / 2, at = 0, leaves = [], pw = 300;
    var edgeL = document.createElement('div'), edgeR = document.createElement('div');
    edgeL.className = 'fb-edge l'; edgeR.className = 'fb-edge r'; book.appendChild(edgeL); book.appendChild(edgeR);
    function face(p, side, cover){
      var d = document.createElement('div'); d.className = 'face ' + side + (cover ? ' cover' : '');
      if(!p[0] || p[1] === 'blank') d.className += ' blank';
      else { d.style.backgroundImage = 'url(' + pre + 'rmedia/' + p[0].replace(/\.jpg$/, '.webp') + ')'; if(p[1]) d.className += ' half-' + p[1]; }
      return d;
    }
    for(var i = 0; i < n; i++){
      var l = document.createElement('div'); l.className = 'leaf';
      l.appendChild(face(pages[2*i], 'front', i === 0)); l.appendChild(face(pages[2*i+1], 'back', i === n - 1));
      book.appendChild(l); leaves.push(l);
    }
    function size(){
      var w = stage.clientWidth - 24, maxH = Math.min(innerHeight * .8, 820);
      pw = Math.max(120, Math.floor(Math.min(w / 2, maxH * ratio)));
      book.style.width = (pw * 2) + 'px'; book.style.height = Math.round(pw / ratio) + 'px';
    }
    function label(){
      if(at === 0) return 'Cover';
      if(at === n) return 'Back cover';
      return 'Pages ' + (2*at - 1) + '–' + (2*at) + ' of ' + (pages.length - 2);
    }
    function render(moved){
      leaves.forEach(function(l, i){
        var t = i < at; l.classList.toggle('turned', t); l.style.zIndex = t ? i + 1 : n - i;
      });
      if(moved !== undefined){ var m = leaves[moved]; m.style.zIndex = n + 2; m.classList.remove('moving'); void m.offsetWidth; m.classList.add('moving'); }
      book.classList.toggle('at-start', at === 0); book.classList.toggle('at-end', at === n);
      book.style.setProperty('--shift', at === 0 ? '-25%' : at === n ? '25%' : '0%');
      edgeL.style.width = (at === 0 ? 0 : 2 + 6 * at / n) + 'px';
      edgeR.style.width = (at === n ? 0 : 2 + 6 * (n - at) / n) + 'px';
      prevB.disabled = at === 0; nextB.disabled = at === n; count.textContent = label();
    }
    function go(d){ var t = Math.max(0, Math.min(n, at + d)); if(t === at) return; var moved = d > 0 ? at : t; at = t; render(moved); }
    prevB.addEventListener('click', function(){ go(-1); }); nextB.addEventListener('click', function(){ go(1); });

    /* Drag: the page rotates with the pointer and finishes the turn past a third */
    var drag = null;
    book.addEventListener('pointerdown', function(e){
      var r = book.getBoundingClientRect(), right = e.clientX > r.left + r.width / 2;
      var leaf = right ? leaves[at] : leaves[at - 1];
      drag = {x: e.clientX, right: right, leaf: leaf, p: 0, moved: false};
      if(leaf){ leaf.style.transition = 'none'; leaf.style.zIndex = n + 3; }
      book.setPointerCapture && book.setPointerCapture(e.pointerId);
    });
    book.addEventListener('pointermove', function(e){
      if(!drag || !drag.leaf) return;
      var dx = e.clientX - drag.x; if(Math.abs(dx) > 6) drag.moved = true;
      if(!drag.moved) return;
      var p = Math.max(0, Math.min(1, (drag.right ? -dx : dx) / (pw * 1.4))); drag.p = p;
      var ang = drag.right ? -180 * p : -180 + 180 * p;
      drag.leaf.style.transform = 'rotateY(' + ang + 'deg)';
      drag.leaf.style.setProperty('--sh', (Math.sin(p * Math.PI) * .45).toFixed(3));
    });
    function end(){
      if(!drag) return; var d = drag; drag = null;
      if(d.leaf){ d.leaf.style.transition = ''; d.leaf.style.transform = ''; d.leaf.style.removeProperty('--sh'); }
      if(!d.moved){ go(d.right ? 1 : -1); return; }
      if(d.p > .3) go(d.right ? 1 : -1); else render();
    }
    book.addEventListener('pointerup', end); book.addEventListener('pointercancel', end);
    book.addEventListener('mousemove', function(e){
      if(drag) return;
      var r = book.getBoundingClientRect(); book.classList.toggle('hint-r', e.clientX > r.left + r.width / 2 && at < n); book.classList.toggle('hint-l', e.clientX <= r.left + r.width / 2 && at > 0);
    });
    book.addEventListener('mouseleave', function(){ book.classList.remove('hint-r', 'hint-l'); });
    root.addEventListener('keydown', function(e){ if(e.key === 'ArrowRight'){ e.preventDefault(); go(1); } if(e.key === 'ArrowLeft'){ e.preventDefault(); go(-1); } });
    size(); render(); addEventListener('resize', size);
  });

  /* Lightbox for outcome and process plates */
  var lb = document.querySelector('.lb'), shots = [].slice.call(document.querySelectorAll('.plate.zoom img')), at = 0;
  function show(i){ at = (i + shots.length) % shots.length; lb.querySelector('img').src = shots[at].currentSrc || shots[at].src; lb.querySelector('img').alt = shots[at].alt; lb.querySelector('.ct').textContent = (at + 1) + ' / ' + shots.length; }
  var opener = null;
  function closeLb(){ if(lb && lb.classList.contains('open')){ lb.classList.remove('open'); if(opener) opener.focus(); } }
  function openLb(i, from){ opener = from; show(i); lb.classList.add('open'); lb.querySelector('.x').focus(); }
  if(lb){
    shots.forEach(function(img, i){
      var p = img.parentNode; p.setAttribute('role','button'); p.setAttribute('tabindex','0'); p.setAttribute('aria-label','Open image ' + (i+1));
      p.addEventListener('click', function(){ openLb(i, p); });
      p.addEventListener('keydown', function(e){ if(e.key === 'Enter' || e.key === ' '){ e.preventDefault(); openLb(i, p); } });
    });
    lb.querySelector('.x').addEventListener('click', closeLb);
    lb.querySelector('.pv').addEventListener('click', function(){ show(at - 1); });
    lb.querySelector('.nx').addEventListener('click', function(){ show(at + 1); });
    addEventListener('keydown', function(e){ if(!lb.classList.contains('open')) return; if(e.key === 'ArrowLeft') show(at - 1); if(e.key === 'ArrowRight') show(at + 1); });
  }

  /* Project log: dates, duration, role, team and course from js/project-log.js */
  var MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  function pd(s){ var p = s.split('-'); return new Date(+p[0], +p[1] - 1, +p[2]); }
  function dur(a, b){
    var days = Math.round((pd(b) - pd(a)) / 864e5) + 1;
    if(days < 14) return days + (days === 1 ? ' day' : ' days');
    var w = Math.round(days / 7); if(w <= 10) return w + ' weeks';
    var m = Math.round(days / 30.4); return m + (m === 1 ? ' month' : ' months');
  }
  function span(a, b){
    var x = pd(a), y = pd(b);
    if(x.getFullYear() === y.getFullYear() && x.getMonth() === y.getMonth()) return MONTHS[x.getMonth()] + ' ' + x.getFullYear();
    if(x.getFullYear() === y.getFullYear()) return MONTHS[x.getMonth()] + ' – ' + MONTHS[y.getMonth()] + ' ' + y.getFullYear();
    return MONTHS[x.getMonth()] + ' ' + x.getFullYear() + ' – ' + MONTHS[y.getMonth()] + ' ' + y.getFullYear();
  }
  window.YA_RENDER_LOG = function(log){
    var slug = (location.pathname.match(/work\/([^.\/]+)\.html/) || [])[1], dl = document.querySelector('.cs-top .dl, .rw-body .dl');
    if(!slug || !dl) return;
    dl.querySelectorAll('[data-log]').forEach(function(n){ n.remove(); });
    var e = (log || {})[slug]; if(!e) return;
    var rows = [];
    if(e.start && e.end){ rows.push(['Dates', span(e.start, e.end)]); rows.push(['Duration', dur(e.start, e.end)]); }
    if(e.role) rows.push(['Role', e.role]);
    if(e.team) rows.push(['Team', e.team]);
    if(e.course) rows.push(['Course', e.course]);
    rows.forEach(function(r){
      var dt = document.createElement('dt'), dd = document.createElement('dd');
      dt.textContent = r[0]; dd.textContent = r[1]; dt.setAttribute('data-log', ''); dd.setAttribute('data-log', '');
      dl.appendChild(dt); dl.appendChild(dd);
    });
  };
  window.YA_RENDER_LOG(window.PROJECT_LOG);

  /* Edit panel: only on your own computer, or with ?edit in the address */
  if(location.protocol === 'file:' || /^(localhost|127\.0\.0\.1)$/.test(location.hostname) || /[?&]edit\b/.test(location.search)){
    var s = document.createElement('script'); s.src = (document.querySelector('script[src$="js/site.js"]').getAttribute('src').replace('site.js', 'tune.js')); document.body.appendChild(s);
  }
})();
