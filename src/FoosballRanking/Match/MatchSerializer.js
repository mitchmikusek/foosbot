import Serializer from '../Common/Serializer'
import Match from './Match'
import Team from '../Team/Team'
import playerService from '../Player/PlayerService'
import seasonService from '../Season/SeasonService'
import moment from 'moment'
import uuidv4 from 'uuid/v4'

class MatchSerializer extends Serializer {

    static async fromPartialDto(dto) {
        const winner = new Team(await Promise.all(dto.winner.map((playerId => playerService.fetchPlayer(playerId)))))
        const loser = new Team(await Promise.all(dto.loser.map((playerId =>  playerService.fetchPlayer(playerId)))))
        const reporter = dto.reporter
        const id = dto.id || uuidv4()
        const league = dto.league || ':globe:'
        const season = dto.season? await seasonService.fetchSeason(dto.season) : await seasonService.fetchCurrentSeason()
        const date = moment(dto.date) || moment()
        const change = dto.change || 0
        const winnerRaiting = dto.winnerRaiting || 1500
        const loserRaiting = dto.loserRaiting || 1500
        return new Match(winner, loser, reporter, season, league, date, id, winnerRaiting, loserRaiting, change)
    }

    static async fromDto(dto) {
        const id = dto.id
        const reporter = dto.reporter
        const league = dto.league
        const season = await seasonService.fetchSeason(dto.season)
        const date = moment(dto.date)
        const winner = new Team(await Promise.all(dto.winner.map((playerId => playerService.fetchPlayer(playerId)))))
        const loser = new Team(await Promise.all(dto.loser.map((playerId =>  playerService.fetchPlayer(playerId)))))
        const change = dto.change
        const winnerRaiting = dto.winnerRaiting
        const loserRaiting = dto.loserRaiting
        return new Match(winner, loser, reporter, season, league, date, id, winnerRaiting, loserRaiting, change)
    }

    static toDto(obj) {
        let dto = {}
        dto.id = obj.id
        dto.date = obj.date.toISOString()
        dto.league = obj.league
        dto.reporter = obj.reporter
        dto.winner = obj.winner.players.map(player => player.id)        
        dto.loser = obj.loser.players.map(player => player.id)
        dto.season = obj.season.id
        dto.change = obj.change
        dto.winnerRaiting = obj.winnerRaiting
        dto.loserRaiting = obj.loserRaiting
        return dto
    }

}
export default MatchSerializer