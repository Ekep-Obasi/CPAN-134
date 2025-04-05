document.addEventListener('DOMContentLoaded', function() {
    const list = document.getElementById('dynamicList');
    
    const fourthItem = document.createElement('li');
    fourthItem.textContent = 'Fourth item';
    list.appendChild(fourthItem);
    
    const listItems = list.getElementsByTagName('li');
    for (let i = 0; i < listItems.length; i++) {
        listItems[i].addEventListener('click', function(e) {
            this.classList.add('ripple');
            
            this.textContent = generateRandomString(10);
            
            this.classList.add('clicked');
            
            setTimeout(() => {
                this.classList.remove('ripple');
            }, 400);
            
            setTimeout(() => {
                this.classList.remove('clicked');
            }, 700);
        });
    }
});

// Generates a random string of specified length.
function generateRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}