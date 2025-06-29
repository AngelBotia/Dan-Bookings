import { OllamaModel } from "../models/IA/ollama";
class IAController {
    IAController;
    
    constructor(modelIAController){
        this.IAController = modelIAController;
    }
    getTranslate = (textToTranslate,fromLng,ToLng) =>{
        try {
             return this.IAController.getTranslate(textToTranslate,fromLng,ToLng);
        } catch (error) {
          console.error("[IA-CONTROLLER] -",error.message);
          throw error.message;
        }
    }
  
}

const model = new OllamaModel();

export const iaController = new IAController(model)