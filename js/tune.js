/* Local editing panel — loads only when the site is opened from your computer
   (file://, localhost) or with ?edit in the address. Press E to open or close it.

   Design: sliders and colour pickers change the site live. "Download tokens.css"
   saves your values; put the file in css/ to make them permanent.
   Projects: a calendar to log each project's dates, duration, role, team and course.
   "Download project-log.js" saves them; put the file in js/ and every case study shows them. */
(function(){
  var STORE = 'ya-tune-v1', LOG = 'ya-projects-v1';
  var root = document.documentElement;

  var SLIDERS = [
    ['Layout'],
    ['--m', 'Outer margin', 8, 72, 1, 'px', 28],
    ['--g', 'Gutter', 4, 40, 1, 'px', 16],
    ['--card-span', 'Index cards per row', 2, 6, 1, 'cards', 4],
    ['Type'],
    ['--big', 'Big text', 32, 200, 1, 'px', 128],
    ['--tx', 'Text', 13, 20, .5, 'px', 16],
    ['--tx-lh', 'Text line height', 18, 32, 1, 'px', 24],
    ['--sm', 'Small text', 10, 14, .5, 'px', 12],
    ['--sm-lh', 'Small line height', 12, 20, 1, 'px', 16],
    ['Images'],
    ['--plate-pad', 'Plate padding', 0, 20, .5, '%', 7],
    ['--bc-scale', 'Blind contour size', .4, 2, .05, '×', 1],
    ['--bc-speed', 'Blind contour speed', 0, 4, .1, '×', 1],
  ];
  var COLOURS = [['--paper', 'Page', '#ffffff'], ['--ink', 'Text', '#111111'], ['--plate', 'Plate', '#f2f2f0'], ['--accent', 'Accent', '#293785'], ['--accent-2', 'Accent 2', '#496da2']];

  function load(k, d){ try{ return JSON.parse(localStorage.getItem(k)) || d; }catch(e){ return d; } }
  function save(k, v){ try{ localStorage.setItem(k, JSON.stringify(v)); }catch(e){} }
  var vals = load(STORE, {}), log = load(LOG, window.PROJECT_LOG ? JSON.parse(JSON.stringify(window.PROJECT_LOG)) : {});

  function cssValue(name, v){
    var s = SLIDERS.filter(function(x){ return x[0] === name; })[0];
    if(!s) return v;
    if(name === '--card-span') return String(Math.round(12 / v));
    if(s[5] === 'px') return v + 'px';
    if(s[5] === '%') return v + '%';
    return String(v);
  }
  function apply(){
    Object.keys(vals).forEach(function(k){ root.style.setProperty(k, cssValue(k, vals[k])); });
    window.YA_BC_SPEED = vals['--bc-speed'] != null ? vals['--bc-speed'] : 1;
  }
  apply();

  /* ---------- panel ---------- */
  var st = document.createElement('style');
  st.textContent = [
    '.tune{position:fixed;top:0;right:0;bottom:0;width:340px;z-index:200;background:#fff;color:#111;font:12px/16px "Helvetica Neue",Helvetica,Arial,sans-serif;box-shadow:-12px 0 40px rgba(0,0,0,.12);display:flex;flex-direction:column;transform:translateX(100%);transition:transform .35s cubic-bezier(.2,.7,.2,1)}',
    '.tune.open{transform:none}',
    '.tune *{box-sizing:border-box}',
    '.tune-h{display:flex;gap:16px;align-items:center;padding:14px 16px;border-bottom:1px solid #eee}',
    '.tune-h b{flex:1;font-weight:500}',
    '.tune-h button,.tune-tabs button,.tune-foot button{font:inherit;background:none;border:0;cursor:pointer;color:inherit;padding:6px 0}',
    '.tune-tabs{display:flex;gap:16px;padding:0 16px;border-bottom:1px solid #eee}',
    '.tune-tabs button[aria-selected="true"]{font-weight:500;box-shadow:inset 0 -1px 0 #111}',
    '.tune-body{flex:1;overflow:auto;padding:8px 16px 24px}',
    '.tune-sec{margin:18px 0 6px;font-weight:500}',
    '.tune-row{display:grid;grid-template-columns:1fr auto;gap:2px 8px;margin:10px 0}',
    '.tune-row input[type=range]{grid-column:1/-1;width:100%;accent-color:#293785}',
    '.tune-row output{font-variant-numeric:tabular-nums;color:#555}',
    '.tune-col{display:flex;align-items:center;justify-content:space-between;margin:8px 0}',
    '.tune-col input{width:44px;height:24px;border:0;padding:0;background:none;cursor:pointer}',
    '.tune-foot{display:flex;flex-wrap:wrap;gap:8px 16px;padding:12px 16px;border-top:1px solid #eee}',
    '.tune-foot button{text-decoration:underline;text-underline-offset:3px}',
    '.tune-foot button:hover,.tune-h button:hover{color:#293785}',
    '.tune-fab{position:fixed;right:16px;bottom:16px;z-index:199;font:500 12px/1 "Helvetica Neue",Helvetica,Arial,sans-serif;background:#111;color:#fff;border:0;padding:10px 14px;cursor:pointer}',
    '.tune-note{color:#555;margin:6px 0 0}',
    /* projects */
    '.tl{position:relative;margin:12px 0 4px}',
    '.tl-years{display:grid;grid-template-columns:repeat(3,1fr);color:#555;font-size:10px;margin-bottom:4px}',
    '.tl-row{position:relative;height:14px;margin:3px 0;background:repeating-linear-gradient(90deg,#f4f4f2 0 calc(100%/36 - 1px),#fff calc(100%/36 - 1px) calc(100%/36))}',
    '.tl-bar{position:absolute;top:2px;bottom:2px;background:#293785;min-width:3px}',
    '.tl-row span{position:absolute;left:2px;top:0;font-size:9px;line-height:14px;color:#111;white-space:nowrap;pointer-events:none;mix-blend-mode:difference;color:#fff}',
    '.pj{padding:10px 0;border-bottom:1px solid #f0f0f0}',
    '.pj-t{display:flex;justify-content:space-between;cursor:pointer;gap:8px}',
    '.pj-t b{font-weight:500}',
    '.pj-t span{color:#555;text-align:right}',
    '.pj-ed{margin-top:10px;display:none}',
    '.pj.open .pj-ed{display:block}',
    '.cal-h{display:flex;justify-content:space-between;align-items:center;margin-bottom:6px}',
    '.cal-h button{font:inherit;background:none;border:0;cursor:pointer;padding:4px 8px}',
    '.cal{display:grid;grid-template-columns:repeat(7,1fr);gap:2px;text-align:center}',
    '.cal i{font-style:normal;color:#999;font-size:10px}',
    '.cal button{font:inherit;font-size:11px;border:0;background:#f6f6f4;padding:6px 0;cursor:pointer;color:#111}',
    '.cal button.in{background:#dfe4f3}',
    '.cal button.end{background:#293785;color:#fff}',
    '.cal button:hover{outline:1px solid #293785}',
    '.cal-hint{color:#555;margin:6px 0 10px}',
    '.pj-f{display:grid;grid-template-columns:5.5em 1fr;gap:6px 8px;align-items:center}',
    '.pj-f input{font:inherit;border:0;border-bottom:1px solid #ddd;padding:4px 0;width:100%}',
    '.pj-f input:focus{outline:0;border-color:#293785}',
  ].join('\n');
  document.head.appendChild(st);

  var panel = document.createElement('aside'); panel.className = 'tune'; panel.setAttribute('aria-label', 'Edit panel');
  panel.innerHTML = '<div class="tune-h"><b>Edit</b><button type="button" data-act="grid">Grid</button><button type="button" data-act="close">Close (E)</button></div>' +
    '<div class="tune-tabs" role="tablist"><button type="button" role="tab" aria-selected="true" data-tab="design">Design</button><button type="button" role="tab" aria-selected="false" data-tab="projects">Projects</button></div>' +
    '<div class="tune-body"></div><div class="tune-foot"></div>';
  document.body.appendChild(panel);
  var fab = document.createElement('button'); fab.className = 'tune-fab'; fab.type = 'button'; fab.textContent = 'Edit (E)';
  document.body.appendChild(fab);
  var body = panel.querySelector('.tune-body'), foot = panel.querySelector('.tune-foot'), tab = 'design';

  function open(o){ panel.classList.toggle('open', o); fab.style.display = o ? 'none' : ''; }
  fab.addEventListener('click', function(){ open(true); });
  panel.querySelector('[data-act=close]').addEventListener('click', function(){ open(false); });
  panel.querySelector('[data-act=grid]').addEventListener('click', function(){ var g = document.querySelector('.grid-toggle'); var ov = document.querySelector('.overlay'); if(ov) ov.classList.toggle('on'); else if(g) g.click(); });
  addEventListener('keydown', function(e){
    if(/input|textarea|select/i.test(e.target.tagName) || e.metaKey || e.ctrlKey) return;
    if(e.key === 'e' || e.key === 'E') open(!panel.classList.contains('open'));
  });
  panel.querySelectorAll('[data-tab]').forEach(function(b){ b.addEventListener('click', function(){
    tab = b.getAttribute('data-tab');
    panel.querySelectorAll('[data-tab]').forEach(function(x){ x.setAttribute('aria-selected', x === b); });
    render();
  }); });

  function download(name, text, type){
    var a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([text], {type: type || 'text/plain'}));
    a.download = name; document.body.appendChild(a); a.click(); setTimeout(function(){ URL.revokeObjectURL(a.href); a.remove(); }, 500);
  }
  function tokensCSS(){
    var lines = Object.keys(vals).map(function(k){ return '  ' + k + ':' + cssValue(k, vals[k]) + ';'; });
    return '/* Your values from the edit panel. Loaded after site.css, so these win. */\n:root{\n' + lines.join('\n') + '\n}\n';
  }
  function btn(label, fn){ var b = document.createElement('button'); b.type = 'button'; b.textContent = label; b.addEventListener('click', fn); foot.appendChild(b); return b; }

  /* ---------- design tab ---------- */
  function renderDesign(){
    var h = '';
    SLIDERS.forEach(function(s){
      if(s.length === 1){ h += '<p class="tune-sec">' + s[0] + '</p>'; return; }
      var v = vals[s[0]] != null ? vals[s[0]] : s[6];
      h += '<label class="tune-row"><span>' + s[1] + '</span><output>' + v + (s[5] === 'cards' ? '' : ' ' + s[5]) + '</output>' +
           '<input type="range" min="' + s[2] + '" max="' + s[3] + '" step="' + s[4] + '" value="' + v + '" data-k="' + s[0] + '"></label>';
    });
    h += '<p class="tune-sec">Colour</p>';
    COLOURS.forEach(function(c){
      h += '<label class="tune-col"><span>' + c[1] + '</span><input type="color" value="' + (vals[c[0]] || c[2]) + '" data-k="' + c[0] + '"></label>';
    });
    h += '<p class="tune-note">Changes show on every page you open on this computer. To keep them on the live site, download tokens.css and put it in the css folder.</p>';
    body.innerHTML = h;
    body.querySelectorAll('input').forEach(function(inp){
      inp.addEventListener('input', function(){
        var k = inp.getAttribute('data-k'); vals[k] = inp.type === 'range' ? parseFloat(inp.value) : inp.value;
        var o = inp.parentNode.querySelector('output'); if(o){ var s = SLIDERS.filter(function(x){ return x[0] === k; })[0]; o.textContent = inp.value + (s[5] === 'cards' ? '' : ' ' + s[5]); }
        apply(); save(STORE, vals);
      });
    });
    foot.innerHTML = '';
    btn('Download tokens.css', function(){ download('tokens.css', tokensCSS(), 'text/css'); });
    btn('Copy CSS', function(){ var t = tokensCSS(); if(navigator.clipboard) navigator.clipboard.writeText(t); this.textContent = 'Copied'; var b = this; setTimeout(function(){ b.textContent = 'Copy CSS'; }, 1200); });
    btn('Reset', function(){ vals = {}; save(STORE, vals); root.removeAttribute('style'); apply(); renderDesign(); });
  }

  /* ---------- projects tab: calendar log ---------- */
  var projects = [], seen = {};
  document.querySelectorAll('nav.menu a[href*="work/"]').forEach(function(a){
    var slug = (a.getAttribute('href').match(/work\/([^.\/]+)\.html/) || [])[1];
    if(slug && !seen[slug]){ seen[slug] = 1; projects.push({slug: slug, title: a.textContent.trim()}); }
  });
  var MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  function d(s){ if(!s) return null; var p = s.split('-'); return new Date(+p[0], +p[1] - 1, +p[2]); }
  function iso(dt){ return dt.getFullYear() + '-' + String(dt.getMonth() + 1).padStart(2, '0') + '-' + String(dt.getDate()).padStart(2, '0'); }
  function fmt(s){ var x = d(s); return x ? x.getDate() + ' ' + MONTHS[x.getMonth()] + ' ' + x.getFullYear() : ''; }
  function duration(a, b){
    if(!a || !b) return '';
    var days = Math.round((d(b) - d(a)) / 864e5) + 1;
    if(days < 14) return days + (days === 1 ? ' day' : ' days');
    var w = Math.round(days / 7); if(w <= 10) return w + ' weeks';
    var m = Math.round(days / 30.4); return m + (m === 1 ? ' month' : ' months');
  }
  window.YA_DURATION = duration;
  var openSlug = null, view = {};

  function timeline(){
    var start = new Date(2024, 0, 1), span = 36; // Jan 2024 – Dec 2026
    var h = '<div class="tl"><div class="tl-years"><span>2024</span><span>2025</span><span>2026</span></div>';
    projects.forEach(function(p){
      var e = log[p.slug] || {}, bar = '';
      if(e.start && e.end){
        var a = d(e.start), b = d(e.end);
        var l = ((a.getFullYear() - 2024) * 12 + a.getMonth() + a.getDate() / 31) / span * 100;
        var r = ((b.getFullYear() - 2024) * 12 + b.getMonth() + b.getDate() / 31) / span * 100;
        bar = '<div class="tl-bar" style="left:' + Math.max(0, l) + '%;width:' + Math.max(.6, Math.min(100, r) - Math.max(0, l)) + '%"></div>';
      }
      h += '<div class="tl-row" title="' + p.title + '">' + bar + '<span>' + p.title + '</span></div>';
    });
    return h + '</div>';
  }

  function calendar(p){
    var e = log[p.slug] || {}, v = view[p.slug];
    if(!v){ var base = d(e.start) || new Date(); v = view[p.slug] = {y: base.getFullYear(), m: base.getMonth()}; }
    var first = new Date(v.y, v.m, 1), off = (first.getDay() + 6) % 7, days = new Date(v.y, v.m + 1, 0).getDate();
    var h = '<div class="cal-h"><button type="button" data-nav="-1" aria-label="Previous month">←</button><span>' + MONTHS[v.m] + ' ' + v.y + '</span><button type="button" data-nav="1" aria-label="Next month">→</button></div><div class="cal">';
    ['M','T','W','T','F','S','S'].forEach(function(x){ h += '<i>' + x + '</i>'; });
    for(var i = 0; i < off; i++) h += '<span></span>';
    for(var dd = 1; dd <= days; dd++){
      var s = iso(new Date(v.y, v.m, dd)), cls = '';
      if(e.start && e.end && s >= e.start && s <= e.end) cls = 'in';
      if(s === e.start || s === e.end) cls = 'end';
      h += '<button type="button" class="' + cls + '" data-day="' + s + '">' + dd + '</button>';
    }
    return h + '</div><p class="cal-hint">' + (e.start && !e.end ? 'Now click the last day.' : 'Click the first day, then the last day.') + '</p>';
  }

  function renderProjects(){
    var h = timeline();
    projects.forEach(function(p){
      var e = log[p.slug] || {};
      var sum = e.start ? fmt(e.start) + (e.end ? ' – ' + fmt(e.end) + '<br>' + duration(e.start, e.end) : '') : 'No dates yet';
      h += '<div class="pj' + (openSlug === p.slug ? ' open' : '') + '" data-slug="' + p.slug + '"><div class="pj-t"><b>' + p.title + '</b><span>' + sum + '</span></div>' +
           '<div class="pj-ed">' + (openSlug === p.slug ? calendar(p) : '') +
           '<div class="pj-f">' +
           '<span>Role</span><input data-f="role" value="' + (e.role || '').replace(/"/g, '&quot;') + '" placeholder="e.g. Designer, solo">' +
           '<span>Team</span><input data-f="team" value="' + (e.team || '').replace(/"/g, '&quot;') + '" placeholder="e.g. Solo, or team of 3">' +
           '<span>Course</span><input data-f="course" value="' + (e.course || '').replace(/"/g, '&quot;') + '" placeholder="e.g. Visual Systems, Yonsei">' +
           '</div></div></div>';
    });
    h += '<p class="tune-note">Saved on this computer as you go. Download project-log.js and put it in the js folder to show these on the live site.</p>';
    body.innerHTML = h;
    body.querySelectorAll('.pj').forEach(function(el){
      var slug = el.getAttribute('data-slug');
      el.querySelector('.pj-t').addEventListener('click', function(){ openSlug = openSlug === slug ? null : slug; renderProjects(); });
      el.querySelectorAll('[data-nav]').forEach(function(b){ b.addEventListener('click', function(){
        var v = view[slug]; v.m += +b.getAttribute('data-nav'); if(v.m < 0){ v.m = 11; v.y--; } if(v.m > 11){ v.m = 0; v.y++; } renderProjects();
      }); });
      el.querySelectorAll('[data-day]').forEach(function(b){ b.addEventListener('click', function(){
        var e = log[slug] = log[slug] || {}, s = b.getAttribute('data-day');
        if(!e.start || (e.start && e.end)){ e.start = s; e.end = ''; }
        else if(s < e.start){ e.end = e.start; e.start = s; }
        else e.end = s;
        save(LOG, log); renderProjects();
      }); });
      el.querySelectorAll('[data-f]').forEach(function(inp){ inp.addEventListener('input', function(){
        var e = log[slug] = log[slug] || {}; e[inp.getAttribute('data-f')] = inp.value; save(LOG, log);
        if(window.YA_RENDER_LOG) window.YA_RENDER_LOG(log);
      }); });
    });
    if(window.YA_RENDER_LOG) window.YA_RENDER_LOG(log);
    foot.innerHTML = '';
    btn('Download project-log.js', function(){
      download('project-log.js', '/* Project dates, roles and teams, from the edit panel. */\nwindow.PROJECT_LOG = ' + JSON.stringify(log, null, 2) + ';\n', 'text/javascript');
    });
    btn('Clear all', function(){ if(window.confirm('Clear every date and note on this computer?')){ log = {}; save(LOG, log); renderProjects(); } });
  }

  function render(){ if(tab === 'design') renderDesign(); else renderProjects(); }
  render();
  if(window.YA_RENDER_LOG) window.YA_RENDER_LOG(log);
})();
