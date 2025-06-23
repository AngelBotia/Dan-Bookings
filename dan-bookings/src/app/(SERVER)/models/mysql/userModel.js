import { userAuthSchema } from "../../../schema/userSchema";
import { US_DB_PROPS } from "../../../constants/usersDB";
import { conn,createDynamicQuery } from "../../libs/mysql/mysql";
const crypto = require('crypto');


export class UserModelMYSQL{
  
    createNewUser = async ({id,email,name}) =>{
      try {
        userAuthSchema.parse({id,email,name});
        const  {user_SELECT,USERS_DB_TABLE,US_DB_TABLE_ALIAS,LIMIT_USERS,USER,USER_ROLS} = US_DB_PROPS; 
        
        const userToSave = {
          [USER.id]:id,
          [USER.email]:email,
          [USER.user]:name
        }

        const [result] = await conn.query(`INSERT into ${USERS_DB_TABLE} SET ?`,[userToSave]);
        if(result.affectedRows === 0) return null;
        
        const [rows] =  await conn.query(`SELECT ${user_SELECT} FROM ${USERS_DB_TABLE} ${US_DB_TABLE_ALIAS}  WHERE ${US_DB_TABLE_ALIAS}.${USER.id} = ? LIMIT ?`,[id,LIMIT_USERS]);
        if (rows?.affectedRows == 0) return null;

        const newUser = rows?.find(work => work )|| null;
        return newUser;
      } catch (error) {
        console.error(error);
        return null;
      }
    }

    getUser = async  ({email,name,id}) =>{
      let SELECT = [], FROM = [], WHERE = [], PARAMS_VALUES = [];

      try {
        userAuthSchema.parse({id,email,name});
        const  {user_SELECT,USERS_DB_TABLE,US_DB_TABLE_ALIAS,LIMIT_USERS,USER,USER_ROLS} = US_DB_PROPS; 

        //SELECT
        SELECT = [user_SELECT];
        //FROM
        const user_FROM = `${USERS_DB_TABLE} ${US_DB_TABLE_ALIAS}`
        FROM = [user_FROM];
        
        //WHERE
        const emailWhere = `LOWER(${US_DB_TABLE_ALIAS}.${USER.email}) LIKE LOWER(?)`
        const nameWhere = `LOWER(${US_DB_TABLE_ALIAS}.${USER.user}) LIKE LOWER(?)`
        const idWhere = `${US_DB_TABLE_ALIAS}.${USER.id} = ?`
        WHERE = [emailWhere,nameWhere,idWhere];
        PARAMS_VALUES.push(email,name,id);
        
        let allQuery = createDynamicQuery(SELECT,FROM,WHERE);
        
        //LIMIT
        allQuery = allQuery.concat(` LIMIT ?`)
        PARAMS_VALUES.push(LIMIT_USERS)

        const [rows] = await conn.query(allQuery, PARAMS_VALUES);
        if (rows.affectedRows === 0) return null;
        return rows?.find(item => item) || null;
      } catch (error) {
        console.error(error)
        return null;
      }
    }
    checkApikey = (key)=>{
      try {
        if(!key) return false;
        const buf1 = Buffer.from(key, 'hex');
        const buf2 = Buffer.from(process.env.NEXT_PUBLIC_MY_API_KEY, 'hex');
      
        if (buf1.length !== buf2.length) return false;
  
        return !!crypto.timingSafeEqual(buf1, buf2);
        
      } catch (error) {
        return false;
      }
 
    }
}
