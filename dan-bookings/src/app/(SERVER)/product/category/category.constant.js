const CATEGORY = { 
//PROPS ⇣ | ⇣ DB TABLE NAME 
      code:"CODE", 
      icon: "icon",
      name: "NAME"    
}

const CATEGORY_DB_TABLE = "category"
const CAT_DB_TABLE_ALIAS = "CAT"
const LIMIT_CAT = 1;
const category_SELECT = Object.entries(CATEGORY).map(([alias, column]) => `${CAT_DB_TABLE_ALIAS}.${column} AS ${alias}`).join();
      
export const CAT_DB_PROPS = {category_SELECT,CATEGORY_DB_TABLE,CAT_DB_TABLE_ALIAS,LIMIT_CAT,CATEGORY}  