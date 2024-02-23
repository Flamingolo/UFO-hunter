export function moveDufo(dufo, maxX, maxY, directionX, directionY, currentX, currentY, isPaused) {
    if (!isPaused) {
        currentX += 1 * directionX; // Speed 
        currentY += 1 * directionY; // Speed 

        // Change direction when reaching the edges
        if (currentX <= 0 || currentX >= maxX) {
            directionX *= -1;
        }

        if (currentY <= 0 || currentY >= maxY - 200) {
            directionY *= -1;
        }

        dufo.style.left = `${currentX}px`;
        dufo.style.top = `${currentY}px`;

        requestAnimationFrame(() => moveDufo(dufo, maxX, maxY, directionX, directionY, currentX, currentY, isPaused));
    }
}