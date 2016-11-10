import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/auth'

let config = {
  apiKey: "AIzaSyDDWL4BfEugaPrARiQ3uFwLobyTLZ-HQKc",
  authDomain: "reactchat-8ebb9.firebaseapp.com",
  databaseURL: "https://reactchat-8ebb9.firebaseio.com"
}

firebase.initializeApp(config)

export const database = firebase.database()
export const auth = firebase.auth()