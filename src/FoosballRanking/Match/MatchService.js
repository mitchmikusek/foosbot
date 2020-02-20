import Service from '../Common/Service.js'
import MatchSerializer from './MatchSerializer'

class MatchService extends Service {

    constructor(args={collection:'matches'}){
        super(args)
    }

    async fetchAllMatches(){
        let response = await this.getAll()
        return await Promise.all(response.map(dto=> MatchSerializer.fromDto(dto)))
    }

    async fetchMatch(seasonId){
        let response = await this.getById(seasonId)
        if(!response) return null
        return await MatchSerializer.fromDto(response)
    }

    async saveMatch(match) {
        return await this.storeObj(match.id, MatchSerializer.toDto(match));
    }
}

const matchService = new MatchService({collection:'matches'})

export default matchService