import { workModelMYSQL } from "./work.mysql.model"
class WorkController {
    workModel;
    
    constructor(workModel){
        this.workModel = workModel;
    }
    getAllWorks = (params) =>{
        try {
             return this.workModel.getAllWorks(params);
        } catch (error) {
          console.error("[WORK-CONTROLLER] -",error);
          throw error;
        }
    }
    createWork = (work) =>{
        try {
            return this.workModel.createWork(work);
        } catch (error) {
            console.error("[WORK-CONTROLLER] -",error)
            throw error;
        }
    }
    deleteWork = (work) =>{
        try {
            return this.workModel.deleteWork(work);
        } catch (error) {
            console.error("[WORK-CONTROLLER] -",error)
            throw error;
        }
    }
    updateWork = (work) => {
        try {
            return this.workModel.updateWork(work);
        } catch (error) {
            console.error("[WORK-CONTROLLER] -",error)
            throw error;
        }
    }


    
    getWorkDetail = (params) =>{
        try {
            return this.workModel.getWorkDetail(params);
        } catch (error) {
            console.error("[WORK-CONTROLLER] -",error)
            throw error;
        }
        
    }
    createDetailWork = (work) => {
        try {
            return this.workModel.createDetailWork(work);
        } catch (error) {
            console.error("[WORK-CONTROLLER] -",error)
            throw error;
        }
    }
    updateWorkDetail = (work) =>{
        try {
            return this.workModel.updateWorkDetail(work);
        } catch (error) {
            console.error("[WORK-CONTROLLER] -",error)
            throw error;
        }
    }
    deleteWorkDetail = (ID) => {
        try {
            return this.workModel.deleteWorkDetail(ID);
        } catch (error) {
            console.error("[WORK-CONTROLLER] -",error)
            throw error;
        }
    }

}

//You can change this instance and change the database of all products
// const model = new ProductModelFS(); <-- Local file  
const model = new workModelMYSQL();

export const workController = new WorkController(model)