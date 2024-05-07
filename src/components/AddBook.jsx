import React, { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { newBook } from "../axios-services/books";




  function AddBook({navigate}) {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [year, setYear] = useState('');
    const [imageurl, setImageUrl] = useState('');

    async function handleSubmit(ev) {
        ev.preventDefault()
        try {
            const bookData = { title, author, year, imageurl }
            const newBookData = await newBook(bookData);
            console.log(newBookData);
            navigate('/books')
        } catch (error) {
            console.log('Error in handleSubmit function');
            console.error(error);
        }
    }

    return (
    <>  
      
      <Container>
    <form onSubmit={handleSubmit}>
      <Form.Label htmlFor="inputTitle">Title</Form.Label>
      <Form.Control
        type="text"
        placeholder="Title"
        id="inputTitle"
        aria-describedby="titleHelpBlock"
        onChange={(ev)=> setTitle(ev.target.value)}
      />
     
      <Form.Label htmlFor="inputAuthor">Author</Form.Label>
      <Form.Control
      as="textarea"
        type="text"
        placeholder="Author"
        id="inputAuthor"
        aria-describedby="authorHelpBlock"
        onChange={(ev)=> setAuthor(ev.target.value)}  
      />
      <Form.Label htmlFor="inputYear">Year</Form.Label>
      <Form.Control
      as="textarea"
        type="text"
        placeholder="Year"
        id="inputYear"
        aria-describedby="yearHelpBlock"
        onChange={(ev)=> setYear(ev.target.value)}  
      />
      <Form.Label htmlFor="inputImageUrl">Image Url</Form.Label>
      <Form.Control
      as="textarea"
        type="text"
        placeholder="Add Image Url"
        id="inputImageUrl"
        aria-describedby="contentHelpBlock"
        onChange={(ev)=> setImageUrl(ev.target.value)}  
      />
      
      
      <Button type="submit" className="mt-3" variant="primary" size="sm">Add Book</Button>
      </form>
    </Container>

      
      
   </>
    );
}

export default AddBook;