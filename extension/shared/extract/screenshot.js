chrome.tabs.captureVisibleTab({ format: "png" }, function(dataUrl) {
    const base64Data = dataUrl.split(",")[1];
    const binaryData = atob(base64Data);
    const arrayBuffer = new ArrayBuffer(binaryData.length);
    const uint8Array = new Uint8Array(arrayBuffer);
  
    for (let i = 0; i < binaryData.length; i++) {
      uint8Array[i] = binaryData.charCodeAt(i);
    }
  
    return new Blob([arrayBuffer], { type: "image/png" });

})