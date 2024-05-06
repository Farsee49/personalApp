import React, { Fragment, useState, useEffect} from "react";
//import { Link } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import {   getAllPosts } from "../axios-services/posts";
import Skeleton from '@mui/material/Skeleton';




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
                const response =  await getAllPosts(posts);
                console.log(response.data);
                setPosts(response.data.posts);
            } catch (error) {
                console.log('Error in getPosts function');
                console.error(error);
            }
        }
        
        navigate('/posts')
        getPosts(posts);
    },[setPosts])
    
    function PostTitle({ title }) {
        return <h2 class="text-center">{title}</h2>;
      }
      
      function PostBody({ body }) {
        return <p class="text-center">{body}</p>;
      }
    
//console.log(posts)

    return(<>19
        
            <h1>Posts</h1>
            {posts.map(post =>
                <Fragment key={post.id}>
    <Card id="postcard1" className="mt-5 ms-5 me-5" style={{ width: 'auto' }}>
      <Card.Body>
        <Card.Title><PostTitle title={post.title} />Post</Card.Title>
        {/* <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle> */}
        <Card.Text>
        <PostBody body={post.content} />
        </Card.Text>
        {/* <Card.Link href="#">Card Link</Card.Link>
        <Card.Link href="#">Another Link</Card.Link> */}
        <Button variant="primary" size="sm" onClick ={ () => {
                                setSinglePost(post)
                                     navigate(`/single-post/${post.id}`)
                                 }}>SinglePost</Button>
      </Card.Body>
    </Card>
   </Fragment>)}
            </> )
}



