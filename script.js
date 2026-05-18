/* ══════════════════════════════════════════
   Yenlik Abdissattar — Portfolio
   script.js
   ══════════════════════════════════════════ */

(function () {

  /* ── Mobile navigation (injected for all pages) ── */
  if (window.innerWidth <= 768) {
    var isSubPage = window.location.pathname.indexOf('/projects/') !== -1;
    var base = isSubPage ? '../' : '';

    var mobileBtn = document.createElement('button');
    mobileBtn.id = 'mobile-nav-btn';
    mobileBtn.setAttribute('aria-label', 'Open menu');
    mobileBtn.textContent = '≡';
    document.body.appendChild(mobileBtn);

    var mobileDrawer = document.createElement('div');
    mobileDrawer.id = 'mobile-nav-drawer';
    mobileDrawer.innerHTML =
      '<button id="mobile-nav-close-btn" aria-label="Close menu">✕</button>' +
      '<nav class="mobile-nav-links">' +
        '<a href="' + base + 'index.html">Home</a>' +
        '<a href="' + base + 'about.html">About</a>' +
        '<a href="' + base + 'index.html#cat-editorial">Editorial</a>' +
        '<a href="' + base + 'index.html#cat-film">Film</a>' +
        '<a href="' + base + 'index.html#cat-ai">AI</a>' +
        '<a href="' + base + 'index.html#cat-art">Art</a>' +
        '<a href="' + base + 'index.html#cat-colour">Colour Design</a>' +
        '<a href="' + base + 'index.html#cat-illustration">Illustration</a>' +
      '</nav>' +
      '<div class="mobile-nav-sub">' +
        '<a href="' + base + 'index.html#contact">Contact</a>' +
      '</div>';
    document.body.appendChild(mobileDrawer);

    function openMobileNav() {
      mobileDrawer.classList.add('is-open');
      document.body.style.overflow = 'hidden';
    }
    function closeMobileNav() {
      mobileDrawer.classList.remove('is-open');
      document.body.style.overflow = '';
    }

    mobileBtn.addEventListener('click', openMobileNav);
    mobileDrawer.querySelector('#mobile-nav-close-btn').addEventListener('click', closeMobileNav);
    document.addEventListener('keydown', function(e) { if (e.key === 'Escape') closeMobileNav(); });
  }

  /* ── Navigation toggle (side panel — kept for project pages that still use it) ── */
  var trigger = document.getElementById('nav-trigger');
  var panel   = document.getElementById('nav-panel');
  var overlay = document.getElementById('nav-overlay');
  var navClose = document.getElementById('nav-close');

  if (trigger && panel && overlay && navClose) {
    function openNav() {
      panel.classList.add('is-open');
      overlay.classList.add('is-visible');
      panel.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }

    function closeNav() {
      panel.classList.remove('is-open');
      overlay.classList.remove('is-visible');
      panel.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }

    trigger.addEventListener('click', openNav);
    navClose.addEventListener('click', closeNav);
    overlay.addEventListener('click', closeNav);
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeNav();
    });
  }


  /* ── Landing: balloon-drift blind contours ── */
  const landing  = document.getElementById('landing');
  const contours = document.querySelectorAll('.contour');

  if (landing && contours.length) {

    const driftAnims = ['drift-a', 'drift-b', 'drift-c'];

    /* Width as % of viewport — mix of small, medium, larger */
    const sizes = [7, 9, 11, 8, 13, 7, 10, 12, 8, 9, 11, 7, 14, 8, 10];

    /* Subtle rotations */
    const rotations = [-8, 4, -3, 12, -6, 2, -14, 7, -2, 10, -5, 15, -9, 3, -11];

    /* Scatter positions (top%, left%) */
    const positions = [
      [8,  10], [15, 55], [5,  80], [30, 20], [25, 72],
      [50, 5 ], [45, 40], [55, 75], [70, 15], [65, 55],
      [80, 30], [78, 80], [20, 38], [60, 88], [40, 62]
    ];

    /* Slow drift durations — balloon-like */
    const durations = [9, 11, 8, 13, 10, 12, 9, 14, 11, 8, 10, 13, 9, 11, 12];

    contours.forEach(function (img, i) {
      var w    = sizes[i % sizes.length];
      var rot  = rotations[i % rotations.length];
      var pos  = positions[i % positions.length];
      var dur  = durations[i % durations.length];
      var anim = driftAnims[i % driftAnims.length];

      img.style.width     = w + 'vw';
      img.style.top       = pos[0] + '%';
      img.style.left      = pos[1] + '%';
      img.style.setProperty('--r', rot + 'deg');
      img.style.transform = 'rotate(' + rot + 'deg)';
      img.style.animation = anim + ' ' + dur + 's ease-in-out infinite';
      img.style.animationDelay = (i * 0.6) + 's';
    });

    /* Scroll fade — landing opacity → 0 as user scrolls past */
    window.addEventListener('scroll', function () {
      var scrollY  = window.scrollY;
      var fadeOver = window.innerHeight * 0.6;
      var opacity  = Math.max(0, 1 - scrollY / fadeOver);
      landing.style.opacity = opacity;
    }, { passive: true });
  }


  /* ── Generic cycling preview helper ── */
  function cyclePreviews(selector, activeClass, interval) {
    var slides = document.querySelectorAll(selector);
    if (slides.length < 2) return;
    var active = 0;
    setInterval(function () {
      slides[active].classList.remove(activeClass);
      active = (active + 1) % slides.length;
      slides[active].classList.add(activeClass);
    }, interval);
  }

  /* Gouache preview: cycle every 3s */
  cyclePreviews('.gouache-slide', 'gouache-slide--active', 3000);


  /* ── Homepage Postcard 3D Carousel ── */
  var homeTrack = document.querySelector('.postcard-home-track');
  if (homeTrack) {
    var hpSlides    = homeTrack.querySelectorAll('.pc-home-slide');
    var hpCurrent   = 0;
    var hpTotal     = hpSlides.length;
    var hpAnimating = false;

    function hpGoTo(next) {
      if (hpAnimating || next === hpCurrent) return;
      hpAnimating = true;

      var prev = hpCurrent;
      hpCurrent = next;

      hpSlides[prev].classList.remove('pc-home-slide--active');
      hpSlides[prev].classList.add('pc-home-slide--exit');

      setTimeout(function () {
        hpSlides[prev].classList.remove('pc-home-slide--exit');
      }, 750);

      hpSlides[hpCurrent].classList.add('pc-home-slide--active');

      setTimeout(function () { hpAnimating = false; }, 750);
    }

    setInterval(function () {
      hpGoTo((hpCurrent + 1) % hpTotal);
    }, 3000);
  }


  /* ── 3D Postcard Slider (illustration-postcards.html) ── */
  var track = document.querySelector('.postcard-3d-track');
  if (track) {
    var pcSlides = track.querySelectorAll('.pc-slide');
    var dots     = document.querySelectorAll('.pc-dot');
    var current  = 0;
    var total    = pcSlides.length;
    var isAnimating = false;

    function goToSlide(next) {
      if (isAnimating || next === current) return;
      isAnimating = true;

      var prev = current;
      current  = next;

      pcSlides[prev].classList.remove('pc-slide--active');
      pcSlides[prev].classList.add('pc-slide--exit');

      setTimeout(function () {
        pcSlides[prev].classList.remove('pc-slide--exit');
      }, 900);

      pcSlides[current].classList.add('pc-slide--active');

      dots.forEach(function (d, i) {
        d.classList.toggle('pc-dot--active', i === current);
      });

      setTimeout(function () { isAnimating = false; }, 900);
    }

    setInterval(function () {
      goToSlide((current + 1) % total);
    }, 3000);

    dots.forEach(function (dot, i) {
      dot.addEventListener('click', function () { goToSlide(i); });
    });
  }



  /* ── Lazy-play thumbnail videos — only buffer when near viewport ── */
  var thumbVideos = document.querySelectorAll('.project-row-thumb video');
  if (thumbVideos.length && 'IntersectionObserver' in window) {
    var vidObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        var v = entry.target;
        if (entry.isIntersecting) {
          v.play();
        } else {
          v.pause();
        }
      });
    }, { rootMargin: '150px' });
    thumbVideos.forEach(function (v) { vidObserver.observe(v); });
  }


  /* ── Project row stagger index ── */
  document.querySelectorAll('.project-row').forEach(function (row, i) {
    row.style.setProperty('--row-i', i);
  });


  /* ── X-ray intro — skip only on back/forward navigation ── */
  var navEntry = performance.getEntriesByType('navigation')[0];
  var isBackNav = (navEntry && navEntry.type === 'back_forward');

  var xrayScreen = document.getElementById('xray-screen');
  var xrayIntro  = document.getElementById('xray-intro');

  if (isBackNav) {
    if (xrayScreen) xrayScreen.remove();
    if (xrayIntro)  xrayIntro.remove();
  } else {
    if (xrayScreen) {
      xrayScreen.addEventListener('animationend', function () {
        xrayScreen.remove();
      });
    }

    if (xrayIntro) {
      var xrayTag = xrayIntro.querySelector('.xray-intro-tag');
      if (xrayTag) {
        xrayTag.addEventListener('animationend', function () {
          xrayIntro.remove();
        });
      }
    }
  }

  /* Handle bfcache restore (browser back skips JS entirely) */
  window.addEventListener('pageshow', function (e) {
    if (e.persisted) {
      var s = document.getElementById('xray-screen');
      var n = document.getElementById('xray-intro');
      if (s) s.remove();
      if (n) n.remove();
    }
  });


  /* ── Contour lightbox ── */
  var lightbox   = document.getElementById('contour-lightbox');
  var lbImg      = document.getElementById('contour-lb-img');
  var lbClose    = document.getElementById('contour-lb-close');

  if (lightbox && lbImg && lbClose) {
    contours.forEach(function (img) {
      img.addEventListener('click', function (e) {
        e.stopPropagation();
        lbImg.src = img.src;
        lightbox.classList.add('is-open');
        lightbox.setAttribute('aria-hidden', 'false');
      });
    });

    function closeLightbox() {
      lightbox.classList.remove('is-open');
      lightbox.setAttribute('aria-hidden', 'true');
    }

    lbClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) closeLightbox();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && lightbox.classList.contains('is-open')) closeLightbox();
    });
  }


  /* ── Page wipe — runs on project detail pages ── */
  if (document.querySelector('.project-page')) {
    var wipeEl = document.createElement('div');
    wipeEl.className = 'page-wipe';
    wipeEl.setAttribute('aria-hidden', 'true');
    document.body.appendChild(wipeEl);
    wipeEl.addEventListener('animationend', function () { wipeEl.remove(); });
  }


  /* ── 3D Magazine Flipper ── */
  var magSpreads = {
    'mag-artforum': [
      { left: null,
        right: 'https://res.cloudinary.com/dnarrwa1m/image/upload/v1776410108/ARTFORUM_Cover_page_re6d6f.png' },
      { left:  'https://res.cloudinary.com/dnarrwa1m/image/upload/v1776410108/ARTFORUM_P1_mxbexj.png',
        right: 'https://res.cloudinary.com/dnarrwa1m/image/upload/v1776410107/ARTFORUM_P2_dxwhyy.png' },
      { left:  'https://res.cloudinary.com/dnarrwa1m/image/upload/v1776410106/ARTFORUM_P3_c4c7tb.png',
        right: 'https://res.cloudinary.com/dnarrwa1m/image/upload/v1776410108/ARTFORUM_P4_izhyc6.png' },
      { left:  'https://res.cloudinary.com/dnarrwa1m/image/upload/v1776410108/ARTFORUM_P5_ofwt7c.png',
        right: 'https://res.cloudinary.com/dnarrwa1m/image/upload/v1776410108/ARTFORUM_P6_aeitwq.png' }
    ],
    'mag-time': [
      { left: null,
        right: 'https://res.cloudinary.com/dnarrwa1m/image/upload/v1776410107/TIMES_Cover_i4sa3m.jpg' },
      { left:  'https://res.cloudinary.com/dnarrwa1m/image/upload/v1776410119/TIME_P1_ius51a.jpg',
        right: 'https://res.cloudinary.com/dnarrwa1m/image/upload/v1776410119/TIME_P2_gvivxx.jpg' },
      { left:  'https://res.cloudinary.com/dnarrwa1m/image/upload/v1776410119/TIME_P3_gehxkx.jpg',
        right: 'https://res.cloudinary.com/dnarrwa1m/image/upload/v1776410125/TIME_P4_ck7sao.jpg' },
      { left:  'https://res.cloudinary.com/dnarrwa1m/image/upload/v1776410124/TIME_P5_ds68go.jpg',
        right: 'https://res.cloudinary.com/dnarrwa1m/image/upload/v1776410126/TIME_P6_dq36np.jpg' }
    ]
  };

  var FLIP_MS   = 820;
  var EXPAND_MS = 560;

  Object.keys(magSpreads).forEach(function (id) {
    var viewer = document.getElementById(id);
    if (!viewer) return;

    var spreads     = magSpreads[id];
    var current     = 0;
    var isAnim      = false;

    var book        = viewer.querySelector('.mag3d-book');
    var leftWrap    = viewer.querySelector('.mag3d-left');
    var leftImg     = leftWrap.querySelector('img');
    var rightWrap   = viewer.querySelector('.mag3d-right');
    var rightImg    = rightWrap.querySelector('img');
    var flipper     = viewer.querySelector('.mag3d-flipper');
    var fFront      = viewer.querySelector('.mag3d-flipper-front img');
    var fBack       = viewer.querySelector('.mag3d-flipper-back img');
    var shadow      = viewer.querySelector('.mag3d-page-shadow');

    function render() {
      var s = spreads[current];
      rightImg.src = s.right || '';
      leftImg.src  = s.left  || '';
      leftWrap.style.cursor  = current > 0 ? 'pointer' : 'default';
      rightWrap.style.cursor = current < spreads.length - 1 ? 'pointer' : 'default';
    }

    function runFlip(forward, done) {
      /* Position flipper */
      if (forward) {
        flipper.style.left            = '50%';
        flipper.style.transformOrigin = 'left center';
        shadow.style.left             = '50%';
        shadow.style.background       = 'linear-gradient(to right, rgba(0,0,0,0.22), transparent 75%)';
      } else {
        flipper.style.left            = '0';
        flipper.style.transformOrigin = 'right center';
        shadow.style.left             = '0';
        shadow.style.background       = 'linear-gradient(to left, rgba(0,0,0,0.22), transparent 75%)';
      }

      /* Snap to start without transition */
      flipper.style.transition = 'none';
      flipper.style.transform  = forward ? 'rotateY(0deg)' : 'rotateY(-180deg)';
      flipper.style.visibility = 'visible';
      flipper.getBoundingClientRect();

      /* Shadow: fade in then out at mid-flip */
      shadow.style.opacity = '1';
      setTimeout(function () { shadow.style.opacity = '0'; }, FLIP_MS * 0.5);

      /* Animate flip */
      flipper.style.transition = '';
      flipper.style.transform  = forward ? 'rotateY(-180deg)' : 'rotateY(0deg)';

      setTimeout(function () {
        flipper.style.visibility = 'hidden';
        if (done) done();
        isAnim = false;
      }, FLIP_MS + 40);
    }

    function flipTo(next) {
      if (isAnim || next === current) return;
      if (next < 0 || next >= spreads.length) return;
      isAnim = true;

      var forward = next > current;
      var s = spreads[current];
      var t = spreads[next];

      if (forward) {
        fFront.src = s.right || '';
        fBack.src  = t.left  || '';

        if (current === 0) {
          /* Cover → first spread: open the book first, then flip */
          leftImg.src = t.left || '';
          book.classList.add('is-spread');
          setTimeout(function () {
            runFlip(true, function () {
              current = next;
              render();
            });
          }, EXPAND_MS);
        } else {
          runFlip(true, function () {
            current = next;
            render();
          });
        }

      } else {
        fFront.src = s.left  || '';
        fBack.src  = t.right || '';

        runFlip(false, function () {
          current = next;
          render();
          if (next === 0) {
            /* Back to cover: close the book after flip */
            book.classList.remove('is-spread');
          }
        });
      }
    }

    leftWrap.addEventListener('click',  function () { flipTo(current - 1); });
    rightWrap.addEventListener('click', function () { flipTo(current + 1); });

    render();
  });


  /* ── Magazine scroll — drag to scroll horizontally ── */
  document.querySelectorAll('.mag-scroll').forEach(function (el) {
    var isDown  = false;
    var startX  = 0;
    var scrollL = 0;

    el.addEventListener('mousedown', function (e) {
      isDown  = true;
      startX  = e.pageX - el.offsetLeft;
      scrollL = el.scrollLeft;
    });

    el.addEventListener('mouseleave', function () { isDown = false; });
    el.addEventListener('mouseup',    function () { isDown = false; });

    el.addEventListener('mousemove', function (e) {
      if (!isDown) return;
      e.preventDefault();
      var x = e.pageX - el.offsetLeft;
      el.scrollLeft = scrollL - (x - startX) * 1.2;
    });
  });

}());
