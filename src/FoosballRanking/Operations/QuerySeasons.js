import seasonService from '../Season/SeasonService.js'

class QuerySeasons {
    static async getCurrentSeason(){
        return await seasonService.fetchCurrentSeason()
    }
}

export default QuerySeasons