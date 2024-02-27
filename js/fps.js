export function updateFpsDisplay(){
    const fpsCounter = document.getElementById('fps-counter')
    if (fpsCounter){
        fpsCounter.textContent = `FPS: ${Math.round(fps)}`
    }
}