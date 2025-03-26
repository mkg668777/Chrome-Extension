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





function processCommand(text) {
  let response = "";
  text = text.toLowerCase();
  
  if (text.includes("open google")) {
    window.open("https://www.google.com", "_blank");
    response = "Opening Google...";
  } else if (text.includes("search for ")) {
    let query = text;
    window.open(`https://www.google.com/search?q=${query}`, "_blank");
    response = `Searching for: ${query}`;
  } else if (text.includes("change background")) {
    document.body.style.backgroundColor = "#" + Math.floor(Math.random()*16777215).toString(16);
    response = "Background color changed!";
  } 
  else {
    showPopup(text);
  }
  
}




function toggleSpeechRecognition() {
  if (!btnBQ.hasAttribute("listening")) {
    btnBQ.setAttribute("listening", "true");
    speechRecognition.start();
    btnBQ.style.backgroundColor = "red";
  } else {
    btnBQ.removeAttribute("listening");
    speechRecognition.stop();
    btnBQ.style.backgroundColor = "turquoise";
    processCommand(transcript);
  }
}







function showPopup(text) {
  alert("You said: " + text);
}
