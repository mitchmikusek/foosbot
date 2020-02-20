import Store from './GcpStore'

class Service {

    constructor(args={collection:''}){
        this.store = process.env.FOOSBOT_STORE || 'local'
        this.collection = Store.db.collection(`${this.store}-${args.collection}`)
    }

    async storeObj(id, obj) {
        return await this.collection.doc(id).set(obj)
    }

    async getAll(){
        let ref = this.collection 
        let objs = await ref.get()
        if (objs.empty) return []
        else return objs.docs.map(obj => obj.data())
    }

    async getById(id){
        let ref = this.collection.where('id','==',id)
        let objs = await ref.get()
        if (objs.empty) return null
        else {
            let obj = objs.docs.map(obj => obj.data())
            if (obj.length !== 1) return null
            else return obj[0]
        }
    }
    
}
export default Service