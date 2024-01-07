export default function draw_arrow(x, y,text) {
    // Get the target element based on the provided coordinates
    // Get the target element based on the provided coordinates
    const targetElement = document.elementFromPoint(x, y);

    // Check if the target element exists
    if (!targetElement) {
        console.error('No element found at the provided coordinates.');
        return;
    }

    // Get the position of the target element
    const rect = targetElement.getBoundingClientRect();
    const targetX = rect.left + window.scrollX;
    const targetY = rect.top + window.scrollY;

    // Create the container for the glow effect
    const glowContainer = document.createElement('div');
    glowContainer.style.position = 'fixed';
    glowContainer.style.top = targetY + 'px'; // Use the target element's y coordinate
    glowContainer.style.left = targetX + 'px'; // Use the target element's x coordinate
    glowContainer.style.width = rect.width + 'px';
    glowContainer.style.height = rect.height + 'px';
    glowContainer.style.zIndex = 2147483647;

    // Add glow effect surrounding the entire glowContainer
    glowContainer.style.boxShadow = '0 0 10px rgba(255, 255, 255, 0.8)'; // Adjust the glow color and intensity

    // Create the container for the text
    const textContainer = document.createElement('div');
    textContainer.style.position = 'absolute'; // Set to absolute to position textContainer relative to glowContainer
    textContainer.style.top = '100%'; // Position textContainer below the glowContainer
    textContainer.style.left = '50%'; // Center textContainer relative to glowContainer
    textContainer.style.transform = 'translateX(-50%)'; // Center textContainer horizontally
    textContainer.style.zIndex = '1'; // Set a higher z-index to position the text above the glow

    // Create the text element
    const text_field = document.createElement('p');
    text_field.style.color = '#fff';
    text_field.style.fontSize = '16px';
    text_field.textContent = text;

    // Add the text element to the textContainer
    textContainer.appendChild(text_field);

    // Add the textContainer to the glowContainer
    glowContainer.appendChild(textContainer);

    // Add the glowContainer to the document body
    document.body.appendChild(glowContainer);

    // Function to remove the glowContainer after a certain delay (e.g., 3 seconds)
    function removeGlow() {
        glowContainer.style.display = 'none';
    }

    setTimeout(removeGlow, 3000); // Adjust the delay as needed
    return undefined;
};
