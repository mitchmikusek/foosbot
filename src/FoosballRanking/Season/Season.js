import uuidv4 from 'uuid/v4'

class Season {
    constructor(title, start, end, matches=[], id=uuidv4()){
        this.id = id
        this.title = title
        this.start = start
        this.end = end
        this.matches = matches
    }

}

export default Season