import { workModelMYSQL } from "../models/mysql/workModel"
class filesController {
    filesController;
    
    constructor(modelFileController){
        this.filesController = modelFileController;
    }
    saveImg = async (params) =>{
        try {
             return await this.filesController.saveImg(params);
        } catch (error) {
          console.error("[FILE-CONTROLLER] -",error.message);
          throw error.message;
        }
    }
  
}

const model = new workModelMYSQL();

export const useControllerData = new filesController(model)