import Service from '../Common/Service.js'
import PlayerSerializer from './PlayerSerializer'

class PlayerService extends Service {

    constructor(args={collection:'players'}){
        super(args)
    }

    async fetchAllPlayers(){
        let response = await this.getAll()
        return response.map(dto=> PlayerSerializer.fromDto(dto))
    }

    async fetchPlayer(playerId){
        let response = await this.getById(playerId)
        if(!response) return null
        return PlayerSerializer.fromDto(response)
    }

    async savePlayer(player) {
        return await this.storeObj(player.id, PlayerSerializer.toDto(player));
    }

    async queryPlayers(args={seasonId:null, league:null}){
        let players = playerService(args)
        
        return players
    }

}

const playerService = new PlayerService({collection:'players'})

export default playerService