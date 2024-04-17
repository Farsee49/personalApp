import React, {useState, useEffect} from "react";
import { Button, TextField } from '@mui/material';
import { newPost, getAllPosts } from "../axios-services/posts";


export default function CreatePost({user, navigate}) {
    const [content, setContent] = useState('');
    const [posts, setPosts] = useState([]);
    const [title, setTitle] = useState('');

    async function handleSubmit(ev) {
        
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
        
        navigate('/createpost')
        getPosts();
    }
    ,[])
    
    
    return (<>
        <div>
            <h1>Create Post</h1>
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



    </>)
}

{/* <Button  type='submit' variant='contained'size='small'  onClick={() => {
              destroyRoutine(id)
               navigate('/userprofile');
              }}>Trash Routine
              </Button> */}