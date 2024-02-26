let isMuted = false;

export function playSound(soundId){
    const sound = document.getElementById(soundId);
    sound.play();
}


export function toggleMute(){
    isMuted = !isMuted;
    const audios = document.querySelectorAll('audio');
    audios.forEach(audio => {
        audio.volume = isMuted ? 0 : 0.5
    })
}