import playerService from '../Player/PlayerService.js'
import Player from '../Player/Player.js'

class UpdatePlayer{

    static async updatePlayerData(updates){
        let player = await playerService.fetchPlayer(updates.id)
        if(!player) player = new Player(updates.id, updates.name)
        if(updates.name) player.name = updates.name
        if(updates.league) player.league = updates.league
        await playerService.savePlayer(player)
        return player
    }

    
}

export default UpdatePlayer