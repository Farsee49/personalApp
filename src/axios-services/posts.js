import axios from "axios";





//=============AXIOS OPERATIONS FOR POSTS===================


//_________________________CREATE POST_________________________

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

//_________________________GET ALL POSTS_________________________

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

//_________________________GET POST BY ID_________________________  

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

//__________________________UPDATE POST_________________________

export async function updatePost (postId, editData   ) {
  console.log(postId)
  
  const postUrl = `http://localhost:3000/api/posts/${postId}`;
  
  try{
    console.log('data:', editData)
    const response = await axios.patch(postUrl, editData);
    console.log('Post updated', response.data);
    return response;
  } catch (error) {
    console.error(error);
  }
}

//_________________________GET POSTS BY USER_________________________

export async function getPostsByUser (userId) {
  const postUrl = `http://localhost:3000/api/posts/user/${userId}`;
  
  try{
    const response = await axios.get(postUrl);
    console.log('Posts by User', response.data);
    return response;
  } catch (error) {
    console.error(error);
  }
}

//_________________________DELETE POST_________________________

export async function deletePost (postId) {
  console.log(postId)
  const postUrl = `http://localhost:3000/api/posts/${postId}`;
  
  try{
    const response = await axios.delete(postUrl);
    console.log('Post deleted', response.data);
    return response;
  } catch (error) {
    console.error(error);
  }
}



