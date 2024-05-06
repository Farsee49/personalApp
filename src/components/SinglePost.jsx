import React from "react";
import { useParams } from "react-router";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { deletePost } from "../axios-services/posts";



export default function SinglePost({singlePost, navigate, setEditPost}) {
    const { postId } = useParams();
    console.log(postId)
    console.log(singlePost)
   

  return (<>
     <Card className="mt-5 ms-5 me-5" style={{ width: 'auto' }}>
      <Card.Body>
        <Card.Title>{singlePost.title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
        <Card.Text>
       {singlePost.content}
        </Card.Text>
        {/* <Card.Link href="#">Card Link</Card.Link>
        <Card.Link href="#">Another Link</Card.Link> */}
          <Button variant="primary" size="sm" onClick ={ () => {
                    deletePost(postId)
                     navigate(`/posts`)
                 }}>Delete Post</Button>

          <Button className="ms-3" variant="primary" size="sm" onClick ={ () => {
                setEditPost(singlePost)
                navigate(`/edit-post/${postId}`)
           } }>Edit Post</Button>

      </Card.Body>
    </Card>
  </> )
 }  
 
 //<h1>Single Post</h1>
  //   <h2>{singlePost.title}</h2>
  //   <p>{singlePost.content}</p>

  //   <Button onClick ={ () => {
  //                  deletePost(postId)
  //                   navigate(`/posts`)
  //               }}>Delete Post</Button>

  //   <Button onClick ={ () => {
  //                   setEditPost(singlePost)
  //                   navigate(`/edit-post/${postId}`)
  //               }
  //               }>Edit Post</Button>
  

//   <div class="row">
//   <div class="col-6 offset-3">
//   <div class="card mt-5 mb-3 text-center" >
          
//           <div class="card-body">
//             <h5 class="card-title ">{singlePost.title}</h5>
//             <p class="card-text">{singlePost.content}</p>
//           </div>
//           <div class="card-body">
//              <button onClick ={ () => {
//              deletePost(postId)
//               navigate(`/posts`)
//           }}>Delete Post</button>

//             <button onClick ={ () => {
//                setEditPost(singlePost)
//                navigate(`/edit-post/${postId}`)
//            } }>Edit Post</button>
          
           
//           </div>
          
//         </div>

//   </div>
// </div>