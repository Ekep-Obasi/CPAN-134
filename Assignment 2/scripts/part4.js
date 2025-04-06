document.addEventListener('DOMContentLoaded', function() {
    const boxModel = document.getElementById('boxModel');
    const boxInfo = document.createElement('div');
    boxInfo.id = 'boxInfo';
    boxInfo.className = 'box-info';
    document.querySelector('#part4').appendChild(boxInfo);
    
    // Change background color when clicked
    boxModel.addEventListener('click', function(e) {
        if (e.shiftKey) return;
        const randomColor = getRandomColor();
        this.style.backgroundColor = randomColor;
        updateBoxInfo();
    });
    
    // Change border color on hover
    boxModel.addEventListener('mouseenter', function() {
        const randomColor = getRandomColor();
        this.style.borderColor = randomColor;
        updateBoxInfo();
    });
    
    // Reset border color on mouse leave
    boxModel.addEventListener('mouseleave', function() {
        this.style.borderColor = '#333';
        updateBoxInfo();
    });
    
    // Change padding on double click
    boxModel.addEventListener('dblclick', function() {
        const currentPadding = parseInt(getComputedStyle(this).padding);
        const newPadding = (currentPadding < 40) ? currentPadding + 10 : 10;
        this.style.padding = newPadding + 'px';
        updateBoxInfo();
    });

    // NEW INTERACTIONS:
    
    // Change border style on right click
    boxModel.addEventListener('contextmenu', function(e) {
        e.preventDefault(); // Prevent context menu
        const borderStyles = ['solid', 'dotted', 'dashed', 'double', 'groove', 'ridge', 'inset', 'outset'];
        const currentIndex = borderStyles.indexOf(getComputedStyle(this).borderStyle);
        const nextIndex = (currentIndex + 1) % borderStyles.length;
        this.style.borderStyle = borderStyles[nextIndex];
        updateBoxInfo();
    });
    
    // Change width and height with Shift+Click
    boxModel.addEventListener('click', function(e) {
        if (e.shiftKey) {
            const currentWidth = parseInt(getComputedStyle(this).width);
            const currentHeight = parseInt(getComputedStyle(this).height);
            
            // Toggle between sizes
            if (currentWidth <= 200) {
                this.style.width = "250px";
                this.style.height = "200px";
            } else {
                this.style.width = "200px";
                this.style.height = "150px";
            }
            updateBoxInfo();
        }
    });
    
    // Change margin with scroll wheel
    boxModel.addEventListener('wheel', function(e) {
        e.preventDefault(); // Prevent page scrolling
        const currentMargin = parseInt(getComputedStyle(this).marginTop);
        let newMargin;
        
        if (e.deltaY < 0) {
            // Scrolling up to increase margin
            newMargin = Math.min(currentMargin + 5, 50);
        } else {
            // Scrolling down to decrease margin
            newMargin = Math.max(currentMargin - 5, 10);
        }
        
        this.style.margin = `${newMargin}px auto`;
        updateBoxInfo();
    });
    
    // Change text properties on key press while hovering
    document.addEventListener('keydown', function(e) {
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
        
        const isHovering = boxModel.matches(':hover');
        if (!isHovering) return;
        
        switch (e.key) {
            case 'b':
                const currentWeight = getComputedStyle(boxModel.querySelector('p')).fontWeight;
                boxModel.querySelector('p').style.fontWeight = (currentWeight === '700' || currentWeight === 'bold') ? 'normal' : 'bold';
                break;
            case 'i':
                const fontSize = parseInt(getComputedStyle(boxModel.querySelector('p')).fontSize);
                boxModel.querySelector('p').style.fontSize = (fontSize + 2) + 'px';
                break;
            case 'd':
                const currentSize = parseInt(getComputedStyle(boxModel.querySelector('p')).fontSize);
                if (currentSize > 12) {
                    boxModel.querySelector('p').style.fontSize = (currentSize - 2) + 'px';
                }
                break;
            case 'c': 
                boxModel.querySelector('p').style.color = getRandomColor();
                break;
        }
        updateBoxInfo();
    });
    
    // Add reset button
    const resetButton = document.createElement('button');
    resetButton.textContent = 'Reset Box';
    resetButton.id = 'resetBox';
    document.querySelector('#part4').insertBefore(resetButton, boxInfo);
    
    resetButton.addEventListener('click', function() {
        boxModel.removeAttribute('style');
        boxModel.querySelector('p').removeAttribute('style');
        updateBoxInfo();
    });
    
    // Show box model information
    function updateBoxInfo() {
        const style = getComputedStyle(boxModel);
        boxInfo.innerHTML = `
            <h4>Box Model Properties:</h4>
            <ul>
                <li>Width: ${style.width}</li>
                <li>Height: ${style.height}</li>
                <li>Padding: ${style.padding}</li>
                <li>Border: ${style.borderWidth} ${style.borderStyle} ${style.borderColor}</li>
                <li>Margin: ${style.marginTop} ${style.marginRight} ${style.marginBottom} ${style.marginLeft}</li>
                <li>Background: ${style.backgroundColor}</li>
            </ul>
            <p><strong>Instructions:</strong> Try these interactions:<br>
            • Click: Change background color<br>
            • Hover: Change border color<br>
            • Double-click: Change padding<br>
            • Right-click: Change border style<br>
            • Shift+Click: Toggle size<br>
            • Mousewheel: Adjust margin<br>
            • When hovering, press: B (bold), I (inc. font), D (dec. font), C (color)</p>
        `;
    }
    
    updateBoxInfo();
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