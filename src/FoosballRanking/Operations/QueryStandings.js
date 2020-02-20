import playerService from '../Player/PlayerService'
class QueryStandings {
    static async getStandings(){
        return await playerService.fetchAllPlayers()
    }
}

export default QueryStandings