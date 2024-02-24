export function addScore(shotsLeft, score) {
    return score + (shotsLeft === 3 ? 1000 : shotsLeft === 2 ? 500 : shotsLeft === 1 ? 250 : 0) ;
}