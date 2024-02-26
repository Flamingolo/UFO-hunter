let isMuted = false;

export function playSound(soundId){
    const sound = document.getElementById(soundId);
    sound.play();
}


export function playShot(soundId) {
    if (!isMuted) {
        const soundShot = new Audio();
        soundShot.src = document.getElementById(soundId).src;
        soundShot.volume = 0.2;
        soundShot.play();
    }
}


export function toggleMute(){
    isMuted = !isMuted;
    const audios = document.querySelectorAll('audio');
    audios.forEach(audio => {
        audio.volume = isMuted ? 0 : 0.2
    })
}