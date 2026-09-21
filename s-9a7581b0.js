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
var rises=document.querySelectorAll(".rise");
if(reduce||!("IntersectionObserver"in window)){
rises.forEach(function(el){el.classList.add("in");});
} else {
var io=new IntersectionObserver(function(es){es.forEach(function(en){if(en.isIntersecting){en.target.classList.add("in");io.unobserve(en.target);}});},{threshold:0.15,rootMargin:"0px 0px -8% 0px"});
rises.forEach(function(el){io.observe(el);});
}
var fileInput=document.getElementById("cResume"),fileName=document.getElementById("fileName"),fileBox=document.getElementById("fileBox");
if(fileInput){
fileInput.addEventListener("change",function(){
var f=this.files[0];
function setLabel(main,sub){fileName.textContent="";fileName.appendChild(document.createTextNode(main));var s=document.createElement("small");s.textContent=sub;fileName.appendChild(s);}
if(!f){setLabel("Attach your resume","PDF, DOC or DOCX · max 5 MB");return;}
if(f.size>5*1024*1024){
this.value="";fileBox.classList.add("invalid");
setLabel("File too large — keep it under 5 MB","PDF, DOC or DOCX");
return;
}
fileBox.classList.remove("invalid");
setLabel(f.name,(f.size/1024).toFixed(0)+" KB — ready to send");
});
}
function wire(formId,msgId){
var form=document.getElementById(formId),msg=document.getElementById(msgId);
if(!form)return;
form.addEventListener("submit",function(e){
var bad=false;
form.querySelectorAll("[required]").forEach(function(el){
var empty=el.type==="file"?!el.files.length:!el.value.trim();
var box=el.type==="file"?fileBox:el;
box.classList.toggle("invalid",empty);
if(empty)bad=true;
});
var mail=form.querySelector("input[type=email]");
if(mail&&mail.value&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail.value)){mail.classList.add("invalid");bad=true;}
if(bad){
e.preventDefault();
msg.className="msg err";msg.textContent="Please fill the highlighted fields.";
return;
}
msg.className="msg ok";msg.textContent="Sending…";
var btn=form.querySelector(".btn");if(btn)btn.disabled=true;
});
form.addEventListener("input",function(e){
if(e.target.classList)e.target.classList.remove("invalid");
});
}
wire("careerForm","careerMsg");
wire("contactForm","contactMsg");
var TO="aarmaclifesciences26@gmail.com";
if(location.protocol==="file:"){
document.body.classList.add("is-local");
["careerForm","contactForm"].forEach(function(id){
var form=document.getElementById(id),msg=document.getElementById(id==="careerForm"?"careerMsg":"contactMsg");
if(!form)return;
form.addEventListener("submit",function(e){
if(e.defaultPrevented)return;            
e.preventDefault();
var lines=[],subject=form.querySelector('input[name="_subject"]').value;
form.querySelectorAll("input,select,textarea").forEach(function(el){
if(el.type==="hidden"||el.type==="file"||!el.value)return;
var lab=form.querySelector('label[for="'+el.id+'"]');
var key=el.name==="_replyto"?"Email":(lab?lab.textContent.replace("*","").trim():el.name);
lines.push(key+": "+el.value);
});
var f=form.querySelector('input[type=file]');
if(f&&f.files.length)lines.push("Resume: "+f.files[0].name+"  (please attach this file to the email)");
location.href="mailto:"+TO+"?subject="+encodeURIComponent(subject)+"&body="+encodeURIComponent(lines.join("\n"));
msg.className="msg ok";
msg.textContent="Your mail app is opening with the details filled in"+(f&&f.files.length?" — attach the resume before sending.":".");
var btn=form.querySelector(".btn");if(btn)btn.disabled=false;
});
});
}
var y=document.getElementById("year");if(y)y.textContent=new Date().getFullYear();
})();