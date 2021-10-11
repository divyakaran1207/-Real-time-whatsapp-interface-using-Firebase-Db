import React from 'react'
import { Button } from '@material-ui/core'
import './LogIn.css'
import { auth, provider } from './fireBase'
import { useStateValue } from './stateProvider'
import { actionTypes } from './reducer'

function LogIn() {
    const [{}, dispatch] = useStateValue();
    const signIn = ()=>{
        auth
        .signInWithPopup(provider)
        .then((result)=>{
            dispatch({
                type: actionTypes.SET_USER,
                user:result.user,
            });
        })
        .catch((error)=>alert(error.message));
    };
    return (
        <div className='login'>
            <div className='login_container'>
                <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSt8IkxIXdgV53F0lyhHU4O79g2-GNWVk3pwPP1LADe4Gg4ZMbyhnEIiF5fm2PVpKKxabM&usqp=CAU' alt=''></img>
                <div className='login_text'>
                    <h1>Sign In Here</h1>
                </div>
                <Button onClick={signIn}> 
                    <h1>Sign In with Google</h1>
                </Button>
            </div>
        </div>
    )
}

export default LogIn

//            db.collection('Rooms').doc(roomid).collection('messages').orderBy('timstamp','asc').onSnapshot((snapshot)=>setmessages(snapshot.docs.map((doc)=>doc.data())    

