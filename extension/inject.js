(async () => {
    // Check if the circle already exists
    if (!document.getElementById('ai-assistance-circle')) {
    
        // Retrieve stored values from local storage
        const storedIsChecked = await new Promise((resolve) => {
            chrome.storage.local.get("is_active", function(result) {
                resolve(result.is_active);
            });
        });
    
        const storedObjective = await new Promise((resolve) => {
            chrome.storage.local.get("objective", function(result) {
                resolve(result.objective);
            });
        });
    
        const src = chrome.runtime.getURL('./content.js');
        const contentScript = await import(src);
    
        // Step 1: Create the round circle element
        const circle = document.createElement('div');
        circle.id = 'ai-assistance-circle';
        // Add an image icon inside the circle
        const icon = document.createElement('img');
        icon.src = chrome.runtime.getURL('cricle.png'); // Update with the correct path to your 128x128 icon
        icon.style.width = '100%';
        icon.style.height = '100%';
        
        icon.style.clipPath = 'circle(50% at center)';
        icon.style.webkitClipPath = 'circle(50% at center)';
    
        circle.appendChild(icon);
    
    
        // <--- function to make sure it draggable --->
        // Additional code for making the circle draggable
        let isDragging = false;
        let offsetX, offsetY;
    
        // Function to handle the start of dragging
        function startDrag(e) {
            isDragging = true;
            offsetX = e.clientX - circle.getBoundingClientRect().left;
            offsetY = e.clientY - circle.getBoundingClientRect().top;
        }
    
        // Function to handle the dragging movement
        function dragMove(e) {
            if (isDragging) {
                const x = e.clientX - offsetX;
                const y = e.clientY - offsetY;
    
                circle.style.left = `${x}px`;
                circle.style.top = `${y}px`;
            }
        }
    
        // Function to handle the end of dragging
        function endDrag() {
            isDragging = false;
        }
    
        // Add event listeners for dragging
        circle.addEventListener('mousedown', startDrag);
        document.addEventListener('mousemove', dragMove);
        document.addEventListener('mouseup', endDrag);
    
    
    
        // Step 2: Apply CSS styles directly in JavaScript
        circle.style.width = '50px';
        circle.style.height = '50px';
        circle.style.backgroundColor = '#3498db';
        circle.style.borderRadius = '50%';
        circle.style.position = 'fixed';
        circle.style.bottom = '20px';
        circle.style.right = '20px';
        circle.style.display = 'flex';
        circle.style.alignItems = 'center';
        circle.style.justifyContent = 'center';
        circle.style.cursor = 'pointer';
        circle.style.color = 'white';
        circle.style.fontWeight = 'bold';
        circle.style.zIndex = '2147483646';

        let popup = null; // Variable to store the pop-up element
    
        // Step 3: Add event listener to the circle element
        circle.addEventListener('click', function () {
            if (popup) {
                // If pop-up is already open, close it by removing it from the DOM
                document.body.removeChild(popup);
                popup = null; // Reset the variable
            } else {
                // <--- function to make sure the popmenu doesn't blocked --->
                // Calculate position for the popupContent near the circle
                const circleRect = circle.getBoundingClientRect();
                const popupWidth = 300; // Adjust this width as needed
                const offsetHeight = 100;
                const popupX = Math.min(circleRect.right + 10, window.innerWidth - popupWidth - 40);
                const popupY = Math.min(circleRect.top, window.innerHeight - offsetHeight - 40);
            
    
                // Step 4: Create and append the pop-up menu
                const popupContent = `
                <div style="position: fixed; left: ${popupX}px; top: ${popupY}px; background-color: white; padding: 10px; border: 1px solid #ddd; max-width: ${popupWidth}px; z-index: 2147483647;">
                    <!-- Close button -->
                    <button id="closeButton" style="position: absolute; top: 5px; right: 5px; cursor: pointer;">X</button>
            
                    <form id="objective-form">
                        <label for="objective">What you would like to do?</label>
                        <br>
                        <textarea id="objective"></textarea>
                        <button type="submit" id="submit">Submit</button>
                    </form>
            
                    <label class="switch">
                        <input type="checkbox" id="myCheckbox">
                        <span class="slider round"></span>
                        <span id="checkboxText">Guide me only</span> 
                    </label>
                    <div id="error"></div>
                </div>
                `;
                popup = document.createElement('div');
                popup.innerHTML = popupContent;

                document.body.appendChild(popup);
                

                const form = document.getElementById("objective-form");
                const objectiveInput = document.getElementById("objective");
                const submitButton = document.getElementById("submit");
                const active = document.getElementById("myCheckbox");
                const errorEl = document.getElementById("error");
                const checkboxText = document.getElementById("checkboxText");
                const closeButton = popup.querySelector('#closeButton');
    
                const disabledElements = new Set();

                // Function to disable the currently focused element
                function disableFocusedElement() {
                    const focusedElement = document.activeElement;
                    if (focusedElement && focusedElement.tagName !== "BODY" & focusedElement !== objectiveInput & focusedElement !== submitButton ) {
                        focusedElement.setAttribute('disabled', 'disabled');
                        disabledElements.add(focusedElement)
                    }
                }

                function enableAllDisabledElements() {
                    for (const element of disabledElements) {
                        element.removeAttribute('tabindex');
                        element.removeAttribute('disabled');
                    }
                    disabledElements.clear();
                }

                // Event listener for 'click' on the objectiveInput
                objectiveInput.addEventListener('click', disableFocusedElement);
                objectiveInput.addEventListener('input', disableFocusedElement);

                // Event listener for 'blur' on the objectiveInput
                objectiveInput.addEventListener('blur', enableAllDisabledElements);

                closeButton.addEventListener('click', () => {
                    document.body.removeChild(popup);
                    popup = null; // Reset the variable
                });
    
                // populate with the stored fields
                active.checked = storedIsChecked || false;
                if (storedIsChecked) {
                    checkboxText.textContent = "Taking Action";
                } else {
                    checkboxText.textContent = "Guide me only";
                }
    
                objectiveInput.value = storedObjective || "";
                active.addEventListener("change", function() {
                    if (active.checked) {
                        checkboxText.textContent = "Taking Action";
                        chrome.storage.local.set({ is_active: true });
                    } else {
                        checkboxText.textContent = "Guide me only";
                        chrome.storage.local.set({ is_active: false });
                    }
                    
                });
    
                // Add an event listener for 'input' event on the textarea to store the value
                objectiveInput.addEventListener("input", function() {
                    // Store text field value in local storage on every change
                    chrome.storage.local.set({ objective: objectiveInput.value });
                });
    
                form.addEventListener("submit", async (e) => {
                    console.log('submit event dispatched');
                    e.preventDefault();
                    submitButton.setAttribute("disabled", true);
                    errorEl.textContent = ""
    
                    const objective = objectiveInput.value;
                    let body = undefined;
    
                    try{
                        const session_id = await new Promise((resolve) => {
                            chrome.runtime.sendMessage({ contentScriptQuery: "get_session_id" }, function(response) {
                                resolve(response);
                            });
                        });
                        
                        chrome.runtime.sendMessage({ contentScriptQuery: "take_screenshot" }, function(response) {
                            console.log("called");
                            // Handle the response or do other processing with the screenshotDataUrl
                         });
                        const elements = await contentScript.main({
                            message: "extract",
                            script: "elements",
                        });
                        
    
                        const url = await contentScript.main({
                            message: "extract",
                            script: "get_url",
                        });
    
                        const {viewpointscroll,viewportHeight} = await contentScript.main({
                            message: "extract",
                            script: "window",
                        });
    
                        const scroll_width = await contentScript.main({
                            message: "extract",
                            script: "scroll_width",
                        });
    
                        const scroll_height = await contentScript.main({
                            message: "extract",
                            script: "scroll_height",
                        });
    
                        const {width,height} = await contentScript.main({
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
                        chrome.storage.local.clear()
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
                            "session_id":session_id,
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
                            const res = await fetch(`https://scrape_anything:3000/process`, {
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
                                contentScript.main({
                                    message: "run_command",
                                    active: active.checked,
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
            }
        });
    
        // Step 5: Append the circle to the DOM
        document.body.appendChild(circle);    
    }
    })();
    
