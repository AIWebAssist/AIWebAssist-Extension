export default function point_scroll_up() {
    // Calculate the size for a smaller arrow and text
    const oneTenthOfViewportHeight = (window.innerHeight / 10) + 'px';

    // Calculate the position for the middle of the top half of the screen
    const middleTopHalf = (window.innerHeight / 4) + 'px';

    // Create the scroll indicator container element
    const indicatorContainer = document.createElement('div');
    indicatorContainer.style.position = 'fixed';
    indicatorContainer.style.top = middleTopHalf;
    indicatorContainer.style.left = '50%';
    indicatorContainer.style.transform = 'translateX(-50%)';
    indicatorContainer.style.textAlign = 'center';
    indicatorContainer.style.zIndex = 2147483647;

    // Create the smaller arrow element for scrolling up
    const arrow = document.createElement('div');
    arrow.style.width = '0';
    arrow.style.height = '0';
    arrow.style.borderLeft = `${oneTenthOfViewportHeight} solid transparent`;
    arrow.style.borderRight = `${oneTenthOfViewportHeight} solid transparent`;
    arrow.style.borderBottom = `${oneTenthOfViewportHeight} solid #666666`;
    arrow.style.display = 'inline-block';
    arrow.style.marginBottom = '2px';

    // Create the smaller text element
    const text = document.createElement('p');
    text.style.color = '#666666';
    text.style.fontSize = oneTenthOfViewportHeight; // 1/10 of the screen height
    text.textContent = 'Scroll Up';

    // Add the smaller indicator elements to the container
    indicatorContainer.appendChild(arrow);
    indicatorContainer.appendChild(text);

    // Add the indicator to the document body
    document.body.appendChild(indicatorContainer);

    // Add inline CSS for animation
    arrow.style.animation = `
        scrollUp 1s infinite
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
        @keyframes scrollUp {
            0% {
                transform: translateY(0);
            }
            50% {
                transform: translateY(-5px);
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