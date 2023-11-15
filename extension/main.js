const populateTabsDropdown = async () => {
  const tabsDropdown = document.getElementById("tabs-dropdown");

  try {
    // Clear existing options
    tabsDropdown.innerHTML = "";

    // Get information about the current window
    const currentWindow = await chrome.windows.getCurrent({ populate: true });

    // Filter tabs to include only those in the current window
    const tabsInCurrentWindow = currentWindow.tabs.filter(tab => !tab.url.startsWith("chrome-extension://"));

    tabsInCurrentWindow.forEach(tab => {
      const option = document.createElement("option");
      option.value = tab.id;
      option.text = tab.title;
      tabsDropdown.appendChild(option);
    });

    // Set the currently active tab in the current window as the selected option
    const activeTab = tabsInCurrentWindow.find(tab => tab.active);
    if (activeTab) {
      tabsDropdown.value = activeTab.id;
    }
  } catch (e) {
    console.error(e);
  }
};

// Add an event listener to handle tab changes
chrome.tabs.onActivated.addListener(async () => {
  await populateTabsDropdown();
});

function captureVisibleTab() {
  return new Promise((resolve, reject) => {
    chrome.tabs.captureVisibleTab({ format: "png" }, function (screenshotDataUrl) {
      if (chrome.runtime.lastError) {
        // Handle any error that occurred during capturing
        reject(new Error(chrome.runtime.lastError));
      } else {
        // Resolve the promise with the screenshotDataUrl
        resolve(screenshotDataUrl);
      }
    });
  });
}

document.addEventListener("DOMContentLoaded", async function () {
  console.log('DOMContentLoaded event dispatched');
  // Populate the tabs dropdown when the document is loaded
  await populateTabsDropdown();
  const form = document.getElementById("objective-form");
  const objectiveInput = document.getElementById("objective");
  const submitButton = document.getElementById("submit");
  const active = document.getElementById("myCheckbox");
  const errorEl = document.getElementById("error");
  let is_active = false;
  active.addEventListener("change", function() {
    if (active.checked) {
      is_active = true;
    } else {
      is_active = false;
    }
  });

  form.addEventListener("submit", async (e) => {
    console.log('submit event dispatched');
    e.preventDefault();
    submitButton.setAttribute("disabled", true);
    errorEl.textContent = ""
    
    const tabsDropdown = document.getElementById("tabs-dropdown");
    const tabId = parseInt(tabsDropdown.value);
    console.log("Selected Tab ID: " + tabId);

    const objective = objectiveInput.value;
    let body = undefined;

    try{
        chrome.tabs.captureVisibleTab({ format: "png" },function(screenshotDataUrl) {
          chrome.storage.local.set({ "screenshot": screenshotDataUrl });
        });
        const elements = await chrome.tabs.sendMessage(tabId, {
          message: "extract",
          script: "elements",
        });
        

        const url = await chrome.tabs.sendMessage(tabId, {
          message: "extract",
          script: "get_url",
        });

        const {viewpointscroll,viewportHeight} = await chrome.tabs.sendMessage(tabId, {
          message: "extract",
          script: "window",
        });

        const scroll_width = await chrome.tabs.sendMessage(tabId, {
          message: "extract",
          script: "scroll_width",
        });

        const scroll_height = await chrome.tabs.sendMessage(tabId, {
          message: "extract",
          script: "scroll_height",
        });

        const {width,height} = await chrome.tabs.sendMessage(tabId, {
          message: "extract",
          script: "get_window_size",
        });

        console.log("sending request to the server.")
        let screenshotImage =  await new Promise((resolve, reject) => {
            chrome.storage.local.get(["screenshot"], function(result) {
              if (chrome.runtime.lastError) {
                // Handle any error that occurred during capturing
                reject(new Error(chrome.runtime.lastError));
              } else {
                // Resolve the promise with the screenshotDataUrl
                resolve(result.screenshot);
              }
            });
          });
        console.log(screenshotImage)
        body = JSON.stringify({
          "viewpointscroll":viewpointscroll,
          "viewportHeight":viewportHeight,
          "scroll_width":scroll_width,
          "scroll_height":scroll_height,
          "width":width,
          "height":height,
          "raw_on_screen":elements,
          "url":url,
          "user_task":objective,
          "session_id":tabId,
          "screenshot":screenshotImage,
        });
      } catch (e) {
          console.log(e.message)

          if (e.message.includes("Could not establish connection. Receiving end does not exist.")){
            errorEl.textContent  = `Please refresh the selected tab before continuing.`;
          }
          else{
            errorEl.textContent  = `Extracting failed, Error: ${e.message}.`;
          }
      }


    if (body != undefined){
      let command = undefined;
      try{
          //const localHost = process.env.HOST || "localhost"; // "localhost" is the default if LOCAL_HOST is not set
          const res = await fetch(`http://scrape_anything:3000/process`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body,
          });
          if (res.status != 200) {
            // Handle the not 200 error case here
            errorEl.textContent = `Internal Server Error ${e.message}`;
          } else {
            // If the response is not a 500 error, proceed as normal
            command = await res.json();
          }
        } catch (e) {
          command = {"script":"server_fail",'tool_input':{}}
          errorEl.textContent  = `Calling backend failed, Error: ${e.message}.`;
        }
      
        if (command != undefined){
          if (command.hasOwnProperty("script") | command.hasOwnProperty("tool_input")) {
            try{
               chrome.tabs.sendMessage(tabId, {
                message: "run_command",
                active: is_active,
                script: command.script,
                args: command.tool_input, 
              },
              function(response) {

                body = JSON.stringify({
                  "execution_status":response,
                  "session_id":tabId,
                })
                fetch(`http://scrape_anything:3000/status`, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body
              }).then((reponse) => {
                console.log(reponse.status)
              });
            });
            } catch (e){
              errorEl.textContent  = `Executing guidance failed, Error: ${e.message}.`;
            }
          }
          else{
              console.error("response is corrupted.")
          }
        }
        
    }
    
    submitButton.removeAttribute("disabled");
    
  });

});
