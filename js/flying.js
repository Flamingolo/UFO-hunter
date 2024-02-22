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

    function handleClick(event) {
        // Check if the click target is the dufo element
        if (event.target === dufo) {
            successfulShots++;
            score = addScore(shotsLeft, score)
            updateScore()
            if (!isPaused) {
                isPaused = true;
                triggerExplosion();
                // Pause for 2 seconds and then respawn
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
    // Explosion animation
    function triggerExplosion(){
        const explosionElement = document.getElementById('explosion');
        explosionElement.style.display = 'block';
        let currentFrame = 0;
        const totalFrames = 8;
        const frameSize = 290;
        const animationDuration = 2000;
        const frameDuration = animationDuration / totalFrames;
        explosionElement.style.display = 'block'

        const dufoRect = dufo.getBoundingClientRect();
        explosionElement.style.left = `${dufoRect.left}px`;
        explosionElement.style.top = `${dufoRect.top}px`;

        function animateExplosion(){
            if (currentFrame < totalFrames){
                let row = Math.floor(currentFrame / 4)
                let col = currentFrame % 4;
                explosionElement.style.backgroundPosition = `-${col * frameSize}px -${row * frameSize}px`;

                currentFrame++;
                if (currentFrame < totalFrames){
                    setTimeout(animateExplosion, frameDuration);
                } else {
                    explosionElement.style.display = 'none';
                    explosionElement.style.backgroundPosition = '0 0';
                }
            }
            animateExplosion();
        }
    }


    dufo.addEventListener('click', function(){
        triggerExplosion();
        updateCounter();
    })


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
