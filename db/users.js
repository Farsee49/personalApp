
const client = require("./client");
const bcrypt = require("bcrypt");
// database functions

// user functions
async function createUser({ username, password, name, location}) {
  const SALT_COUNT = 10;

  const hashedPwd = await bcrypt.hash(password, SALT_COUNT)
  try {
      const { rows: [ user ]} = await client.query(`
      INSERT INTO users(username, password, name, location)
      VALUES($1, $2, $3, $4)
      ON CONFLICT (username) DO NOTHING
      RETURNING *;
      `, [username, hashedPwd, name, location]);

      delete user.password; 
     //console.log(result)
      return user;
  } catch (error) {
    console.error('ERROR Creating User!!!',error);
      throw error;
  }
};

async function getUser({ username, password }) {
  try {
    const user = await getUserByUsername(username);
    // const hashedPwd = user.password;
    // const passwordsMatch = await bcrypt.compare(password, hashedPwd);
    if (user.password) {
    delete user.password;
      return user;
    }
  } catch (error) {
    console.error('ERROR Getting User!!!',error);
    throw error;
  }
}

async function getUserById(userId) {
  try {
    const { rows: [ user ] } = await client.query(`
    SELECT *
    FROM users
    WHERE id = $1;
  `, [userId]);

  delete user.password;
  //console.log(result) 
    return user
  } catch (error) {
    console.error('ERROR Getting User by Id!!!',error);
      throw error;
  }
};

async function getUserByUsername(username) {
  try {
    const { rows: [ user ] } = await client.query(`
        SELECT *
        FROM users
        WHERE username=$1;
    `, [username]);

//console.log(result)
  return user;
} catch (error) {
    console.error('ERROR Getting User by Username!!!',error)
  throw error;
}
};

async function getAllUsers(users) {
  try {
    const { rows } = await client.query(`
    SELECT *
    FROM users;
    `);

    return rows;
  } catch (error) {
    console.error('ERROR Getting All Users!!!',error);
    throw error;
  }
};

async function deleteUser(id) {
  try {
    const { rows: [ user ] } = await client.query(`
    DELETE FROM users
    WHERE id=$1
    RETURNING *;
    `, [id]);

    //console.log(result)
    return user;
  } catch (error) {
    console.error('ERROR Deleting User!!!',error);
    throw error;
  }
};

module.exports = {
  createUser,
  getUser,
  getUserById,
  getUserByUsername,
  deleteUser,
  getAllUsers
};
