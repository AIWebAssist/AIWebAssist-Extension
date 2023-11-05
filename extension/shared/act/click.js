function click_on_coordinates(x,y){
    var element = document.elementFromPoint(x, y);
    // Click on the element
    element.click();

    return false;
};

function click_on_coordinates_and_text(x,y,text){
    var element = document.elementFromPoint(x, y);

    // Click on the element
    element.click();
    
    // https://stackoverflow.com/questions/64553720/how-to-send-a-word-as-a-keypress-event-in-javascript-without-jquery
    var instr = '';
    for (let chr of text){                    
        instr += chr;
        let iei = { inputType:'insertText', data:instr, bubbles: true};
                        
        element.value = instr;
        iev = new InputEvent('input',iei);
        element.dispatchEvent(iev);
                    
    }
    return true;
};



function keyborad_action(text){
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