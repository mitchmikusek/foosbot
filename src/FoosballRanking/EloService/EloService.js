class EloService {

    constructor(k=40, baseRating=1500, algo400=200){
        this.K = k
        this.BASE_RATING = baseRating
        this.ALGORITHM_OF_400 = algo400
    }

    getEloChange(a, b) {
        return this.K / (1 + 10 ** ((a - b) / this.ALGORITHM_OF_400));
      }    
}

const eloService = new EloService(40, 1500, 200)

export default eloService