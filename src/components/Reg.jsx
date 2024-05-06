


import React, { useState } from "react";
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { registerUser } from "../axios-services/users";

export default function Register({setToken, navigate, isAdmin, setIsAdmin}){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
   
    async function handleSubmit(ev) {
        ev.preventDefault()
        //console.log(9900)
        const user = {username, password, name, location, isAdmin: false}
        console.log(user)
        const response = await registerUser(user);
        console.log(response.data);
        if(response.data.user.username === 'admin') {
            setIsAdmin(true)

        }
    console.log(isAdmin)
        // return response;
    
        if(response&&response.data.token) {
            setToken(response.data.token);
            window.localStorage.setItem('token', response.data.token);
           navigate('/home')
        } 
      }
    return(
        <>
        <h1>Register</h1>
        <Container>
        <form onSubmit={handleSubmit}>
      <Form.Label htmlFor="inputUsername">Username</Form.Label>
      <Form.Control
        type="text"
        id="inputUsername"
        aria-describedby="usernameHelpBlock"
        onChange={(ev)=> setUsername(ev.target.value)}
      />
      <Form.Label htmlFor="inputPassword5">Password</Form.Label>
      <Form.Control
        type="password"
        id="inputPassword5"
        aria-describedby="passwordHelpBlock"
        onChange={(ev)=> setPassword(ev.target.value)}
      />
      
      <Form.Label htmlFor="inputName">Name</Form.Label>
      <Form.Control
        type="text"
        id="inputName"
        aria-describedby="nameHelpBlock"
        onChange={(ev)=> setName(ev.target.value)}  
      />
      <Form.Label htmlFor="inputLocation">Location</Form.Label>
      <Form.Control
        type="text"
        id="inputLocation"
        aria-describedby="locationHelpBlock"
        onChange={(ev)=> setLocation(ev.target.value)}
      />
      
      
      <Button type="submit" className="btn btn-primary">Submit</Button>
      </form>
    </Container>
      </>
    )   
}




{/* <form onSubmit={handleSubmit}>
<TextField id="filled-basic"  variant="standard"
    type ='text'
    placeholder="Username"
    onChange={(ev)=> setUsername(ev.target.value)}
  />
 <TextField id="filled-basic"  variant="standard"
    type ='text'
    placeholder="Password"
    onChange={(ev)=> setPassword(ev.target.value)}
  />
 <TextField id="filled-basic"  variant="standard"
    type ='text'
    placeholder="Name"
    onChange={(ev)=> setName(ev.target.value)}
  />
 <TextField id="filled-basic"  variant="standard"
    type ='text'
    placeholder="Location"
    onChange={(ev)=> setLocation(ev.target.value)}
  />
    <Button  type='submit' variant='contained'size='small'>SUBMIT</Button>
</form> */}