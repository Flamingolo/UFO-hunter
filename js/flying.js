import { addScore, updateScore, createBulletIndicators, createUFOIndicators, updateBulletIndicators, updateUFOIndicators} from './score.js';
import { triggerExplosion } from './explosion.js';
import { playSound, pauseSound } from './sounds.js';

document.addEventListener('DOMContentLoaded', function () {
 
    document.body.style.cursor = 'url(/assets/crosshair.png), auto';

    const dufo = document.getElementById('dufo');
    const maxX = window.innerWidth - dufo.clientWidth;
    const maxY = window.innerHeight - dufo.clientHeight;

    let gameStarted = false;
    let isPaused = true
    let remainingShots = 3
    let successfulShots = 0
    let remainingUfos = 10
    let shotdownUfos = 0;
    let landedUfos = 0;
    let score = 0
    let startTime = Date.now()
    
    const backgroundMusic = document.getElementById('backgroundMusic');
    backgroundMusic.volume = 0.5;


    const ufosContainer = document.createElement('div');
    ufosContainer.id = 'ufosContainer'
    const bulletsContainer = document.createElement('div');
    bulletsContainer.id = 'bulletsContainer'

    document.querySelector('.hud').appendChild(bulletsContainer)
    document.querySelector('.landingPlace').appendChild(ufosContainer)

    const countdownProgressBar = document.getElementById('countdownProgressBar');

    let directionX = Math.random() < 0.5 ? -1 : 1; // 1 for right, -1 for left
    let directionY = 1; // 1 for down, -1 for up
    let currentX = Math.random() * maxX;
    let currentY = 10;
    
    function gameLoop() { //move the dufo within the viewport
        playSound('backgroundMusic')


        if (!isPaused) {
            const elapsedTime = Date.now() - startTime;
            const countdownDuration = 5000;

            const progress = 100 - (elapsedTime / countdownDuration) * 100;
            countdownProgressBar.style.width = `${progress}%`;

            if (elapsedTime > countdownDuration) {
                respawnDufo();
                landedUfos++
            }
            currentX += 1 * directionX; // Speed 
            currentY += 2 * directionY; // Speed 

            if (currentX <= 0 || currentX >= maxX) { // Change direction when reaching the edges
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
        
        function respawnDufo() { // Function to respawn the dufo at a random position
            startTime = Date.now();
            randomLocation()
            remainingShots = 3
            remainingUfos--
    
            if (remainingUfos < 1) {
               score = 0
               successfulShots = 0
               remainingUfos = 10
            }
    
            updateBulletIndicators();
            createUFOIndicators(remainingShots, successfulShots)
            updateUFOIndicators(landedUfos, shotdownUfos);
            updateScore(score, remainingUfos)
            
            countdownProgressBar.style.width = '0%';

        }

    function handleClick(event) {
        // playSound('gunshotSound')
        if ((gameStarted && !isPaused) && event.target === dufo) {
            successfulShots++;
            shotdownUfos++;
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
                    landedUfos++
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
            randomLocation() 
            togglePause()
            remainingShots = 3
            remainingUfos = 10
            score = 0
            
            updateUFOIndicators(successfulShots);
            createUFOIndicators(landedUfos, shotdownUfos)
            updateBulletIndicators(remainingShots)
            updateScore(score, remainingUfos)   
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
    // Event listener to start the game when the page loads
    window.addEventListener('load', startGame);

});
