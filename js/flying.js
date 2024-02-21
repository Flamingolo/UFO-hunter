document.addEventListener('DOMContentLoaded', function () {
    const duck = document.getElementById('duck');
    const maxX = window.innerWidth - duck.clientWidth;
    const maxY = window.innerHeight - duck.clientHeight;

    let directionX = 1; // 1 for right, -1 for left
    let directionY = 1; // 1 for down, -1 for up
    let currentX = 100;
    let currentY = 200;

    // Function to move the duck within the viewport
    function moveDuck() {
        currentX += 3 * directionX; // You can adjust the speed by changing the value (5 in this case)
        currentY += 5 * directionY; // You can adjust the speed by changing the value (5 in this case)

        // Change direction when reaching the edges
        if (currentX <= 0 || currentX >= maxX) {
            directionX *= -1;
        }

        if (currentY <= 0 || currentY >= maxY) {
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
