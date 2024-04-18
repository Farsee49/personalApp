import React, {useState} from "react"; 
import { updatePost } from "../axios-services/posts";
import { Button, TextField } from '@mui/material';





export default function EditPost({editPost, navigate}) {
    const [newTitle, setNewTitle] = useState('');
    const [newContent, setNewContent] = useState('');

    async function handleSubmit(ev) {
        ev.preventDefault();
        try {
            console.log(9900)
            console.log(editPost.id)
            console.log(newTitle)
            console.log(newContent)
             let postId = editPost.id;
             console.log(postId)

            const editData = {
                title: newTitle,
                content: newContent
            };
            console.log(editData)

            const newData = await updatePost(postId, editData);
            console.log(newData);
            navigate('/posts')
            
        } catch (error) {
            console.log('Error in handleSubmit function');
            console.error(error);
        }
    }

    //console.log(editPost)
    return (<>
        <div>
            <h1>Edit Post</h1>
        </div>
       
    <section>
        
        <h2>{editPost.title}</h2>
        <form onSubmit={handleSubmit}>
        <TextField id="string"  variant="outlined"
            type ='text'
            placeholder={editPost.title}
            onChange={(ev)=> setNewTitle(ev.target.value)}
          />
        <TextField id="string" multiline="true"  variant="outlined"
            type ='text'
            placeholder={editPost.content}
            onChange={(ev)=> setNewContent(ev.target.value)}
          />
       
            <Button  type='submit' variant='contained'size='small'>SUBMIT</Button>
        </form>
    </section>



    </>)
}
