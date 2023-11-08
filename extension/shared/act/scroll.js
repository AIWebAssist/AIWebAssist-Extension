function scroll_down(){

    // Get the height of the viewport
    var viewportHeight = window.innerHeight;

    // Calculate the scroll distance (half the screen height)
    var scrollDistance = viewportHeight / 2;

    // Scroll down the web page
    window.scrollBy(0, scrollDistance);
}

function scroll_up(){
    // Get the height of the viewport
    var viewportHeight = window.innerHeight;

    // Calculate the scroll distance (half the screen height)
    var scrollDistance = viewportHeight / 2;

    // Scroll up the web page
    window.scrollBy(0, -scrollDistance);
}


function scroll_right(){
    // Get the width of the viewport
    var viewportWidth = window.innerWidth;

    // Calculate the scroll distance (half the screen width)
    var scrollDistance = viewportWidth / 2;

    // Scroll the web page to the right
    window.scrollBy(scrollDistance, 0);
}


function scroll_left(){
    // Get the width of the viewport
    var viewportWidth = window.innerWidth;

    // Calculate the scroll distance (half the screen width)
    var scrollDistance = viewportWidth / 2;

    // Scroll the web page to the left
    window.scrollBy(-scrollDistance, 0);
}

export {scroll_left,scroll_up,scroll_right,scroll_down};