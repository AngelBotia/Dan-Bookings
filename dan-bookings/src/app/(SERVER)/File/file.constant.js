const MEDIAS = {
//PROPS ITEM ⇣ | ⇣ DB TABLE NAME 
    ID: "DETAILS_MEDIA_ID",
    ID_REF: "TARGET_ID",
    CATEGORY:"CATEGORY",
    URL_MEDIA: "URL_MEDIA",
    TYPE_MEDIA: "TYPE_MEDIA",
}
const MEDIA_TABLE="MEDIAS"
const MEDIA_TABLE_ALIAS ="MED"
const media_SELECT = Object.entries(MEDIAS).map(([alias, column]) => `${MEDIA_TABLE_ALIAS}.${column} AS ${alias}`).join();


export const WDM_PROPS = {media_SELECT, MEDIA_TABLE,MEDIA_TABLE_ALIAS,MEDIAS}  