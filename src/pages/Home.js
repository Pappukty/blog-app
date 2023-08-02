import React,{useEffect,useState} from 'react';
import {getDocs,collection,deleteDoc,doc} from 'firebase/firestore';
import{db,auth} from '../firebase-config';


function Home  ( {isAuth} ) {
const [postLists,setPostList]=useState([]);
const postsCollectionRef = collection(db,'posts')

useEffect(()=>{
const getPosts = async () => {
const data = await getDocs(postsCollectionRef);
setPostList(data.docs.map((doc)=>({...doc.data(),id:doc.id})));

};
getPosts();
});
 const deletepost = async(id) =>{
  const postDoc =doc(db,'posts',id)
await deleteDoc(postDoc)
 }
  return (
<div className='homepage'>
      {postLists.map((posts)=>{
      return<div className='post'>
        {''}
        <div className='postHeader'>
          {''}
          <div className='title'><h1>{posts.title}</h1></div>
        </div>
        <div className='deletepost'>
        {isAuth && posts.author.id === auth.currentUser.uid &&(<button onClick={()=> {deletepost(posts .id)}}>&#128465;</button>
        ) }
        </div>
        <div className='postTextContainer'>{posts.postText}</div>
        {/* <h3>@{posts.author.name}</h3> */}
      </div>
    })}
      </div>
  );
    
  
}

export default Home
