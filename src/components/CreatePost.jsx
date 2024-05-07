import React, {useState, useEffect} from "react";
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
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
                const response =  await getAllPosts(posts);
                console.log(response.data);
                setPosts(response.data.posts);
            } catch (error) {
                console.log('Error in getPosts function');
                console.error(error);
            }
        }
        
        navigate('/createpost')
        getPosts(setPosts);
    }
    ,[])
    
    
    return (<>
        <div>
            <h1>Create Post</h1>
        </div>
       
           
        <Container>
    <form onSubmit={handleSubmit}>
      <Form.Label htmlFor="inputTitle">Title</Form.Label>
      <Form.Control
        type="text"
        placeholder="Title"
        id="inputTitle"
        aria-describedby="titleHelpBlock"
        onChange={(ev)=> setTitle(ev.target.value)}
      />
     
      <Form.Label htmlFor="inputContent">Content</Form.Label>
      <Form.Control
      as="textarea"
        type="text"
        placeholder="Create a post"
        id="inputContent"
        aria-describedby="contentHelpBlock"
        onChange={(ev)=> setContent(ev.target.value)}  
      />
      
      
      <Button type="submit" className="mt-3" variant="primary" size="sm">Create Post</Button>
      </form>
    </Container>

    


    </>)
}

{/* <Button  type='submit' variant='contained'size='small'  onClick={() => {
              destroyRoutine(id)
               navigate('/userprofile');
              }}>Trash Routine
              </Button> */}


        //       <section>
        //       <h1>Create a post</h1>
        //       <form onSubmit={handleSubmit}>
        //       <TextField id="string"  variant="outlined"
        //           type ='text'
        //           placeholder="Title"
        //           onChange={(ev)=> setTitle(ev.target.value)}
        //         />
        //       <TextField id="string" multiline="true"  variant="outlined"
        //           type ='text'
        //           placeholder="Create a post"
        //           onChange={(ev)=> setContent(ev.target.value)}
        //         />
             
        //           <Button  type='submit' variant='contained'size='small'>SUBMIT</Button>
        //       </form>
        //   </section>
                  