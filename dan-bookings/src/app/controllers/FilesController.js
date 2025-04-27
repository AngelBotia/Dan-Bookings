import { s3Model } from "../models/files/amazonS3";
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

const model = new s3Model(); 

export const useFileData = new filesController(model)