import React, { Fragment, useState, useEffect} from "react";
//import { Link } from "react-router-dom";
import  { Button } from '@mui/material';
import {   getAllPosts } from "../axios-services/posts";




export default function Posts({
    user,
    navigate,
    singlePost,
   setSinglePost
    }) {
    const [posts, setPosts] = useState([]);
   
    
   
    console.log(user.id)
    console.log(singlePost)

    useEffect(() => {
        
        const getPosts = async () => {
            try {
                const response = await getAllPosts(posts);
                console.log(response.data);
                setPosts(response.data.posts);
            } catch (error) {
                console.log('Error in getPosts function');
                console.error(error);
            }
        }
        
        navigate('/posts')
        getPosts();
    },[])
    
    function PostTitle({ title }) {
        return <h2>Title:{title}</h2>;
      }
      
      function PostBody({ body }) {
        return <p>{body}</p>;
      }
    
//console.log(posts)

    return(<>
        
            <h1>Posts</h1>
           
    {posts.map(post =>
    <Fragment key={post.id}>
      <PostTitle title={post.title} />
      <PostBody body={post.content} />
     <Button onClick ={ () => {
            setSinglePost(post)
            navigate(`/single-post/${post.id}`)
     }}>SinglePost</Button>
    </Fragment>
    )}
            
  
   </> )
}


