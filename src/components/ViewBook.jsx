
import React, {  } from "react";
import { Button } from "react-bootstrap";



import Card from 'react-bootstrap/Card';

function BookTitle({ title }) {
  return <h2 className="text-center">{title}</h2>;
  }

  function BookImg({ imageurl }) {
      return <img id="bookCardImg" className="text-center mb-2" src={imageurl} alt="book cover" />;
      }

function ViewBook({ singleBook}) {
  return (
    <Card id="booksCard" className="mt-5 ms-5 me-5" style={{ width: 'auto' }}>
    <Card.Body> 
      <Card.Title><BookTitle title={singleBook.title}/></Card.Title>
  
     <BookImg imageurl={singleBook.imageurl} />
      <Card.Subtitle className="mb-2 text-muted">{singleBook.author}</Card.Subtitle>
      <Card.Subtitle className="mb-2 text-muted">{singleBook.year}</Card.Subtitle>
      
      <Button variant="primary" size="sm" onClick ={ () => {
                              // setSingleBook(book)
                              //      navigate(`/view-book/${book.id}`)
                               }}>Book</Button>
    </Card.Body>
  </Card>
  );
}

export default ViewBook;