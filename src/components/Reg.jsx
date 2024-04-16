


import React, { useState } from "react";
import  { Button,TextField } from '@mui/material';
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
        <form onSubmit={handleSubmit}>
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
        </form>
      </>
    )   
}