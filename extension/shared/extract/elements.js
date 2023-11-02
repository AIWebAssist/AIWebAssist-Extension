export default function get_elements(){
  function getXPath(element) {
      if (element && element.nodeType === Node.ELEMENT_NODE) {
        const idx = Array.from(element.parentNode.children).indexOf(element) + 1;
        const tag = element.tagName.toLowerCase();
        const parentXPath = getXPath(element.parentNode);
        return `${parentXPath}/${tag}[${idx}]`;
      }
      return '';
    }
  function cleanCsvTags(element) {
      if (element === undefined){
       return "";
      }
      return element.trim().replaceAll(",","<comma>").replaceAll("\n","<new_line>")
    }
    
    // Get all elements in the HTML page
    const elements = document.getElementsByTagName('*');
    
    // Create an array to store the element details
    const elementDetails = [];
    
    // Iterate through each element
    for (let i = 0; i < elements.length; i++) {
      const element = elements[i];
    
      // Get the bounding rectangle of the element
      const rect = element.getBoundingClientRect();
    
      // Get the text content of the element
      const textContent = element.textContent;
    
      // Get the tooltip value if it exists
      const tooltip = element.hasAttribute('title') ? element.getAttribute('title') : '';
    
      // Get the aria-label value
      const ariaLabel = (element.hasAttribute('aria-label') ? element.getAttribute('aria-label') : '');
    
      // Get the nodeName
      const e_type = element.nodeName;
    
      // Get the data-initial-value
      const data_initial_value = (element.hasAttribute('data-initial-value') ? element.getAttribute('data-initial-value') : '')
    
      // Get innerText
      const innerText = element.innerText
    
      // Store the element, its bounding rectangle, text content, and tooltip details
      const elementInfo = {
        element: element,
        rect: rect,
        textContent: cleanCsvTags(textContent),
        ariaLabel: cleanCsvTags(ariaLabel),
        tooltip: cleanCsvTags(tooltip),
        e_type: cleanCsvTags(e_type),
        data_initial_value: cleanCsvTags(data_initial_value),
        innerText: cleanCsvTags(innerText),
        parent_xpath : cleanCsvTags(getXPath(element.parentElement)),
        cursor : cleanCsvTags(window.getComputedStyle(element).cursor),
        onclick_no_null: (element.onclick != null)
    
      };
    
      if (elementInfo.rect !== undefined){
      elementDetails.push(elementInfo)
      }
    
    }
    console.log("found "+elementDetails.length +" elements")
    const response = "centerX,centerY,ElementType,textContent,TooltipValue,AriaLabel,data-initial-value,innerText,parent_xpath,height,width,top,bottom,left,right,cursor,onclick_no_null\n"+elementDetails.map( e=> (e.rect.left + (e.rect.width / 2))+","+(e.rect.top + (e.rect.height / 2))+","+e.e_type+","+e.textContent+","+e.tooltip+","+e.ariaLabel+","+e.data_initial_value+","+e.innerText+","+e.parent_xpath+","+e.rect.height+","+e.rect.width+","+e.rect.top+","+e.rect.bottom+","+e.rect.left+","+e.rect.right+","+e.cursor+","+e.onclick_no_null).join("\n")
    return response;
};
//console.logs(get_elements())
