import moment from 'moment'
import uuidv4 from 'uuid/v4'

class Match {
    constructor(winner, loser, reporter, season, league='🌐', date=moment(), id=uuidv4(), winnerRaiting = 1500, loserRaiting=1500, change=0){
        this.id = id
        this.date = date
        this.league = league
        this.winner = winner
        this.loser = loser
        this.reporter = reporter
        this.season = season
        this.winnerRaiting = winnerRaiting
        this.loserRaiting = loserRaiting
        this.change = change
    }
}

export default Match