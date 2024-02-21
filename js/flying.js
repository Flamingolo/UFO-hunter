document.addEventListener('DOMContentLoaded', function () {
    const dufo = document.getElementById('dufo');
    const maxX = window.innerWidth - dufo.clientWidth;
    const maxY = window.innerHeight - dufo.clientHeight;

    let directionX = Math.random() < 0.5 ? -1 : 1 ; // 1 for right, -1 for left
    let directionY = 1; // 1 for down, -1 for up
    let currentX = Math.random() * maxX;
    let currentY = 10;

    // Function to move the dufo within the viewport
    function moveDufo() {
        currentX += 4 * directionX; // Speed 
        currentY += 7 * directionY; // Speed 

        // Change direction when reaching the edges
        if (currentX <= 0 || currentX >= maxX) {
            directionX *= -1;
        }

        if (currentY <= 0 || currentY >= maxY - 400) {
            directionY *= -1;
        }

        dufo.style.left = `${currentX}px`;
        dufo.style.top = `${currentY}px`;

        // Call moveDufo again on the next animation frame
        requestAnimationFrame(moveDufo);
    }

    // Function to start dufo movement
    function startGame() {
        moveDufo();
    }

    // Event listener to start the game when the page loads
    window.addEventListener('load', startGame);
});
