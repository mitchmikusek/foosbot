import playerService from '../Player/PlayerService.js'
import seasonService from '../Season/SeasonService.js'
import matchService from '../Match/MatchService.js'
import MatchSerializer from '../Match/MatchSerializer.js'
import eloService from '../EloService/EloService'
import Player from '../Player/Player.js'
import Ranking from '../Ranking/Ranking'

class RecordMatch {

    static async recordMatch(args) {
        //Add player's to DB if they dont exist
        let newPlayers = await this.getNewPlayers([...args.winners, ...args.losers, args.reporter])
        await this.createNewPlayers(newPlayers)

        let dto = {
            winner: null,
            loser: null,
            reporter: args.reporter.id
        }
        dto.winner = args.winners.map(player => player.id)
        dto.loser = args.losers.map(player => player.id)
        let match = await MatchSerializer.fromPartialDto(dto)

        // Calculate ELO Change
        match.winnerRaiting = match.winner.getSeasonElo(match.season.id)
        match.loserRaiting = match.loser.getSeasonElo(match.season.id)
        match.change = eloService.getEloChange(match.winnerRaiting, match.loserRaiting)

        // Update season games
        match.season = await seasonService.fetchSeason(match.season.id)
        match.season.matches.push(match.id)
        await seasonService.saveSeason(match.season)

        // Update players
        await this.applyChangeToTeam(match.winner, match.season.id, match.id, match.change)
        await this.applyChangeToTeam(match.loser, match.season.id, match.id, -match.change)

        // Save Match
        await matchService.saveMatch(match)
        return match
    }

    static async getNewPlayers(players) {
        let newPlayers = []
        for (let player of players) {
            let playerObj = await playerService.fetchPlayer(player.id)
            if (playerObj === null) { newPlayers.push(player) }
        }
        return newPlayers
    }

    static async createNewPlayers(players){
        for(let player of players){
            await playerService.savePlayer(new Player(player.id, player.name))
        }
    }

    static async applyChangeToTeam(team, seasonId, matchId, change) {
        for (let player of team.players) {
            if (player.seasons[seasonId] === undefined) player.seasons[seasonId] = new Ranking()
            player.ranking.matches.push(matchId)
            player.seasons[seasonId].matches.push(matchId)
            player.ranking.elo += change
            player.seasons[seasonId].elo += change

            if (change > 0) {
                player.ranking.wins++
                player.seasons[seasonId].wins++
                player.ranking.streak = Math.max(player.ranking.streak + 1, 1)
                player.seasons[seasonId].streak = Math.max(player.seasons[seasonId].streak + 1, 1)

            } else if (change < 0) {
                player.ranking.losses++
                player.seasons[seasonId].losses++
                player.ranking.streak = Math.min(player.ranking.streak - 1, -1)
                player.seasons[seasonId].streak = Math.min(player.seasons[seasonId].streak - 1, -1)
            }

            await playerService.savePlayer(player)
        }
    }

}

export default RecordMatch