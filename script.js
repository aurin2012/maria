const filters=document.querySelectorAll('[data-filter]');
const gallery=document.querySelector('.gallery');
const cards=[...document.querySelectorAll('.work')];
gallery.setAttribute('role','region');gallery.setAttribute('aria-label','Галерея работ');
const controls=document.createElement('div');controls.className='carousel-controls';controls.innerHTML='<button type="button" aria-label="Предыдущая работа">←</button><span class="carousel-count" aria-live="polite"></span><button type="button" aria-label="Следующая работа">→</button>';gallery.after(controls);
const [prev,next]=controls.querySelectorAll('button');const count=controls.querySelector('span');
let active=0;let visible=cards;let timer;
function render(){cards.forEach(c=>c.classList.toggle('current',c===visible[active]));count.textContent=(active+1)+' / '+visible.length;prev.disabled=active===0;next.disabled=active===visible.length-1;}
function move(index,smooth=true){active=Math.max(0,Math.min(index,visible.length-1));const c=visible[active];gallery.scrollTo({left:c.offsetLeft-gallery.offsetLeft-(gallery.clientWidth-c.clientWidth)/2,behavior:smooth&&!matchMedia('(prefers-reduced-motion: reduce)').matches?'smooth':'instant'});render();}
prev.addEventListener('click',()=>move(active-1));next.addEventListener('click',()=>move(active+1));
gallery.addEventListener('scroll',()=>{clearTimeout(timer);timer=setTimeout(()=>{const center=gallery.getBoundingClientRect().left+gallery.clientWidth/2;active=visible.reduce((best,c,i)=>Math.abs(c.getBoundingClientRect().left+c.clientWidth/2-center)<Math.abs(visible[best].getBoundingClientRect().left+visible[best].clientWidth/2-center)?i:best,0);render()},90)});
gallery.tabIndex=0;gallery.addEventListener('keydown',e=>{if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();move(active+(e.key==='ArrowRight'?1:-1))}});
filters.forEach(button=>button.addEventListener('click',()=>{filters.forEach(b=>{b.classList.toggle('active',b===button);b.setAttribute('aria-pressed',b===button)});cards.forEach(card=>card.hidden=button.dataset.filter!=='all'&&card.dataset.type!==button.dataset.filter);visible=cards.filter(c=>!c.hidden);move(0,false)}));
const viewer=document.querySelector('#viewer');
cards.forEach(card=>card.addEventListener('click',()=>{viewer.querySelector('img').src='assets/'+card.dataset.image+'.jpg';viewer.showModal()}));
viewer.querySelector('.close').addEventListener('click',()=>viewer.close());viewer.addEventListener('click',event=>{if(event.target===viewer)viewer.close()});
requestAnimationFrame(()=>move(0,false));window.addEventListener('resize',()=>move(active,false));
