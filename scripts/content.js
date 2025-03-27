// Mic Button Add करने के लिए
let btnBQ = document.createElement("button");
btnBQ.id = "btnBQ";
btnBQ.textContent = "🎤";
btnBQ.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    height: 50px;
    width: 50px;
    background-color: turquoise;
    border: 2px solid black;
    border-radius: 50%;
    font-size: 24px;
    cursor: pointer;
    z-index: 1000;
`;
document.body.appendChild(btnBQ);

// Speech API Check
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
if (!window.SpeechRecognition) {
    alert("Your browser does not support Speech Recognition.");
} else {
    let speechRecognition = new SpeechRecognition();
    speechRecognition.continuous = true;
    speechRecognition.interimResults = true;
    speechRecognition.lang = "en-US";

    let transcript = "";

    speechRecognition.onresult = function(event) {
        transcript = Array.from(event.results)
            .map(result => result[0].transcript)
            .join(" ");
    };

    btnBQ.addEventListener("click", function() {
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
    });

    function processCommand(text) {
        text = text.toLowerCase().trim();
        if (text.includes("open google")) {
            window.open("https://www.google.com", "_blank");
        } else if (text.includes("search for")) {
            let query = text.replace("search for", "").trim();
            window.open(`https://www.google.com/search?q=${query}`, "_blank");
        } else if (text.includes("change background")) {
            document.body.style.backgroundColor = `#${Math.floor(Math.random()*16777215).toString(16)}`;
        } else {
            alert("You said: " + text);
        }
    }
}
