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
    const pauseScreen = document.getElementById('pauseScreen');
    const startScreen = document.getElementById('startScreen');

    let gameStarted = false;
    let isPaused = true
    let remainingShots = 3
    let successfulShots = 0
    let remainingUfos = 10
    let score = 0
    let startTime = Date.now()

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
        if ((gameStarted && !isPaused) && event.target === dufo) {
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
            
            if (!isPaused) {
                remainingShots--
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

        randomLocation()

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

    function randomLocation() {
        directionX = Math.random() < 0.5 ? -1 : 1;
        directionY = 1;
        currentX = Math.random() * maxX;
        currentY = 10;
    }

    window.addEventListener('keydown', function (event) {
        if (gameStarted && (event.code === 'Escape' || event.code === 'Space')) {
            togglePause();
            if (isPaused) {
                pauseScreen.style.display = 'block'
            } else {
                pauseScreen.style.display = 'none'
            }
        }
    })

    window.addEventListener('keydown', function (event) {
        if (isPaused && event.code === 'KeyR' || event.code === 'Keyr') {
            startTime = Date.now();
            randomLocation() 
            togglePause()
            remainingShots = 3
            remainingUfos = 10
            score = 0
            
            updateUFOIndicators(successfulShots);
            updateBulletIndicators(remainingShots)
            updateScore(score, remainingUfos)   
            pauseScreen.style.display = 'none';    
        } 
    })

    function togglePause() {
        isPaused = !isPaused;
    }

    // Add click event listener to track total shots
    document.addEventListener('click', handleClick);

    function startGame() {
        startScreen.style.display = 'block';
        createBulletIndicators(remainingShots);
        
        window.addEventListener('keydown', function (event) {
            if (!gameStarted && event.code === 'Enter') {
                togglePause();
                gameLoop();
                startScreen.style.display = 'none';
                gameStarted = true; // Set gameStarted to true to prevent starting again
            }
        });
    }

    // Event listener to start the game when the page loads
    window.addEventListener('load', startGame);

});
