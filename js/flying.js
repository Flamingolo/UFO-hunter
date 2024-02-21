document.addEventListener('DOMContentLoaded', function () {
    const duck = document.getElementById('duck');
    const maxX = window.innerWidth - duck.clientWidth;
    const maxY = window.innerHeight - duck.clientHeight;

    let directionX = Math.random() < 0.5 ? -1 : 1 ; // 1 for right, -1 for left
    let directionY = 1; // 1 for down, -1 for up
    let currentX = Math.random() * maxX;
    let currentY = 10;

    // Function to move the duck within the viewport
    function moveDuck() {
        currentX += 4 * directionX; // Speed 
        currentY += 7 * directionY; // Speed 

        // Change direction when reaching the edges
        if (currentX <= 0 || currentX >= maxX) {
            directionX *= -1;
        }

        if (currentY <= 0 || currentY >= maxY - 400) {
            directionY *= -1;
        }

        duck.style.left = `${currentX}px`;
        duck.style.top = `${currentY}px`;

        // Call moveDuck again on the next animation frame
        requestAnimationFrame(moveDuck);
    }

    // Function to start duck movement
    function startGame() {
        moveDuck();
    }

    // Event listener to start the game when the page loads
    window.addEventListener('load', startGame);
});
