import {call_act,call_extract,call_guide} from './shared/entry.js'

export function main() {

  chrome.runtime.onMessage.addListener((req, sender, sendResponse) => {
    if (req.message === "run_command") {
      var execute_function = call_guide
      if (req.active == true ){
        execute_function = call_act
      }
      //  present the user a guidance 
      console.log("Running command script: "+req.script+" with args: "+JSON.stringify(req.args));
      execute_function(req.script,req.args).then(response => {
        console.log("Response from script " + req.script + " execution status: " + response);

        sendResponse(response);
        console.log("sent")
      });
      
    } else if (req.message === "extract") {

      // get information about the screen
      console.log("Running extraction script: "+req.script+" with args: "+JSON.stringify(req.args));
      call_extract(req.script).then(response => {
          console.log("Response from script " + req.script + " is: " + response);
          if (typeof response === 'undefined') {
            console.error("Response from script"+req.script+" is undefined.");
            response = "MISSING"
          }
          sendResponse(response);
          console.log("sent")
        });
    }
    else {
      throw new Error('message '+req.message+" is not defined.");

    }
  });
}
