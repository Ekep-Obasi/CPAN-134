document.addEventListener('DOMContentLoaded', function() {
    const boxModel = document.getElementById('boxModel');
    
    // Change background color when clicked
    boxModel.addEventListener('click', function() {
        const randomColor = getRandomColor();
        this.style.backgroundColor = randomColor;
    });
    
    // Change border color on hover
    boxModel.addEventListener('mouseenter', function() {
        const randomColor = getRandomColor();
        this.style.borderColor = randomColor;
    });
    
    // Reset border color on mouse leave
    boxModel.addEventListener('mouseleave', function() {
        this.style.borderColor = '#333';
    });
    
    // Change padding on double click
    boxModel.addEventListener('dblclick', function() {
        const currentPadding = parseInt(getComputedStyle(this).padding);
        const newPadding = (currentPadding < 40) ? currentPadding + 10 : 10;
        this.style.padding = newPadding + 'px';
    });
});

// Function to generate random color
function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}