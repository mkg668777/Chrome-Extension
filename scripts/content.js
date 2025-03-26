let body = document.querySelector("body");

let btnBQ = document.createElement("button");
btnqBQ.setAttribute("id", "btnBQ");
btnBQ.addEventListener("click", doSomething);
body.appendChild(btnBQ);


let speechRecognition = new webkitSpeechRecognition();
speechRecognition.continuous = true;
speechRecognition.interimResults = true;
speechRecognition.lang = "en-US";

let transcript = "";
speechRecognition.onresult = function(event) {
  transcript ="";
  for (let i = event.resultIndex; i < event.results.length; i++) {
    transcript += event.results[i][0].transcript;
  }
}

document.addEventListener("keypress", handlekbd);

function handlekbd(event) {
 if (event.shifkey && event.code ==="keyQ") {
   btnQurious.click();
 }
}

function doSomething() {
  if(btnBQ.hasAttribute("listening") === false) {
    btnBQ.setAttribute("listening", true);
    speechRecognition.start();
  } else {
    btnBQ.removeAttribute("listening");
    speechRecognition.stop();
    debugger;
    const myPopup = new Popup({
      id: "myPopup",
      title: "Here is what you said",
      content: transcript,
    })
    myPopup.show();
  } 
  
}