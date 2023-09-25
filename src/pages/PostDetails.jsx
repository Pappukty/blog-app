import React from "react";
import { useState, useEffect } from "react";
import "./style/PostDetails.css";
import { useStateContext } from "../contexts/context";
const PostDetails = () => {
  const { singlePost } = useStateContext();
  console.log(singlePost);

  return (
    <div className="postdetails">
      <div className="post-de">
        <img src={singlePost.imageUpload} className="image-single-post"></img>
        <h3 className="postDetails-title">{singlePost.title}</h3>
        <p className="postDetails-p">{singlePost.postText}</p>
        <h3>@{singlePost.author.name}</h3>
      </div>
    </div>
  );
};

export default PostDetails;
