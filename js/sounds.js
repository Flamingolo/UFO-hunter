export function playSound(soundId){
    const sound = document.getElementById(soundId);
    sound.play();
}

export function pauseSound(soundId){
    const sound = document.getElementById(soundId);
    sound.pause();
    sound.currentTime = 0;
}