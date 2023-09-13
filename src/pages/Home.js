import React, { useEffect, useState } from "react";
import {
  getDocs,
  collection,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { Link } from "react-router-dom";
import { db, auth } from "../firebase-config";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { Navigate, useNavigate } from "react-router-dom";
import userLogo from "../image/images (1).jpg";
import { FaEdit } from "react-icons/fa";
import "./style/Home.css";

import { useStateContext } from "../contexts/context";

function Home(isAuth) {
  const [postLists, setPostList] = useState([]);
  const [error, setError] = useState();
  const postsCollectionRef = collection(db, "posts");
  const Navigate = useNavigate();
  const [name, setName] = useState("");
  const { setEditPost } = useStateContext();
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
    const postDoc = doc(db, "posts", id);
    await deleteDoc(postDoc);
  };
  const updateposts = (posts) => {
    // const postDoc = doc(db, "posts", id);
    // try {
    //   await updateDoc(postDoc);
    // } catch (err) {
    //   setError(err.message);
    // }
    setEditPost(posts);

    Navigate("/edit");
    console.log();
  };

  return (
    <>
      <div className="back-hd">
        <div className="home-hd">
          <h6 className="usernav"></h6>

          {/* <section className="name">{name}</section> */}
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
                {/* <div className="deletepost">
                {isAuth && posts.author.id === auth.currentUser.uid && (
                  <button
                    onClick={() => {
                      deletepost(posts.id);
                    }}
                  >
                    {''}
                    &#128465;
                    
                  </button>
                )}
              </div> */}
                <div className="deletepost">
                  {/* {isAuth && postLists.author.id === auth.currentUser.uid && ( */}
                  <button
                    onClick={() => {
                      deletepost(posts);
                    }}
                  >
                    {""}
                    &#128465;
                  </button>
                </div>
                <div className="update-btn">
                  <button
                    onClick={() => {
                      updateposts(posts);
                    }}
                  >
                    <FaEdit />
                  </button>
                </div>

                <div className="postTextContainer">{posts.postText}</div>
                <h3>@{posts.author.name}</h3>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Home;
