import { conn ,createDynamicQuery} from "../libs/mysql";
import { DETAILS_PROPS,WO_DB_PROPS } from "./work.constant"

const {work_SELECT, WO_DB_TABLE, WO_DB_TABLE_ALIAS,LIMIT_WORKS,WORKS} = WO_DB_PROPS;
const {details_SELECT, DETAIL_DB_TABLE,DET_TABLE_ALIAS,LIMIT_DET,WO_DETAILS} = DETAILS_PROPS; 

export class workModelMYSQL{
    getAllWorks = async ({ isAdmin,ID_WORK,CATEGORY,limit, page }) => {
    
        let SELECT = [], FROM = [], WHERE = [], ORDER = [], PARAMS_VALUES = [];
        try {
            //SELECT
             SELECT = [work_SELECT];
            //FROM
            const work_FROM = `${WO_DB_TABLE} ${WO_DB_TABLE_ALIAS}`
             FROM = [work_FROM];
            //WHERE
            WHERE = [];
            if(!isAdmin){
                WHERE.push(`${WO_DB_TABLE_ALIAS}.${WORKS.IS_VISIBLE} = ?`)
                PARAMS_VALUES.push(1)//1 -> VISIBLE 
            }
            if(ID_WORK){
                const idWork_WHERE = `${WO_DB_TABLE_ALIAS}.${WORKS.ID_WORK} = ?`
                WHERE.push(idWork_WHERE)
                PARAMS_VALUES.push(ID_WORK)
            }
            if(CATEGORY){
                const type_Where = `${WO_DB_TABLE_ALIAS}.${WORKS.CATEGORY} = ?`
                WHERE.push(type_Where);
                PARAMS_VALUES.push(CATEGORY);
            }
            //ORDER
            const orderByIndex = `${WO_DB_TABLE_ALIAS}.${WORKS.ORDER_INDEX}`
            ORDER = [orderByIndex];

            let allQuery = createDynamicQuery(SELECT,FROM,WHERE,ORDER);
            
            //LIMIT PAGE
            const limitWorks = Number(limit) || LIMIT_WORKS;
            const pageWorks =  Number(page) || 0;
            if(limitWorks)  {
              allQuery = allQuery.concat(` LIMIT ? OFFSET ? `)
              PARAMS_VALUES.push(limitWorks,pageWorks)
            }
            
            const [rows] = await conn.query(allQuery,PARAMS_VALUES);
            if (rows?.affectedRows == 0) throw new Error("works dont found");
            return rows

        } catch (error) {
            console.error(error.message);
            throw new Error("works dont found")
        }
    };
    createWork = async (work) => {
        try {
            const { URL ,IMAGE_URL, CATEGORY } = work  || {};
           
            const [allWorks] = await conn.query(`SELECT COUNT(*) AS TOTAL FROM ${WO_DB_TABLE}`);
            const workToSave = {
                [WORKS.CATEGORY]: CATEGORY,
                [WORKS.URL]: URL,
                [WORKS.ORDER_INDEX]:Number(allWorks[0].TOTAL) + 1 || null
            }

            const [result] = await conn.query(`INSERT into ${WO_DB_TABLE} SET ?`,[workToSave]);
            if(result.affectedRows === 0) return null;

            const [rows] =  await conn.query(`SELECT ${work_SELECT} FROM ${WO_DB_TABLE} ${WO_DB_TABLE_ALIAS}  WHERE ${WO_DB_TABLE_ALIAS}.${WORKS.URL} = ?`,[URL]);
            if (rows?.affectedRows == 0) return null;

            const newWork = rows?.find(work => work) || null;
            return newWork;
        } catch (error) {
            console.error(error.message);
            return null;
        }
    };
    deleteWork = async ({ ID_WORK }) => {
        if (!ID_WORK) return null;
        const [deleteResult] = await conn.query(`DELETE FROM ${WO_DB_TABLE} ${WO_DB_TABLE_ALIAS} WHERE ${WO_DB_TABLE_ALIAS}.${WORKS.ID_WORK} = ?`, [ID_WORK]);
        
        const reOrderQuery = `WITH ordered_work AS ( SELECT WO_ID, ROW_NUMBER() OVER (ORDER BY WO_ORDER) AS indexToSave FROM ${WO_DB_TABLE} )
                                    UPDATE ${WO_DB_TABLE}
                                    JOIN ordered_work ON ${WO_DB_TABLE}.${WORKS.ID_WORK} = ordered_work.${WORKS.ID_WORK}
                                    SET works.${WORKS.ORDER_INDEX} = ordered_work.indexToSave`;
        const [reOrderResult] = await conn.query(reOrderQuery);

        return !deleteResult.affectedRows == 0
    };
    updateWork = async(work) => {
        //TODO VALID SCHEMA
        const { ID_WORK, ORDER_INDEX, IS_VISIBLE, URL, IMAGE_URL } = work  || {};
        
        const [allWorks] = await conn.query(`SELECT COUNT(*) AS TOTAL FROM ${WO_DB_TABLE}`);
        const workToUpdate = {
            [WORKS.ID_WORK]:ID_WORK,
            [WORKS.URL]: URL,
            [WORKS.ORDER_INDEX]: Number(ORDER_INDEX) ||Number(allWorks[0].TOTAL) + 1 ,
            [WORKS.IS_VISIBLE]: Number(IS_VISIBLE) || 0
        }
        //NEW IMG
        if(IMAGE_URL && typeof IMAGE_URL === 'string' ) workToUpdate[WORKS.IMAGE_URL] = IMAGE_URL;

        const [result] = await conn.query(`UPDATE ${WO_DB_TABLE} SET ? WHERE ${WORKS.ID_WORK} = ?`,[workToUpdate,ID_WORK]);
        if(result.affectedRows === 0) return null;

        const [rows] =  await conn.query(`SELECT ${work_SELECT} FROM ${WO_DB_TABLE} ${WO_DB_TABLE_ALIAS}  WHERE ${WO_DB_TABLE_ALIAS}.${WORKS.URL} = ?`,[URL]);
        if (rows?.affectedRows == 0) return null;

        const updatedWork = rows?.find(work => work) || null;
        return updatedWork;
    };



