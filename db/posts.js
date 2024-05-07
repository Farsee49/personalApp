const { post } = require('../api/users');
const client = require('./client');




//==================Create Post==================
async function createPost({
    authorId,
    title,
    content,
    tags = []
  }) {
    try {
      const { rows: [ post ] } = await client.query(`
        INSERT INTO posts("authorId", title, content) 
        VALUES($1, $2, $3)
        RETURNING *;
      `, [authorId, title, content]);
  
        return post;
    } catch (error) {
      throw error;
    }
  };

//==================Get All Posts==================
const getAllPosts = async () => {
    try {
        const { rows: posts } = await client.query(`
        SELECT *
        FROM posts
        WHERE active=true;
        `);
    
        return posts;
    } catch (error) {
        console.error('ERROR Getting Posts!!!',error);
        throw error;
    }
    };

//==================Get Post by Id==================
const getPostById = async (postId) => {
    console.log(postId)
    try {
        const { rows: [ post ] } = await client.query(`
        SELECT *
        FROM posts
        WHERE id=$1;
        `, [postId]);
    
        return post;
    } catch (error) {
        console.error('ERROR Getting Post by Id!!!',error);
        throw error;
    }
    };
//==================Get Posts by User==================
    const getPostsByUser = async (userId) => {
    try {
        const { rows: posts } = await client.query(`
        SELECT *
        FROM posts
        WHERE "userId"=$1;
        `, [userId]);
    
        return posts;
    } catch (error) {
        console.error('ERROR Getting Posts by User!!!',error);
        throw error;
   }
};

//==================Update Post==================
async function updatePost({postId, ...fields}) {
    console.log("updatePost db:",postId)
    console.log('fields:', fields)
    const setString = Object.keys(fields).map(
      (key, index) => `"${key}"=$${index + 1}`
      ).join(',') 
      try {
      if (setString.length > 0)
        {
        console.log('setString:', setString)
        await client.query(`
        UPDATE posts
        SET ${setString}
        WHERE id = ${postId}
        RETURNING *;
        `, Object.values(fields)) 
      }
   
       return await getPostById(postId)
    }catch(error){
      console.error('ERROR Updating Post at database updatePost!!!',error);
      throw error;
    }
  };

//==================Delete Post==================
const deletePost = async (postId) => {
    try {
        const { rows: [ post ] } = await client.query(`
        DELETE FROM posts
        WHERE id=$1
        RETURNING *;
        `, [postId]);
    
        return post;
    } catch (error) {
        console.error('ERROR Deleting Post!!!',error);
            throw error;
    } 
};

//==================Export Module==================

    module.exports = {
        createPost,
        getAllPosts,
        getPostById,
        updatePost,
        getPostsByUser,
        deletePost
    };