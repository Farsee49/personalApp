const express = require("express");
const postsRouter = express.Router();
const {requireUser} = require('./utils')
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;
const bcrypt = require('bcrypt');
const bodyParser = require("body-parser"); 


const {
    createPost
    } = require('../db');





postsRouter.use(bodyParser.json());
postsRouter.use( (req, res, next) => {
  console.log("A request is being made to /posts");
//  res.send('A request is being made to /posts');
  next(); 
});


// POST /api/posts

postsRouter.post('/',requireUser, async (req, res, next) => {
    const { isPublic, name, goal } = req.body;
   console.log(req.user);
   //console.log(user)
    // if (!user) {
    //   res.send({
    //     error: 'No user found',
    //     message: UnauthorizedError(),
    //     name: 'Unauthorized Error'
    //   })
    // }
    // try {
    //   const newRoutine = await cre({
    //     creatorId: req.user.id, 
    //     isPublic: isPublic,
    //     name: name,
    //     goal: goal
    //   });
    //   res.send(newRoutine);
    // }catch ({name, message}) {
    //   next({name, message})
    // }
  });



module.exports = postsRouter;