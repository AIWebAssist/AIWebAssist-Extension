// Calculate the height for arrow and text
const oneThirdOfViewportHeight = (window.innerHeight / 6) + 'px';

// Create the scroll indicator container element
const indicatorContainer = document.createElement('div');
indicatorContainer.style.position = 'fixed';
indicatorContainer.style.top = (window.innerHeight / 6)+'px'; // Change 'bottom' to 'top'
indicatorContainer.style.left = '50%';
indicatorContainer.style.transform = 'translateX(-50%)';
indicatorContainer.style.textAlign = 'center';
indicatorContainer.style.zIndex = '1000';

// Create the arrow element for scrolling up
const arrow = document.createElement('div');
arrow.style.width = oneThirdOfViewportHeight; // 1/3 of the screen height
arrow.style.height = oneThirdOfViewportHeight; // 1/3 of the screen height
arrow.style.border = 'solid #666666';
arrow.style.borderWidth = '0 ' + oneThirdOfViewportHeight + ' ' + oneThirdOfViewportHeight + ' 0'; // 1/3 of the screen height
arrow.style.transform = 'rotate(-135deg)';
arrow.style.display = 'inline-block';
arrow.style.marginBottom = '10px';

// Create the text element
const text = document.createElement('p');
text.style.color = '#666666';
text.style.fontSize = oneThirdOfViewportHeight; // 1/3 of the screen height
text.textContent = 'Scroll Up';

// Add the indicator elements to the container
indicatorContainer.appendChild(arrow);
indicatorContainer.appendChild(text);

// Add the indicator to the document body
document.body.appendChild(indicatorContainer);

// Function to remove the indicator after a certain delay (e.g., 3 seconds)
function removeIndicator() {
    indicatorContainer.style.display = 'none';
}

// Set a timeout to remove the indicator
setTimeout(removeIndicator, 3000); // Adjust the delay as needed