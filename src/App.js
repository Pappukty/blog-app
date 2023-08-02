
import './App.css';

import { BrowserRouter,Route,Routes,Link}from 
'react-router-dom'
import Home from './pages/Home'
import CreatePost from './pages/CreatePost'
import Login from './pages/Login'
import { useState } from 'react';
import {signOut} from 'firebase/auth';
import {auth} from './firebase-config'
function App() {
  const [isAuth,setIsAuth]=useState(localStorage.getItem('isAuth'));
  //log Out function
  const SignUserOut=()=>{
signOut(auth).then(()=>{
  localStorage.clear()
  setIsAuth(false);
window.location.pathname='./login'
})
  }
  return (
    <BrowserRouter>
    <nav>

    <Link to='/'>Home</Link>

    {!isAuth ? (
      <Link to='login'>Login</Link>
    ) : (
<>

<Link to='/CreatePost'>Create Post</Link>
  <button onClick={SignUserOut}>Log Out</button>

</>
    )
    

}
</nav>
<Routes>
  <Route path='/' element={<Home  isAuth={isAuth}/>}/>
  <Route path='/login' element={<Login setIsAuth={setIsAuth} />}/>
  <Route path='/CreatePost' element={<CreatePost isAuth={isAuth} />}/>
</Routes>

</BrowserRouter>
);
}

export default App;
