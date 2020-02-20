import Serializer from '../Common/Serializer'
import Season from './Season'
import moment from 'moment'

class SeasonSerializer extends Serializer {

    static fromDto(dto) {
        const id = dto.id
        const title = dto.title
        const start = moment(dto.start)
        const end = moment(dto.end)
        const matches = dto.matches
        return new Season(title, start, end, matches, id)
    }

    static toDto(obj) {
        let dto = {}
        dto.id = obj.id
        dto.title = obj.title
        dto.start = obj.start.toISOString()
        dto.end = obj.end.toISOString()
        dto.matches = obj.matches
        return dto
    }

}
export default SeasonSerializer