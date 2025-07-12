import { s3Model } from "./file.S3.model";

const sharp = require('sharp');
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

  saveImgsInCloud = (files = [],title="GENERIC",ID="NoID") => {
      return Promise.all(files?.map(async (file, i) => {
          let { type, img } = file || {};
          
          try {
              const imgBase64 =Buffer.from(img, 'base64')
  
              const imgOptimized = await sharp(imgBase64)
              .resize({ width: 1600 }) 
              .webp({ quality: 90 })  
              .toBuffer();
              const imgToSave = {
                  name: `${title}-${ID}-${i}-${this.generateShortID()}`,
                  file: imgOptimized,
                  ContentType: type
              }
              return fileController.saveImg(imgToSave);   
          } catch (error) {
              console.error(error)
              return []
          }
      })) || [];
  }

  generateShortID() {
    return Date.now().toString(36).slice(-4);
  }
  
}

const model = new s3Model(); 

export const fileController = new FilesController(model)