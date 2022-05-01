console.log("SENDING");
chrome.runtime.sendMessage({clicked : true});
chrome.runtime.connect({ name: "popup" });

console.log("SENT");

