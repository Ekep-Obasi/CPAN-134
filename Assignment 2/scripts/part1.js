// Calculates the area of a rectangle.
function calculateArea(initialWidth, initialHeight) {
    let width = initialWidth;
    let height = initialHeight;
    
    // Validate width until a valid number is entered
    if (typeof width !== 'number' || width <= 0 || isNaN(width)) {
        let validWidth = false;
        while (!validWidth) {
            let input = prompt("Please enter a valid positive number for width:");
            if (input === null) {
                return null;
            }
            width = parseFloat(input);
            validWidth = !isNaN(width) && width > 0;
        }
    }
    
    // Validate height until a valid number is entered
    if (typeof height !== 'number' || height <= 0 || isNaN(height)) {
        let validHeight = false;
        while (!validHeight) {
            let input = prompt("Please enter a valid positive number for height:");
            if (input === null) {
                return null;
            }
            height = parseFloat(input);
            validHeight = !isNaN(height) && height > 0;
        }
    }
    
    // Calculate area
    const area = width * height;
    
    // Return an object with all the information
    return {
        width: width,
        height: height,
        area: area
    };
}

// Event listener for the test button
document.getElementById('testAreaButton').addEventListener('click', function() {
    // Get input values - don't parse them yet
    const widthInput = prompt("Enter width:");
    const heightInput = prompt("Enter height:");
    
    // Cancel if user pressed Cancel on initial prompts
    if (widthInput === null || heightInput === null) {
        alert("Operation cancelled");
        return;
    }
    
    // Convert to numbers
    const width = parseFloat(widthInput);
    const height = parseFloat(heightInput);
    
    // Calculate area
    const result = calculateArea(width, height);
    
    // Handle result
    if (result === null) {
        alert("Operation cancelled");
    } else {
        console.log(`Area with width ${result.width} and height ${result.height} is: ${result.area}`);
        alert(`Area with width ${result.width} and height ${result.height} is: ${result.area}`);
    }
});