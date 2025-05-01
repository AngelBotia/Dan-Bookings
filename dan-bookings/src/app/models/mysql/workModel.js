import { conn } from "../../libs/mysql/mysql";
import { createDynamicQuery } from "../../libs/mysql/queryHelpers";
import { DETAILS_PROPS,WDM_PROPS,WO_DB_PROPS } from "../../constants/worksDB"

export class workModelMYSQL{
    getAllWorks = async ({ limit, page }) => {
    
        let SELECT = [], FROM = [], WHERE = [], ORDER = [], PARAMS_VALUES = [];
        try {
            const {work_SELECT, WO_DB_TABLE, WO_DB_TABLE_ALIAS,LIMIT_WORKS,WORKS} = WO_DB_PROPS;

            //SELECT
             SELECT = [work_SELECT];
            //FROM
            const work_FROM = `${WO_DB_TABLE} ${WO_DB_TABLE_ALIAS}`
             FROM = [work_FROM];
            //WHERE
             WHERE = [];
            //ORDER
            const orderByIndex = `${WO_DB_TABLE_ALIAS}.${WORKS.ORDER_INDEX}`
             ORDER = [orderByIndex];

            let allQuery = createDynamicQuery(SELECT,FROM,WHERE,ORDER);
            
            //LIMIT PAGE
            const limitWorks = Number(limit) || LIMIT_WORKS;
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
    getWorkDetail = async({ workID }) =>{
        let SELECT = [], FROM = [], WHERE = [], ORDER = [], PARAMS_VALUES = [];
        try {
            if (!workID) throw new Error("work ID is required");
            const { details_SELECT, DETAIL_DB_TABLE,DET_TABLE_ALIAS,LIMIT_DET,WO_DETAILS} = DETAILS_PROPS; 

            //SELECT
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
    getWorkMedias = async({ workID }) =>{
        try {
            if(!workID) return [];
            const { media_SELECT, WDM_MEDIA_TABLE, WDM_TABLE_ALIAS,WDM_DETAILS} = WDM_PROPS;
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
    createWork = async (work) => {
        try {
            const {work_SELECT, WO_DB_TABLE, WO_DB_TABLE_ALIAS,WORKS} = WO_DB_PROPS;
            const { WO_URL } = work  || {};

            const [result] = await conn.query(`INSERT into ${WO_DB_TABLE} SET ?`,work);
            if(result.affectedRows === 0) return null;
            
            const [rows] =  await conn.query(`SELECT ${work_SELECT} FROM ${WO_DB_TABLE} ${WO_DB_TABLE_ALIAS}  WHERE ${WO_DB_TABLE_ALIAS}.${WORKS.URL} = ?`,[WO_URL]);
            if (rows?.affectedRows == 0) return null;

            const newWork = rows?.find(work => work);;
            return newWork;
        } catch (error) {
            console.error(error.message);
            return null;
        }
    }
    createDetailWork = async (work) =>{
        try {
            const { URL, WO_NAME, IMAGE_URL } = work || {};
            const {details_SELECT, DETAIL_DB_TABLE,DET_TABLE_ALIAS,WO_DETAILS}  = DETAILS_PROPS;
            const { WO_URL ,TITLE, MAIN_IMG_URL } = WO_DETAILS

            
            const workToSave ={
               [WO_URL]: URL,
               [TITLE]: WO_NAME,
               [MAIN_IMG_URL]: IMAGE_URL
            }
        
            
            const [result] = await conn.query(`INSERT into ${DETAIL_DB_TABLE} SET ?`,workToSave);
            if(result.affectedRows === 0) return null;
            
            const [rows] =  await conn.query(`SELECT ${details_SELECT} FROM ${DETAIL_DB_TABLE} ${DET_TABLE_ALIAS}  WHERE ${DET_TABLE_ALIAS}.${WO_URL} = ?`,[URL]);
            if (rows?.affectedRows == 0) return null;

            const newDetail = rows?.find(work => work);;
            return newDetail;
             
        } catch (error) {
            console.error(error.message);
            return null;
        }
    }
    deleteWork = async (id) =>{
        //TODO:DELETE WORK BY ID
    }
    updateWork = async(work) => {
        //TODO EDIT WORK
    }

}
