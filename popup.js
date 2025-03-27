document.addEventListener("DOMContentLoaded", function () {
    let startButton = document.getElementById("startRecognition");
    let output = document.getElementById("output");

    window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!window.SpeechRecognition) {
        alert("Your browser does not support Speech Recognition.");
        return;
    }

    let speechRecognition = new SpeechRecognition();
    speechRecognition.continuous = true;
    speechRecognition.interimResults = true;
    speechRecognition.lang = "en-US";

    speechRecognition.onresult = function (event) {
        let transcript = event.results[event.results.length - 1][0].transcript.toLowerCase();
        output.textContent = "You said: " + transcript;

        if (transcript.includes("open google")) {
            window.open("https://www.google.com", "_blank");
        } else if (transcript.includes("search for")) {
            let query = transcript.replace("search for", "").trim();
            window.open(`https://www.google.com/search?q=${query}`, "_blank");
        } else if (transcript.includes("change background")) {
            document.body.style.backgroundColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
        }
    };

    startButton.addEventListener("click", function () {
        speechRecognition.start();
    });
});
