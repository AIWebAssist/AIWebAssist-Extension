chrome.runtime.onInstalled.addListener((tab) => {
  console.log("installed")
});

chrome.runtime.onMessage.addListener(async function (request, sender, sendResponse) {
  if (request.contentScriptQuery === "take_screenshot") {
    try {
      const screenshotDataUrl = await captureVisibleTab(sender.tab.windowId);
      chrome.storage.local.set({ "screenshot": screenshotDataUrl });
      sendResponse(screenshotDataUrl);
    } catch (error) {
      console.error("Error capturing screenshot:", error);
      sendResponse({ error: "Failed to capture screenshot" });
    }
  } else if (request.contentScriptQuery === "get_session_id") {
    // Handle the contentScriptQuery to get the tab ID
    const tabId = sender.tab.id;
    sendResponse({ tabId });
  }

  // To indicate that the sendResponse callback will be called asynchronously
  return true;
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
