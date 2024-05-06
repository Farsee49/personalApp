import React from "react";
import { useParams } from "react-router";

import { deleteUser } from "../axios-services/users";



export default function SingleUser({singleUser, navigate}) {
    const { userId } = useParams();
    console.log(userId)
    console.log(singleUser)
    return (<>
        <div>
            <h1>Single User</h1>
            <h3>Username: {singleUser.username}</h3>
            <h3>Name: {singleUser.name}</h3>
            <h3>Location: {singleUser.location}</h3>
           <><button variant='outlined' size='small' onClick ={ () => {
                   deleteUser(userId);
                    navigate(`/users`)
                }}>Delete User</button></>
        </div>
    </>)
}