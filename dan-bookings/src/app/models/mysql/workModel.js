import { conn } from "@/app/libs/mysql";

export class workModelMYSQL{
    
    getAllWorks = async (nameID,params) =>{
       //GET ALL PORFOLIO WORKS
    };
    getWorkDetailsById= async(id) =>{
        //GET WORK PHOTOS AND DETAILS
    };
    deleteWork = async (id) =>{
        //DELETE WORK BY ID
        const [rows] = await conn.query('DELETE from PRO_PRODUCT where id = ?',[id]);
        if(rows?.affectedRows==0) throw new Error("work dont found");
        return `this product with this ID:${id} has delete.`;
    }
    createWork = async (product,nameID) => {
        const { id,name,category,price } = product;
        if(!id?.trim() ||!name?.trim() || !category.trim() || !Number(price)) throw new Error('name is required.');
        const [result] = await conn.query<ResultSetHeader>("INSERT into PRO_PRODUCT SET ?",product)
        if(result.affectedRows === 0) return null;
        return product;
    }
    updateWork = async(work) => {

    }

}