import React from 'react'
import{auth,provider } from '../firebase-config';
import {signInWithPopup} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

function Login  ({setIsAuth}){
let Navigate= useNavigate();
const signInWithGoogle =()=>{
  signInWithPopup(auth,provider).then((result)=>{
    localStorage.setItem('isAuth',true);
    setIsAuth(true);
  });
  Navigate('/');
};


return (
<div className='loginPage'>
<p>Sign In with to continue</p>
<button className='login-with-google-btn' onClick={signInWithGoogle}>Sign In with google</button>

</div>
)
}

export default Login
