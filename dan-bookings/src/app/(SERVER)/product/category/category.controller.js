import { CategoryModelMYSQL } from "./category.mysql.model";

class CategoryController {
    categoryController;
    
    constructor(modelCategory){
        this.categoryController = modelCategory;
    }

    getCategorys = (params) =>{
        try {
            return this.categoryController.getCategorys(params);
        } catch (error) {
            console.error("[CATEGORY-CONTROLLER] -",error)
            throw error;
        }
        
    }
    createCategory = (category) =>{
        try {
            return this.categoryController.createCategory(category);
        } catch (error) {
            console.error("[CATEGORY-CONTROLLER] -",error)
            throw error;
        }
        
    }
    updateCategory = (category) =>{
        try {
            return this.categoryController.updateCategory(category);
        } catch (error) {
            console.error("[CATEGORY-CONTROLLER] -",error)
            throw error;
        }
    }
    deleteCategory = (ID) => {
        try {
            return this.categoryController.deleteCategory(ID);
        } catch (error) {
            console.error("[CATEGORY-CONTROLLER] -",error)
            throw error;
        }
    }


}

const model = new CategoryModelMYSQL();

export const categoryController = new CategoryController(model)