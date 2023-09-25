import React from "react";
import { useState, useEffect } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db, auth } from "../firebase-config";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useStateContext } from "../contexts/context";
import "react-toastify/dist/ReactToastify.css";
import { storage } from "../firebase-config";
import { ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import "./style/CreatePost.css";
function CreatePost({ isAuth }) {
  const [title, setTitle] = useState("");
  const [postText, setPostText] = useState("");
  const { imageUpload, setImageUpload, uploadImage, dispatch } =
    useStateContext();
  const postsCollectionRef = collection(db, "posts");
  let navigate = useNavigate();
  const createPost = async () => {
    if ((title && postText) || imageUpload)
      await addDoc(postsCollectionRef, {
        title,
        postText,
        imageUpload,
        author: {
          name: auth.currentUser.displayName,
          id: auth.currentUser.uid,
        },
      });

    navigate("/");
    toast.success("create successfully");
  };
  // useEffect(() => {
  //   if (!isAuth) {
  //   }
  // }, []);
  return (
    <div className="create">
      <div className="cpContainer">
        <h1>Create A Post</h1>
        <div className="inputGp">
          <label> Title:</label>
          <input
            placeholder="Title..."
            onChange={(event) => {
              setTitle(event.target.value);
            }}
          />
        </div>
        <div className="inputGp">
          <label> Post:</label>
          <textarea
            placeholder="Post..."
            onChange={(event) => {
              setPostText(event.target.value);
            }}
          />
        </div>
        <div className="createPost-from-img">
          <input
            type="file"
            name="image"
            className="image"
            accept="image/*"
            onChange={(event) => {
              uploadImage(event);
            }}
            required
          />
        </div>
        <button onClick={createPost}> Submit Post</button>
      </div>
      <ToastContainer />
    </div>
  );
}

export default CreatePost;
