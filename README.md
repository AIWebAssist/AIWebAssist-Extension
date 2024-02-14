# AI Web Assit Chrome extension 
This is an chrome extension that amid to assist the user during browsering.

## Code stracture:

- **`extension`**: code contains all the extension files.

    - **`extension/shared`**: Directory with the scripts that is loaded to the tab and used to extract information from the page and direct the user to the action.

    - **`extension/content.js`**: Script handling content-related tasks (a gate to `shared`)

    - **`extension/background.js`**: Script managing chrome background functionality.

    - **`extension/inject.js`**: Main script for extension functionality.

    - **`extension/manifest.json`**: Configuration file defining the extension's properties.

    - **`extension/manifest.json`**: the manifest of the extesnion.

        ** reset should be remove (?)

## Logic

This is the extension logic:
1. On page load the extension injects ```inject.js``` into the browser dom.
2. The user interact with the component:
    a. Enter a text about a task he would like to achieve.
    b. Mark if it would like the extension to one of the two:
        - Take the offered on behalf.
        - Guide the action to take.
    c. Click submit.
3. The extension extrct information about the page.
4. Call the backend to make a decision on what the next action. 
5. On response, guide/act according to the response.
6. Report the the backend status of the execution.