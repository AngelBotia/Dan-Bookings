import { useSession } from "next-auth/react";
import { API_KEY, US_DB_PROPS } from "../constants/usersDB";

export const useUser = () => {
    const URL_ENDPOINT_USER = `${process.env.NEXTAUTH_URL}/api/user`;
    const createUser = async(user) =>{
        try {
            if(!user) return null;
            const newUser = await fetch(URL_ENDPOINT_USER,
                {
                    method: "POST",
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-api-key': API_KEY
                    },
                    body: JSON.stringify(user)
                }) || null;

            const newUserJson = await newUser.json();
            return newUserJson;
          } catch (error) {
            return null;
          }
    }
    const getUser = async(user)=>{
        try {
            if(!user) return null;
            const userParams = user ? new URLSearchParams(user) : "";
            const userDB = await fetch(`${URL_ENDPOINT_USER}?${userParams}`,
                {
                    method: "GET",
                    credentials: 'include',
                    headers: {
                        'x-api-key': API_KEY,
                    }
                }) || null;

            const  userDBJson = await userDB.json();   
            return userDBJson;
          } catch (error) {
            return null;
          }
    }
 
 

    return {createUser,getUser}
}
export const getUserSession = () =>{
    const { data: session } = useSession() || {};
    const { user } = session  || {};
    const { USER_ROLS } = US_DB_PROPS

    let isAdmin = user?.role == USER_ROLS.admin;
    return { user, isAdmin}
}