import { UserModelMYSQL } from "../models/mysql/userModel";

class UserController {
    userController;
    
    constructor(modelUserController){
        this.userController = modelUserController;
    }
    createNewUser = (newUser) => {
      try {
          return this.userController.createNewUser(newUser);
        } catch (error) {
          console.error("[USER-CONTROLLER] -",error.message);
          throw error.message;
        }
    }
    getUser = (user) =>{
        try {
            return this.userController.getUser(user);
          } catch (error) {
            console.error("[USER-CONTROLLER] -",error.message);
            throw error.message;
          }
    }
    checkApikey = (key) =>{
      try {
          return this.userController.checkApikey(key);
        } catch (error) {
          console.error("[USER-CONTROLLER] -",error.message);
          throw error.message;
        }
  }

  
}

const model = new UserModelMYSQL();

export const userController = new UserController(model)