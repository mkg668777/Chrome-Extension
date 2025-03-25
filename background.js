chrome.runtime.onInstalled.addListener(() => {
    console.log("Extension Installed!");
});

// 6. content.js
document.body.style.border = "5px solid red";
