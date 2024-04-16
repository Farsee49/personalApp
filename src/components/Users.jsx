import React, { useEffect, useState } from "react";
import { getAllUsers } from "../axios-services/users";


export default function Users () {
    const [users, setUsers] = useState([]);


    async function getUsers(users){
        const response = await getAllUsers(users);
        //console.log(response.data);
        setUsers(response.data);
    }
    useEffect(() => {
       
        getUsers(users);
       
     
    },[])

    return (
        <div>
            <h1>Users</h1>
            <ul>
                {users.map(user => (
                    <li key={user.id}>{user.username}</li>
                ))}
            </ul>
        </div>
    )
}