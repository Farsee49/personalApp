
const client = require('./client');


// require in the database adapter functions as you write them (createUser, createActivity...)
const { 
    createUser,
    createPost,
    createBook
   } = require('./');

   async function dropTables() {
    try{
        console.log('STARTING TO DROP TABLES....');

        await client.query(`
        DROP TABLE IF EXISTS books;
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
                password VARCHAR(255) ,
                name VARCHAR(255) NOT NULL,
                location VARCHAR(255) NOT NULL
                 );
            
            CREATE TABLE posts (
                id SERIAL PRIMARY KEY,
                "authorId" INTEGER REFERENCES users(id),
                title VARCHAR(255) NOT NULL,
                content TEXT NOT NULL,
                active BOOLEAN DEFAULT true
            );

            CREATE TABLE books (
                id SERIAL PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                author VARCHAR(255) NOT NULL,
                year INTEGER,
                imageurl TEXT 
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
            { authorId: 1, title: "First Post", content: "This is my first post. I hope I love it."},
            { authorId: 2, title: "Second Post", content: "This is my second post. I hope I love it."},
            { authorId: 3, title: "Third Post", content: "This is my third post. I hope I love it."}
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


      async function createInitialBooks() {
        console.log("Starting to create books...")
        try {
          const booksToCreate = [
            { title: "The Great Gatsby", author: "F. Scott Fitzgerald", year: 1925, imageurl: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1353640223i/16165773.jpg"},
            { title: "To Kill a Mockingbird", author: "Harper Lee", year: 1960, imageurl: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1522356687i/38359009.jpg"},
            { title: "The Catcher in the Rye", author: "J.D. Salinger", year: 1951, imageurl: "https://cdn.britannica.com/94/181394-050-2F76F7EE/Reproduction-cover-edition-The-Catcher-in-the.jpg"}
          ]
          const books = await Promise.all(booksToCreate.map(createBook))

          console.log("Books created:")
          console.log(books)
          console.log("Finished creating books!")
        } catch (error) {
          console.error("Error creating books!")
          throw error
        }
      }


        async function rebuildDB() {
          console.log('STARTING TO REBUILD DATABASE....');
            try{
                await dropTables();
                await createTables();
                await createInitialUsers();
                await createInitialPosts();
                await createInitialBooks();
            } catch (error) {
                console.error('ERROR REBUILDING DATABASE!!!', error);
                throw error;
            }
            console.log('FINISHED REBUILDING DATABASE....');
        };

        module.exports = {
            rebuildDB,
            dropTables,
            createTables
        };

