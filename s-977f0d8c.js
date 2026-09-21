(function(){
var items = document.querySelectorAll('[data-rise]');
var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (reduce || !('IntersectionObserver' in window)) {
for (var i = 0; i < items.length; i++) items[i].classList.add('in');
return;
}
var io = new IntersectionObserver(function(entries){
for (var i = 0; i < entries.length; i++) {
var e = entries[i];
if (!e.isIntersecting) continue;
var el = e.target;
var step = parseInt(el.getAttribute('data-rise'), 10) || 0;
el.style.transitionDelay = (step > 5 ? 5 : step) * 45 + 'ms';
el.classList.add('in');
io.unobserve(el);
}
}, { rootMargin: '0px 0px -6% 0px', threshold: 0.08 });
for (var j = 0; j < items.length; j++) io.observe(items[j]);
})();