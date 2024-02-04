function click_on_coordinates(x,y){
    var element = document.elementFromPoint(x, y);

    if (element === undefined || element === null) {
        return {
            execution_status: false,
            message:"element in this position is undefined."
        };
    }

    if (element.style.display === 'none' || element.disabled) {
        return {
            execution_status: false,
            message:"element is not clickable."
        };
    }

    try{
        // Click on the element
        element.click();
    } catch (error) {
        return  {
            execution_status: false,
            message: "element click failed: "+error
        }
    }
    const rect = element.getBoundingClientRect();
    return {
        execution_status: true,
        data:{
            top: rect.top + window.scrollY,
            right: rect.left + window.scrollX + rect.width,
            bottom: rect.top + window.scrollY + rect.height,
            left: rect.left + window.scrollX
        }
    };
};

function click_on_coordinates_and_text(x,y,text){

    var status = click_on_coordinates(x, y);

    if (status['execution_status'] == false){
        return status;
    }

    // now, sent text
    // https://stackoverflow.com/questions/64553720/how-to-send-a-word-as-a-keypress-event-in-javascript-without-jquery
    var element = document.elementFromPoint(x, y);

    if (element === undefined) {
        return {
            execution_status: false,
            message:"element in this position is undefined."
        };
    }
    
    if (
        element.tagName !== 'INPUT' &&
        element.tagName !== 'TEXTAREA' &&
        !(element.isContentEditable && element.getAttribute('contenteditable') !== 'false')){
        //console.log( "element in not reciving input");
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
        return {
            execution_status: false,
            message: "element enter text failed: "+error
        };
    }
   
    return {
        execution_status: true,
        data:  Object.assign({}, status.data, {text:text})
    };

};



function keyborad_action(text){
    if (document.activeElement !== undefined){ 
        if (text.toLowerCase() === "esc") {
            // For "esc" key press
            var event = new KeyboardEvent('keydown', {
                key: 'Escape',
                code: 'Escape',
                bubbles: true,
                cancelable: true,
            });
            document.activeElement.dispatchEvent(event);
        } else if (text.toLowerCase() === "enter") {
            // For "enter" key press
            var event = new KeyboardEvent('keydown', {
                key: 'Enter',
                code: 'Enter',
                bubbles: true,
                cancelable: true,
            });
            
            document.activeElement.dispatchEvent(event);
        } else {
            return {
                execution_status: false,
                message: "no such key "+text
            };
        }
    }
    
    return {
        execution_status: true,
        data:{
            text:text,
        }
    }
}

export {click_on_coordinates,click_on_coordinates_and_text,keyborad_action};
