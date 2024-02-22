// import { triggerExplosion } from "./explosion.js";

document.addEventListener('DOMContentLoaded', function () {
    const dufo = document.getElementById('dufo');
    const maxX = window.innerWidth - dufo.clientWidth;
    const maxY = window.innerHeight - dufo.clientHeight;
    let shotsLeft = 3;
    let successfulShots = 0;
    let isPaused = false;
    let score = 0
    let remainingUfos = 10

    let directionX = Math.random() < 0.5 ? -1 : 1; // 1 for right, -1 for left
    let directionY = 1; // 1 for down, -1 for up
    let currentX = Math.random() * maxX;
    let currentY = 10;

    // Function to move the dufo within the viewport
    function moveDufo() {
        if (!isPaused) {
            currentX += 0 * directionX; // Speed 
            currentY += 0 * directionY; // Speed 

            // Change direction when reaching the edges
            if (currentX <= 0 || currentX >= maxX) {
                directionX *= -1;
            }

            if (currentY <= 0 || currentY >= maxY - 200) {
                directionY *= -1;
            }

            dufo.style.left = `${currentX}px`;
            dufo.style.top = `${currentY}px`;
            
            requestAnimationFrame(moveDufo);
        }
    }

    function triggerExplosion(x, y) {
        const explosion = document.getElementById('explosion');
        const dufoWidth = 100;
        const dufoHeight = 100;
        const explosionWidth = 290;
        const explosionHeight = 290;

        const centerX = x + (dufoWidth / 2) - (explosionWidth / 2);
        const centerY = y + -20 + (dufoHeight / 2) - (explosionHeight / 2);

        explosion.style.display = 'block';
        explosion.style.position = 'absolute';
        explosion.style.left = `${centerX}px`;
        explosion.style.top = `${centerY}px`;
    
        const frameWidth = 290;
        const frameHeight = 290;
        let currentFrame = 0;
        const totalFrames = 8;
        let frameDuration = 7; // The duration each frame is shown, calculated as above
        let frameCounter = 0; // Counter to track how long a frame has been displayed
    
        // Function to animate the explosion frames
        function animateExplosion() {
            if (frameCounter++ >= frameDuration) {
                frameCounter = 0;
                currentFrame++;
                if (currentFrame >= totalFrames) {
                    explosion.style.display = 'none'; // Hide after animation is done
                    return; // Exit the function
                }
            }
    
            const column = currentFrame % 4; // Assuming 4 columns per row
            const row = Math.floor(currentFrame / 4); // Assuming 2 rows (0 indexed)
            const xPosition = -(column * frameWidth);
            const yPosition = -(row * frameHeight);
            explosion.style.backgroundPosition = `${xPosition}px ${yPosition}px`;
    
            requestAnimationFrame(animateExplosion);
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
                triggerExplosion(currentX, currentY);
                setTimeout(() => {
                    isPaused = false;
                    respawnDufo();
                }, 500);
            }
        } else {
            shotsLeft--
            if (shotsLeft < 1) {
                isPaused = true
                // Pause for 2 seconds and then respawn
                setTimeout(() => {
                    isPaused = false;
                    respawnDufo();
                }, 500);
            }
        }
        updateCounter();
    }


    // Function to respawn the dufo at a random position
    function respawnDufo() {
        currentX = Math.random() * maxX;
        currentY = 10;

        shotsLeft = 3
        remainingUfos--

        if (remainingUfos < 1) {
           score = 0
           successfulShots = 0
           remainingUfos = 10
        }

        updateCounter()
        updateScore()
        moveDufo();

    }

    function updateCounter() {
        document.getElementById('counter').innerText = `Shots at target: ${successfulShots} / Shots Left: ${shotsLeft}`;
    }

    function addScore(shotsLeft, score) {
        return score + (shotsLeft === 3 ? 1000 : shotsLeft === 2 ? 500 : shotsLeft === 1 ? 250 : 0) ;
    }
        
    function updateScore() {
        document.getElementById('score').innerText = `Score: ${score}`;
        document.getElementById('targetsLeft').innerText = `Remaining Ufos: ${remainingUfos}`
    }
    // Add click event listener to track total shots
    document.addEventListener('click', handleClick);

    // Start dufo movement
    function startGame() {
        moveDufo();
    }

    // Event listener to start the game when the page loads
    window.addEventListener('load', startGame);

});
