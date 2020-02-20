import Ranking from '../Ranking/Ranking'

/**
 * Team represents 1 side of the table in a game from 1 -> n number of players per side
 */
class Team {

    constructor(players=[]) {
        this.players = players
    }
    
    /**
     * Returns Team Season ELO
     */
    getSeasonElo(seasonId){
        let eloSum = 0
        for (let player of this.players) {
            if (player.seasons[seasonId] === undefined) player.seasons[seasonId] = new Ranking()
            eloSum += player.seasons[seasonId].elo
        }
        return eloSum / this.players.length
    }

    /**
     * Returns Team Overall ELO
     */
    getAlltimeElo(){
        let eloSum = 0
        for (let player of this.players) {
            if (player.elo === undefined) player.elo = 1500
            eloSum += player.elo
        }
        return eloSum / this.players.length
    }
}

export default Team