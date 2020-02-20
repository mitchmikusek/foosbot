
import Ranking from '../Ranking/Ranking'
/**
 * Player is really "Person"
 * Typically not directly associated with a match, but through a team
 */
class Player {
    constructor(id=null, name="unknown", seasons={}, league='🌐', ranking=new Ranking()){
        this.id = id
        this.name = name
        this.seasons = seasons        
        this.league = league
        this.ranking = ranking
    }
}

export default Player