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
    } = require('../db/posts');


//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

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

postsRouter.patch('/:postId',  async (req, res, next) => {
  const { postId } = req.params;
  console.log('postId api patch:',postId);
 
 try {
  const { title, content } = req.body;
  const updateFields = {postId};

  // if (postId) {
  //   updateFields.id = postId;
  // }
  if (title) {
    updateFields.title = title;
  }
  if (content) {
    updateFields.content = content;
  }

  // const post = await getPostById(postId);
  // const activityByName = await getActivityByName(name);

  // if (!activityById) {
  //   res.send({
  //     error: 'ActivityDoesNotExists',
  //     name: 'Activity does not exists',
  //     message: ActivityNotFoundError(activityId),
  //   });
  // } else if (activityByName) {
  //   res.send({
  //     error: 'ActivityAlreadyExists',
  //     name: 'Activity already exists',
  //     message: ActivityExistsError(activityByName.name),
  //   });
  // } else {
    const updatedPost = await updatePost(updateFields);
    res.send(updatedPost);
  // }
} catch ({ name, message }) {
  next({ name, message });
}
});

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// DELETE /api/posts/:postId == delete a post

postsRouter.delete('/:postId', async (req, res, next) => {
    const { postId } = req.params;
    //console.log(postId);
    try {
        const post = await getPostById(postId);
        console.log(post)
        if (post) {
            const deletedPost = await deletePost(postId);
            res.send( {
          deletedPost,      message: 'Post deleted!',          
        });
        
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