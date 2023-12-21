const mysql = require('mysql2');
require('dotenv').config();

//==============================================================
const connection = mysql.createConnection({
  host: process.env.HOST,
  database: process.env.MYSQL_DATABASE,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
});
//==============================================================
module.exports = connection;
