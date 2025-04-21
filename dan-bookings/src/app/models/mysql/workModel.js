import { conn } from "../../libs/mysql";
import { DETAILS_PROPS,WDM_DETAILS,WDM_PROPS,WO_DB_PROPS, WO_DETAILS } from "../../constants/worksDB"


export class workModelMYSQL{
    getAllWorks = async () => {
        try {
            const {WO_DB, WO_NAMES, WO_DB_TABLE, WO_DB_TABLE_ALIAS} = WO_DB_PROPS;

            const work_SELECT = WO_DB.map((work, i) => { return `${WO_DB_TABLE_ALIAS}.${WO_DB[i]} AS ${WO_NAMES[i]}` }).join();
            const SELECT = [`SELECT`,work_SELECT];

            const work_FROM = `${WO_DB_TABLE} ${WO_DB_TABLE_ALIAS}`
            const FROM = [`FROM`,work_FROM];

            const WHERE = [];

            const ORDER = [];

            const LIMIT = [];

            const allQuery = [...SELECT, ...FROM, ...WHERE, ...ORDER,...LIMIT].join(" ");

            const [rows] = await conn.query(allQuery);
            if (rows?.affectedRows == 0) throw new Error("works dont found");
            return rows
        } catch (error) {
            throw new Error("works dont found")
        }
    };
    getWorkDetails = async(workURL) =>{
        try {
            const { DET_DB, DET_NAMES, DETAIL_DB_TABLE,DET_TABLE_ALIAS } = DETAILS_PROPS;
            const params = []; 

            const details_SELECT = DET_DB.map((work, i) => { return `${DET_TABLE_ALIAS}.${DET_DB[i]} AS ${DET_NAMES[i]}` }).join();
            const SELECT = [`SELECT`,details_SELECT];

            const details_FROM = `${DETAIL_DB_TABLE} ${DET_TABLE_ALIAS}`
            const FROM = [`FROM`,details_FROM];
            
            const urlDetails = `${DET_TABLE_ALIAS}.${WO_DETAILS.WO_URL} like ?`
            const WHERE = ['WHERE',urlDetails];
            params.push(workURL);

            const ORDER = [];
            
            const LIMIT = [];

            const allQuery = [...SELECT, ...FROM, ...WHERE, ...ORDER,...LIMIT].join(" ");
            const [rows] = await conn.query(allQuery,params);
            if (rows?.affectedRows == 0) throw new Error("work details dont found");
            return rows[0];
        } catch (error) {
            console.error(error.message)
            throw new Error("work details dont found")
        }
    };
    getWorkMediaDetails = async(workURL) =>{
        try {
            const { WDM_DB, WDM_NAMES, WDM_MEDIA_TABLE, WDM_TABLE_ALIAS } = WDM_PROPS;
            const media_SELECT = WDM_DB.map((work, i) => { return `${WDM_TABLE_ALIAS}.${WDM_DB[i]} AS ${WDM_NAMES[i]}` }).join();

            const query = `SELECT ${media_SELECT}
                            FROM ${WDM_MEDIA_TABLE} ${WDM_TABLE_ALIAS}
                            WHERE ${WDM_TABLE_ALIAS}.${WDM_DETAILS.WO_URL} like ?`
            const params = [workURL]

            const [rows] = await conn.query(query, params);
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
