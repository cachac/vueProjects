const muysql = require("mysql");
const mysqlConnection = muysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
});

mysqlConnection.connect(err => {
  if (!err) {
    console.log("DB Conn succeded !!");
  } else {
    //throw new Error("DB Conn FAILED: " + err.message);
    console.log("DB Conn FAILED-x: " + err.message);
    return;
  }
});

module.exports = mysqlConnection;
