import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
    apiKey: 'AIzaSyBHP1Pkia0OSz1gKqt6kl98GLpWzMM8dZk',
    authDomain: 'adapprogram-704ac.firebaseapp.com',
    projectId: 'adapprogram-704ac',
    storageBucket: 'adapprogram-704ac.appspot.com',
    messagingSenderId: '438219666111',
    appId: '1:438219666111:web:372a7fe2fd23c537ad0c0a',
}

// Initialize Firebase
firebase.initializeApp(firebaseConfig)

const db = firebase.firestore()

export {db, firebase}
