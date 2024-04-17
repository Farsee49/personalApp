import React, { Fragment, useState, useEffect} from "react";
import { Button, TextField } from '@mui/material';
import {  newPost, getAllPosts } from "../axios-services/posts";





 


export default function Posts({user, navigate}) {
    const [content, setContent] = useState('');
    const [posts, setPosts] = useState([]);
    const [title, setTitle] = useState('');
    //const [userId, setUserId] = useState('');
   
    // console.log(user.id)
    


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




    async function handleSubmit(ev,getPosts) {
        
        ev.preventDefault()
        try {
            console.log(9900)
            let authorId = user.id;
            console.log(authorId)
             console.log(title)
             console.log(content)
            const postData = { authorId, title, content }
           
           const nPost = await newPost(postData);
              console.log(nPost);
              getPosts(posts);
              navigate('/posts')
                // setCreatedPost([nPost.data]);
                // setUserId(user.id)
    
        
      } catch (error) {
          console.log('Error in handleSubmit function');
          console.error(error);
      }
    }
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
    }
    ,[]) 
    
    function PostTitle({ title }) {
        return <h1>{title}</h1>;
      }
      
      function PostBody({ body }) {
        return <p>{body}</p>;
      }
    
//console.log(posts)

    return(<>
        <div>
            <h1>Posts</h1>
            <ul>
                {/* {posts&&posts.map(post => (<> 
                    
                    <Fragment key={post.id}><h1>{post.title}</h1></Fragment>
                     <FR> key={post.id}>{post.content}{console.log(post)}{post.userId}</li>
                   </>
                ))} */}
            </ul>
            {posts.map(post =>
    <Fragment key={post.id}>
      <PostTitle title={post.title} />
      <PostBody body={post.content} />
    </Fragment>
  )};
            

        </div>
    <section>
        <h1>Create a post</h1>
        <form onSubmit={handleSubmit}>
        <TextField id="string"  variant="outlined"
            type ='text'
            placeholder="Title"
            onChange={(ev)=> setTitle(ev.target.value)}
          />
        <TextField id="string" multiline="true"  variant="outlined"
            type ='text'
            placeholder="Create a post"
            onChange={(ev)=> setContent(ev.target.value)}
          />
       
            <Button  type='submit' variant='contained'size='small'>SUBMIT</Button>
        </form>
    </section>
    
   </> )
}




