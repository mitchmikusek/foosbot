class Ranking {
    constructor(matches=[], elo=1500, wins=0, losses=0, streak=0) {
        this.matches = matches
        this.elo = elo
        this.wins = wins
        this.losses = losses
        this.streak = streak
    }
}

export default Ranking