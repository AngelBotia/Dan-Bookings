//WORKS///////////////////////////////////////////////////////////////////////////////////////////
export const WORKS = { 
 //PROPS ITEM ⇣ | ⇣ DB TABLE PROPS 
        ID_WORK: "WO_ID",
        WO_NAME:"WO_NAME",
        URL: "WO_URL",
        ORDER_INDEX: "WO_ORDER",
        IMAGE_URL: "WO_IMAGE_URL",
        IS_VISIBLE: "WO_VISIBLE"
    }
    const WO_NAMES=Object.keys(WORKS)
    const WO_DB=Object.values(WORKS)
    const WO_DB_TABLE = "WORKS"
    const WO_DB_TABLE_ALIAS = "WO"
    const LIMIT_WORKS = 15;
    const work_SELECT = WO_DB.map((item, i) => { return `${WO_DB_TABLE_ALIAS}.${WO_DB[i]} AS ${WO_NAMES[i]}` }).join();
        

                //                TABLE NAME ⇣   TABLE NAME ALIAS ⇣  LIMIT ROWS ⇣     
export const WO_DB_PROPS = {work_SELECT,WO_DB_TABLE,WO_DB_TABLE_ALIAS,LIMIT_WORKS}  
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//---------------------------------------------------------------------------------------------------------------
//DETAILS ///////////////////////////////////////////////////////////////////////////////////////////////////////
export const WO_DETAILS = {
//PROPS ITEM ⇣ | ⇣ DB TABLE PROPS 
    DETAIL_ID: "DETAIL_ID",
    WO_URL: "WO_URL",
    DESCRIPTION: "DE_DESCRIPTION",
    TITLE: "DE_TITLE",
    MAIN_IMG_URL: "MAIN_IMG_URL"
}  
const DETAIL_DB_TABLE="WORK_DETAILS"
const DET_TABLE_ALIAS ="DET"
const LIMIT_DET = 1;
const DET_DB=Object.values(WO_DETAILS) 
const DET_NAMES=Object.keys(WO_DETAILS)
const details_SELECT = DET_DB.map((item, i) => { return `${DET_TABLE_ALIAS}.${DET_DB[i]} AS ${DET_NAMES[i]}` }).join();
                                    // TABLE NAME ⇣  TABLE NAME ALIAS ⇣   LIMIT ROWS ⇣     
export const DETAILS_PROPS = {details_SELECT, DETAIL_DB_TABLE,DET_TABLE_ALIAS,LIMIT_DET}  

/////////////////////////////////////////////////////////////////////////////////////////////////////////
//---------------------------------------------------------------------------------------------------------------
//WORK DETAILS MEDIA /////////////////////////////////////////////////////////////////////////////////////////

export const WDM_DETAILS = {
    ID: "DETAILS_MEDIA_ID",
    WO_URL: "WO_URL",
    URL_MEDIA: "URL_MEDIA",
    TYPE_MEDIA: "TYPE_MEDIA",
}
const WDM_MEDIA_TABLE="WORK_DETAILS_MEDIA"
const WDM_TABLE_ALIAS ="WDM"
const WDM_DB=Object.values(WDM_DETAILS)
const WDM_NAMES=Object.keys(WDM_DETAILS)
const media_SELECT = WDM_DB.map((item, i) => { return `${WDM_TABLE_ALIAS}.${WDM_DB[i]} AS ${WDM_NAMES[i]}` }).join();

                                 //TABLE NAME ⇣   TABLE NAME ALIAS⇣          
export const WDM_PROPS = {media_SELECT, WDM_MEDIA_TABLE,WDM_TABLE_ALIAS}  
