import { addScore, updateScore, createBulletIndicators, createUFOIndicators, updateBulletIndicators, updateUFOIndicators} from './score.js';
import { triggerExplosion } from './explosion.js';
import { playSound, playShot, toggleMute } from './sounds.js';

document.addEventListener('DOMContentLoaded', function () {

    const dufo = document.getElementById('dufo');
    const maxX = window.innerWidth - dufo.clientWidth;
    const maxY = window.innerHeight - dufo.clientHeight;

    const countdownProgressBar = document.getElementById('countdownProgressBar');
    const backgroundMusic = document.getElementById('backgroundMusic');
    const ufosContainer = document.createElement('div');
    const bulletsContainer = document.createElement('div');

    backgroundMusic.volume = 0.1;
    ufosContainer.id = 'ufosContainer'
    bulletsContainer.id = 'bulletsContainer'

    let gameStarted = false;
    let isPaused = true
    let score = 0
    let startTime = Date.now()
    
    let remainingShots = 3
    let successfulShots = 0

    let remainingUfos = 10
    let shotdownUfos = 0;
    let landedUfos = 0;
    let ufoShotDown = false
    
    let directionX = Math.random() < 0.5 ? -1 : 1; // 1 for right, -1 for left
    let directionY = 1; // 1 for down, -1 for up
    let currentX = Math.random() * maxX;
    let currentY = 10;

    document.body.style.cursor = 'url(/assets/crosshair.png), auto';
    document.querySelector('.hud').appendChild(bulletsContainer)
    document.querySelector('.landingPlace').appendChild(ufosContainer)
    
    function gameLoop() { //move the dufo within the viewport
        if (!isPaused) {
            const elapsedTime = Date.now() - startTime;
            const countdownDuration = 5000;

            const progress = 100 - (elapsedTime / countdownDuration) * 100;
            countdownProgressBar.style.width = `${progress}%`;

            currentX += 4 * directionX; // Speed 
            currentY += 2 * directionY; // Speed 

            if (elapsedTime > countdownDuration && !ufoShotDown) {
                respawnDufo();
                landedUfos++
            }

            if (currentX <= 0 || currentX >= maxX) { // Change direction when reaching the edges
                directionX *= -1;
            }

            if (currentY <= 0 || currentY >= maxY - 200) {
                directionY *= -1;
            }

            dufo.style.left = `${currentX}px`;
            dufo.style.top = `${currentY}px`;
            
        }
        playSound('backgroundMusic')
        requestAnimationFrame(gameLoop);
    }
        
        function respawnDufo() { // Function to respawn the dufo at a random position
            startTime = Date.now();
            remainingShots = 3
            remainingUfos--
            ufoShotDown = false
            countdownProgressBar.style.width = '0%';
    
            if (remainingUfos < 1) {
               score = 0
               successfulShots = 0
               remainingUfos = 10
               landedUfos = 0
               shotdownUfos = 0
               
            }

            randomLocation()
            updateBulletIndicators();
            createUFOIndicators(remainingShots, successfulShots)
            updateUFOIndicators(landedUfos, shotdownUfos);
            updateScore(score, remainingUfos, landedUfos)
            
        }

    function handleClick(event) {
        
        const dufoRect = dufo.getBoundingClientRect(); // Get the size and position of the dufo element
        const dufoTop = dufoRect.top - 25;
        const dufoBottom = dufoRect.bottom;
        const dufoLeft = dufoRect.left - 25;
        const dufoRight = dufoRect.right;
        
        const clickWithinDufo = // Check if the click occurred within the dufo boundaries
            event.clientX >= dufoLeft &&
            event.clientX <= dufoRight &&
            event.clientY >= dufoTop &&
            event.clientY <= dufoBottom;

        if (gameStarted && !isPaused && clickWithinDufo) {
            successfulShots++;
            playShot('explosionSound')
            ufoShotDown = true;
            shotdownUfos++
            score = addScore(remainingShots, score)
            updateScore(score, remainingUfos, landedUfos)
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
                playShot('gunshotSound')
                if (remainingShots < 1) {
                    if (!ufoShotDown){
                        landedUfos++
                    }
                    isPaused = true
                    // playSound('landingSound')
                    setTimeout(() => {
                        isPaused = false;
                        respawnDufo();
                    }, 500);
                }
            }
        }
        updateBulletIndicators(remainingShots);
    }

    function handlePause (event) {
        if (gameStarted && (event.code === 'Escape' || event.code === 'Space')) {
            togglePause();
            if (isPaused) {
                document.getElementById('pauseScreen').style.display = 'block'
            } else {
                document.getElementById('pauseScreen').style.display = 'none'
            }
        }
    }

     function handleRestart (event) {
        if (isPaused && event.code === 'KeyR' || event.code === 'Keyr') {
            startTime = Date.now();
            remainingShots = 3
            remainingUfos = 10
            shotdownUfos = 0
            landedUfos = 0
            score = 0
            
            randomLocation() 
            togglePause()
            createUFOIndicators(remainingUfos, successfulShots)
            updateUFOIndicators(landedUfos, shotdownUfos);
            updateBulletIndicators(remainingShots)
            updateBulletIndicators(remainingShots)
            updateScore(score, remainingUfos, landedUfos)   
            document.getElementById('pauseScreen').style.display = 'none';    
        } 
    }

    function randomLocation() {
        directionX = Math.random() < 0.5 ? -1 : 1;
        directionY = 1;
        currentX = Math.random() * maxX;
        currentY = 10;
    }

    function togglePause() {
        isPaused = !isPaused;
    }

    document.addEventListener('click', handleClick);
    window.addEventListener('keydown', function (event) {
        if (event.code === 'KeyM'){
            toggleMute();
        }
        handlePause(event, isPaused, togglePause, gameStarted, pauseScreen);
        handleRestart(event, isPaused, togglePause, startTime, randomLocation, remainingShots, remainingUfos, score, updateUFOIndicators, createUFOIndicators, updateBulletIndicators, updateScore, document.getElementById('pauseScreen'));
    });

    function startGame() {
        document.getElementById('startScreen').style.display = 'block';
        createBulletIndicators(remainingShots);
        
        document.addEventListener('keydown', function (event) {
            if (!gameStarted && event.code === 'Enter') {
                togglePause();
                startTime = Date.now()
                gameLoop();
                document.getElementById('startScreen').style.display = 'none';
                gameStarted = true; // Set gameStarted to true to prevent starting again
            }
        });
    }
    window.addEventListener('load', startGame); // Event listener to start the game when the page loads
});
