const client = require('./client');





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


const getPostById = async (postId) => {
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


const updatePost = async ({ id, content }) => {
    try {
        const { rows: [ post ] } = await client.query(`
        UPDATE posts
        SET content=$2
        WHERE id=$1
        RETURNING *;
        `, [id, content]);
    
        return post;
    } catch (error) {
        console.error('ERROR Updating Post!!!',error);
        throw error;
    }
    };


    module.exports = {
        createPost,
        getAllPosts,
        getPostById,
        updatePost,
        getPostsByUser
    };