// Import FirebaseAuth and firebase.
import React, { useEffect, useState } from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';
import store from 'store-js'
import Link from 'next/link'
import styles from '../styles/register.module.css'
// Configure Firebase.
if (!firebase.apps.length) {
  

const config = {
  apiKey: "AIzaSyAjfnn5VXImtNTMGOh18_TlINdX4bzrbB8",
  authDomain: "pethotel-e82ac.firebaseapp.com",
  projectId: "pethotel-e82ac",
  storageBucket: "pethotel-e82ac.appspot.com",
  messagingSenderId: "755689634619",
  appId: "1:755689634619:web:a191d396cd0d678f02951e"
};
firebase.initializeApp(config);
}
// Configure FirebaseUI.
const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: 'popup',

  signInSuccessUrl: '/',
  // We will display Google and Facebook as auth providers.
  signInOptions: [
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    firebase.auth.GoogleAuthProvider.PROVIDER_ID
  ],
 
};

function register() {
  const [isSignedIn, setIsSignedIn] = useState(false); // Local signed-in state.

  // Listen to the Firebase Auth state and set the local state.
  useEffect(() => {
    const unregisterAuthObserver = firebase.auth().onAuthStateChanged(user => {
      setIsSignedIn(!!user);
      store.set('user',{user:user})
    });
    return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
  }, []);
console.log(store?.get('user'))
  if (!isSignedIn) {
    return (
      <div className={styles.register}>
      <div className={styles.form}>
        <h1>Pethotel</h1>
        <p>sign-up</p>
       <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
     <div className={styles.have_account}>
 <p className={styles.have_account_text}>Already have an account &nbsp;</p><Link href='/login'><p className={styles.have_account_link}>login</p></Link>
     </div>
      </div>
      </div>
    );
  }
  return (
 <div className={styles.register} >
<h2>You already signed in go to <Link href='/' >home page</Link></h2>
<a onClick={() => firebase.auth().signOut()}>Sign-out</a>
   
   
 </div>
  );
}

export default register;
