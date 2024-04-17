import axios from "axios";




//=============CRUD OPERATIONS FOR POSTS===================

//Create a new post
export async function newPost(postData) {
  const postUrl = "http://localhost:3000/api/posts";
  console.log(postData)
    
  try{
  const response = await axios.post(postUrl, postData);
  console.log('Post successful', response.data);
  return response;
  } catch (error) {
    console.error(error);
  }
}

//Get all posts
export async function getAllPosts () {
  const allPostsUrl = "http://localhost:3000/api/posts";
  
  try{
    const response = await axios.get(allPostsUrl);
    console.log('All Posts', response.data);
    return response;
  } catch (error) {
    console.error(error);
  }
}

//Get post by Id
export async function getPostById (postId) {
  const postUrl = `http://localhost:3000/api/posts/${postId}`;
  
  try{
    const response = await axios.get(postUrl);
    console.log('Post by Id', response.data);
    return response;
  } catch (error) {
    console.error(error);
  }
}



