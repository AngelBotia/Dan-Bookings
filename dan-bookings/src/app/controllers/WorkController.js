import { workModelMYSQL } from "../models/mysql/workModel"
class workController {
    workModel;
    
    constructor(workModel){
        this.workModel = workModel;
    }
    getAllWorks = async (params) =>{
        try {
             return await this.workModel.getAllWorks(params);
        } catch (error) {
          console.error("[WORK-CONTROLLER] -",error);
          throw error;
        }
    }
    getWorkDetail = async (params) =>{
        try {
            return await this.workModel.getWorkDetail(params);
        } catch (error) {
            console.error("[WORK-CONTROLLER] -",error)
            throw error;
        }
        
    }
    getWorkMedias = async (params) =>{
        try {
            return await this.workModel.getWorkMedias(params);
        } catch (error) {
            console.error("[WORK-CONTROLLER] -",error)
            throw error;
        }
        
    }
    deleteWork = async (id)=>{
        try {
            return await this.workModel.deleteWork(id);
        } catch (error) {
            console.error("[WORK-CONTROLLER] -",error)
            throw error;
        }
    }
    createWork = async (work,nameID) =>{
        try {
            return await this.workModel.createWork(product,nameID);
        } catch (error) {
            console.error("[WORK-CONTROLLER] -",error)
            throw error;
        }
    }
    updateWork = async(work) => {
        try {
            return await this.workModel.createWork(product,nameID);
        } catch (error) {
            console.error("[WORK-CONTROLLER] -",error)
            throw error;
        }
    }
}

//You can change this instance and change the database of all products
// const model = new ProductModelFS(); <-- Local file  
const model = new workModelMYSQL();

export const useControllerData = new workController(model)