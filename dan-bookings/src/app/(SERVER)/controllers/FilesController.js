import { s3Model } from "../models/files/amazonS3";
class FilesController {
    filesController;
    
    constructor(modelFileController){
        this.filesController = modelFileController;
    }
    saveImg = (params) =>{
        try {
             return this.filesController.saveImg(params);
        } catch (error) {
          console.error("[FILE-CONTROLLER] -",error.message);
          throw error.message;
        }
    }
    deleteImg = (keyID) =>{
        try {
             return this.filesController.deleteImg(keyID);
        } catch (error) {
          console.error("[FILE-CONTROLLER] -",error.message);
          throw error.message;
        }
    }
    updateImg = (oldKey,newKey) => {
      try {
        return this.filesController.updateImg(oldKey,newKey);
      } catch (error) {
        console.error("[FILE-CONTROLLER] -", error.message);
        throw error.message;
      }
    }
    getKey = (url) =>{
      try {
           return this.filesController.getKey(url);
      } catch (error) {
        console.error("[FILE-CONTROLLER] -",error.message);
        throw error.message;
      }
  }
  
}

const model = new s3Model(); 

export const fileController = new FilesController(model)