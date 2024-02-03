export default function point_scroll_down() {
    // Calculate the size for arrow and text
    const oneTenthOfViewportHeight = window.innerHeight / 10 + 'px'; // Adjusted to 1/10 of the screen height

    // Create the scroll indicator container element
    const indicatorContainer = document.createElement('div');
    indicatorContainer.style.position = 'fixed';
    indicatorContainer.style.bottom = '50px'; // Adjust the bottom position to move the indicator higher
    indicatorContainer.style.left = '50%';
    indicatorContainer.style.transform = 'translateX(-50%)';
    indicatorContainer.style.textAlign = 'center';
    indicatorContainer.style.zIndex = 2147483647;

    // Create the text element
    const text = document.createElement('p');
    text.style.color = '#666666';
    text.style.fontSize = oneTenthOfViewportHeight; // 1/10 of the screen height
    text.textContent = 'please scroll down';

    // Create the arrow element for scrolling down
    const arrow = document.createElement('div');
    arrow.style.width = '0';
    arrow.style.height = '0';
    arrow.style.borderLeft = `${oneTenthOfViewportHeight} solid transparent`; // Adjusted to 1/10 of the screen height
    arrow.style.borderRight = `${oneTenthOfViewportHeight} solid transparent`; // Adjusted to 1/10 of the screen height
    arrow.style.borderTop = `${oneTenthOfViewportHeight} solid #666666`; // Adjusted to 1/10 of the screen height
    arrow.style.display = 'inline-block';
    arrow.style.marginTop = '5px'; // Adjust margin to center the gap between text and arrow, reduced for spacing

    // Add the indicator elements to the container (arrow after text)
    indicatorContainer.appendChild(text);
    indicatorContainer.appendChild(arrow);

    // Add the indicator to the document body
    document.body.appendChild(indicatorContainer);

    // Add inline CSS for animation
    arrow.style.animation = `
        scrollDown 1s infinite
    `;

    // Function to remove the indicator after a certain delay (e.g., 3 seconds)
    function removeIndicator() {
        indicatorContainer.style.display = 'none';
    }

    // Set a timeout to remove the indicator
    setTimeout(removeIndicator, 3000); // Adjust the delay as needed
    // Inline CSS for animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes scrollDown {
            0% {
                transform: translateY(0);
            }
            50% {
                transform: translateY(5px); // Reduced for a smaller movement
            }
            100% {
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);
    return {
        execution_status: true,
        data:{}
    };
}