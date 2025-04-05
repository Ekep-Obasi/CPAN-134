
// Calculates the area of a rectangle.
function calculateArea(width, height) {
    // Validate input: I'm making sure that the width and height are positive numbers
    // If not, prompt the user to enter valid numbers
    if (typeof width !== 'number' || typeof height !== 'number' || 
        width <= 0 || height <= 0 || isNaN(width) || isNaN(height)) {
        
        let validWidth = false;
        let validHeight = false;
        
        while (!validWidth) {
            width = parseFloat(prompt("Please enter a valid positive number for width:"));
            validWidth = !isNaN(width) && width > 0;
        }
        
        while (!validHeight) {
            height = parseFloat(prompt("Please enter a valid positive number for height:"));
            validHeight = !isNaN(height) && height > 0;
        }
    }
    
    // Calculate and return the area
    const area = width * height;
    return area;
}

console.log("calculateArea(5, 3) =", calculateArea(5, 3)); 
console.log("calculateArea(10, 7) =", calculateArea(10, 7));

// Event listener for the test button
document.getElementById('testAreaButton').addEventListener('click', function() {
    const width = parseFloat(prompt("Enter width:"));
    const height = parseFloat(prompt("Enter height:"));
    const area = calculateArea(width, height);
    console.log(`Area with width ${width} and height ${height} is: ${area}`);
    alert(`Area with width ${width} and height ${height} is: ${area}`);
});