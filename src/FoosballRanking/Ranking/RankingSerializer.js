import Serializer from '../Common/Serializer'
import Ranking from './Ranking'

class RankingSerializer extends Serializer {

    static fromDto(dto) {
        const matches = dto.matches
        const elo = dto.elo
        const wins = dto.wins
        const losses = dto.losses
        const streak = dto.streak
        return new Ranking(matches, elo, wins, losses, streak)
    }

    static toDto(obj) {
        let dto = {}
        dto.matches = obj.matches
        dto.elo = obj.elo
        dto.wins = obj.wins
        dto.losses = obj.losses
        dto.streak = obj.streak
        return dto
    }

}

export default RankingSerializer