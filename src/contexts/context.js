import { createContext, useContext, useReducer } from "react";
import { useState, useEffect } from "react";
import { auth } from "../firebase-config";
import reducer from "../utils/CreatePostRenducer";
import { storage } from "../firebase-config";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import CreatePostReducer from "../utils/CreatePostRenducer";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { getUserInput } from "../utils/firebaseFunction";
const StateContext = createContext();
const initialState = {
  blogData: null,
};
const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(CreatePostReducer, initialState);
  const [editPost, setEditPost] = useState();
  const [userLogin, setUserLogin] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [singlePost, setSinglePost] = useState();
  const [imageUpload, setImageUpload] = useState("");
  //username
  const [userName, setUserName] = useState(null);

  const fetchData = async () => {
    await getUserInput().then((data) => {
      dispatch({ type: "GET_DATA", blogData: data });
    });
  };

  useEffect(() => {
    fetchData();
  }, []);
  const uploadImage = (event) => {
    const imageFile = event.target.files[0];

    const storageRef = ref(storage, `Images/${Date.now()}/${imageFile.name}`);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        switch (snapshot.state) {
          case "paused":
            toast.info("Upload is Paused!");
            break;
          case "running":
            toast.warning("Waiting for Image Upload!!");
            break;
        }
      },
      (error) => {
        console.log("Error", error);
        toast.error("Error... Try Again!");
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageUpload(downloadURL);
          toast.success("Image Uploaded Successfully!");
        });
      }
    );
  };

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      console.log(user);
      if (user) {
        setUserName(user.displayName);
      } else setUserName("");
    });
  }, []);
  // local storage
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
        ...state,
        dispatch,
        editPost,
        setEditPost,
        userLogin,
        setUserLogin,
        userName,
        setUserName,
        isAuth,
        setIsAuth,
        singlePost,
        setSinglePost,
        reducer,
        imageUpload,
        setImageUpload,
        uploadImage,
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
