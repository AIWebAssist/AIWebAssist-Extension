chrome.runtime.onInstalled.addListener((tab) => {
  console.log("installed")
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.contentScriptQuery === "take_screenshot") {
      captureVisibleTab(sender.tab.windowId)
          .then((screenshotDataUrl) => sendResponse(screenshotDataUrl))
          .catch((error) => {
              console.error("Error capturing screenshot:", error);
              sendResponse({ error: "Failed to capture screenshot" });
          });
      return true; // To indicate that the sendResponse callback will be called asynchronously
  } else if (request.contentScriptQuery === "get_session_id") {
      sendResponse(sender.tab.id);
      return true; // To indicate that the sendResponse callback will be called asynchronously
  }
});

function captureVisibleTab(tabId) {
  return new Promise((resolve, reject) => {
    chrome.tabs.captureVisibleTab(tabId,{ format: "png" }, function (screenshotDataUrl) {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      } else {
        resolve(screenshotDataUrl);
      }
    });
  });
}
