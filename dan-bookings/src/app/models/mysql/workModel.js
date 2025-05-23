import { conn ,createDynamicQuery} from "../../libs/mysql/mysql";
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
    createWork = async (work) => {
        try {
            const { work_SELECT, WO_DB_TABLE, WO_DB_TABLE_ALIAS,WORKS } = WO_DB_PROPS;
            const { URL ,IMAGE_URL, WO_NAME } = work  || {};
           
            const [allWorks] = await conn.query(`SELECT COUNT(*) AS TOTAL FROM ${WO_DB_TABLE}`);
            const workToSave = {
                [WORKS.URL]: URL,
                [WORKS.WO_NAME]:WO_NAME,
                [WORKS.IMAGE_URL]: IMAGE_URL,
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
        const { work_SELECT, WO_DB_TABLE, WO_DB_TABLE_ALIAS, WORKS } = WO_DB_PROPS;
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
        const { work_SELECT, WO_DB_TABLE, WO_DB_TABLE_ALIAS,WORKS } = WO_DB_PROPS;
        const { ID_WORK, ORDER_INDEX, IS_VISIBLE, URL, IMAGE_URL, WO_NAME } = work  || {};
        
        const [allWorks] = await conn.query(`SELECT COUNT(*) AS TOTAL FROM ${WO_DB_TABLE}`);
        const workToUpdate = {
            [WORKS.ID_WORK]:ID_WORK,
            [WORKS.URL]: URL,
            [WORKS.WO_NAME]:WO_NAME,
            [WORKS.ORDER_INDEX]: Number(ORDER_INDEX) ||Number(allWorks[0].TOTAL) + 1 ,
            [WORKS.IS_VISIBLE]: Number(IS_VISIBLE) || 0
        }
        //NEW IMG
        if(IMAGE_URL) workToUpdate[WORKS.IMAGE_URL] = IMAGE_URL;

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
            const { details_SELECT, DETAIL_DB_TABLE,DET_TABLE_ALIAS,LIMIT_DET,WO_DETAILS} = DETAILS_PROPS; 

            //SELECT
            SELECT = [details_SELECT]
            //FROM
            const details_FROM = `${DETAIL_DB_TABLE} ${DET_TABLE_ALIAS}`;
            FROM = [details_FROM];
            //WHERE
            const details_WHERE = `LOWER(${DET_TABLE_ALIAS}.${WO_DETAILS.WO_URL}) LIKE LOWER(?)`
            URL && (WHERE.push(details_WHERE), PARAMS_VALUES.push(URL));

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
               [MAIN_IMG_URL]: IMAGE_URL
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
            const { details_SELECT, DETAIL_DB_TABLE,DET_TABLE_ALIAS,LIMIT_DET,WO_DETAILS} = DETAILS_PROPS;
            const { DETAIL_ID, WO_URL, DESCRIPTION, TITLE, MAIN_IMG_URL } = detail || {};
            const detailToUpdate = {
                [WO_DETAILS.DETAIL_ID]: Number(DETAIL_ID),
                [WO_DETAILS.WO_URL]: WO_URL,
                [WO_DETAILS.DESCRIPTION]: DESCRIPTION,
                [WO_DETAILS.TITLE]: TITLE,
            } 
            //NEW IMG
            if( MAIN_IMG_URL ) detailToUpdate[WO_DETAILS.MAIN_IMG_URL] = MAIN_IMG_URL;
            
            const [result] = await conn.query(`UPDATE ${DETAIL_DB_TABLE} ${DET_TABLE_ALIAS} SET ? WHERE ${DET_TABLE_ALIAS}.${WO_DETAILS.DETAIL_ID} = ?`,[detailToUpdate,DETAIL_ID]);
            if(result.affectedRows === 0) return null;
            
            const [rows] =  await conn.query(`SELECT ${details_SELECT} FROM ${DETAIL_DB_TABLE} ${DET_TABLE_ALIAS}  WHERE ${DET_TABLE_ALIAS}.${WO_DETAILS.DETAIL_ID} = ?`,[DETAIL_ID]);
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
        const { details_SELECT, DETAIL_DB_TABLE,DET_TABLE_ALIAS,LIMIT_DET,WO_DETAILS} = DETAILS_PROPS; 

        const [deleteResult] = await conn.query(`DELETE FROM ${DETAIL_DB_TABLE} ${DET_TABLE_ALIAS} WHERE ${DET_TABLE_ALIAS}.${WO_DETAILS.WO_URL} = ?`, [URL]);

        return !deleteResult.affectedRows == 0;
    }

    

    getWorkMedias = async({ URL }) =>{
        try {
            if(!URL) return [];
            const { media_SELECT, WDM_MEDIA_TABLE, WDM_TABLE_ALIAS,WDM_DETAILS} = WDM_PROPS;
            const query = `SELECT ${media_SELECT}
                            FROM ${WDM_MEDIA_TABLE} ${WDM_TABLE_ALIAS}
                            WHERE ${WDM_TABLE_ALIAS}.${WDM_DETAILS.WO_URL} like ?`
            let PARAMS_VALUES = [URL]

            const [rows] = await conn.query(query, PARAMS_VALUES);
            console.warn("RESULT MEDIA??--->",rows)
            if (rows?.affectedRows == 0) return [];
            return rows;
        } catch (error) {
            console.error(error.message)
            return []
        }
    };
    createWorkMedias = async (detail) =>{
        try {
            const { media_SELECT, WDM_MEDIA_TABLE,WDM_TABLE_ALIAS,WDM_DETAILS } = WDM_PROPS;
            const { ID, WO_URL, URL_MEDIA,TYPE_MEDIA} = detail;

            const mediaToSave = {
                [WDM_DETAILS.ID]: ID,
                [WDM_DETAILS.WO_URL]: WO_URL,
                [WDM_DETAILS.URL_MEDIA]: URL_MEDIA,
                [WDM_DETAILS.TYPE_MEDIA]: TYPE_MEDIA,
            }


            const [result] = await conn.query(`INSERT into ${WDM_MEDIA_TABLE} SET ?`,[mediaToSave]);
            if(result.affectedRows == 0) return null;
            
            const [rows] =  await conn.query(`SELECT ${media_SELECT} FROM ${WDM_MEDIA_TABLE} ${WDM_TABLE_ALIAS}  WHERE ${WDM_TABLE_ALIAS}.${WO_URL} = ?`,[WO_URL]);
            if (rows?.affectedRows == 0) return null;

            const newMedias = rows?.find(work => work) || null;
            return newMedias;
        } catch (error) {
            console.error(error.message);
            return null;
        }
    };
    updateWorkMedias = async (detail) => {
        try {
            //TODO: CHECK THIS
            const { media_SELECT, WDM_MEDIA_TABLE,WDM_TABLE_ALIAS,WDM_DETAILS } = WDM_PROPS;

            
            const { media , WO_URL} = detail || {};
            if(!media?.length) return [];
            const allPromiseMedia = media.map( workMedia => {
                const {ID, URL_MEDIA, TYPE_MEDIA } = workMedia || {};
                const mediaToSave = {
                    [WDM_DETAILS.ID]: ID,
                    [WDM_DETAILS.WO_URL]: WO_URL,
                    [WDM_DETAILS.TYPE_MEDIA]: TYPE_MEDIA,
                }
               if(URL_MEDIA) mediaToSave[WDM_DETAILS.URL_MEDIA] = URL_MEDIA;

               return conn.query(`UPDATE ${WDM_MEDIA_TABLE} ${WDM_TABLE_ALIAS} SET ? WHERE ${WDM_TABLE_ALIAS}.${WDM_DETAILS.ID} = ?`,[mediaToSave,ID]);
            })
            const allResults = await Promise.all(allPromiseMedia);
            if(!allResults?.length) return [];

            const [rows] =  await conn.query(`SELECT ${media_SELECT} FROM ${WDM_MEDIA_TABLE} ${WDM_TABLE_ALIAS}  WHERE ${WDM_TABLE_ALIAS}.${WDM_DETAILS.WO_URL} = ?`,[WO_URL]);
            if (rows?.affectedRows == 0) return [];

            return rows;
        } catch (error) {
            console.error(error.message);
            return [];
        }
    };
    deleteWorkMedias = async ({ID , URL}) => {
        try {
            if (!ID && !URL) return null;
            const { media_SELECT, WDM_MEDIA_TABLE,WDM_TABLE_ALIAS,WDM_DETAILS } = WDM_PROPS;
            
            const deleteBy =  ID ? "ID" : "WO_URL"
            const value = ID || URL


            const [deleteResult] = await conn.query(`DELETE FROM ${WDM_MEDIA_TABLE} ${WDM_TABLE_ALIAS} WHERE ${WDM_TABLE_ALIAS}.${WDM_DETAILS[deleteBy]} = ?`, [value]);
            return !deleteResult.affectedRows == 0;
        } catch (error) {
            console.error(error.message);
            return null; 
        }
    }
}
