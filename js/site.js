// Menu, floating blind contours, page preview on hover, lightbox, films that loop while in view.
(function(){
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Contents menu: three lines, opens on click, and on hover where there is a mouse */
  var btn = document.querySelector('.burger'), menu = document.getElementById('menu'), t;
  function setMenu(open){ if(!menu) return; menu.classList.toggle('open', open); btn.setAttribute('aria-expanded', open); }
  if(btn && menu){
    btn.addEventListener('click', function(){ setMenu(!menu.classList.contains('open')); });
    if(matchMedia('(hover:hover)').matches){
      btn.addEventListener('mouseenter', function(){ clearTimeout(t); setMenu(true); });
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
      var w = (W < 640 ? 26 : 9) + Math.random() * (W < 640 ? 22 : 14); // vw
      el.style.width = w + 'vw';
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
          it.x += it.vx * dt; it.y += it.vy * dt;
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
          '<div class="pp">' + d.p.map(function(s){ return '<div class="plate"><img src="' + pre + 'rmedia/' + s + '" alt=""></div>'; }).join('') + '</div>';
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
    document.querySelectorAll('video[data-loop]').forEach(function(v){ vo.observe(v); });
  }

  /* Flipbooks: each leaf carries two pages; click, drag, swipe or use the arrows */
  document.querySelectorAll('.flip').forEach(function(root){
    var pages = JSON.parse(root.getAttribute('data-pages')), ratio = parseFloat(root.getAttribute('data-ratio')) || .72;
    var pre = root.getAttribute('data-pre') || '';
    var book = root.querySelector('.fb-book'), stage = root.querySelector('.fb-stage');
    var prevB = root.querySelector('.fb-prev'), nextB = root.querySelector('.fb-next'), count = root.querySelector('.fb-count');
    if(pages.length % 2) pages.push(['', 'blank']);
    var n = pages.length / 2, at = 0, leaves = [];
    function face(p, side){
      var d = document.createElement('div'); d.className = 'face ' + side;
      if(!p[0] || p[1] === 'blank') d.className += ' blank';
      else { d.style.backgroundImage = 'url(' + pre + 'rmedia/' + p[0] + ')'; if(p[1]) d.className += ' half-' + p[1]; }
      return d;
    }
    for(var i = 0; i < n; i++){
      var l = document.createElement('div'); l.className = 'leaf';
      l.appendChild(face(pages[2*i], 'front')); l.appendChild(face(pages[2*i+1], 'back'));
      book.appendChild(l); leaves.push(l);
    }
    function size(){
      var w = stage.clientWidth - 16, maxH = Math.min(innerHeight * .74, 760);
      var pw = Math.min(w / 2, maxH * ratio); pw = Math.max(120, Math.floor(pw));
      book.style.width = (pw * 2) + 'px'; book.style.height = Math.round(pw / ratio) + 'px';
    }
    function label(){
      if(at === 0) return 'Cover';
      if(at === n) return 'Back';
      return (2*at - 1) + '–' + (2*at) + ' / ' + (pages.length - 2);
    }
    function render(moved){
      leaves.forEach(function(l, i){
        var t = i < at; l.classList.toggle('turned', t); l.classList.remove('peek-r','peek-l');
        l.style.zIndex = t ? i + 1 : n - i;
      });
      if(moved !== undefined){ var m = leaves[moved]; m.style.zIndex = n + 2; m.classList.remove('moving'); void m.offsetWidth; m.classList.add('moving'); }
      book.classList.toggle('at-start', at === 0); book.classList.toggle('at-end', at === n);
      book.style.transform = at === 0 ? 'translateX(-25%)' : at === n ? 'translateX(25%)' : 'none';
      prevB.disabled = at === 0; nextB.disabled = at === n; count.textContent = label();
    }
    function go(d){ var t = Math.max(0, Math.min(n, at + d)); if(t === at) return; var moved = d > 0 ? at : t; at = t; render(moved); }
    prevB.addEventListener('click', function(){ go(-1); }); nextB.addEventListener('click', function(){ go(1); });
    var sx = null, dragged = false;
    book.addEventListener('pointerdown', function(e){ sx = e.clientX; dragged = false; });
    book.addEventListener('pointerup', function(e){
      if(sx === null) return; var dx = e.clientX - sx; sx = null;
      if(Math.abs(dx) > 40){ go(dx < 0 ? 1 : -1); return; }
      var r = book.getBoundingClientRect(); go(e.clientX > r.left + r.width / 2 ? 1 : -1);
    });
    book.addEventListener('mousemove', function(e){
      var r = book.getBoundingClientRect(), right = e.clientX > r.left + r.width / 2;
      leaves.forEach(function(l){ l.classList.remove('peek-r','peek-l'); });
      if(right && at < n) leaves[at].classList.add('peek-r'); else if(!right && at > 0) leaves[at-1].classList.add('peek-l');
    });
    book.addEventListener('mouseleave', function(){ leaves.forEach(function(l){ l.classList.remove('peek-r','peek-l'); }); });
    root.addEventListener('keydown', function(e){ if(e.key === 'ArrowRight'){ e.preventDefault(); go(1); } if(e.key === 'ArrowLeft'){ e.preventDefault(); go(-1); } });
    size(); render(); addEventListener('resize', size);
  });

  /* Lightbox for outcome and process plates */
  var lb = document.querySelector('.lb'), shots = [].slice.call(document.querySelectorAll('.plate.zoom img')), at = 0;
  function show(i){ at = (i + shots.length) % shots.length; lb.querySelector('img').src = shots[at].currentSrc || shots[at].src; lb.querySelector('img').alt = shots[at].alt; lb.querySelector('.ct').textContent = (at + 1) + ' / ' + shots.length; }
  function closeLb(){ if(lb) lb.classList.remove('open'); }
  if(lb){
    shots.forEach(function(img, i){
      var p = img.parentNode; p.setAttribute('role','button'); p.setAttribute('tabindex','0'); p.setAttribute('aria-label','Open image ' + (i+1));
      p.addEventListener('click', function(){ show(i); lb.classList.add('open'); });
      p.addEventListener('keydown', function(e){ if(e.key === 'Enter' || e.key === ' '){ e.preventDefault(); show(i); lb.classList.add('open'); } });
    });
    lb.querySelector('.x').addEventListener('click', closeLb);
    lb.querySelector('.pv').addEventListener('click', function(){ show(at - 1); });
    lb.querySelector('.nx').addEventListener('click', function(){ show(at + 1); });
    addEventListener('keydown', function(e){ if(!lb.classList.contains('open')) return; if(e.key === 'ArrowLeft') show(at - 1); if(e.key === 'ArrowRight') show(at + 1); });
  }
})();
