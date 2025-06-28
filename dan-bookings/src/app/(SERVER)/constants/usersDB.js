export const API_KEY = process.env.NEXT_PUBLIC_MY_API_KEY;
const USER = { 
    //PROPS ITEM ⇣ | ⇣ DB TABLE NAME 
           id:"ID_AUTH",
           ID_USER: "ID_USER",
           user: "USER_NAME",
           email: "EMAIL",
           rol: "ROL"
       }
       

       const USERS_DB_TABLE = "USERS"
       const US_DB_TABLE_ALIAS = "US"
       const LIMIT_USERS = 1;
       const user_SELECT = Object.entries(USER).map(([alias, column]) => `${US_DB_TABLE_ALIAS}.${column} AS ${alias}`).join();
      
   
   export const US_DB_PROPS = {user_SELECT,USERS_DB_TABLE,US_DB_TABLE_ALIAS,LIMIT_USERS,USER}  