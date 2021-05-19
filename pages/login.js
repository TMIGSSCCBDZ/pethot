// Import FirebaseAuth and firebase.
import React, { useEffect, useState } from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';
import store from 'store-js'
import {useRouter} from 'next/router'
import Link from 'next/link'
import Alert from '@material-ui/lab/Alert';
import styles from '../styles/register.module.css'
import { Button, TextField } from "@material-ui/core";
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

function login() {
    const router = useRouter()
const user = store.get('user')?.user
const [email,setEmail] = useState('')
const [password,setPassword] = useState('')
const [err,setErr] = useState('')
const [succ,setSuccess] = useState(false)

const login = ()=>{
    firebase.auth().signInWithEmailAndPassword(email,password).
    then(auth=>{
        
        store.set('user',{user:auth.user})
        router.push('/')
      setSuccess(true)
    }).catch(err=>{
        setErr(err)

    }) 

   
}
  if (!user) {
    return (
       <>
        {err && <Alert severity="error">{err.message}</Alert>}
        {succ && <Alert severity="success">login successfully completed</Alert>}
      <div className={styles.register}>

      <div className={styles.form}>
        <h1>Pethotel</h1>
        <p>login</p>
        <TextField id="standard-basic" type='email' label="email" value={email} onChange={(e)=>setEmail(e.target.value)}  />
<br/>
<TextField id="standard-basic" type='password' label="password" value={password}  onChange={(e)=>setPassword(e.target.value)} />
<br/>
<Button variant='outlined' color='primary' onClick={login}>login</Button>

    <div className={styles.have_account}>
        
 <p className={styles.have_account_text}>New to pethotel &nbsp;</p><Link href='/register'><p className={styles.have_account_link}>sign up</p></Link>
     </div>
      </div>
      </div>
      </>
    );
  }
  return (
 <div className={styles.register} >
<h2>login successfully completed go to your <Link href='/' >home page</Link></h2>

   
 </div>
  );
}

export default login;
