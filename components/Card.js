import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';import AddCircleIcon from '@material-ui/icons/AddCircle';
import firebase from 'firebase'
import { useEffect, useState } from 'react';
import initFirebase from '../backend/firebase'
import AddButton from '../components/AddButton'
import store from 'store-js'
const useStyles = makeStyles({
  root: {
    maxWidth: 240,
    margin:20
  },
  media: {
    height: 170,
  },
});
initFirebase()
export default function MediaCard() {
const user = store.get('user')?.user
  const classes = useStyles();
  const [pets,setPets] = useState([])
  useEffect(() => {
    const clean  = firebase.firestore().collection('pets').orderBy('timestamp','desc').onSnapshot(snapshot=>{
setPets(snapshot.docs.map(doc=>({id:doc.id,pet:doc.data()})))
    })
    return () => {
      clean()
    }
  }, [])

  const del = (id)=>{
    firebase.firestore().collection('pets').doc(id).delete()
    firebase.firestore().collection('pets').doc(user?.uid).collection('pets').doc(id).delete()
  }
 
  return (<>
    <div className={styles.home}>
   {!(user == null) && (<AddButton />)} 
      {pets.map(({id,pet})=>(
       
 <Card key={id} className={classes.root}>

 <CardMedia
   className={classes.media}
   title={pet.name}
 ><img src={pet.image} width='100%' style={{objectFit:'cover'}} height='175' /></CardMedia>
 <CardContent>
   <Typography gutterBottom variant="h5" component="h2">
   {pet.name}
   </Typography>
   <Typography variant="body2" color="textSecondary" component="p">
     it is {pet.type} of {pet.age} year old
   </Typography>
 </CardContent>

<CardActions>
 <Button size="small" color="primary" disabled>
   {pet.status}
 </Button>
 {(user?.uid == pet.uid) && ( <Button size="small" color="secondary" onClick={()=>del(id) }>
   remove
 </Button>)}  
</CardActions>
</Card>
      ))}
   
    </div>
    </>
  );
}
