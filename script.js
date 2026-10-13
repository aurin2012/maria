const filters=document.querySelectorAll('[data-filter]');
filters.forEach(button=>button.addEventListener('click',()=>{filters.forEach(b=>b.classList.toggle('active',b===button));document.querySelectorAll('.work').forEach(card=>card.hidden=button.dataset.filter!=='all'&&card.dataset.type!==button.dataset.filter)}));
const viewer=document.querySelector('#viewer');
document.querySelectorAll('[data-image]').forEach(card=>card.addEventListener('click',()=>{viewer.querySelector('img').src='assets/'+card.dataset.image+'.jpg';viewer.showModal()}));
viewer.querySelector('.close').addEventListener('click',()=>viewer.close());
viewer.addEventListener('click',event=>{if(event.target===viewer)viewer.close()});
