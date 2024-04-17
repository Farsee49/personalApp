import React from "react";



export default function SinglePost({singlePost}) {
    console.log(singlePost)
    return (<>

  <h1>Single Post</h1>
    <h2>{singlePost.title}</h2>
    <p>{singlePost.content}</p>
   </> )
}