    getWorkDetail = async({ URL }) =>{
        let SELECT = [], FROM = [], WHERE = [], ORDER = [], PARAMS_VALUES = [];
        try {
            if (!URL) throw new Error("work URL is required");


            SELECT = [details_SELECT]
            //FROM
            const details_FROM = `${DETAIL_DB_TABLE} ${DET_TABLE_ALIAS}`;
            FROM = [details_FROM];
            //WHERE
            const details_WHERE = `LOWER(${DET_TABLE_ALIAS}.${WO_DETAILS.WO_URL}) LIKE LOWER(?)`
            if(URL){
                WHERE.push(details_WHERE);
                PARAMS_VALUES.push(URL);
            }

            const allQuery = createDynamicQuery(SELECT,FROM,WHERE);

            //LIMIT
            const limitDetails = LIMIT_DET || 1;
            limitDetails && (allQuery.concat(`LIMIT ?`), PARAMS_VALUES.push(limitDetails));
             
            const [rows] = await conn.query(allQuery,PARAMS_VALUES);
            if (rows?.affectedRows == 0) throw new Error("work details dont found");
            return rows?.find(detail => detail) || null;
        } catch (error) {
            console.error(error.message)
            throw new Error("work details dont found")
        }
    };
    createDetailWork = async (work) =>{
        try {
            const { URL, WO_NAME, IMAGE_URL } = work || {};
            const {details_SELECT, DETAIL_DB_TABLE,DET_TABLE_ALIAS,WO_DETAILS}  = DETAILS_PROPS;
            const { WO_URL ,TITLE, MAIN_IMG_URL } = WO_DETAILS

            
            const workToSave ={
               [WO_URL]: URL,
               [TITLE]: WO_NAME,
            }
        
            
            const [result] = await conn.query(`INSERT into ${DETAIL_DB_TABLE} SET ?`,[workToSave]);
            if(result.affectedRows == 0) return null;
            
            const [rows] =  await conn.query(`SELECT ${details_SELECT} FROM ${DETAIL_DB_TABLE} ${DET_TABLE_ALIAS}  WHERE ${DET_TABLE_ALIAS}.${WO_URL} = ?`,[URL]);
            if (rows?.affectedRows == 0) return null;

            const newDetail = rows?.find(work => work) || null;
            return newDetail;
             
        } catch (error) {
            console.error(error.message);
            return null;
        }
    };
    updateWorkDetail = async(detail) =>{
        try {
            const { WO_URL, DESCRIPTION, TITLE, MAIN_IMG_URL } = detail || {};
            const detailToUpdate = {
                [WO_DETAILS.WO_URL]: WO_URL,
                [WO_DETAILS.DESCRIPTION]: DESCRIPTION,
                [WO_DETAILS.TITLE]: TITLE,
            } 
            //NEW IMG
            if( MAIN_IMG_URL && typeof MAIN_IMG_URL === 'string' ) detailToUpdate[WO_DETAILS.MAIN_IMG_URL] = MAIN_IMG_URL;
            
            const [result] = await conn.query(`UPDATE ${DETAIL_DB_TABLE} ${DET_TABLE_ALIAS} SET ? WHERE ${DET_TABLE_ALIAS}.${WO_DETAILS.WO_URL} = ?`,[detailToUpdate,WO_URL]);
            if(result.affectedRows === 0) return null;
            
            const [rows] =  await conn.query(`SELECT ${details_SELECT} FROM ${DETAIL_DB_TABLE} ${DET_TABLE_ALIAS}  WHERE ${DET_TABLE_ALIAS}.${WO_DETAILS.WO_URL} = ?`,[WO_URL]);
            if (rows?.affectedRows == 0) return null;
            
            const updatedDetail = rows?.find(work => work) || null;
            return updatedDetail || null;
            return result;
        } catch (error) {
            console.error(error.message);
            return null;
        }
    };
    deleteWorkDetail = async (URL) =>{
        if (!URL) return null;
        const [deleteResult] = await conn.query(`DELETE FROM ${DETAIL_DB_TABLE} ${DET_TABLE_ALIAS} WHERE ${DET_TABLE_ALIAS}.${WO_DETAILS.WO_URL} = ?`, [URL]);

        return !deleteResult.affectedRows == 0;
    }

    
}
