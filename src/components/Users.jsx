import React, { useEffect, useState, Fragment } from "react";
import { getAllUsers } from "../axios-services/users";
import { Button } from '@mui/material';



export default function Users ({navigate,setSingleUser}) {
    const [users, setUsers] = useState([]);
  
   


    async function getUsers(users){
        try{
        const response = await getAllUsers(users);
        //console.log(response.data);
        setUsers(response.data);
    } catch (error) {
        console.log('Error in getUsers function');
        console.error(error);
    }

}

    function UserTitle({ name }) {
        return <h2>{name}</h2>;
      }

    // function UserBody({ body }) {
    //     return <p>{body}</p>;
    //   }
    
    
    
    useEffect(() => {
       
        getUsers(users);
       
     
    },[])
console.log(users)
    return (<>

       
        <h2>Users</h2>
        {users.map(user =>
            <Fragment key={user.id}>
                <UserTitle name={user.username} />
                <Button variant='outlined' size='small' onClick ={ () => {
                    setSingleUser(user)
                    navigate(`/single-user/${user.id}`)
                }}>User Info</Button>
            </Fragment>    
        )}
   </> )
}


  
            