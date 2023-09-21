import React, { useEffect, useState } from "react";
import {
  getDocs,
  collection,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { Link } from "react-router-dom";
import { FaBookReader } from "react-icons/fa";
import { db, auth } from "../firebase-config";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { Navigate, useNavigate } from "react-router-dom";
import { AiFillDelete } from "react-icons/ai";
import userLogo from "../image/images (1).jpg";
import { FaEdit } from "react-icons/fa";
import "./style/Home.css";
import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import { useStateContext } from "../contexts/context";

function Home(isAuth) {
  const [postLists, setPostList] = useState([]);
  const [error, setError] = useState();
  const postsCollectionRef = collection(db, "posts");
  const Navigate = useNavigate();
  const [name, setName] = useState("");
  const { setEditPost, setSinglePost } = useStateContext();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        setName(`wellcome${uid}`);
      } else {
        console.log("user is logout");
      }
    });
  }, []);
  const handelLogout = async () => {
    await signOut(auth)
      .then(() => {
        setName(`signed  out successfully`);
        Navigate("/");
      })
      .catch((err) => console.log(err.message));
  };
  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(postsCollectionRef);
      setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getPosts();
  }, []);

  const deletepost = async (id) => {
    try {
      const postDoc = doc(db, "posts", id);
      await deleteDoc(postDoc);
      toast.success("Blog Deleted SuccessFully !");
    } catch (error) {
      console.log(error);
    }
  };

  const updateposts = (posts) => {
    setEditPost(posts);

    Navigate("/edit");
    console.log(posts);
  };
  const handelClickPost = (posts) => {
    // Navigate(`/post/${posts.id}`, { state: posts });
    console.log(posts);
    setSinglePost(posts);
    Navigate("/postdetails");
  };

  return (
    <>
      <div className="home">
        <div className="welcome">
          <h1>
            <span> welcome to blog</span> <FaBookReader className="book" />
          </h1>
        </div>
      </div>

      <div className="homepage">
        {/* <h2>{props.name ? `welcome-${props.name}` : "Login place"} </h2> */}
        {postLists.map((posts) => {
          return (
            <div className="post">
              {""}
              <div className="postHeader" key={posts.id}>
                {""}

                <div className="title">
                  <h1>{posts.title}</h1>
                </div>
              </div>

              <div className="btn-container">
                {/* {isAuth && postLists.author.id === auth.currentUser.uid && ( */}
                <button
                  className="delete-btn"
                  onClick={() => {
                    deletepost(posts.id);
                  }}
                >
                  {""}
                  &#128465;
                  {/* <AiFillDelete /> */}
                </button>

                <div>
                  <button
                    className="update-btn"
                    onClick={() => {
                      updateposts(posts);
                    }}
                  >
                    <FaEdit />
                  </button>
                </div>
              </div>

              <div className="postTextContainer">{posts.postText}</div>
              {/* <h3>@{posts.author.name}</h3> */}
              {<h3>@{posts.author.name}</h3>}
              <div className="read">
                <span
                  className="read-post"
                  onClick={() => {
                    handelClickPost(posts);
                  }}
                >
                  Readmore
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Home;
