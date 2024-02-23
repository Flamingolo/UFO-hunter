// import { moveDufo } from '.dufoMovement.js';


document.addEventListener('DOMContentLoaded', function () {
    

    const dufo = document.getElementById('dufo');
    const maxX = window.innerWidth - dufo.clientWidth;
    const maxY = window.innerHeight - dufo.clientHeight;
    let shotsLeft = 3;
    let successfulShots = 0;
    let isPaused = false;
    let score = 0
    let remainingUfos = 10

    const ufosContainer = document.createElement('div');
    ufosContainer.id = 'ufosContainer'
    const bulletsContainer = document.createElement('div');
    bulletsContainer.id = 'bulletsContainer'
    const landedUfoContainer = document.createElement('div');
    landedUfoContainer.id = 'landedUfosContainer';
    
    document.querySelector('.hud').appendChild(ufosContainer)
    document.querySelector('.hud').appendChild(landedUfoContainer)
    document.querySelector('.hud').appendChild(bulletsContainer)

    let directionX = Math.random() < 0.5 ? -1 : 1; // 1 for right, -1 for left
    let directionY = 1; // 1 for down, -1 for up
    let currentX = Math.random() * maxX;
    let currentY = 10;

    // Function to move the dufo within the viewport
    function moveDufo() {
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
            
            requestAnimationFrame(moveDufo);
        }
    }

    function triggerExplosion(x, y) {
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
        let frameDuration = 5; // The duration each frame is shown, calculated as above
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

    function handleClick(event) {
        // Check if the click target is the dufo element
        if (event.target === dufo) {
            successfulShots++;
            createUFOIndicators()
            updateUFOIndicators();
            score = addScore(shotsLeft, score)
            updateScore()
            if (!isPaused) {
                isPaused = true;
                // Pause for 2 seconds and then respawn
                triggerExplosion(currentX, currentY);
                setTimeout(() => {
                    isPaused = false;
                    respawnDufo();
                }, 500);
            }
        } else {
            shotsLeft--
           
            if (shotsLeft < 1) {
                createUFOIndicators()
                updateUFOIndicators();
                isPaused = true
                // Pause for 2 seconds and then respawn
                setTimeout(() => {
                    isPaused = false;
                    respawnDufo();
                }, 500);
            }
        }
        // updateCounter();
        // updateTargetsLeft();
        updateScore()
        updateUFOIndicators();
        updateBulletIndicators();
    }


    // Function to respawn the dufo at a random position
    function respawnDufo() {
        
        currentX = Math.random() * maxX;
        currentY = 10;

        shotsLeft = 3
        remainingUfos--

        if (shotsLeft === 0 && !isPaused){
            moveUFOToLanded();
        } else {
            resetForNextUFO();
        }

        if (remainingUfos < 1) {
           score = 0
           successfulShots = 0
           remainingUfos = 10
        }

        // updateCounter();
        // updateTargetsLeft();
        updateBulletIndicators();
        updateUFOIndicators();
        moveDufo();
        

    }

    function moveUFOToLanded(){
        remainingUfos--;
        const landedUfoIndicator = document.createElement('div');
        landedUfoIndicator.className = 'ufoIndicator landed';
        landedUfoContainer.appendChild(landedUfoIndicator);
        updateUFOIndicators();
        resetForNextUFO();
    }

    function resetForNextUFO(){
        shotsLeft = 3;
        if (remainingUfos < 1){
            score = 0;
            successfulShots = 0;
            remainingUfos = 10;
            // createUFOIndicators();
        }
        updateBulletIndicators();
        updateUFOIndicators();
        moveDufo();
    }

    // function updateCounter() {
    //     document.getElementById('counter').innerText = `Shots at target: ${successfulShots} / Shots Left: ${shotsLeft}`;
    // }

    function createUFOIndicators(){
        ufosContainer.innerHTML = '';
        for (let i = 10; i > remainingUfos; i--){
            const ufoIndicator = document.createElement('div');
            ufoIndicator.className = 'ufoIndicator';
            ufosContainer.appendChild(ufoIndicator)
        }
    }

    function createBulletIndicators(){
        bulletsContainer.innerHTML = '';
        for (let i = 0; i < shotsLeft; i++){
            const bulletIndicator = document.createElement('div');
            bulletIndicator.className = 'bulletIndicator';
            bulletsContainer.appendChild(bulletIndicator)
        }
    }

    function updateUFOIndicators(){
        const ufoIndicators = document.querySelectorAll('.ufoIndicator');
        ufoIndicators.forEach((indicator, index) => {
            indicator.style.opacity = index < successfulShots ? '0.5' : '1';
        });
    }

    function updateBulletIndicators(){
        const bulletIndicators = document.querySelectorAll('.bulletIndicator');
        bulletIndicators.forEach((indicator, index) => {
            indicator.style.opacity = index < 3 - shotsLeft ? '0.25' : '1';
        });
    }


    // function updateCounter() { 
    //     const counter = document.getElementById('counter');
    //     counter.style.backgroundPosition = `${-25 * (10 - remainingUfos)}px 0px`
    //     counter.style.opacity = shotsLeft === 0 ? 0.25 : 1;
        
    //     document.getElementById('counterText').innerText = `Shots Left: ${shotsLeft}`;

    // }

    // function updateTargetsLeft(){
    //     const targetsLeft = document.getElementById('targetsLeft');
    //     const hitUfos = 10 - remainingUfos
    //     targetsLeft.style.backgroundPosition = `${-100 * (10 -remainingUfos)}px 0px`;

    //     if (hitUfos > 0){
    //         targetsLeft.style.opacity = 1
    //     }

    //     document.getElementById('targetsLeft2').innerText = `Remaining Ufos: ${remainingUfos}`
    // }

    function addScore(shotsLeft, score) {
        return score + (shotsLeft === 3 ? 1000 : shotsLeft === 2 ? 500 : shotsLeft === 1 ? 250 : 0) ;
    }
        
    function updateScore() {
        const scoreElement = document.getElementById('score');    
        scoreElement.innerText = `Score: ${score}`;
    }

    // Add click event listener to track total shots
    document.addEventListener('click', handleClick);

    // Start dufo movement
    function startGame() {
        createUFOIndicators();
        createBulletIndicators();
        moveDufo();

    }

    // Event listener to start the game when the page loads
    window.addEventListener('load', startGame);

});
