import "./App.css";

import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Edit from "./pages/Edit";
import Root from "./pages/Root";
import { ToastContainer } from "react-toastify";
import Header from "./component/HomeHeader/Header";
import "react-toastify/dist/ReactToastify.css";
import UserAccount from "./pages/UserAccount";
import { useStateContext } from "./contexts/context";
import { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "./firebase-config";
function App() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));
  const { userLogin } = useStateContext();

  // log Out function
  // const SignUserOut = () => {
  //   signOut(auth).then(() => {
  //     localStorage.clear();
  //     setIsAuth(false);
  //     window.location.pathname = "/";
  //   });
  // };
  return (
    <BrowserRouter>
      {/* <nav>
        <h3 className="iblog">iBlog</h3>
        <Link to="/home">Home</Link>
        <Link to="/CreatePost">Create Post</Link>

        {!isAuth ? (
          <Link to="/" className="login-ap"></Link>
        ) : (
          <>
            <button>Log Out</button>
          </>
        )}
      </nav> */}

      <Routes>
        <Route path="/" element={userLogin ? <Header /> : <Login />}>
          <Route index={true} element={<Home isAuth={isAuth} />} />

          <Route path="/CreatePost" element={<CreatePost isAuth={isAuth} />} />

          <Route path="/useraccount" element={<UserAccount />} />
          <Route path="/edit" element={<Edit />} />
        </Route>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />
      </Routes>

      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
