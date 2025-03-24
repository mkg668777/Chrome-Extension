document.getElementById("clickButton").addEventListener("click", function() {
    document.getElementById("message").textContent = "Hello from your extension!";
});

/* Step 5: Create background.js */
chrome.runtime.onInstalled.addListener(() => {
    console.log("Extension Installed Successfully");
});