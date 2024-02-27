export function updateFpsDisplay(fps){
    const fpsCounter = document.getElementById('fps-counter')
    if (fpsCounter){
        fpsCounter.innerText = `FPS: ${Math.round(fps)}`
    }
}