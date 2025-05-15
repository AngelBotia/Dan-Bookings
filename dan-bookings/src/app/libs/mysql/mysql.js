import mysql from 'mysql2/promise'

export const conn = mysql.createPool({
  host: process.env.MYSQLDB_HOST,
  user: process.env.MYSQLDB_USER,
  password:process.env.MYSQLDB_PASSWORD,
  database: process.env.MYSQLDB_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  maxIdle: 10,
  idleTimeout: 60000, 
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
  namedPlaceholders: true
});



export const createDynamicQuery = (SELECT,FROM,WHERE,ORDER) =>{
  if( !SELECT?.length || !FROM?.length) throw new Error("SELECT AND FROM ARE REQUIRED")
  const allQuery = [`SELECT`,SELECT.join(),
                    `FROM`,FROM.join()];         
  WHERE?.length && 
      allQuery.push('WHERE',WHERE.join(" AND "));
 
  ORDER?.length && 
      allQuery.push('ORDER BY',ORDER.join());
               
  return allQuery.join(" ")
}