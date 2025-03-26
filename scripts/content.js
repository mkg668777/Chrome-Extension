let body = document.querySelector("body");

let btnBQ = document.createElement("button");
btnBQ.setAttribute("id", "btnBQ");
btnBQ.textContent = "🎤"; // Mic icon for better UI
btnBQ.addEventListener("click", toggleSpeechRecognition);
body.appendChild(btnBQ);

let speechRecognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
speechRecognition.continuous = true;
speechRecognition.interimResults = true;
speechRecognition.lang = "en-US";

let transcript = "";
speechRecognition.onresult = function(event) {
  transcript = "";
  for (let i = event.resultIndex; i < event.results.length; i++) {
    transcript += event.results[i][0].transcript;
  }
};

document.addEventListener("keydown", function(event) {
  if (event.shiftKey && event.code === "KeyQ") {
    toggleSpeechRecognition();
  }
});

function toggleSpeechRecognition() {
  if (!btnBQ.hasAttribute("listening")) {
    btnBQ.setAttribute("listening", "true");
    speechRecognition.start();
    btnBQ.style.backgroundColor = "red";
  } else {
    btnBQ.removeAttribute("listening");
    speechRecognition.stop();
    btnBQ.style.backgroundColor = "turquoise";
    showPopup(transcript);
  }
}

function showPopup(text) {
  alert("You said: " + text);
}
