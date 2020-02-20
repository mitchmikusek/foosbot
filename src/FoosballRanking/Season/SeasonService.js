import Service from '../Common/Service.js'
import SeasonSerializer from './SeasonSerializer'
import moment from 'moment'
import Season from './Season'

class SeasonService extends Service {

    constructor(args={collection:'seasons'}){
        super(args)
    }

    async fetchAllSeasons(){
        let response = await this.getAll()
        return response.map(dto => SeasonSerializer.fromDto(dto))
    }

    async fetchSeason(seasonId){
        let response = await this.getById(seasonId)
        if(!response) return null
        return SeasonSerializer.fromDto(response)
    }

    async saveSeason(season) {
        return await this.storeObj(season.id, SeasonSerializer.toDto(season));
    }

    async fetchCurrentSeason(){
        let seasonPartial = SeasonService.getSeasonByDate(moment())
        let season = await this.fetchSeason(seasonPartial.id)
        if(season === null){
            await this.saveSeason(seasonPartial)
        }
        return seasonPartial
    }

    static getSeasonByDate(date){
        let seasons = SeasonService.getYearSeasons(date.year())
        for(let season of seasons){
            if(date.isBetween(season.start, season.end)) return season
        }
        return null
    }
    
    static getYearSeasons(year=moment().year()) {
        let dates = {
            winter: {start: moment(`${year}-01-01T12:00:00-08:00`),                                                  end: moment(`${year}-04-01T12:00:00-08:00`).startOf('isoWeek').add(5, 'day').add(12, 'hour'),},
            spring: {start: moment(`${year}-04-01T12:00:00-08:00`).startOf('isoWeek').add(5, 'day').add(12, 'hour'), end: moment(`${year}-07-01T12:00:00-08:00`).startOf('isoWeek').add(5, 'day').add(12, 'hour'),},
            summer: {start: moment(`${year}-07-01T12:00:00-08:00`).startOf('isoWeek').add(5, 'day').add(12, 'hour'), end: moment(`${year}-10-01T12:00:00-08:00`).startOf('isoWeek').add(5, 'day').add(12, 'hour'),},
            fall  : {start: moment(`${year}-10-01T12:00:00-08:00`).startOf('isoWeek').add(5, 'day').add(12, 'hour'), end: moment(`${year+1}-01-01T12:00:00-08:00`),},
        }
    
        return [
            new Season( `Winter ${year}`,dates.winter.start, dates.winter.end, [], `${year}Q1`),
            new Season( `Spring ${year}`,dates.spring.start, dates.spring.end, [], `${year}Q2`),
            new Season( `Summer ${year}`,dates.summer.start, dates.summer.end, [], `${year}Q3`),
            new Season( `Fall ${year}`,dates.fall.start, dates.fall.end, [], `${year}Q4`),
        ]
    }
}

const seasonService = new SeasonService({collection:'seasons'})

export default seasonService