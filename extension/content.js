import {call_act,call_extract,call_guide} from './shared/entry.js'

async function main(req) {
  if (req.message === "run_command") {
    var execute_function = call_guide
    if (req.active == true ){
      execute_function = call_act
    }
    //  present the user a guidance 
    console.log("Running command script: "+req.script+" with args: "+JSON.stringify(req.args));
    return execute_function(req.script,req.args).then(response => {
      console.log("Response from script " + req.script + " execution status: " + response);

      return response;
    });
    
  } else if (req.message === "extract") {

    // get information about the screen
    console.log("Running extraction script: "+req.script+" with args: "+JSON.stringify(req.args));
    return call_extract(req.script).then(response => {
        console.log("Response from script " + req.script + " is: " + response);
        if (typeof response === 'undefined') {
          console.error("Response from script"+req.script+" is undefined.");
          response = "MISSING"
        }
        return response;
      });
  }
  else {
    throw new Error('message '+req.message+" is not defined.");

  }
}

export {main};