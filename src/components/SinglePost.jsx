import React from "react";
import { useParams } from "react-router";
import  { Button } from '@mui/material';
import { deletePost } from "../axios-services/posts";



export default function SinglePost({singlePost, navigate, setEditPost}) {
    const { postId } = useParams();
    console.log(postId)
    console.log(singlePost)
    return (<>

  <h1>Single Post</h1>
    <h2>{singlePost.title}</h2>
    <p>{singlePost.content}</p>

    <Button onClick ={ () => {
                   deletePost(postId)
                    navigate(`/posts`)
                }}>Delete Post</Button>

    <Button onClick ={ () => {
                    setEditPost(singlePost)
                    navigate(`/edit-post/${postId}`)
                }
                }>Edit Post</Button>
   </> )
}