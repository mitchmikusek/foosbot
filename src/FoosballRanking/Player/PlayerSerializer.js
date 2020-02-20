import Serializer from '../Common/Serializer'
import Player from './Player'
import RankingSerializer from '../Ranking/RankingSerializer'
class PlayerSerializer extends Serializer {

    static fromDto(dto) {
        const id = dto.id
        const name = dto.name
        const seasons = {}
        for(let season in dto.seasons){ seasons[season] = RankingSerializer.fromDto(dto.seasons[season])}
        const league = dto.league
        const ranking = RankingSerializer.fromDto(dto.ranking)
        return new Player(id, name, seasons, league, ranking)
    }

    static toDto(obj) {
        let dto = {}
        dto.id = obj.id
        dto.name = obj.name
        dto.seasons = {}
        for(let season in obj.seasons){ dto.seasons[season] = RankingSerializer.toDto(obj.seasons[season])}
        obj.seasons
        dto.league = obj.league
        dto.ranking = RankingSerializer.toDto(obj.ranking)
        return dto
    }

}
export default PlayerSerializer