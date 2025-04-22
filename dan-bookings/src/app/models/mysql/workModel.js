import { conn } from "../../libs/mysql/mysql";
import { createDynamicQuery } from "../../libs/mysql/queryHelpers";
import { DETAILS_PROPS,WDM_DETAILS,WDM_PROPS,WO_DB_PROPS, WO_DETAILS } from "../../constants/worksDB"


export class workModelMYSQL{
    getAllWorks = async (params) => {
        try {
            let { limit, page } = params;
            let SELECT = [], FROM = [], WHERE = [], ORDER = [], PARAMS_VALUES = [];
            const {WO_DB, WO_NAMES, WO_DB_TABLE, WO_DB_TABLE_ALIAS,LIMIT_WORKS} = WO_DB_PROPS;

            //SELECT
            const work_SELECT = WO_DB.map((item, i) => { return `${WO_DB_TABLE_ALIAS}.${WO_DB[i]} AS ${WO_NAMES[i]}` }).join();
             SELECT = [work_SELECT];
            //FROM
            const work_FROM = `${WO_DB_TABLE} ${WO_DB_TABLE_ALIAS}`
             FROM = [work_FROM];
            //WHERE
             WHERE = [];
            //ORDER
             ORDER = [];

            let allQuery = createDynamicQuery(SELECT,FROM,WHERE);
            
            //LIMIT PAGE
            const limitWorks = Number(limit) || LIMIT_WORKS || 10;
            const pageWorks =  Number(page) || 0;
            limitWorks && (allQuery = allQuery.concat(` LIMIT ? OFFSET ? `), PARAMS_VALUES.push(limitWorks,pageWorks));
            
            const [rows] = await conn.query(allQuery,PARAMS_VALUES);
            if (rows?.affectedRows == 0) throw new Error("works dont found");
            return rows

        } catch (error) {
            console.error(error.message);
            throw new Error("works dont found")
        }
    };
    getWorkDetail = async(params) =>{
        try {
            let { workID } = params;
            const { DET_DB, DET_NAMES, DETAIL_DB_TABLE,DET_TABLE_ALIAS,LIMIT_DET} = DETAILS_PROPS; 
            let SELECT = [], FROM = [], WHERE = [], ORDER = [], PARAMS_VALUES = [];

            //SELECT
            const details_SELECT = DET_DB.map((item, i) => { return `${DET_TABLE_ALIAS}.${DET_DB[i]} AS ${DET_NAMES[i]}` }).join();
            SELECT = [details_SELECT]
            //FROM
            const details_FROM = `${DETAIL_DB_TABLE} ${DET_TABLE_ALIAS}`;
            FROM = [details_FROM];
            //WHERE
            const details_WHERE = `LOWER(${DET_TABLE_ALIAS}.${WO_DETAILS.WO_URL}) LIKE LOWER(?)`
            workID && (WHERE.push(details_WHERE), PARAMS_VALUES.push(workID));

            const allQuery = createDynamicQuery(SELECT,FROM,WHERE);

            //LIMIT
            const limitDetails = LIMIT_DET || 1;
            limitDetails && (allQuery.concat(`LIMIT ?`), PARAMS_VALUES.push(limitDetails));
             
            const [rows] = await conn.query(allQuery,PARAMS_VALUES);
            if (rows?.affectedRows == 0) throw new Error("work details dont found");
            return rows?.find(detail => detail);
        } catch (error) {
            console.error(error.message)
            throw new Error("work details dont found")
        }
    };
    getWorkMedias = async(params) =>{
        try {
            let { workID } = params;
            const { WDM_DB, WDM_NAMES, WDM_MEDIA_TABLE, WDM_TABLE_ALIAS } = WDM_PROPS;
            const media_SELECT = WDM_DB.map((item, i) => { return `${WDM_TABLE_ALIAS}.${WDM_DB[i]} AS ${WDM_NAMES[i]}` }).join();

            const query = `SELECT ${media_SELECT}
                            FROM ${WDM_MEDIA_TABLE} ${WDM_TABLE_ALIAS}
                            WHERE ${WDM_TABLE_ALIAS}.${WDM_DETAILS.WO_URL} like ?`
            let PARAMS_VALUES = [workID]

            const [rows] = await conn.query(query, PARAMS_VALUES);
            if (rows?.affectedRows == 0) return [];
            return rows;
        } catch (error) {
            console.error(error.message)
            return []
        }
    }
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
