import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyAjfnn5VXImtNTMGOh18_TlINdX4bzrbB8",
    authDomain: "pethotel-e82ac.firebaseapp.com",
    projectId: "pethotel-e82ac",
    storageBucket: "pethotel-e82ac.appspot.com",
    messagingSenderId: "755689634619",
    appId: "1:755689634619:web:a191d396cd0d678f02951e"
  };
  export default function initFirebase() {
      if (!firebase.apps.length) {
          firebase.initializeApp(firebaseConfig)
      }else{
          firebase.app()
      }
    
     
  }



