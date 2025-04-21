//WORKS///////////////////////////////////////////////////////////////////////////////////////////
export const WORKS = { 
 //PROPS ITEM ⇣ | ⇣ DB TABLE PROPS 
        ID_WORK: "WO_ID",
        URL: "WO_URL",
        ORDER_INDEX: "WO_ORDER",
        IMAGE_URL: "WO_IMAGE_URL",
        IS_VISIBLE: "WO_VISIBLE"
    }
    
        //WORKS DB TABLES NAME ⇣
export const WO_DB_TABLE = "WORKS"
export const WO_DB_TABLE_ALIAS = "WO"
                            //PROPS OBJECT ⇣     PROPS TABLE ⇣                TABLE NAME ⇣   TABLE NAME ALIAS ⇣       
export const WO_DB_PROPS = {WO_DB:Object.values(WORKS),WO_NAMES:Object.keys(WORKS),WO_DB_TABLE,WO_DB_TABLE_ALIAS}  
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
export const DETAIL_DB_TABLE="WORK_DETAILS"
export const DET_TABLE_ALIAS ="DET"
                                    //PROPS OBJECT ⇣         PROPS TABLE ⇣                      TABLE NAME ⇣   TABLE NAME ALIAS⇣          
export const DETAILS_PROPS = {DET_DB:Object.values(WO_DETAILS), DET_NAMES:Object.keys(WO_DETAILS), DETAIL_DB_TABLE,DET_TABLE_ALIAS}  

/////////////////////////////////////////////////////////////////////////////////////////////////////////
//---------------------------------------------------------------------------------------------------------------
//WORK DETAILS MEDIA /////////////////////////////////////////////////////////////////////////////////////////

export const WDM_DETAILS = {
    ID: "DETAILS_MEDIA_ID",
    WO_URL: "WO_URL",
    URL_MEDIA: "URL_MEDIA",
    TYPE_MEDIA: "TYPE_MEDIA",
}
export const WDM_MEDIA_TABLE="WORK_DETAILS_MEDIA"
export const WDM_TABLE_ALIAS ="WDM"

                        //PROPS OBJECT ⇣               PROPS TABLE ⇣                   TABLE NAME ⇣   TABLE NAME ALIAS⇣          
export const WDM_PROPS = {WDM_DB:Object.values(WDM_DETAILS), WDM_NAMES:Object.keys(WDM_DETAILS), WDM_MEDIA_TABLE,WDM_TABLE_ALIAS}  
