
 // Event handling for the "Click Me!" button.
 // Changes its color to a random color when clicked.
document.addEventListener('DOMContentLoaded', function() {
    const button = document.getElementById('colorButton');
    
    button.addEventListener('click', function() {
        alert("Button clicked!");
        
        // Generate random color
        const randomColor = getRandomColor();
        
        button.style.backgroundColor = randomColor;
    });
});

// This function generates a random hex color code.
function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}