document.addEventListener('DOMContentLoaded', function () {
    const dufo = document.getElementById('dufo');
    const maxX = window.innerWidth - dufo.clientWidth;
    const maxY = window.innerHeight - dufo.clientHeight;
    let totalShots = 0;
    let successfulShots = 0;
    let isPaused = false;

    let directionX = Math.random() < 0.5 ? -1 : 1 ; // 1 for right, -1 for left
    let directionY = 1; // 1 for down, -1 for up
    let currentX = Math.random() * maxX;
    let currentY = 10;

    // Function to move the dufo within the viewport
    function moveDufo() {
        if (!isPaused) {
            currentX += 2 * directionX; // Speed 
            currentY += 3 * directionY; // Speed 

            // Change direction when reaching the edges
            if (currentX <= 0 || currentX >= maxX) {
                directionX *= -1;
            }

            if (currentY <= 0 || currentY >= maxY -100) {
                directionY *= -1;
            }

            dufo.style.left = `${currentX}px`;
            dufo.style.top = `${currentY}px`;

            // Call moveDufo again on the next animation frame
            requestAnimationFrame(moveDufo);
        }
    }

    function handleClick() {
        updateCounter()
        totalShots++;
        
        if (!isPaused) {
            successfulShots++;
            
            isPaused = true;

            // Pause for 2 seconds and then respawn
            setTimeout(() => {
                isPaused = false;
                respawnDufo();
            }, 2000);
        }
        
    }
    
    
    // Function to respawn the dufo at a random position
    function respawnDufo() {
        currentX = Math.random() * maxX;
        currentY = 10;
        moveDufo();
    }

    // Function to update the counter on the page
    function updateCounter() {
        document.getElementById('counter').innerText = `Successful Shots: ${successfulShots} / Total Shots: ${totalShots}`;
    }

    // Add click event listener to pause the dufo and respawn
    dufo.addEventListener('click', handleClick);
    
    // Function to start dufo movement
    function startGame() {
        moveDufo();
    }

    // Event listener to start the game when the page loads
    window.addEventListener('load', startGame);
});
