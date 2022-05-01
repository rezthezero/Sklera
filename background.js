let pluginOn=false;

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

console.log("STARTING BACKGROUND");
chrome.runtime.onMessage.addListener(async function (message, sender, sendResponse,tab) 
{
  console.log("RECEIVED");

  if (message.clicked) 
  {
    console.log("MESSAGE IS CLICKED");
    console.log("CHEKCING PLUGINON");
    if(pluginOn==false)
    {
      console.log("BLURRING");
      pluginOn=true;
      chrome.tabs.query({active:true},function(tabs)
      {
        chrome.scripting.executeScript(
        {
          target: {tabId:tabs[0].id},
          files: ['content.js']
        })
      })
      //USE THIS TO SLEEP FOR BREAKS
      // await sleep(5000);
    }         
  }
});

chrome.runtime.onConnect.addListener(function(port) {
    if (port.name === "popup") {
        port.onDisconnect.addListener(function() 
        {
          console.log("UNBLURRING");
          pluginOn=false;
          chrome.tabs.query({active:true},function(tabs)
          {
            chrome.tabs.query({active:true},function(tabs)
            {
              chrome.scripting.executeScript(
              {
                target: {tabId:tabs[0].id},
                files: ['unblur.js']
              })
            })
          })
        });

    }
});