module.exports = {
    ...require('./client'), // adds key/values from users.js
    ...require('./users'), // adds key/values from users.js
  ...require('./posts'), // adds key/values from activites.js
    
  }