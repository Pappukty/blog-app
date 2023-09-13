import { createContext, useContext, useReducer } from "react";
import { useState, useEffect } from "react";
import { auth } from "../firebase-config";
const StateContext = createContext();

const StateProvider = ({ children }) => {
  const [editPost, setEditPost] = useState();
  const [userLogin, setUserLogin] = useState(null);
  //username
  const [userName, setUserName] = useState("");

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      console.log(user);
      if (user) {
        setUserName(user.displayName);
      } else setUserName("");
    });
  }, []);
  //local storage
  const fetchLoginInfo = () => {
    const LoginInfo =
      localStorage.getItem("userLogin") !== "undefined"
        ? JSON.parse(localStorage.getItem("userLogin"))
        : localStorage.clear();

    return LoginInfo;
  };

  useEffect(() => {
    const user = fetchLoginInfo;
    setUserLogin(user);
  }, []);
  console.log(userLogin);
  return (
    <StateContext.Provider
      value={{
        editPost,
        setEditPost,
        userLogin,
        setUserLogin,
        userName,
        setUserName,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};
const useStateContext = () => {
  return useContext(StateContext);
};
export { StateProvider, StateContext, useStateContext };
