export function addScore(shotsLeft, score) {
    return score + (shotsLeft === 3 ? 1000 : shotsLeft === 2 ? 500 : shotsLeft === 1 ? 250 : 0) ;
}

export function updateScore(score, remainingUfos) {
    const scoreElement = document.getElementById('score');    
    scoreElement.innerText = `Score: ${score}`;
    document.getElementById('remaining').innerText = `Remaining Ufos: ${remainingUfos}`
}

export function createUFOIndicators(remainingUfos, successfulShots){
    ufosContainer.innerHTML = '';
    // for (let i = 10; i > remainingUfos; i--){
    //     const ufoIndicator = document.createElement('div');
    //     ufoIndicator.className = 'shotdownUfos';
    //     ufosContainer.appendChild(ufoIndicator)
    // }

    for (let i = 10; i > remainingUfos; i--){
        const ufoIndicator = document.createElement('div')
        if (i < successfulShots){
            ufoIndicator.className = 'shotdownUfos'
            ufoIndicator.style.opacity = '0.33'
        } else {
            ufoIndicator.className = 'landedUfos';
            ufoIndicator.style.opacity = '1';
            ufoIndicator.style.marginLeft = 'auto'
        }
        ufosContainer.appendChild(ufoIndicator)
    }

}

export function updateUFOIndicators(landedUfos, shotdownUfos){
    // const ufoIndicators = document.querySelectorAll('.ufoIndicator');
    // ufoIndicators.forEach((indicator, index) => {
    //     indicator.style.opacity = index < successfulShots ? '0.33' : '0.9';
    // });

    ufosContainer.innerHTML = '';
    for (let i = 0; i < shotdownUfos; i++){
        const ufoIndicator = document.createElement('div');
        ufoIndicator.className = 'shotdownUfos';
        ufoIndicator.style.opacity = '0.33'
        ufosContainer.appendChild(ufoIndicator)
    }

    for (let i = 0; i <= landedUfos; i++){
        const ufoIndicator = document.createElement('div');
        ufoIndicator.className = 'landedUfos';
        ufoIndicator.style.opacity = '0.9'
        ufosContainer.appendChild(ufoIndicator);
    }
    


}

export function createBulletIndicators(remainingShots){
    bulletsContainer.innerHTML = '';
    for (let i = 0; i < remainingShots; i++){
        const bulletIndicator = document.createElement('div');
        bulletIndicator.className = 'bulletIndicator';
        bulletsContainer.appendChild(bulletIndicator)
    }
}


export function updateBulletIndicators(remainingShots){
    const bulletIndicators = document.querySelectorAll('.bulletIndicator');
    bulletIndicators.forEach((indicator, index) => {
        indicator.style.opacity = index < 3 - remainingShots ? '0.33' : '1';
    });
}
