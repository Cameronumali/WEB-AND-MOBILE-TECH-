document.addEventListener('DOMContentLoaded', function() {
    const square = document.getElementById('square');
    const words = document.getElementById('words');


    words.innerHTML = "Welcome to Flatland.<br>I am Square.";

   
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

    function changeColor(color) {
        square.style.backgroundColor = color;
    }

    function generateBuzzphrase() {
        const buzzwords = {
            buzz: ["Paradigm-changing", "Multi-tier", "10,000-foot"],
            action: ["empowered", "value-added", "synergy"],
            outcome: ["process", "deliverable", "solution"]
        };
        
        return Object.values(buzzwords)
            .map(arr => arr[Math.floor(Math.random() * arr.length)])
            .join(' ');
    }
});