import React from "react";
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { auth, provider } from "../firebase-config";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import google from "../assest/google-icon.webp";
import { useStateContext } from "../contexts/context";
import { useNavigate } from "react-router-dom";
import "./style/Login.css";
function Login() {
  let navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState();

  const { setUserLogin, setIsAuth } = useStateContext();
  const [isShowLogin, setIsShowLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //google login method
  // const signInWithGoogle = () => {
  //   signInWithPopup(auth, provider).then((result) => {
  //     localStorage.setItem("isAuth", true);
  //     setIsAuth(true);
  //     navigate("/");
  //   });
  // };
  const signInWithGoogle = async (e) => {
    e.preventDefault();
    console.log("ajay");
    await signInWithPopup(auth, provider)
      .then((result) => {
        localStorage.setItem("userLogin", JSON.stringify(true));
        setUserLogin(true);
        navigate("/");
      })
      .catch((err) => {
        setErrorMsg(err.message);
      });
  };
  const onLogin = async (e) => {
    e.preventDefault();
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setEmail("");
        setPassword("");
        navigate("/");
        setUserLogin(true);
        localStorage.setItem("user", JSON.stringify(user.providerData[0]));
        localStorage.setItem("userLogin", JSON.stringify(true));
      })
      .catch((err) => {
        setErrorMsg(err.message);
      });
  };
  const showTestLogin = () => {
    setIsShowLogin(!isShowLogin);
  };

  return (
    <div className="loginPage">
      <form className="login">
        <h2 className="title-login">Login</h2>
        <div className="input-email">
          <input
            type="email"
            placeholder="Enter the Email@"
            autoComplete="off"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Enter the password"
            autoComplete="off"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button className="submit-btn" onClick={onLogin}>
            submit
          </button>
        </div>
        <div className="google-btn">
          <button className="login-with-google-btn" onClick={signInWithGoogle}>
            <img src={google} alt="google" width="20px"></img>
            Sign in with Google
          </button>
        </div>
        <div className="login-test-credential-btn">
          <button
            type="button"
            className="login-credential-btn"
            onClick={showTestLogin}
          >
            Test Credentials
          </button>
          {isShowLogin && (
            <div>
              <p>Email: test@gmail.com</p>
              <p>Password: test@123</p>
            </div>
          )}
        </div>
        <div className="res-link">
          <span>New to iBlog</span>
          <Link to="/signup" className="signupclick">
            click here to register
          </Link>
        </div>
      </form>
      <p className="error">{errorMsg}</p>
    </div>
  );
}

export default Login;
