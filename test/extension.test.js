// setup mocks
const fetchMock = require('fetch-mock');
const mockExtract = jest.fn().mockResolvedValue({});  // Declare mockExtract in a broader scope
const mockCommand = jest.fn().mockImplementation(() => {true});
const sendMessageMock = jest.fn().mockImplementation((tabId, message) => {
  if (message.message === 'extract') {
    return mockExtract();
  } else if (message.message === 'run_command') {
    return mockCommand();
  }
  throw Error("!")
});

fetchMock.post('http://scrape_anything:3000/process', {
  "body": JSON.stringify({
    "example_script": "show_text",
    "tool_input": {
      "text": "server is down",
    },
  }),
});

require('../extension/main.js'); // Import the functions you want to test

describe('Form Event Listener', () => {
  let form;
  let submitButton;
  let errorEl;

  beforeEach(() => {
    // Set up a fake DOM environment for testing
    document.body.innerHTML = `
    <form id="objective-form">
    <label for="objective">What you would like to do?</label>
    <br>
    <select id="tabs-dropdown"></select>
    <textarea id="objective"></textarea>
    <button type="submit" id="submit">Submit</button>
    </form>
    <label class="switch">
        <input type="checkbox" id="myCheckbox">
        <span class="slider round"></span>
    </label>
    <div id="error"></div>
    `;

    form = document.getElementById('objective-form');
    submitButton = document.getElementById('submit');
    errorEl = document.getElementById('error');

    const event = new Event('DOMContentLoaded');
    document.dispatchEvent(event);

    global.chrome = {
      tabs: {
        query: jest.fn().mockImplementation((tabId, message) => [{ id: 456 }]),
        sendMessage: sendMessageMock,
      },
    };
  });

  it('should call extract for all elements, get response and call command', async () => {
    // Simulate form submission
    const event = new Event('submit', { bubbles: true, cancelable: true });
    form.dispatchEvent(event);
    // wait the function will finish.
    await new Promise((resolve) => setTimeout(resolve, 0));

    // Make Sure all API are called and there is no failure.
    expect(errorEl.innerHTML).toBe('');
    expect(mockCommand).toHaveBeenCalledTimes(1);
    expect(mockExtract).toHaveBeenCalledTimes(6);
  });
});
