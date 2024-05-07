 const client = require('./client');







//==================Create Book==================

async function createBook({
    title,
    author,
    year,
    imageurl
  }) {
    try {
      const { rows: [ book ] } = await client.query(`
        INSERT INTO books(title, author, year, imageurl) 
        VALUES($1, $2, $3, $4)
        RETURNING *;
      `, [title, author, year, imageurl]);
  
        return book;
    } catch (error) {
      throw error;
    }
  }

//==================Get All Books==================

const getAllBooks = async () => {
    try {
        const { rows: books } = await client.query(`
        SELECT *
        FROM books
        `);
    
        return books;
    } catch (error) {
        console.error('ERROR Getting Books!!!',error);
        throw error;
    }
    }

//==================Get Book by Id==================

const getBookById = async (bookId) => {
    console.log(bookId)
    try {
        const { rows: [ book ] } = await client.query(`
        SELECT *
        FROM books
        WHERE id=$1;
        `, [bookId]);
    
        return book;
    } catch (error) {
        console.error('ERROR Getting Book by Id!!!',error);
        throw error;
    }
    }

//==================Get Books by User==================

const getBooksByUser = async (userId) => {
    try {
        const { rows: books } = await client.query(`
        SELECT *
        FROM books
        WHERE "userId"=$1;
        `, [userId]);
    
        return books;
    } catch (error) {
        console.error('ERROR Getting Books by User!!!',error);
        throw error;
    }
    }

//==================Update Book==================

async function updateBook({bookId, ...fields}) {
    console.log("updateBook db:",bookId)
    console.log('fields:', fields)
    const setString = Object.keys(fields).map(
        (key, index) => `"${ key }"=$${ index + 1 }`
      ).join(', ');
    
      if (setString.length === 0) {
        return;
      }
    
      try {
        const { rows: [ book ] } = await client.query(`
          UPDATE books
          SET ${ setString }
          WHERE id=${ bookId }
          RETURNING *;
        `, Object.values(fields));
    
        return book;
      } catch (error) {
        throw error;
      }
    }

//==================Delete Book==================

async function deleteBook(bookId) {
    try {
        const { rows: [ book ] } = await client.query(`
        DELETE FROM books
        WHERE id=$1
        RETURNING *;
        `, [bookId]);
    
        return book;
    } catch (error) {
        throw error;
    }
    }



//==================Export Module==================

module.exports = {
    createBook,
    getAllBooks,
    getBookById,
    getBooksByUser,
    updateBook,
    deleteBook
    };