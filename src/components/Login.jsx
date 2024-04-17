import React,{ useState, Fragment} from "react";
import  { Button, TextField } from '@mui/material';
import {login} from '../axios-services/users';


export default function Login({
    setToken,
    navigate,
    isLoggedIn,
    setIsAdmin
        }) {
  
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
   
  async function handleSubmit(ev) {
        ev.preventDefault();
    try {
    //console.log(9900)
    const user = {username, password}
    //console.log(user)
    const response = await login(user);
    //console.log(response.data.user.username);
 
        if(response.data.user.username === "admin") {
            setIsAdmin(true)
        }

        if(response&&response.data.token) {
            setToken(response.data.token);
            window.localStorage.setItem('token', response.data.token);
            navigate('/home')
    }
    } catch (error) {
        console.log('Error in handleSubmit function in Login.jsx');
        console.error(error); 
   
    } 
  }  
    
    return(
        <>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
        <TextField id="filled-basic"  variant="standard"
            type ='text'
            placeholder="UserName"
            onChange={(ev)=> setUsername(ev.target.value)}
          />
          <TextField id="filled-basic"  variant="standard"
            type ='text'
            placeholder="PassWord"
            onChange={(ev)=> setPassword(ev.target.value)}
          />
             <Button  type='submit' variant='outlined'size='small'>Login</Button>
             
        </form>
     
        {isLoggedIn ?  <h2>Log In Successful!</h2> : null}

       </>)
      
    
    
}