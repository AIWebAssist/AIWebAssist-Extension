let elementInputMap = {};
const reportBack = async(body)=>{

    const res = await fetch(`http://scrape_anything:3000/report`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body,
    });

    if (res.status != 200) {
        console.error("Failed to report ground truth")
    }
};



// Click event listener
document.addEventListener('click', (event) => {
  // Get the XPath of the clicked element
  body = JSON.stringify({
    "xpath":getXPath(event.target),
    "event":"click"
  });
  reportBack(body)
});

// Keyboard event listener
document.addEventListener('keydown', (event) => {
    const xpath = getXPath(event.target);
    elementInputMap[xpath] = (elementInputMap[xpath] || '') + event.key;
  
});

// Helper function to get a unique key for an element
function getElementKey(element) {
  if (element.id) {
    return `id:${element.id}`;
  }
  return `xpath:${getXPath(element)}`;
}

// Helper function to get the XPath of an element
function getXPath(element) {
  if (element.id !== "") {
    return `id("${element.id}")`;
  }
  // Rest of the XPath calculation remains the same
}

// Capture the "beforeunload" event to send the aggregated keyboard input
window.addEventListener('beforeunload', (event) => {
  //for (const key in elementInputMap) {
  //  if (elementInputMap.hasOwnProperty(key)) {
  //    const elementInput = elementInputMap[key];
  //    // You can send the aggregated input data here, e.g., via an AJAX request
  //     console.log(`Aggregated Keyboard Input for Element [${key}]:`, elementInput);
  //   }
  //}
  body = JSON.stringify({
    "data":elementInputMap,
    "event":"keyborad"
  });
  reportBack(body)
  elementInputMap = {}
});