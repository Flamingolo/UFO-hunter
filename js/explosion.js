// export function triggerExplosion(x, y) {
//     const explosion = document.getElementById('explosion');
//     explosion.style.display = 'block';
//     explosion.style.left = x + 'px';
//     explosion.style.top = y + 'px';

//     const frameWidth = 290;
//     const frameHeight = 290;
//     let currentFrame = 0;
//     const totalFrames = 8;
//     let row = 0;

//     function animateExplosion(){
//         const column = currentFrame % 4;
//         const xPosition = -(column * frameWidth);
//         const yPosition = -(row * frameHeight);
//         explosion.style.backgroundPosition = `${xPosition}px ${yPosition}px`;

//         currentFrame++

//         if (currentFrame % 4 === 0){
//             row++
//         }

//         if (currentFrame < totalFrames){
//             requestAnimationFrame(animateExplosion);
//         } else {
//             explosion.style.display = 'none';
//         }
//     }

//     animateExplosion();
// }