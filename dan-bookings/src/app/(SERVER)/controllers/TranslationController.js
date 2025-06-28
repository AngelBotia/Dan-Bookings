import { TranslationModelMYSQL } from "../models/mysql/translationModel";

class TranslationController {
    translationController;
    
    constructor(modelTranslation){
        this.translationController = modelTranslation;
    }

    getTranslations = (ID_REF,languague) =>{
        try {
            return this.translationController.getTranslations(ID_REF,languague);
        } catch (error) {
            console.error("[Translation-CONTROLLER] -",error)
            throw error;
        }
        
    }
    createTranslation = (propToSave,ID_REF,languague) =>{
        try {
            return this.translationController.createTranslation(propToSave,ID_REF,languague);
        } catch (error) {
            console.error("[Translation-CONTROLLER] -",error)
            throw error;
        }
        
    }
    updateTranslation = (propToUpdate,ID_REF,languague) =>{
        try {
            return this.translationController.updateTranslation(propToUpdate,ID_REF,languague);
        } catch (error) {
            console.error("[Translation-CONTROLLER] -",error)
            throw error;
        }
    }
    deleteTranslation = (ID) => {
        try {
            return this.translationController.deleteTranslation(ID);
        } catch (error) {
            console.error("[Translation-CONTROLLER] -",error)
            throw error;
        }
    }

    getLanguages = () =>{
            try {
            return this.translationController.getLanguages();
        } catch (error) {
            console.error("[Translation-CONTROLLER] -",error)
            throw error;
        }
    }


}

const model = new TranslationModelMYSQL();

export const translationController = new TranslationController(model)