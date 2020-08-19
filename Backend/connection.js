const mysql = require("mysql");
require('dotenv').config();

var mysqlConnection = mysql.createConnection({
  host: process.env.HOST_NAME,
  user: "admin",
  password: process.env.DB_PASSWORD,
  database: process.env.DB, 
  multipleStatements: true,
});

mysqlConnection.connect((err)=>{
  if(err){
    console.log("ahhhhhsa")

  }
  else{
    console.log("asa")
  }
})

module.exports={mysqlConnection};
  

