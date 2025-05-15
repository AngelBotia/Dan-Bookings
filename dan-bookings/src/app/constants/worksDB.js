//WORKS///////////////////////////////////////////////////////////////////////////////////////////
const WORKS = { 
 //PROPS ITEM ⇣ | ⇣ DB TABLE NAME 
        ID_WORK: "WO_ID",
        WO_NAME:"WO_NAME",
        URL: "WO_URL",
        ORDER_INDEX: "WO_ORDER",
        IMAGE_URL: "WO_IMAGE_URL",
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
    DETAIL_ID: "DETAIL_ID",
    WO_URL: "WO_URL",
    DESCRIPTION: "DE_DESCRIPTION",
    TITLE: "DE_TITLE",
    MAIN_IMG_URL: "MAIN_IMG_URL"
}  
const DETAIL_DB_TABLE="WORK_DETAILS"
const DET_TABLE_ALIAS ="DET"
const LIMIT_DET = 1;
const details_SELECT = Object.entries(WO_DETAILS).map(([alias, column]) => `${DET_TABLE_ALIAS}.${column} AS ${alias}`).join();

export const DETAILS_PROPS = {details_SELECT, DETAIL_DB_TABLE,DET_TABLE_ALIAS,LIMIT_DET,WO_DETAILS}  

/////////////////////////////////////////////////////////////////////////////////////////////////////////
//---------------------------------------------------------------------------------------------------------------
//WORK DETAILS MEDIA /////////////////////////////////////////////////////////////////////////////////////////

const WDM_DETAILS = {
//PROPS ITEM ⇣ | ⇣ DB TABLE NAME 
    ID: "DETAILS_MEDIA_ID",
    WO_URL: "WO_URL",
    URL_MEDIA: "URL_MEDIA",
    TYPE_MEDIA: "TYPE_MEDIA",
}
const WDM_MEDIA_TABLE="WORK_DETAILS_MEDIA"
const WDM_TABLE_ALIAS ="WDM"
const media_SELECT = Object.entries(WDM_DETAILS).map(([alias, column]) => `${WDM_TABLE_ALIAS}.${column} AS ${alias}`).join();


export const WDM_PROPS = {media_SELECT, WDM_MEDIA_TABLE,WDM_TABLE_ALIAS,WDM_DETAILS}  
