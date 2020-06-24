import 'firebase/database'
import 'firebase/auth'
import 'firebase/analytics'
import 'firebase/firestore'
import 'firebase/functions'
import 'firebase/storage'

import * as firebase from 'firebase/app'

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: 'AIzaSyB-3QFar96W2n4AFn1GLs_yVOaTAeuDFGE',
    authDomain: 'sheep16-spacesheep.firebaseapp.com',
    databaseURL: 'https://sheep16-spacesheep.firebaseio.com',
    projectId: 'sheep16-spacesheep',
    storageBucket: 'sheep16-spacesheep.appspot.com',
    messagingSenderId: '108480825019',
    appId: '1:108480825019:web:70805db4dfdb367dae0b9e',
    measurementId: 'G-WYV454JC0J',
  })

  // If on client-side
  if (typeof window !== 'undefined') {
    firebase.analytics()
  }
}

// If developing
if (process.env.NODE_ENV === 'development') {
  firebase.firestore().settings({
    host: 'localhost:8080',
    ssl: false,
  })
  firebase.functions().useFunctionsEmulator('http://localhost:5001')
} else {
  console.log("WATCH OUT!! You're using the production database!!")
}

export default firebase
