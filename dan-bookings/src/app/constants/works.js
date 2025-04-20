//** DATABASE ATTR
export const WORKS = { 
    //ref↓ = table attr name↓
        ID_WORK: "WO_ID",
        TITLE:"WO_NAME",
        URL: "WO_URL",
        ORDER_INDEX: "WO_ORDER",
        IMAGE_URL: "WO_IMAGE_URL",
        IS_VISIBLE: "WO_VISIBLE"
    }

  export const WO_DB_TABLE = ["WORKS"]  
  export const WO_DB_PROPS = [Object.values(WORKS),Object.keys(WORKS),WO_DB_TABLE]  
