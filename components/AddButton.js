import React, { useState } from 'react';
import styles from '../styles/Home.module.css'
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import firebase from 'firebase'
import initFirebase from '../backend/firebase'
import Fade from '@material-ui/core/Fade';
import { Button, IconButton, LinearProgress, TextField } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle'
import Alert from '@material-ui/lab/Alert';
import DatePicker from './DatePicker'
import store from 'store-js'
import {useStateValue} from '../backend/StateProvider'
import { addDays } from 'date-fns';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(3, 6, 4),
    borderRadius:'5px'
  },
}));
initFirebase()
export default function TransitionsModal() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [petName, setPetName] = useState('');
  const [age, setAge] = useState('');
  const [type, setType] = useState('');
  const [image, setImg] = useState(null);
  const [{finalDate}] = useStateValue();
const user = store.get('user')?.user
const color = store.get('color')?.color

  const [progress, setProgress] = useState(0);
  const [err, setErr] = useState('');

  const handleOpen = () => {
    setOpen(true);
  };



  const handleClose = () => {
    setOpen(false);
  }; 
 
  const add =()=>{
    const uploadImage = firebase.storage().ref(`images/${image?.name}`).put(image)
   
       uploadImage.on(
         'state_changed',
         
         (snapshot)=>{
           const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes)*100)
           setProgress(progress)
           if (progress == 100) {
            setOpen(false)
            setProgress(0)
            setPetName('')
            setType('')
            setAge('')
           }
          
         },
         (error)=>{
           console.log(error)
         }
         ,
         ()=>{
          firebase.storage().ref('images').child(image?.name).getDownloadURL()
          .then(url=>
          {    firebase.firestore().collection('pets').add({
           name:petName,
           age:age,
           type:type,
           status:'pending',
           end:finalDate,
           uid:user?.uid,
           image:url,
         
          
           timestamp:firebase.firestore.FieldValue.serverTimestamp()
       })
      firebase.firestore().collection('users').doc(user?.uid).collection('pets').add({
       name:petName,
       age:age,
       type:type,
       status:'pending',
       end:finalDate,
     uid:user?.uid,
      image:url,
       timestamp:firebase.firestore.FieldValue.serverTimestamp()
      
      })
          })
        }
        
       
       )
          
         
                 
             
    
 
  

  }


  return (
    <div>
        {err && (<Alert severity="error">{err.message} </Alert>
)}
 
       <div className={styles.corner_button}>
        <IconButton color={color} onClick={handleOpen}><AddCircleIcon style={{fontSize:'30px'}} color={color} /></IconButton>
      </div>
      <form >
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
          <LinearProgress  variant="determinate" value={progress} max={100} />

          <TextField id="standard-basic" type='name' label="name" value={petName} onChange={(e)=>setPetName(e.target.value)}  />
<br/>
<TextField id="standard-basic"  label="age" type='number' value={age}  onChange={(e)=>setAge(e.target.value)} />
<br/>
<TextField id="standard-basic"  label="type" value={type}  onChange={(e)=>setType(e.target.value)} />
<br/>
<DatePicker />
<br/>
<input
style={{display:'none'}}
        accept="image/*"
        className={classes.input}
        id="contained-button-file"
        
        type="file"
      
        onChange={(e)=>
         
            
          
          setImg(e.target.files[0])
        
        
        }
          
          />
      <div style={{display:'flex',width:'100%',justifyContent:'space-between'}}>
      <label htmlFor="contained-button-file">
        <Button variant="outlined" color={color}  component="span">
          Upload
        </Button></label>
        <Button onClick={add}  disabled={!petName || !type || !age || !image || finalDate =='' || finalDate ==NaN ||finalDate==null} >Done</Button>
         </div>
         </div>
        </Fade>
      </Modal>
      </form>
    </div>
  );
}
