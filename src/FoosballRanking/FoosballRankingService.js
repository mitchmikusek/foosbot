import QuerySeasons from './Operations/QuerySeasons'
import QueryStandings from './Operations/QueryStandings'
import UpdatePlayer from './Operations/UpdatePlayer'
import RecordMatch from './Operations/RecordMatch'

/**
 * Inteded interface to the service
 * Proxy to single operations
 */
class FoosballRankingService {
    
    static async recordMatch(args){
        return await RecordMatch.recordMatch(args)
    }

    static async updatePlayerData(args){
        return await UpdatePlayer.updatePlayerData(args)
    }

    static async getCurrentSeason(){
        return await QuerySeasons.getCurrentSeason()
    }

    static async getStandings(){
        return await QueryStandings.getStandings()
    }
   
}

export default FoosballRankingService