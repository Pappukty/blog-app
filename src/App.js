import "./App.css";

import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Edit from "./pages/Edit";
import CreatePost from './pages/CreatePost';
import { ToastContainer } from "react-toastify";
import Header from "./component/HomeHeader/Header";
import Footer from "./component/HomeHeader/components/footer/Footer";
import "react-toastify/dist/ReactToastify.css";
import UserAccount from "./pages/UserAccount";
import { useStateContext } from "./contexts/context";
import { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "./firebase-config";
import EditProfile from "./pages/EditProfile";
import PostDetails from "./pages/PostDetails";
function App() {
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
      <Routes>
        <Route path="/" element={userLogin ? <Header /> : <Login />}>
          <Route index={true} element={<Home />} />

          <Route path="/useraccount" element={<UserAccount />} />
          <Route path="/createpost" element={<CreatePost />} />
          <Route path="/edit" element={<Edit />} />
          <Route path="/editprofile" element={<EditProfile />} />
          <Route path="/postdetails" element={<PostDetails />} />
        </Route>

        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>

      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
