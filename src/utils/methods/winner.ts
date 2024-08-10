export function winner(scores: (string|number)[], damages?: (string|number)[]): number {
    const numScores = scores.map(score => {
        if (typeof score === 'string') {
            return parseInt(score);
        } else return score;
    });
    const numDamages = damages?.map(damage => {
        if (typeof damage === 'string') {
            return parseInt(damage);
        } else return damage;
    });

    let winner: number;
    if (scores[0] === scores[1]) {
        if (!numDamages) throw new Error('Damage must be provided when scores are equal');
        winner = numDamages.indexOf(Math.max(...numDamages))
    } else winner = numScores.indexOf(Math.max(...numScores))

    return winner;
}