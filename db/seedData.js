
const client = require('./client');


// require in the database adapter functions as you write them (createUser, createActivity...)
const { 
    createUser,
    createPost
   } = require('./');

   async function dropTables() {
    try{
        console.log('STARTING TO DROP TABLES....');

        await client.query(`
        DROP TABLE IF EXISTS posts;
        DROP TABLE IF EXISTS users;
        `);
        console.log('FINISHED DROPPING TABLES....');
    } catch (error) {
        console.error('ERROR DROPPING TABLES!!!', error);
        throw error;
    }
   };


    async function createTables() {
        try {
            console.log('STARTING TO BUILD TABLES....');

            await client.query(`
            CREATE TABLE users (
                id SERIAL PRIMARY KEY,
                username VARCHAR(255) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                name VARCHAR(255) NOT NULL,
                location VARCHAR(255) NOT NULL
                 );
            
            CREATE TABLE posts (
                id SERIAL PRIMARY KEY,
                "userId" INTEGER REFERENCES users(id),
                content TEXT NOT NULL,
                active BOOLEAN DEFAULT true
            );

            `);
        } catch (error) {
            console.error('ERROR BUILDING TABLES!!!', error);
            throw error;
        }
    };

    async function createInitialUsers() {
        console.log("Starting to create users...")
        try {
          const usersToCreate = [
            { username: "albert1", password: "bertie99", name: "Sam Wiss", location: "Sidney, Australia", isAdmin: false},
            { username: "sandra", password: "sandra123", name: "Sandra Smalls", location: "Buttsuck, Australia", isAdmin: false},   
            { username: "glamgal", password: "glamgal123", name: "Glam Gal", location: "Glam Land, Australia", isAdmin: false},
            { username: "admin", password: "adminadmin", name: "Admin", location: "admin", isAdmin: true}
          ]
          const users = await Promise.all(usersToCreate.map(createUser))
      
          console.log("Users created:")
          console.log(users)
          console.log("Finished creating users!")
        } catch (error) {
          console.error("Error creating users!")
          throw error
        }
      };

      async function createInitialPosts() {
        console.log("Starting to create posts...")
        try {
          const postsToCreate = [
            { userId: 1, content: "I love my new job!", active: true },
            { userId: 2, content: "I love my new job!", active: true },
            { userId: 3, content: "I love my new job!", active: true },
            { userId: 4, content: "I love my new job!", active: true }
          ]
          const posts = await Promise.all(postsToCreate.map(createPost))
      
          console.log("Posts created:")
          console.log(posts)
          console.log("Finished creating posts!")
        } catch (error) {
          console.error("Error creating posts!")
          throw error
        }
    };


        async function rebuildDB() {
            try{
                await dropTables();
                await createTables();
                await createInitialUsers();
                await createInitialPosts();
            } catch (error) {
                console.error('ERROR REBUILDING DATABASE!!!', error);
                throw error;
            }
        };

        module.exports = {
            rebuildDB,
            dropTables,
            createTables
        };

