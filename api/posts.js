const express = require("express");
const postsRouter = express.Router();
const {requireUser} = require('./utils')
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;
const bcrypt = require('bcrypt');
const bodyParser = require("body-parser"); 


const {
    createPost,
    getAllPosts
    } = require('../db');





postsRouter.use(bodyParser.json());
postsRouter.use( (req, res, next) => {
  console.log("A request is being made to /posts");
//  res.send('A request is being made to /posts');
  next(); 
});


// POST /api/posts

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


module.exports = postsRouter;