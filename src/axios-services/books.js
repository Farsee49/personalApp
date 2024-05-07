import axios from "axios";










//===========================AXIOS OPERATIONS FOR BOOKS=========================


//_________________________CREATE BOOK_________________________

export async function newBook(bookData) {
    console.log('axios',bookData)

    const bookUrl = `http://localhost:3000/api/books`;

    try{
    const response = await axios.post(bookUrl, bookData);
    console.log('Book successful', response.data);
    return response;
    } catch (error) {
        console.error(error);
    }
}


//_________________________GET ALL BOOKS_________________________

export async function getAllBooks () {

    const bookUrl = `http://localhost:3000/api/books`;

    try{
        const response = await axios.get(bookUrl);
        console.log('All Books', response.data);
        return response;
    } catch (error) {
        console.error(error);
    }
}


//_________________________GET BOOK BY ID_________________________

export async function getBookById (bookId) {
    const bookUrl = `http://localhost:3000/api/books/${bookId}`;
    
    try{
        const response = await axios.get(bookUrl);
        console.log('Book by Id', response.data);
        return response;
    } catch (error) {
        console.error(error);
    }
}

//__________________________UPDATE BOOK_________________________

export async function updateBook (bookId, editData   ) {
    console.log(bookId)
    
    const bookUrl = `http://localhost:3000/api/books/${bookId}`;
    
    try{
        const response = await axios.patch(bookUrl, editData);
        console.log('Book updated', response.data);
        return response;
    } catch (error) {
        console.error(error);
    }
}

//__________________________DELETE BOOK_________________________

export async function deleteBook (bookId) {
    console.log(bookId)
    
    const bookUrl = `http://localhost:3000/api/books/${bookId}`;
    
    try{
        const response = await axios.delete(bookUrl);
        console.log('Book deleted', response.data);
        return response;
    } catch (error) {
        console.error(error);
    }
}