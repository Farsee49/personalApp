import React, { Fragment, useEffect } from "react";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { getAllBooks } from "../axios-services/books";









export default function Books({ books, setBooks, navigate, setSingleBook}) {



useEffect(() => {
    const getBooks = async () => {
        try {
            const response =  await getAllBooks();
            console.log(response.data);
            setBooks(response.data.books);
        } catch (error) {
            console.log('Error in getBooks function');
            console.error(error);
        }
    }
    getBooks();
}
,[])

   function BookTitle({ title }) {
    return <h2 className="text-center">{title}</h2>;
    }

    function BookImg({ imageurl }) {
        return <img id="bookCardImg" className="text-center mb-2" src={imageurl} alt="book cover" />;
        }



  return (
    <>

    {books.map(book =>
        <Fragment key={book.id}>
    <Card id="booksCard" className="mt-5 ms-5 me-5" style={{ width: 'auto' }}>
      <Card.Body> 
        <Card.Title><BookTitle title={book.title}/></Card.Title>
    
       <BookImg imageurl={book.imageurl} />
        <Card.Subtitle className="mb-2 text-muted">{book.author}</Card.Subtitle>
        <Card.Subtitle className="mb-2 text-muted">{book.year}</Card.Subtitle>
        
        <Button variant="primary" size="sm" onClick ={ () => {
                                setSingleBook(book)
                                     navigate(`/view-book/${book.id}`)
                                 }}>Book</Button>
      </Card.Body>
    </Card>
    </Fragment>
    )}
 </>
  );
}

