import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./style/Signup.css";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import { auth, db } from "../firebase-config";
import { addDoc, collection } from "firebase/firestore";
const Signup = () => {
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState("");
  const [userName, setUserName] = useState("");
  const [number, setNumber] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();

    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        const collectionRef = collection(db, "users");
        addDoc(collectionRef, {
          id: user.uid,
          userName: userName,

          email: user.email,
          gender: gender,
          number: number,
        });
        updateProfile(user, {
          displayName: userName,
        });
        console.log(userName);
        setEmail("");
        setPassword("");

        navigate("/");
      })
      .catch((err) => {
        setErrorMsg(err.message);
      });
  };
  const handelReset = (e) => {
    e.preventDefault();
    setEmail("");
    setPassword("");
  };

  return (
    <div className="register-container">
      <form className="register">
        <h1 className="title">Register</h1>
        <div className="inputRegister">
          {/* <div>
            <label htmlFor="userName"></label>
            <input
              type="text"
              placeholder="userName"
              label="userName"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
            />
          </div> */}
          <div>
            <label htmlFor="email address"></label>
            <input
              type="email"
              label="Email address"
              placeholder="Enter the @Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password"></label>
            <input
              type="password"
              label="password"
              placeholder="Enter the Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {/* <div>
            <label htmlFor="confirmPassword"></label>
            {/* <input
              type="Password"
              label="confirmPassword"
              placeholder="confirm Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            /> */}

          {/* <input
            type="number"
            placeholder="Mobile Number"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            required
          /> */}
        </div>
        <div className="select">
          {/* <label for="choose">choose Gender</label>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            required
          >
            <span></span>
            <option>open this select menu</option>
            <option value="male">male</option>
            <option value="female">female</option>
            <option value="others">others</option>
          </select> */}
        </div>

        <div className="btn">
          <button className="submit-btn-sign" type="submit" onClick={onSubmit}>
            Submit
          </button>
          <button className="reset-btn" onClick={handelReset}>
            Reset
          </button>
        </div>
        <div className="log-link">
          <span>Have an account? </span>
          <Link to="/login" className="link">
            click to here Login
          </Link>
        </div>
        <p className="error">{errorMsg}</p>
      </form>
    </div>
  );
};

export default Signup;
