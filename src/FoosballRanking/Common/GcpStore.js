import Firestore from '@google-cloud/firestore'

class FoosballStore_GCP {
  constructor() {
    this.db = new Firestore({ projectId: 'foosbot', keyFilename: './config/foosbot-gcp.json' })
  }
}

const foosballStore_GCP = new FoosballStore_GCP()

export default foosballStore_GCP