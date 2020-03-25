import firebase from 'firebase'
import 'firebase/auth'

const config = {
    apiKey: "AIzaSyAVqdT4tvXCK_bCxnISRzGgRqe1S5ncAto",
    authDomain: "nrt-db.firebaseapp.com",
    databaseURL: "https://nrt-db.firebaseio.com",
    projectId: "nrt-db",
    storageBucket: "nrt-db.appspot.com",
    messagingSenderId: "1077797038798",
    appId: "1:1077797038798:web:3991db8041ceed28c0be9f",
    measurementId: "G-9026BZJVPT"
  };

  firebase.initializeApp(config)
  export const auth = firebase.auth()

  const googleProvider = new firebase.auth.GoogleAuthProvider()
  googleProvider.setCustomParameters({ prompt : 'select_account'})
  export const signInWithGoogle = async () => auth.signInWithPopup(googleProvider)
  export const signUpWithEmail = async (email,password) => auth.createUserWithEmailAndPassword(email,password)
  export const signInWithEmail = async (email, password) => auth.signInWithEmailAndPassword(email,password)

export default firebase