const express = require("express");
const postsRouter = express.Router();
const {requireUser} = require('./utils')
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;
const bcrypt = require('bcrypt');
const bodyParser = require("body-parser"); 


const {
    createPost,
    getAllPosts,
    getPostById,
    updatePost,
    deletePost
    } = require('../db');





postsRouter.use(bodyParser.json());
postsRouter.use( (req, res, next) => {
  console.log("A request is being made to /posts");
//  res.send('A request is being made to /posts');
  next(); 
});

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// POST /api/posts == create a new post

postsRouter.post('/', async (req, res, next) => {
    const { authorId, title, content } = req.body;
    console.log(req.body);
    const postData = req.body;
    
    try {
      const post = await createPost(postData);
      
      if (post) {
        console.log(post);
        res.send({ post });
      } else {
        next({
          name: 'CreatePostError',
          message: 'There was an error creating this post!'
        });
      };
    } catch ({ name, message }) {
      next({ name, message });
    }
  });

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// GET /api/posts == get all posts

  postsRouter.get('/', async (req, res, next) => {
    try {
    const posts = await getAllPosts();
    res.send({
      posts
    });
} catch ({name, message}) {
    next({name, message})
  };
});

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// GET /api/posts/:postId == get a post by id

postsRouter.get('/:postId', async (req, res, next) => {
    const { postId } = req.params;
    try {
        const post = await getPostById(postId);
        res.send(post);
    } catch ({ name, message }) {
        next({ name, message });
    }
    });

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// PATCH /api/posts/:postId == update a post

postsRouter.patch('/:postId', async (req, res, next) => {
    const { postId } = req.params;
    const { content } = req.body;
    try {
        const updatedPost = await updatePost({ id: postId, content });
        res.send(updatedPost);
    } catch ({ name, message }) {
        next({ name, message });
    }
    });


//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// DELETE /api/posts/:postId == delete a post

postsRouter.delete('/:postId', async (req, res, next) => {
    const { postId } = req.params;
    try {
        const post = await getPostById(postId);
        if (post) {
            const updatedPost = await updatePost({ id: postId, active: false });
            res.send(updatedPost);
        } else {
            next({
                name: 'DeletePostError',
                message: 'There was an error deleting this post!'
            });
        }
    } catch ({ name, message }) {
        next({ name, message });
    }
    });


module.exports = postsRouter;