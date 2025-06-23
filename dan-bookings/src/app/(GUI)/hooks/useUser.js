import { useSession } from "next-auth/react";
import { US_DB_PROPS } from "../../constants/usersDB";

export const getUserSession = () =>{
    const { data: session } = useSession() || {};
    const { user } = session  || {};
    const { USER_ROLS } = US_DB_PROPS

    let isAdmin = user?.role == USER_ROLS.admin;
    return { user, isAdmin}
}