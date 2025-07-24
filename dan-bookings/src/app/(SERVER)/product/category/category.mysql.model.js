
import { conn, createDynamicQuery } from "../../libs/mysql";
import { CAT_DB_PROPS } from "./category.constant"
import { CategorySchema } from "./category.schema";
const { category_SELECT, CATEGORY_DB_TABLE, CAT_DB_TABLE_ALIAS, LIMIT_CAT, CATEGORY } = CAT_DB_PROPS;

export class CategoryModelMYSQL {

    getCategorys = async(params) => {
        try {
            let SELECT = [category_SELECT],
                FROM = [`${CATEGORY_DB_TABLE} ${CAT_DB_TABLE_ALIAS}`],
                WHERE = [],
                PARAMS_VALUES = {};

            const query = createDynamicQuery(SELECT, FROM, WHERE);
            const [rows] = await conn.query(query, PARAMS_VALUES);
            return rows;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    createCategory = async({code,icon,name}) => {
         try {   
            CategorySchema.parse();         
            
            const categoryToSave = {
              [CATEGORY.name]:name,
              [CATEGORY.code]:code,
              [CATEGORY.icon]:icon
            }
    
            const [result] = await conn.query(`INSERT into ${CATEGORY_DB_TABLE} SET ?`,[categoryToSave]);
            if(result.affectedRows === 0) return null;
            
            const [rows] =  await conn.query(`SELECT ${category_SELECT} FROM ${CATEGORY_DB_TABLE} ${CAT_DB_TABLE_ALIAS}  WHERE ${CAT_DB_TABLE_ALIAS}.${CATEGORY.code} = :code`,{code});
            if (rows?.affectedRows == 0) return null;
    
            const newCategry = rows?.find(category => category )|| null;
            return newCategry;
          } catch (error) {
            console.error(error);
            return null;
          }
    }

    updateCategory = async(category) => {
        try {

        } catch (error) {

        }
    }

    deleteCategory = async(ID) => {
        try {

        } catch (error) {

        }
    }



}