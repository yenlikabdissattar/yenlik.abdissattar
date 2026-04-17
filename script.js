/* ══════════════════════════════════════════
   Yenlik Abdissattar — Portfolio
   script.js
   ══════════════════════════════════════════ */

(function () {

  /* ── Navigation toggle ── */
  const trigger = document.getElementById('nav-trigger');
  const panel   = document.getElementById('nav-panel');
  const overlay = document.getElementById('nav-overlay');
  const close   = document.getElementById('nav-close');

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
  close.addEventListener('click', closeNav);
  overlay.addEventListener('click', closeNav);
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeNav();
  });


  /* ── Landing: floating blind contours ── */
  const landing = document.getElementById('landing');
  const contours = document.querySelectorAll('.contour');

  if (landing && contours.length) {

    /* Config — variety of sizes and drift animations */
    const driftAnims = ['drift-a', 'drift-b', 'drift-c'];

    /* Sizes: width as % of viewport width — mix of small, medium, larger */
    const sizes = [7, 9, 11, 8, 13, 7, 10, 12, 8, 9, 11, 7, 14, 8, 10];

    /* Rotations: subtle, some more tilted */
    const rotations = [-8, 4, -3, 12, -6, 2, -14, 7, -2, 10, -5, 15, -9, 3, -11];

    /* Predefined scatter positions (top%, left%) — spread across full canvas */
    const positions = [
      [8,  10], [15, 55], [5,  80], [30, 20], [25, 72],
      [50, 5 ], [45, 40], [55, 75], [70, 15], [65, 55],
      [80, 30], [78, 80], [20, 38], [60, 88], [40, 62]
    ];

    /* Animation durations: slow drifts, each slightly different */
    const durations = [9, 11, 8, 13, 10, 12, 9, 14, 11, 8, 10, 13, 9, 11, 12];

    contours.forEach(function (img, i) {
      var w   = sizes[i % sizes.length];
      var rot = rotations[i % rotations.length];
      var pos = positions[i % positions.length];
      var dur = durations[i % durations.length];
      var anim = driftAnims[i % driftAnims.length];

      img.style.width     = w + 'vw';
      img.style.top       = pos[0] + '%';
      img.style.left      = pos[1] + '%';
      img.style.setProperty('--r', rot + 'deg');
      img.style.transform = 'rotate(' + rot + 'deg)';
      img.style.animation = anim + ' ' + dur + 's ease-in-out infinite';
      img.style.animationDelay = (i * 0.6) + 's';
    });

    /* Scroll fade-out: landing fades as user scrolls down */
    window.addEventListener('scroll', function () {
      var scrollY  = window.scrollY;
      var fadeOver = window.innerHeight * 0.6; /* fully gone by 60vh scroll */
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

  /* Colour Design: cycle every 2.5s */
  cyclePreviews('.colour-slide', 'colour-slide--active', 2500);

  /* Postcard preview on homepage: cycle every 3s */
  cyclePreviews('.postcard-prev-slide', 'postcard-prev-slide--active', 3000);

  /* Gouache preview on homepage: cycle every 3s */
  cyclePreviews('.gouache-slide', 'gouache-slide--active', 3000);


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

      /* Mark exiting slide */
      pcSlides[prev].classList.remove('pc-slide--active');
      pcSlides[prev].classList.add('pc-slide--exit');

      /* After exit transition, remove exit class */
      setTimeout(function () {
        pcSlides[prev].classList.remove('pc-slide--exit');
      }, 900);

      /* Bring in new slide */
      pcSlides[current].classList.add('pc-slide--active');

      /* Update dots */
      dots.forEach(function (d, i) {
        d.classList.toggle('pc-dot--active', i === current);
      });

      setTimeout(function () { isAnimating = false; }, 900);
    }

    /* Auto-advance every 3 seconds */
    setInterval(function () {
      goToSlide((current + 1) % total);
    }, 3000);

    /* Dot click navigation */
    dots.forEach(function (dot, i) {
      dot.addEventListener('click', function () { goToSlide(i); });
    });
  }

}());
