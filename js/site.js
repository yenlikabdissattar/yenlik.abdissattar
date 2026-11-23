// Grid overlay (press G or click "Grid"), entrance reveal, autoplay muted films in view.
(function(){
  var ov=document.createElement('div');ov.className='overlay g';ov.setAttribute('aria-hidden','true');
  function build(){ov.innerHTML='';var n=parseInt(getComputedStyle(document.documentElement).getPropertyValue('--cols'))||12;for(var i=0;i<n;i++)ov.appendChild(document.createElement('span'));}
  build();document.body.appendChild(ov);addEventListener('resize',build);
  function toggle(){ov.classList.toggle('on');}
  addEventListener('keydown',function(e){if((e.key==='g'||e.key==='G')&&!/input|textarea/i.test(e.target.tagName)&&!e.metaKey&&!e.ctrlKey)toggle();});
  document.querySelectorAll('.grid-toggle').forEach(function(b){b.addEventListener('click',toggle);});

  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}});},{rootMargin:'0px 0px -8% 0px'});
    document.querySelectorAll('.rv').forEach(function(el){io.observe(el);});
    var vo=new IntersectionObserver(function(es){es.forEach(function(e){var v=e.target;if(e.isIntersecting){var p=v.play();if(p&&p.catch)p.catch(function(){});}else v.pause();});},{threshold:.4});
    document.querySelectorAll('video[data-auto]').forEach(function(v){vo.observe(v);});
  } else document.querySelectorAll('.rv').forEach(function(el){el.classList.add('in');});
})();
