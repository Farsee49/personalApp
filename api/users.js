

/* eslint-disable no-useless-catch */

const express = require("express");
const usersRouter = express.Router();
const { requireUser } = require('./utils')
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;
const bcrypt = require('bcrypt');
const bodyParser = require("body-parser"); 
const { 
  createUser,
  getUserByUsername,
  getUser,
  getUserById,
  getAllUsers,
  deleteUser
} = require('../db');

// const { UserTakenError, 
//   PasswordTooShortError,
//   UnauthorizedError 
//   } = require('../errors');
 
 
usersRouter.use(bodyParser.json());
usersRouter.use((req, res, next) => {
  console.log("A request is being made to /users");

  next(); 
});



//=====================================================================
// POST /api/users/register
usersRouter.post('/register', async (req, res, next) => {
  //console.log('AT REGISTER ')
  const { username, password, name, location} = req.body;
    try {
      if (!username || !password || !name || !location) {
        res.send({
          error: 'MissingUsernameOrPasswordORNameORLocation',
          name: 'Missing username or password, name or location',
          message: 'Please enter a username and password, name and location.',
        });
      } else if (password.length < 8) {
        res.send({
          error: 'PasswordTooShort',
          name: 'PasswordTooShort',
          message: PasswordTooShortError(),
        });
      } else {
        const _user = await getUserByUsername(username);
        if (_user) {
        res.send({
            error: 'Username already taken',
            name: 'UsernameAlreadyTaken',
            message: UserTakenError(_user.username),
          });
        } else {
          const user = await createUser({ username, password, name, location});
          if (user) {
            const token = jwt.sign(user, JWT_SECRET);
            res.send({
              name: 'Success Registering!!!',
              message: 'Welcome You are Logged in!!!',
              token,
              user,
            });
        }}
      }
    } catch ({name, message}) {
      next({name, message})
  }
  });

//=====================================================================
// POST /api/users/login
usersRouter.post('/login', async (req, res, next) => {
  const { username, password } = req.body;
  try {
    if (!username || !password) {
      res.send({
        error: 'MissingUsernameOrPassword',
        name: 'Missing username or password',
        message: 'Please enter a username and password.',
      });
    } else {
      const user = await getUser({ username, password });
      if (user) {
        const token = jwt.sign(user, JWT_SECRET);
        res.send({
          name: 'Success Logging In!!!',
          message: 'Welcome You are Logged in!!!',
          token,
          user,
        });
      } else {
        res.send({
          error: 'InvalidCredentials',
          name: 'InvalidCredentials',
          message: 'Username or password is incorrect.',
        });
      }
    }
  } catch ({name, message}) {
    next({name, message})
  }
})

//=====================================================================
// GET /api/users/me
usersRouter.get('/me', async (req, res, next) => {
  const prefix = 'Bearer ';
  const auth = req.header('Authorization');
  //console.log(auth)
    if (!auth) {
      res.status(401).send({
        error: 'Requirements',
        name: 'Login',
        message: UnauthorizedError()
      });

      } else if (auth.startsWith(prefix)) {
        const token = auth.slice(prefix.length);
      try {
        const { id } = jwt.verify(token, JWT_SECRET);
        if (id) {
          username = await getUserById(id);
          res.send(username);
        }
      } catch ({name, message}) {
        next({name, message})
    }
  }
});
//=====================================================================
//GET /api/users
usersRouter.get('/allusers', async (req, res) => {
  try {
    const users = await getAllUsers();
    res.send(users);
  } catch (error) {
    console.error('ERROR Getting Users!!!',error);
    throw error;
  }
});


//=====================================================================
//GET /api/users/:username/routines
// usersRouter.get('/:username/routines', async (req, res, next) => {
//      const {username} = req.params
//      const user = req.user;
//  // console.log(user)
//      const prefix = 'Bearer ';
//      const auth = req.header('Authorization');
//      try {
//       if (user ) {
//       const userPublicRoutines = await getPublicRoutinesByUser({ username });
//       res.send(userPublicRoutines);
//        } 
//     else if (auth.startsWith(prefix)) {
//       const token = auth.slice(prefix.length);
//       const { id } = jwt.verify(token, JWT_SECRET);
//       if (id) {
//         const userAllRoutines = await getAllRoutinesByUser({ username });
//         res.send(userAllRoutines);
//       }
//     }
//   } catch ({name, message}) {
//     next({name, message})
// }
// });


module.exports = usersRouter;