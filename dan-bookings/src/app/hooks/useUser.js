import { useSession } from "next-auth/react";
import { userService } from "../services/userService"
import { US_DB_PROPS } from "../constants/usersDB";

export const useUser = () => {

    const createUser = async(user) =>{
        return await userService.createUser(user);
    }
    const getUser = async(user)=>{
        return await userService.getUser(user)
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