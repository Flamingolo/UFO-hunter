// import { triggerExplosion } from "./explosion.js";

document.addEventListener('DOMContentLoaded', function () {
    const dufo = document.getElementById('dufo');
    const maxX = window.innerWidth - dufo.clientWidth;
    const maxY = window.innerHeight - dufo.clientHeight;
    let shotsLeft = 3;
    let successfulShots = 0;
    let isPaused = false;
    let score = 0

    let directionX = Math.random() < 0.5 ? -1 : 1; // 1 for right, -1 for left
    let directionY = 1; // 1 for down, -1 for up
    let currentX = Math.random() * maxX;
    let currentY = 10;

    // Function to move the dufo within the viewport
    function moveDufo() {
        if (!isPaused) {
            currentX += 1 * directionX; // Speed 
            currentY += 1 * directionY; // Speed 

            // Change direction when reaching the edges
            if (currentX <= 0 || currentX >= maxX) {
                directionX *= -1;
            }

            if (currentY <= 0 || currentY >= maxY - 100) {
                directionY *= -1;
            }

            dufo.style.left = `${currentX}px`;
            dufo.style.top = `${currentY}px`;
            
            requestAnimationFrame(moveDufo);
        }
    }

    function triggerExplosion(x, y) {
        const explosion = document.getElementById('explosion');
        explosion.style.display = 'block';
        explosion.style.left = x + 'px';
        explosion.style.top = y + 'px';
    
        const frameWidth = 290;
        const frameHeight = 290;
        let currentFrame = 0;
        const totalFrames = 8;
        let row = 0;
    
        function animateExplosion(){
            const column = currentFrame % 4;
            const xPosition = -(column * frameWidth);
            const yPosition = -(row * frameHeight);
            explosion.style.backgroundPosition = `${xPosition}px ${yPosition}px`;
    
            currentFrame++
    
            if (currentFrame % 4 === 0){
                row++
            }
    
            if (currentFrame < totalFrames){
                requestAnimationFrame(animateExplosion);
            } else {
                explosion.style.display = 'none';
            }
        }
    
        animateExplosion();
    }

    function handleClick(event) {
        // Check if the click target is the dufo element
        if (event.target === dufo) {
            successfulShots++;
            score = addScore(shotsLeft, score)
            updateScore()
            if (!isPaused) {
                isPaused = true;
                // Pause for 2 seconds and then respawn
                const rect = dufo.getBoundingClientRect();
                triggerExplosion(rect.left, rect.top);
                setTimeout(() => {
                    isPaused = false;
                    respawnDufo();
                }, 2000);
            }
        } else {
            shotsLeft--
            if (shotsLeft < 1) {
                isPaused = true
                // Pause for 2 seconds and then respawn
                setTimeout(() => {
                    isPaused = false;
                    respawnDufo();
                }, 2000);
            }
        }
        updateCounter();
    }


    // Function to respawn the dufo at a random position
    function respawnDufo() {
        currentX = Math.random() * maxX;
        currentY = 10;
        shotsLeft = 3
        updateCounter()
        moveDufo();
    }

    function updateCounter() {
        document.getElementById('counter').innerText = `Shots at target: ${successfulShots} / Shots Left: ${shotsLeft}`;
    }

    function addScore(shotsLeft, score) {
        return score + (shotsLeft === 3 ? 1000 : shotsLeft === 2 ? 500 : shotsLeft === 1 ? 250 : 0);
    }
        
    function updateScore() {
        document.getElementById('score').innerText = `Score: ${score}`;
    }
    console.log(score)
    // Add click event listener to track total shots
    document.addEventListener('click', handleClick);

    // Start dufo movement
    function startGame() {
        moveDufo();
    }

    // Event listener to start the game when the page loads
    window.addEventListener('load', startGame);
});
