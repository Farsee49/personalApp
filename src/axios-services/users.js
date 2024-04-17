
import axios from 'axios';

//---------------------Axios User Services---------------------


//_________________________REGISTER USER_________________________

export async function registerUser(user) {
  const registerUrl = "http://localhost:3000/api/users/register";
  console.log(user)

  try{
  const response = await axios.post(registerUrl, user);
  console.log('Registration successful', response.data);
  return response;
  } catch (error) {
    console.error(error);
  }
}


//_________________________LOGIN USER_________________________

export async function login(user) {
  const loginUrl = "http://localhost:3000/api/users/login";
  console.log(user)

  try{
  const response = await axios.post(loginUrl, user);
 // console.log('Login successful', response.data);
  return response;
  } catch (error) {
    console.error(error);
  }
}

//_________________________GET CURRENT USER_________________________

export async function getCurrentUser (token) {
  const currentUserUrl = "http://localhost:3000/api/users/me";
  try{
    const response = await axios.get(currentUserUrl, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    //console.log('Current User', response.data);
    return response;
  } catch (error) {
    console.error(error);
  }
}

//_________________________GET USER BY ID_________________________

export async function getAllUsers () {
  const allUsersUrl = "http://localhost:3000/api/users/allusers";
  try{
    const response = await axios.get(allUsersUrl);
    //console.log('All Users', response.data);
    return response;
  } catch (error) {
    console.error(error);
  }
}

//_________________________DELETE USER_________________________

export async function deleteUser (userId) {
  
  const deleteUrl = `http://localhost:3000/api/users/${userId}`;
  try{
    const response = await axios.delete(deleteUrl, userId);
    console.log('User Deleted', response.data);
    return response;
  } catch (error) {
    console.error(error);
  }
}
    

// export const login = async (user) => {
//   console.log(user)
//      try {
//        const response = await fetch("http://localhost:3000/api/users/login", {
//          method: "POST",
//          headers: {
//            'Content-Type': 'application/json'
//          },
//          body: JSON.stringify({
//           user
//          })
//        });
//        const result = await response.json();
//        //console.log(result);
//        return result
//      } catch (err) {
//        console.error(err);
//      }
//    };

// export const login = async (user) => {
//   try {
//       const config = {
//           headers: {
//               'Content-Type': 'application/json'
//           }
//       }
//       const { results } = await axios.post("http://localhost:3000/api/users/login", {
//           user: {
//              user
//           }
//       ,config});
//       const data = await results
//     console.log(data)
//     return data;

//   } catch (error) {
//       console.error(error);
//   }
// };
