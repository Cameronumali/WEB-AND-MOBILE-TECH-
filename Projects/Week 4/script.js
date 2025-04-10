document.addEventListener('DOMContentLoaded', function() {
    const square = document.getElementById('square');
    const words = document.getElementById('words');

    // Initial text
    words.innerHTML = "Welcome to Flatland.<br>I am Square.<br>Interact with me!";

    // Event handlers
    square.addEventListener('click', function() {
        words.innerHTML = generateBuzzphrase();
        changeColor('#ff0000');
    });

    square.addEventListener('mouseover', function() {
        changeColor('#00ff00');
    });

    square.addEventListener('mouseout', function() {
        changeColor('#666');
    });

    // Helper functions
    function changeColor(color) {
        square.style.backgroundColor = color;
    }

    function generateBuzzphrase() {
        const buzzwords = {
            buzz: ["Paradigm-shifting", "Multi-tier", "10,000-foot", "Innovative"],
            action: ["empowered", "value-added", "synergized", "aligned"],
            outcome: ["process", "deliverable", "solution", "strategy"]
        };
        
        const phrase = Object.values(buzzwords)
            .map(arr => arr[Math.floor(Math.random() * arr.length)])
            .join(' ');
            
        return phrase;
    }
});