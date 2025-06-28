
const TRANSLATION = {
    //PROPS ITEM ⇣ | ⇣ DB TABLE NAME 
    id_ref:'TARGET_ID',
    text:'TEXT',
    category:'CATEGORY',
    obj_prop:'TYPE',
    language:'LANGUAGUE_CODE',
}
const TRANSLATION_DB_TABLE = "TRANSLATIONS"
const TR_DB_TABLE_ALIAS = "TR"
const TR_SELECT = Object.entries(TRANSLATION).map(([alias, column]) => `${TR_DB_TABLE_ALIAS}.${column} AS ${alias}`).join();
export const TR_DB_PROPS = {TR_SELECT,TRANSLATION_DB_TABLE,TR_DB_TABLE_ALIAS,TRANSLATION}  


const LANGUAGUE = { 
//PROPS ITEM ⇣ | ⇣ DB TABLE NAME 
     language:'CODE',
     name:'NAME',
     flag:'flag_url',
     icon:'emoji'
}
const LANGUAGUE_DB_TABLE = "LANGUAGUES"
const LNG_DB_TABLE_ALIAS = "LNG"
const LNG_SELECT = Object.entries(LANGUAGUE).map(([alias, column]) => `${LNG_DB_TABLE_ALIAS}.${column} AS ${alias}`).join();
export const LNG_DB_PROPS = {LNG_SELECT,LNG_DB_TABLE_ALIAS,LANGUAGUE_DB_TABLE,LANGUAGUE} 