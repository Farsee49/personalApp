import React,{ useState, Fragment} from "react";
//import Container from 'react-bootstrap/Container';

import Button from 'react-bootstrap/Button';
import {login} from '../axios-services/users';


export default function Login({
    setToken,
    navigate,
    isLoggedIn,
    setIsAdmin
        }) {
  
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    console.log(setUsername)
    console.log(setPassword)
    console.log(username)
    console.log(password)
   
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
            navigate('/posts')
    }
    } catch (error) {
        console.log('Error in handleSubmit function in Login.jsx');
        console.error(error); 
   
    } 
  } console.log(handleSubmit)
    
    return(
        <>
       <div className="row">
        <h1 className="text-center">User Login</h1>
        <div className="col-6 offset-3">
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label" htmlFor="title">Username</label>
                    <input className="form-control" type="text" id="username" name=""
                    onChange={(ev) => setUsername(ev.target.value)}></input>
                </div>
                <div className="mb-3">
                    <label className="form-label" htmlFor="title">Password</label>
                    <input className="form-control" type="text" id="title" name=""
                   onChange={(ev) => setPassword(ev.target.value)} ></input>
                </div>
               
                
                <div className="mb-3">
                    <Button className=" btn btn-primary" type="submit">Login</Button>
                </div>
            </form>
              
        </div>
    </div>
     
        {isLoggedIn ?  <h2>Log In Successful!</h2> : null}

       </>)
      
    
    
}

 


{/* <form onSubmit={handleSubmit}>
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
     
</form> */}