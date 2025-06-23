"use server"
import { userController } from '../controllers/UserController';

export const createUser = async (user) =>{
     try {     
         const {id,name, email} = user || {};
         if(!email || !name || !id) return null;
         const newUser = await userController.createNewUser(user)
         return newUser;
     } catch (error) {
         return null
     }
 }
    
export const getUser =  async  (user) => {
    try {
        const {email,name,id} = user || {};
        if(!email || !name || !id) return null;
        const userToDb = await userController.getUser(user);
        return userToDb;
    } catch (error) {
        return null;
    }
}