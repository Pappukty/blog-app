import React, { useEffect, useState } from "react";
import { useStateContext } from "../contexts/context";
import "./style/edit.css";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase-config";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import { useNavigate, Link } from "react-router-dom";
const Edit = () => {
  const { editPost } = useStateContext();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [postText, setPostText] = useState("");
  const [modifiedField, setModifiedField] = useState({});

  useEffect(() => {
    setTitle(editPost.title);
    setPostText(editPost.postText);
  }, []);

  const handelSubmit = async () => {
    console.log("ajay");
    const documentRef = doc(db, "posts", editPost.id);
    try {
      await updateDoc(documentRef, modifiedField);
    } catch (err) {
      console.log(err);
      toast.success("Successfully Clear Cart");
    }
    navigate("/");
  };

  const onTitleChange = (e) => {
    setTitle(e.target.value);
    setModifiedField({ ...modifiedField, title: e.target.value });
  };
  const onPostCTextChange = (e) => {
    setPostText(e.target.value);
    setModifiedField({ ...modifiedField, postText: e.target.value });
  };

  return (
    <>
      <div className="createPostPage">
        <Link to="/home">
          {" "}
          <button>home</button>
        </Link>

        <div className="cpContainer">
          <h1>Create A Post</h1>
          <div className="inputGp">
            <label> Title:</label>
            <input
              placeholder="Title..."
              value={title}
              onChange={onTitleChange}
              required
            />
          </div>
          <div className="inputGp">
            <label> Post:</label>
            <textarea
              placeholder="Post..."
              rows="30"
              cols="40"
              value={postText}
              onChange={onPostCTextChange}
              required
            />
          </div>
          <button onClick={handelSubmit}> Edit Post</button>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Edit;
