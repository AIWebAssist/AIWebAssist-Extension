(() => {
  /**
   * @param {string} command
   */
  const runCommand = async (commandJson) => {
    try {
      
      const command = JSON.parse(commandJson);
      const { script, args } = command.action;
      // we may need the make the script work like this
      var actionHint = new Function("shared/actions/"+script + '("' + args + '");');
      actionHint()
    } catch (e) {
      console.error(e);
    }
  };

  chrome.runtime.onMessage.addListener((req, sender, res) => {
    if (req.message === "run_command") {
      runCommand(req);
    } else {
    var actionHint = new Function("shared/extract/"+req.message+';');
    var response = actionHint()
    res({
      response:response
    });
      res({
        url: browserContent.url,
        html: browserContent.html,
      });
    }
  });
})();
