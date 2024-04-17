import React, {useEffect, useState} from "react";
import { Link, Routes, Route, useNavigate } from "react-router-dom";
 import  { Button } from '@mui/material';
 import { getApiHealth } from "../axios-services/index";
import { getAllPosts } from "../axios-services/posts";

 import {
    Login,
    Users,
    Posts,
    Home,
    Register,
    CreatePost,
    SinglePost,
    SingleUser
 } from "./"
import { getCurrentUser } from "../axios-services/users";




export default function App (){
    const [token, setToken] = useState('');
    const [posts, setPosts] = useState([]);
    const [singlePost, setSinglePost] = useState('');
    const [user, setUser] = useState('');
    const [singleUser, setSingleUser] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();
   
    console.log(isLoggedIn)
    console.log(user)
    console.log(isAdmin)
    console.log(posts)

 
   

   async function tokenCheck(){
    try {
        if(window.localStorage.getItem('token')) {
         setToken(window.localStorage.getItem('token'));
         setIsLoggedIn(true);}
     } catch (error) {
            console.log('Error in tokenCheck function');
            console.error(error);
        }
    }

    async function getEveryPost(posts){
        try {
            const response = await getAllPosts(posts);
            console.log(response.data);
            setPosts(response.data.posts);
        } catch (error) {
            console.log('Error in getPosts function');
            console.error(error);
        }
    }

     function logout(){
        try {
        setToken("")
        setIsLoggedIn(false)
        window.localStorage.removeItem("token")
        navigate("/home")
    } catch (error) {
        console.log('Error in logout function');
        console.error(error);
    }
    }
     
     

useEffect(() => {
        tokenCheck();
        getApiHealth();
        // getEveryPost(posts);

     },[]);

useEffect(()=>{
        //console.log(token)
        if(token) {
        getCurrentUser(token).then((response) => {
        //console.log(response.data);
        setUser(response.data);
        setIsLoggedIn(true);
        if(response.data.username === 'admin') {
            setIsAdmin(true);
        }
        getEveryPost(posts);
            }).catch((error) => {
                console.log(error);
            })
        }         
    },[token]);


    return (<>

    <header> 
        <h1>My App</h1>
        {isLoggedIn ? <h2>Welcome {user.username}</h2> : null}
        {isLoggedIn ? <h2>Logged In</h2> : null}
        <></>
        
        <>{isLoggedIn ? <> 
        { isAdmin ? <Link to='/users'><Button variant="contained" size="small">Users</Button></Link> : null }
        <Link to='/posts'><Button variant="contained" size="small">Posts</Button></Link>
        <Link to='/createpost'><Button variant="contained" size="small">Create Post</Button></Link>
        <Link to='/home'><Button variant="contained" size="small"> Home</Button></Link>
        <Button variant="contained" size="small" onClick={logout}>Logout</Button>
        </>:<>
        <Link to='/login'><Button variant="contained" size="small">
        Login</Button></Link>
        <Link to='/register'><Button variant="contained" size="small">
        Register</Button></Link> 
        
        </>}</>
        {isLoggedIn ? null : <h2>Log Out Successful!</h2>  }
    </header>
       

        <Routes>
            <Route path= '/login'
            element={<Login setToken={setToken} token={token} navigate={navigate}
            isLoggedIn={isLoggedIn} isAdmin={isAdmin} setIsAdmin={setIsAdmin}/>} />
          
            <Route path= '/register'
                element={<Register  
                setToken={setToken}
                navigate={navigate}
                setIsAdmin={setIsAdmin} 
                isAdmin={isAdmin} />} />

            <Route path= '/home'
                element={<Home />} />

            <Route path= '/users'
                element={<Users 
                navigate={navigate} 
                singleUser={singleUser}
                setSingleUser={setSingleUser} />} />

            <Route path= 'single-user/:userId'
                element={<SingleUser 
                user={user} 
                navigate={navigate}
                singleUser={singleUser}
                setSingleUser={setSingleUser} />} />

            <Route path= '/posts'
                element={<Posts user={user} 
                navigate={navigate}
                singlePost={singlePost} 
                setSinglePost={setSinglePost}/>} />

            <Route path= '/createpost'
                element={<CreatePost 
                user={user} 
                navigate={navigate}
                singlePost={singlePost} 
                setSinglePost={setSinglePost} />} />

            <Route path= '/single-post/:postId'
                element={<SinglePost 
                user={user} 
                navigate={navigate}
                singlePost={singlePost} />} />

      
        </Routes>
        </>
    )
}

