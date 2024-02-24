import { addScore } from './score.js';
import { updateScore } from './score.js';
import { createBulletIndicators } from './score.js';
import { createUFOIndicators } from './score.js';
import { updateBulletIndicators } from './score.js';
import { updateUFOIndicators } from './score.js';
import { triggerExplosion } from './explosion.js';

document.addEventListener('DOMContentLoaded', function () {
 
    document.body.style.cursor = 'url(/assets/crosshair.png), auto';

    const dufo = document.getElementById('dufo');
    const maxX = window.innerWidth - dufo.clientWidth;
    const maxY = window.innerHeight - dufo.clientHeight;
    
    let isPaused = false;
    let remainingShots = 3;
    let successfulShots = 0;
    let remainingUfos = 10
    let score = 0
    let startTime = Date.now();

    const ufosContainer = document.createElement('div');
    ufosContainer.id = 'ufosContainer'
    const bulletsContainer = document.createElement('div');
    bulletsContainer.id = 'bulletsContainer'
    const landedUfoContainer = document.createElement('div');
    landedUfoContainer.id = 'landedUfosContainer';

    document.querySelector('.hud').appendChild(bulletsContainer)
    document.querySelector('.hudContainer').appendChild(ufosContainer)
    document.querySelector('.hudContainer').appendChild(landedUfoContainer)

    let directionX = Math.random() < 0.5 ? -1 : 1; // 1 for right, -1 for left
    let directionY = 1; // 1 for down, -1 for up

    let currentX = Math.random() * maxX;
    let currentY = 10;

    //move the dufo within the viewport
    function gameLoop() {

        if (!isPaused) {
            if (Date.now() - startTime > 5000) {
                respawnDufo()
            }
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
            
        }
        requestAnimationFrame(gameLoop);
    }

    function handleClick(event) {
        if (event.target === dufo) {
            successfulShots++;
            score = addScore(remainingShots, score)
            updateScore(score, remainingUfos)
            if (!isPaused) {
                isPaused = true;
                triggerExplosion(currentX, currentY);
                setTimeout(() => {
                    isPaused = false;
                    respawnDufo();
                }, 500);
            }
        } else {
            remainingShots--
            if (!isPaused) {
                if (remainingShots < 1) {
                    isPaused = true
                    setTimeout(() => {
                        isPaused = false;
                        respawnDufo();
                    }, 500);
                }
            }
        }
        updateBulletIndicators(remainingShots);
    }

    // Function to respawn the dufo at a random position
    function respawnDufo() {

        startTime = Date.now();

        currentX = Math.random() * maxX;
        currentY = 10;

        remainingShots = 3
        remainingUfos--

        if (remainingUfos < 1) {
           score = 0
           successfulShots = 0
           remainingUfos = 10
        }

        // updateBulletIndicators();
        createUFOIndicators(remainingUfos)
        updateUFOIndicators(successfulShots);
        updateScore(score, remainingUfos)        
    }



    // Add click event listener to track total shots
    document.addEventListener('click', handleClick);

    // Start dufo movement
    function startGame() {
        
        createBulletIndicators(remainingShots);
        gameLoop();
    }

    // Event listener to start the game when the page loads
    window.addEventListener('load', startGame);

});
