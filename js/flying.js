document.addEventListener('DOMContentLoaded', function () {
    const duck = document.getElementById('duck');
    const maxX = window.innerWidth - duck.clientWidth;

    let direction = 1; // 1 for right, -1 for left
    let currentX = 0;

    console.log(window.innerWidth)

    // Function to move the duck horizontally within the viewport
    function moveDuck() {
        currentX += 5* direction; // You can adjust the speed by changing the value (5 in this case)

        // Change direction when reaching the edges
        if (currentX <= 0 || currentX >= maxX) {
            direction *= -1;
        }

        duck.style.left = `${currentX}px`;

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
