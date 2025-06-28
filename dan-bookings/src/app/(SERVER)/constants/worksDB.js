//WORKS///////////////////////////////////////////////////////////////////////////////////////////
const WORKS = { 
 //PROPS ITEM ⇣ | ⇣ DB TABLE NAME 
        ID_WORK: "WO_ID",
        URL: "WO_URL",
        ORDER_INDEX: "WO_ORDER",
        IS_VISIBLE: "WO_VISIBLE"
    }
    const WO_DB_TABLE = "WORKS"
    const WO_DB_TABLE_ALIAS = "WO"
    const LIMIT_WORKS = 15;
    const work_SELECT = Object.entries(WORKS).map(([alias, column]) => `${WO_DB_TABLE_ALIAS}.${column} AS ${alias}`).join();
        

export const WO_DB_PROPS = {work_SELECT,WO_DB_TABLE,WO_DB_TABLE_ALIAS,LIMIT_WORKS,WORKS}  
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//---------------------------------------------------------------------------------------------------------------
//DETAILS ///////////////////////////////////////////////////////////////////////////////////////////////////////
const WO_DETAILS = {
//PROPS ITEM ⇣ | ⇣ DB TABLE NAME
    ID:'WO_ID',
    WO_URL: "WO_URL",
    DESCRIPTION: "DE_DESCRIPTION",
    TITLE: "DE_TITLE"
}  
const DETAIL_DB_TABLE="WORK_DETAILS"
const DET_TABLE_ALIAS ="DET"
const LIMIT_DET = 1;
const details_SELECT = Object.entries(WO_DETAILS).map(([alias, column]) => `${DET_TABLE_ALIAS}.${column} AS ${alias}`).join();

export const DETAILS_PROPS = {details_SELECT, DETAIL_DB_TABLE,DET_TABLE_ALIAS,LIMIT_DET,WO_DETAILS}  

