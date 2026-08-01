const $ = (s) => document.querySelector(s);
const $$ = (s) => [...document.querySelectorAll(s)];

const defaultIdeas = [
  {name:"A robot that helps clean beaches",desc:"A machine that finds and collects trash before it reaches the ocean.",who:"Everyone",icon:"🤖"},
  {name:"A place for seniors to teach forgotten skills",desc:"A platform where older adults share trades, recipes, stories, and practical knowledge.",who:"Communities",icon:"🧓"},
  {name:"A backpack that charges phones with sunlight",desc:"A student-friendly solar backpack for emergencies and everyday use.",who:"Students",icon:"🎒"},
  {name:"A neighborhood food-sharing app",desc:"A simple way to offer extra food before it goes to waste.",who:"Families",icon:"🥕"},
  {name:"A voice-first science helper",desc:"A tool for kids who learn by speaking, listening, and seeing.",who:"Kids",icon:"🎤"},
  {name:"A safer walk-home network",desc:"A community system that helps people check in and reach home safely.",who:"Communities",icon:"🛡️"}
];

let chosenAudience = "";

function escapeHtml(value){
  return String(value).replace(/[&<>"']/g, ch => ({
    "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"
  }[ch]));
}

function getIdeas(){
  return JSON.parse(localStorage.getItem("solGarden") || JSON.stringify(defaultIdeas));
}

function setIdeas(ideas){
  localStorage.setItem("solGarden", JSON.stringify(ideas));
  renderGarden();
}

function renderGarden(){
  $("#gardenGrid").innerHTML = getIdeas().map(item => `
    <article class="seed-card">
      <div class="seed-art">${item.icon || "🌱"}</div>
      <div class="seed-body">
        <p class="seed-meta">For: ${escapeHtml(item.who)}</p>
        <h3>${escapeHtml(item.name)}</h3>
        <p>${escapeHtml(item.desc)}</p>
      </div>
    </article>
  `).join("");
}

function speak(text){
  if(!("speechSynthesis" in window)) return;
  speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = .9;
  utterance.pitch = 1.02;
  utterance.lang = "en-US";
  speechSynthesis.speak(utterance);
}

$("#hearPromptBtn").addEventListener("click", () => {
  speak($("#solPrompt").textContent);
});

$("#openBuilderBtn").addEventListener("click", () => {
  $("#builder").scrollIntoView({behavior:"smooth"});
});

$("#heroTypeBtn").addEventListener("click", () => {
  $("#builder").scrollIntoView({behavior:"smooth"});
  setTimeout(() => $("#ideaInput").focus(), 500);
});

$("#heroVoiceBtn").addEventListener("click", () => {
  $("#builder").scrollIntoView({behavior:"smooth"});
  setTimeout(() => $("#voiceBtn").click(), 650);
});

$$("[data-audience]").forEach(button => {
  button.addEventListener("click", () => {
    $$("[data-audience]").forEach(b => b.classList.remove("active"));
    button.classList.add("active");
    chosenAudience = button.dataset.audience;
    $("#solPrompt").textContent = `Great. What would you like to build for ${chosenAudience.toLowerCase()}?`;
    speak($("#solPrompt").textContent);
  });
});

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = null;
let listening = false;

if(SpeechRecognition){
  recognition = new SpeechRecognition();
  recognition.lang = "en-US";
  recognition.interimResults = true;
  recognition.continuous = false;

  recognition.onstart = () => {
    listening = true;
    $("#voiceBtn").classList.add("listening");
    $("#voiceStatus").textContent = "I’m listening. Tell me your idea.";
  };

  recognition.onresult = (event) => {
    let transcript = "";
    for(let i = event.resultIndex; i < event.results.length; i++){
      transcript += event.results[i][0].transcript;
    }
    $("#ideaInput").value = transcript.trim();
    $("#voiceStatus").textContent =
      event.results[event.results.length - 1].isFinal
      ? "I heard you. Choose who it helps, then build your roadmap."
      : "Keep talking…";
  };

  recognition.onerror = (event) => {
    const messages = {
      "not-allowed":"Microphone permission is off. Allow microphone access and try again.",
      "no-speech":"I didn’t hear anything. Tap the microphone and try again.",
      "audio-capture":"I can’t find a microphone on this device.",
      "network":"Voice recognition needs an internet connection."
    };
    $("#voiceStatus").textContent = messages[event.error] || "Voice did not work that time. You can try again or type.";
  };

  recognition.onend = () => {
    listening = false;
    $("#voiceBtn").classList.remove("listening");
  };

  $("#voiceBtn").addEventListener("click", () => {
    if(listening){
      recognition.stop();
      return;
    }
    try{
      recognition.start();
    }catch{
      $("#voiceStatus").textContent = "Wait one second, then tap the microphone again.";
    }
  });
}else{
  $("#voiceBtn").addEventListener("click", () => {
    $("#voiceStatus").textContent =
      "Voice typing is not available in this browser. Try Safari or Chrome, or use your keyboard microphone.";
    $("#ideaInput").focus();
  });
}

$("#buildBtn").addEventListener("click", () => {
  const idea = $("#ideaInput").value.trim();
  const experience = $("#experience").value;

  if(!idea){
    $("#voiceStatus").textContent = "Tell me your idea first. You can type it or say it.";
    $("#ideaInput").focus();
    return;
  }

  const level = {
    beginner:"simple, beginner-friendly",
    intermediate:"practical",
    advanced:"advanced"
  }[experience];

  const audience = chosenAudience || "the people you want to help";
  $("#roadmap").innerHTML = `
    <h3>Your ${level} Project Sol roadmap</h3>
    <p><strong>Your idea:</strong> ${escapeHtml(idea)}</p>
    <p><strong>Who it helps:</strong> ${escapeHtml(audience)}</p>
    <div class="roadmap-grid">
      <div class="step"><strong>1. Define the change</strong><p>Write one sentence describing how life becomes better if this idea works.</p></div>
      <div class="step"><strong>2. Build the smallest useful version</strong><p>Choose one feature you can finish and show to one person.</p></div>
      <div class="step"><strong>3. Learn only what you need next</strong><p>List the first skill, tool, or piece of knowledge required for that feature.</p></div>
      <div class="step"><strong>4. Make a visual prototype</strong><p>Sketch it, model it, act it out, or create a clickable mockup.</p></div>
      <div class="step"><strong>5. Test with a real person</strong><p>Ask what helped, what confused them, and what they would change.</p></div>
      <div class="step"><strong>6. Help the next builder</strong><p>Share what you learned so someone else can start faster.</p></div>
    </div>
  `;
  $("#roadmap").classList.remove("hidden");
  $("#roadmap").scrollIntoView({behavior:"smooth", block:"center"});
});

$("#addIdeaBtn").addEventListener("click", () => {
  $("#ideaDialog").showModal();
});

$("#ideaForm").addEventListener("submit", () => {
  const name = $("#gardenName").value.trim();
  const desc = $("#gardenDesc").value.trim();
  const who = $("#gardenAudience").value;
  if(!name || !desc) return;

  const icons = {
    "Kids":"🧒","Students":"🎓","Families":"👨‍👩‍👧",
    "Communities":"🌍","Everyone":"🌎"
  };

  setIdeas([{name,desc,who,icon:icons[who] || "🌱"}, ...getIdeas()]);
});

$("#year").textContent = new Date().getFullYear();
renderGarden();
