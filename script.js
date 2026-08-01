const menuButton=document.querySelector('.menu-button');
const nav=document.querySelector('.nav');
const form=document.querySelector('#builderSearch');
const input=document.querySelector('#ideaInput');
const response=document.querySelector('#builderResponse');
const quickIdeas=document.querySelectorAll('[data-idea]');

menuButton?.addEventListener('click',()=>{const open=nav.classList.toggle('open');menuButton.setAttribute('aria-expanded',String(open));});

quickIdeas.forEach(button=>button.addEventListener('click',()=>{input.value=button.dataset.idea;input.focus();}));

function buildPlan(idea){
  const safe=idea.replace(/[<>]/g,'');
  return `<h3>Let’s build “${safe}” together.</h3>
  <p>Here is your first Project Sol roadmap:</p>
  <ol>
    <li>Describe who this helps and what problem it solves.</li>
    <li>Choose the simplest first version you can finish.</li>
    <li>List the tools, skills, and materials you already have.</li>
    <li>Build one small piece, test it, and improve it.</li>
  </ol>`;
}
form.addEventListener('submit',event=>{
  event.preventDefault();
  const idea=input.value.trim();
  if(!idea){response.innerHTML='<h3>Start with curiosity.</h3><p>Tell us anything you want to learn, create, repair, improve, or understand.</p>';response.classList.add('show');input.focus();return;}
  response.innerHTML=buildPlan(idea);response.classList.add('show');response.scrollIntoView({behavior:'smooth',block:'nearest'});
});

const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting)entry.target.classList.add('visible');});},{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
document.querySelector('#year').textContent=new Date().getFullYear();
