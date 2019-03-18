import firebase from 'firebase'
import 'firebase/firestore'

import config from '../firebase.config.js'

export default class Firebase {
  static db

  static init() {
    firebase.initializeApp(config)
    Firebase.db = firebase.firestore()
    // const settings = { timestampsInSnapshots: true }
    // Firebase.db.settings(settings)
  }
}
