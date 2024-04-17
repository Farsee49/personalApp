import React, { Fragment, useState, useEffect} from "react";

import {   getAllPosts } from "../axios-services/posts";





 


export default function Posts({user, navigate}) {
    const [posts, setPosts] = useState([]);
   
    //const [userId, setUserId] = useState('');
   
    console.log(user.id)
    


    // async function getPosts() {
    //     try {
    //         const response = await getAllPosts(posts);
    //         //console.log(response.data);
    //         setPosts(response.data.posts);
    //     } catch (error) {
    //         console.log('Error in getPosts function');
    //         console.error(error);
    //     }
        
    // }




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
        return <h1>Title:{title}</h1>;
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
    </Fragment>
    )}
            

      
   </> )
}


