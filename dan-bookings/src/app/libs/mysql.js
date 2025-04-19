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
  keepAliveInitialDelay: 0
});
