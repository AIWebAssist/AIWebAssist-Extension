export default function point_scroll_left() {
    const oneTwelfthOfViewportHeight = window.innerHeight / 12 + 'px'; // Half the size of the arrow

    // Create the scroll indicator container element
    const indicatorContainer = document.createElement('div');
    indicatorContainer.style.position = 'fixed';
    indicatorContainer.style.left = '50%'; // Center horizontally
    indicatorContainer.style.top = '50%'; // Center vertically
    indicatorContainer.style.transform = 'translate(-50%, -50%)'; // Center both horizontally and vertically
    indicatorContainer.style.textAlign = 'center';
    indicatorContainer.style.zIndex = 2147483647;

    // Create the text element
    const text = document.createElement('p');
    text.style.color = '#666666';
    text.style.fontSize = oneTwelfthOfViewportHeight; // Half the size of the arrow
    text.textContent = 'Please Scroll Left';

    // Create the arrow element for scrolling left
    const arrow = document.createElement('div');
    arrow.style.width = '0';
    arrow.style.height = '0';
    arrow.style.borderTop = `${oneTwelfthOfViewportHeight} solid transparent`;
    arrow.style.borderBottom = `${oneTwelfthOfViewportHeight} solid transparent`;
    arrow.style.borderRight = `${oneTwelfthOfViewportHeight} solid #666666`; // Change from borderLeft to borderRight
    arrow.style.display = 'inline-block';
    arrow.style.transform = 'rotate(180deg)'; // Flip the arrow 180 degrees
    arrow.style.marginLeft = '10px'; // Adjust the margin to center the gap between text and arrow

    // Add the indicator elements to the container (arrow after text)
    indicatorContainer.appendChild(text);
    indicatorContainer.appendChild(arrow);

    // Add the indicator to the document body
    document.body.appendChild(indicatorContainer);

    // Add inline CSS for animation
    arrow.style.animation = `
        scrollLeft 1s infinite
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
        @keyframes scrollLeft {
            0% {
                transform: translateX(0);
            }
            50% {
                transform: translateX(-10px);
            }
            100% {
                transform: translateX(0);
            }
        }
    `;
    document.head.appendChild(style);

    return {
        execution_status: true,
        data:{}
    };
}
