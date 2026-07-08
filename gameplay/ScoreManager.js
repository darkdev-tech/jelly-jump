export class ScoreManager {
    constructor() {
        this.score = 0;
        this.combo = 0;
        this.matchCount = 0;
    }

    calculateScore(matchCount, isCombo) {
        let baseScore = matchCount * 100;

        if (matchCount === 4) {
            baseScore *= 1.5;
        } else if (matchCount === 5) {
            baseScore *= 2;
        }

        if (isCombo) {
            this.combo++;
            baseScore *= (1 + this.combo * 0.1);
        } else {
            this.combo = 0;
        }

        this.score += baseScore;
        return baseScore;
    }

    reset() {
        this.score = 0;
        this.combo = 0;
        this.matchCount = 0;
    }
}
