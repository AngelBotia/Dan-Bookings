import { useSession } from "next-auth/react";

export const getUserSession = () =>{
    const { data: session } = useSession() || {};
    const { user } = session  || {};
    let isAdmin = user?.role == process.env.NEXT_PUBLIC_MAIN_ROL;
    return { user, isAdmin}
}