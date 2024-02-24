export function triggerExplosion(x, y) {
    const explosion = document.getElementById('explosion');
    const dufoWidth = 100;
    const dufoHeight = 100;
    const explosionWidth = 290;
    const explosionHeight = 290;

    const centerX = x + (dufoWidth / 2) - (explosionWidth / 2);
    const centerY = y + -25 + (dufoHeight / 2) - (explosionHeight / 2);

    explosion.style.display = 'block';
    explosion.style.position = 'absolute';
    explosion.style.left = `${centerX}px`;
    explosion.style.top = `${centerY}px`;

    const frameWidth = 290;
    const frameHeight = 290;
    let currentFrame = 0;
    const totalFrames = 8;
    let frameDuration = 10; // The duration each frame is shown, calculated as above
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