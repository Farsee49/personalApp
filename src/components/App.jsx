import React, {useEffect, useState} from "react";
import {  Routes, Route, useNavigate } from "react-router-dom";
 import { Link } from "react-router-dom";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
 import { getApiHealth } from "../axios-services/index";
import { getAllPosts } from "../axios-services/posts";

 import {
    Login,
    Users,
    Posts,
    Home,
    Register,
    CreatePost,
    EditPost,
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
    const [editPost, setEditPost] = useState('');
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
        navigate("/login")
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

  function Navhead() {
    return(
    <>
    {isLoggedIn ? <> 
        <Navbar bg="primary" sticky="top" data-bs-theme="dark" expand="lg">
        <Container>
        <Navbar.Brand href="#home">Navbar</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
            { isAdmin ? <Nav.Link ><Link to='/users'>Users</Link></Nav.Link>: null }
            <Nav.Link>< Link to='/home'>Home</Link></Nav.Link>
            <Nav.Link><Link to='/posts'>Posts</Link></Nav.Link>
            <Nav.Link><Link to='/createpost'>Create Post</Link></Nav.Link>
            <Nav.Link ><Link onClick={logout}>Logout</Link></Nav.Link>
            </Nav>
        </Navbar.Collapse>
            
                </Container>
            </Navbar>
            </>:<> 
        <Navbar bg="primary" sticky="top" data-bs-theme="dark" expand="lg">
        <Container>
        <Navbar.Brand href="#home">Navbar</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
            <Nav.Link><Link to='/login'>Login</Link></Nav.Link>
            <Nav.Link><Link to='/register'>Register</Link></Nav.Link>
            
            </Nav>
        </Navbar.Collapse>
            
                </Container>
            </Navbar>
            </>}
            </>
            )
        }

    function Foot() {
        return (
            <>
            
            <Navbar className="mt-5" bg="primary" data-bs-theme="dark" expand="lg">
            <Container>
              <Navbar.Brand>Brand text</Navbar.Brand>
            </Container>
          </Navbar>
            
            </>
        )
    }
    

    return (<>

    <header>
        <Navhead /> 
        <></>
        <h1 class="text-center">My App</h1>
        {isLoggedIn ? <h2 class="text-center">Welcome {user.username}</h2> : null}
        {isLoggedIn ? <h2 class="text-center">Logged In</h2> : null}
        <></>
       
        
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
                isAdmin={isAdmin} 
                navigate={navigate}
                singlePost={singlePost}
                editPost={editPost}
                setEditPost={setEditPost} />} />

            <Route path= '/edit-post/:postId'
                element={<EditPost 
                user={user} 
                navigate={navigate}
                editPost={editPost} />} />

            <Route path= '/nav'
                element={<Navhead
                isAdmin={isAdmin}
                navigate={navigate}
                setToken={setToken}
                setIsLoggedIn={setIsLoggedIn}
                isLoggedIn={isLoggedIn} 
                logout={logout}/>} />


      
        </Routes>
        <Foot />
        </>
    )
}

