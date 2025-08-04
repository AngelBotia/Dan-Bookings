import { mediaController } from "../Media/media.controller";
import { translationController } from "../Translation/translation.controller";
import { workModelMYSQL } from "./product.mysql.model"
class ProductController {
    workModel;

    constructor(workModel) {
        this.workModel = workModel;
    }
    getAllProducts = async (params) => {
        try {
            let allWorks = await this.workModel.getAllProducts(params) || [];
            let data = await Promise.all(
                allWorks?.map(async (work) => {
                    const translations = await translationController.getTranslations(work.ID_WORK, params.languageApp.toUpperCase()) || {};
                    const IMAGE_URL = await mediaController.getMedias(work.ID_WORK) || [];
                    return {
                        ...work,
                        ...translations,
                        IMAGE_URL
                    };
                })
            );
            let total = await this.workModel.getTotalCount(params) 
            return { 
                data,
                total
             }
        } catch (error) {
            console.error("[WORK-CONTROLLER] -", error);
            throw error;
        }
    }
    getTotalCount = (params) => {
        try {
            return this.workModel.getTotalCount(params);
        } catch (error) {
            console.error("[WORK-CONTROLLER] -", error);
            throw error;
        }
    }

    createProduct = (work) => {
        try {
            return this.workModel.createProduct(work);
        } catch (error) {
            console.error("[WORK-CONTROLLER] -", error)
            throw error;
        }
    }
    deleteProduct = (work) => {
        try {
            return this.workModel.deleteProduct(work);
        } catch (error) {
            console.error("[WORK-CONTROLLER] -", error)
            throw error;
        }
    }
    updateProduct = (work) => {
        try {
            return this.workModel.updateProduct(work);
        } catch (error) {
            console.error("[WORK-CONTROLLER] -", error)
            throw error;
        }
    }



    getWorkDetail = (params) => {
        try {
            return this.workModel.getWorkDetail(params);
        } catch (error) {
            console.error("[WORK-CONTROLLER] -", error)
            throw error;
        }

    }
    createDetailWork = (work) => {
        try {
            return this.workModel.createDetailWork(work);
        } catch (error) {
            console.error("[WORK-CONTROLLER] -", error)
            throw error;
        }
    }
    updateWorkDetail = (work) => {
        try {
            return this.workModel.updateWorkDetail(work);
        } catch (error) {
            console.error("[WORK-CONTROLLER] -", error)
            throw error;
        }
    }
    deleteWorkDetail = (ID) => {
        try {
            return this.workModel.deleteWorkDetail(ID);
        } catch (error) {
            console.error("[WORK-CONTROLLER] -", error)
            throw error;
        }
    }

}

//You can change this instance and change the database of all products
// const model = new ProductModelFS(); <-- Local file  
const model = new workModelMYSQL();

export const productController = new ProductController(model)