const $=(s)=>document.querySelector(s);
const $$=(s)=>[...document.querySelectorAll(s)];

const defaultProjects=[
  {name:"Neighborhood Food Share",desc:"A simple tool that helps neighbors offer extra food before it goes to waste.",cat:"Community",icon:"🤝"},
  {name:"Study Buddy AI",desc:"A beginner-friendly assistant that turns hard topics into step-by-step lessons.",cat:"AI & Automation",icon:"🧠"},
  {name:"Clean Water Sensor",desc:"A low-cost concept for tracking basic water-quality indicators.",cat:"Science",icon:"💧"}
];

function getUser(){return JSON.parse(localStorage.getItem("solUser")||"null")}
function setUser(user){localStorage.setItem("solUser",JSON.stringify(user));renderUser()}
function getProjects(){return JSON.parse(localStorage.getItem("solProjects")||JSON.stringify(defaultProjects))}
function setProjects(p){localStorage.setItem("solProjects",JSON.stringify(p));renderProjects()}

function renderUser(){
  const user=getUser();
  $("#profileBtn").classList.toggle("hidden",!user);
  $("#loginBtn").classList.toggle("hidden",!!user);
  $("#signupBtn").classList.toggle("hidden",!!user);
  if(user) $("#profileBtn").textContent=(user.name||"B").trim().charAt(0).toUpperCase();
}
function renderProjects(){
  $("#galleryGrid").innerHTML=getProjects().map(p=>`
    <article class="project-card">
      <div class="project-visual">${p.icon||"🚀"}</div>
      <div class="project-body">
        <span class="tag">${p.cat}</span>
        <h3>${escapeHtml(p.name)}</h3>
        <p>${escapeHtml(p.desc)}</p>
      </div>
    </article>`).join("");
}
function escapeHtml(v){return String(v).replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]))}

function openAuth(mode){
  $("#authTitle").textContent=mode==="login"?"Welcome back":"Create your account";
  $("#authSubtitle").textContent=mode==="login"?"Continue building your future.":"Start building for a better tomorrow.";
  $("#authDialog").showModal();
}
$("#loginBtn").onclick=()=>openAuth("login");
$("#signupBtn").onclick=()=>openAuth("signup");
$("#profileBtn").onclick=()=>{
  const u=getUser();
  alert(`Signed in as ${u.name}\n${u.email}\n\nPrototype account stored only on this device.`);
};
$("#authForm").addEventListener("submit",(e)=>{
  const name=$("#authName").value.trim(), email=$("#authEmail").value.trim();
  if(!name||!email){e.preventDefault();return}
  setUser({name,email});
});

$("#buildPlanBtn").onclick=()=>{
  const idea=$("#ideaInput").value.trim();
  const level=$("#experience").value;
  if(!idea){$("#ideaInput").focus();return}
  const clean=escapeHtml(idea);
  const levelText={beginner:"beginner-friendly",intermediate:"practical",advanced:"advanced"}[level];
  $("#planOutput").innerHTML=`
    <h3>Your ${levelText} Project Sol roadmap</h3>
    <p><strong>Project idea:</strong> ${clean}</p>
    <div class="plan-grid">
      <div class="plan-card"><strong>1. Define the purpose</strong><p>Write one sentence explaining who this helps and what problem it solves.</p></div>
      <div class="plan-card"><strong>2. Build the smallest version</strong><p>Choose one useful feature you can finish before adding anything else.</p></div>
      <div class="plan-card"><strong>3. Gather your tools</strong><p>List the skills, people, software, materials, and knowledge you already have.</p></div>
      <div class="plan-card"><strong>4. Test and improve</strong><p>Show it to one real person, listen carefully, and improve one thing.</p></div>
    </div>`;
  $("#planOutput").classList.remove("hidden");
  $("#planOutput").scrollIntoView({behavior:"smooth",block:"center"});
};

$("#newProjectBtn").onclick=()=>$("#projectDialog").showModal();
$("#projectForm").addEventListener("submit",(e)=>{
  const name=$("#projectName").value.trim(),desc=$("#projectDesc").value.trim(),cat=$("#projectCategory").value;
  if(!name||!desc){e.preventDefault();return}
  const icon={"AI & Automation":"🧠","Community":"🤝","Science":"🔬","Programming":"💻","Art & Design":"🎨","Entrepreneurship":"🌱"}[cat]||"🚀";
  setProjects([{name,desc,cat,icon},...getProjects()]);
});

$("#year").textContent=new Date().getFullYear();
renderUser();renderProjects();


// Voice Builder: uses the browser's built-in speech tools.
// Speech recognition works best in Safari/Chrome when microphone permission is allowed.
const voiceBtn = $("#voiceBtn");
const hearPromptBtn = $("#hearPromptBtn");
const listeningStatus = $("#listeningStatus");
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = null;
let listening = false;

function speak(text){
  if(!("speechSynthesis" in window)){
    listeningStatus.textContent = "Your browser cannot read this aloud yet.";
    return;
  }
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 0.88;
  utterance.pitch = 1.05;
  utterance.lang = "en-US";
  window.speechSynthesis.speak(utterance);
}

hearPromptBtn?.addEventListener("click",()=>{
  speak("What do you want to build today? Tap the microphone and tell me your idea.");
});

if(SpeechRecognition){
  recognition = new SpeechRecognition();
  recognition.lang = "en-US";
  recognition.interimResults = true;
  recognition.continuous = false;

  recognition.onstart = ()=>{
    listening = true;
    voiceBtn.classList.add("listening");
    listeningStatus.textContent = "I’m listening… tell me what you want to build.";
    speak("I'm listening.");
  };

  recognition.onresult = (event)=>{
    let transcript = "";
    for(let i=event.resultIndex;i<event.results.length;i++){
      transcript += event.results[i][0].transcript;
    }
    $("#ideaInput").value = transcript.trim();
    listeningStatus.textContent = event.results[event.results.length-1].isFinal
      ? "I heard you! Tap “Build My Plan” when you’re ready."
      : "Keep talking…";
  };

  recognition.onerror = (event)=>{
    const messages = {
      "not-allowed":"Microphone permission is off. Allow microphone access, then try again.",
      "no-speech":"I didn’t hear anything. Tap the microphone and try once more.",
      "audio-capture":"I can’t find the microphone on this device.",
      "network":"Voice recognition needs an internet connection."
    };
    listeningStatus.textContent = messages[event.error] || "Voice didn’t work that time. You can try again or type your idea.";
  };

  recognition.onend = ()=>{
    listening = false;
    voiceBtn.classList.remove("listening");
  };

  voiceBtn?.addEventListener("click",()=>{
    if(listening){
      recognition.stop();
      return;
    }
    try{
      recognition.start();
    }catch(error){
      listeningStatus.textContent = "Give it one second, then tap the microphone again.";
    }
  });
}else{
  voiceBtn?.addEventListener("click",()=>{
    listeningStatus.textContent = "Voice typing is not supported in this browser. Try Safari or Chrome, or use your keyboard microphone.";
    $("#ideaInput").focus();
  });
}

$$("[data-kid-idea]").forEach(button=>{
  button.addEventListener("click",()=>{
    $("#ideaInput").value = button.dataset.kidIdea;
    listeningStatus.textContent = "Great choice! Tap “Build My Plan” to begin.";
    speak(button.dataset.kidIdea);
  });
});
