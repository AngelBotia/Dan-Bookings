import { conn } from "../../libs/mysql";
import { WO_DB_PROPS, WORKS } from "../../constants/works"
export class workModelMYSQL{

    getAllWorks = async () => {
        try {
            const [WO_DB, WO_NAMES, WO_TABLES] = WO_DB_PROPS;
            const TABLES = WO_DB.map((work, i) => { return `${WO_DB[i]} AS ${WO_NAMES[i]}` });

            const SELECT = [`SELECT ${TABLES.join()}`];

            const FROM = [`FROM ${WO_TABLES.join()}`];

            const WHERE = [];

            const ORDER = [];

            const allQuery = [...SELECT, ...FROM, ...WHERE, ...ORDER].join(" ");

            const [rows] = await conn.query(allQuery);
            if (rows?.affectedRows == 0) throw new Error("works dont found");
            return rows
        } catch (error) {
            throw new Error("works dont found")
        }
    };
    getWorkDetailsById = async(id) =>{
        try {
  
        } catch (error) {
            throw new Error("works dont found")
        }
    };
    deleteWork = async (id) =>{
        //TODO:DELETE WORK BY ID
    }
    createWork = async (product,nameID) => {
       //TODO CREATE WORK
    }
    updateWork = async(work) => {
        //TODO EDIT WORK
    }

}