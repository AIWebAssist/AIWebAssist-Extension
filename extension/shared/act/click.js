function click_on_coordinates(x,y){
    var element = document.elementFromPoint(x, y);

    if (element === undefined || element === null) {
        return "element in this position is undefined."
    }

    if (element.style.display === 'none' || element.disabled) {
        return "element is not clickable."
    }

    try{
        // Click on the element
        element.click();
    } catch (error) {
        return "element click failed: "+error
    }
    return true;
};

function click_on_coordinates_and_text(x,y,text){
    console.log("x="+x+",y="+y+",text="+text)

    var msg = click_on_coordinates(x, y);

    if (msg !== true){
        return msg;
    }

    // now, sent text
    // https://stackoverflow.com/questions/64553720/how-to-send-a-word-as-a-keypress-event-in-javascript-without-jquery
    var element = document.elementFromPoint(x, y);

    if (element === undefined) {
        return "element in this position is undefined."
    }
    
    if (
        element.tagName !== 'INPUT' &&
        element.tagName !== 'TEXTAREA' &&
        !(element.isContentEditable && element.getAttribute('contenteditable') !== 'false')){
        console.log( "element in not reciving input");
    }
    try{
        var instr = '';
        for (let chr of text){                    
            instr += chr;
            let iei = { inputType:'insertText', data:instr, bubbles: true};
                            
            
            element.value = instr;
            let iev = new InputEvent('input',iei);
            element.dispatchEvent(iev); 
        }      
            
    } catch (error){
        return "element enter text failed: "+error
    }
    return true;

};



function keyborad_action(text){
    return "deprecated."
    if (text.toLowerCase() === "esc") {
        // For "esc" key press
        var event = new KeyboardEvent("keydown", {
            key: "Escape",
        });
        document.dispatchEvent(event);
    } else if (text.toLowerCase() === "enter") {
        // For "enter" key press
        var event = new KeyboardEvent("keydown", {
            key: "Enter",
        });
        document.dispatchEvent(event);
    } else {
        return false;
    }

    return true;
}

export {click_on_coordinates,click_on_coordinates_and_text,keyborad_action};
