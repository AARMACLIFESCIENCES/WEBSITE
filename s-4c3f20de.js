(function(){
"use strict";
var reduce=matchMedia("(prefers-reduced-motion: reduce)").matches;
var nav=document.querySelector(".nav"),toggle=document.getElementById("navToggle"),links=document.getElementById("navLinks");
if(toggle&&links){
toggle.addEventListener("click",function(){var o=links.classList.toggle("open");toggle.setAttribute("aria-expanded",o?"true":"false");});
links.addEventListener("click",function(e){if(e.target.tagName==="A")links.classList.remove("open");});
}
function navScroll(){if(nav)nav.classList.toggle("is-solid",scrollY>12);}
navScroll();addEventListener("scroll",navScroll,{passive:true});
var reveal=document.getElementById("reveal");
if(reveal&&!reduce){
var left=reveal.querySelector(".door--left"),right=reveal.querySelector(".door--right"),
center=reveal.querySelector(".reveal__center"),backA=reveal.querySelector(".reveal__backA"),
hint=reveal.querySelector(".scroll-hint"),ticking=false;
function clamp(v,a,b){return v<a?a:v>b?b:v;}
function easeOut(t){return 1-Math.pow(1-t,3);}
var topY=0,total=1,lastP=-1;
function measure(){topY=reveal.offsetTop;total=(reveal.offsetHeight-innerHeight)||1;}
function frame(){
ticking=false;
var p=clamp((scrollY-topY)/total,0,1);
if(p===lastP)return; lastP=p;
var e=easeOut(p),ang=e*105,slide=e*12,fade=clamp((p-0.55)/0.45,0,1);
if(left){left.style.transform="translate3d("+(-slide)+"%,0,0) rotateY("+(-ang)+"deg)";left.style.opacity=(1-fade*0.85);}
if(right){right.style.transform="translate3d("+slide+"%,0,0) rotateY("+ang+"deg)";right.style.opacity=(1-fade*0.85);}
var rp=clamp((p-0.25)/0.6,0,1);
if(center){center.style.opacity=rp;center.style.transform="translate3d(0,"+(18-rp*18)+"px,0)";}
if(backA)backA.style.transform="translate3d(0,"+(e*-30)+"px,0) scale("+(1.1-e*0.1)+")";
if(hint)hint.style.opacity=clamp(1-p*3,0,1);
}
function req(){if(!ticking){ticking=true;requestAnimationFrame(frame);}}
measure();
addEventListener("scroll",req,{passive:true});
addEventListener("resize",function(){measure();lastP=-1;req();});
addEventListener("load",function(){measure();lastP=-1;req();});
frame();
}
function countUp(el){
var to=+el.dataset.count,from=+(el.dataset.from||0),dur=1300,t0=null;
function step(ts){
if(!t0)t0=ts;var p=Math.min((ts-t0)/dur,1),e=1-Math.pow(1-p,3);
el.textContent=Math.round(from+(to-from)*e);
if(p<1)requestAnimationFrame(step);else el.textContent=to;
}
requestAnimationFrame(step);
}
var rises=document.querySelectorAll(".rise"),nums=document.querySelectorAll("[data-count]");
if(reduce||!("IntersectionObserver"in window)){
rises.forEach(function(el){el.classList.add("in");});
nums.forEach(function(el){el.textContent=el.dataset.count;});
} else {
var io=new IntersectionObserver(function(es){es.forEach(function(en){if(en.isIntersecting){en.target.classList.add("in");io.unobserve(en.target);}});},{threshold:0.15,rootMargin:"0px 0px -8% 0px"});
rises.forEach(function(el){io.observe(el);});
var io2=new IntersectionObserver(function(es){es.forEach(function(en){if(en.isIntersecting){countUp(en.target);io2.unobserve(en.target);}});},{threshold:0.6});
nums.forEach(function(el){io2.observe(el);});
}
var y=document.getElementById("year");if(y)y.textContent=new Date().getFullYear();
})();