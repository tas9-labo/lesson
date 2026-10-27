
(function(){
  var links={},navUl=document.querySelector('nav.toc ul');
  document.querySelectorAll('nav.toc ul a').forEach(function(a){links[a.getAttribute('href').slice(1)]=a;});
  if(navUl&&'IntersectionObserver' in window){
    var spy=new IntersectionObserver(function(es){
      es.forEach(function(en){
        if(!en.isIntersecting)return;
        Object.keys(links).forEach(function(id){links[id].removeAttribute('aria-current');});
        var a=links[en.target.id];if(!a)return;
        a.setAttribute('aria-current','true');
        navUl.scrollLeft=a.offsetLeft-(navUl.clientWidth-a.offsetWidth)/2;
      });
    },{rootMargin:'-45% 0px -50% 0px'});
    Object.keys(links).forEach(function(id){var s=document.getElementById(id);if(s)spy.observe(s);});
  }
  var nav=document.querySelector('nav.toc'),hero=document.getElementById('chapters');
  if(!nav||!hero)return;
  if('IntersectionObserver' in window){
    new IntersectionObserver(function(e){
      nav.classList.toggle('show',!e[0].isIntersecting&&e[0].boundingClientRect.top<0);
    }).observe(hero);
  }
})();
