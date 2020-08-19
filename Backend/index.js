const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = process.env.PORT || 3002;
const { mysqlConnection } = require("./connection");
const cors = require("cors");
require('dotenv').config();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post("/post", (req, res,next) => {
  var {
    ParentName,
    ChildName,
    Grade,
    Country,
    Phone,
    Email,
    Code,
    DOB,
  } = req.body;
  console.log(req.body)
  mysqlConnection.query(
    `Select * from course_code where promo_code="${Code}"`,
    (error, result, fields) => {
      if (error) {
        console.log("asasasasasasas");
        console.log(error);
      } else {
        console.log(result);
        if (result.length == 0) {
          let err= new Error("Not a valid Promo Code")
          err.status=500
          next(err)
        } else if (result[0].code_status == "Not Redeemed") {
          var course = result[0].course_id;
          mysqlConnection.query(
            `Update course_code set code_status="Redeemed", date_of_purchase="${new Date().toISOString()}" where promo_code="${Code}"`,
            (error, result, fields) => {
              if (error) {
                console.log("asasasasasasas");
                console.log(error);
              } else {
                console.log(1)
                mysqlConnection.query(
                  `INSERT INTO customer (parent_name,child_name,grade,country,contact,email,promo_code,dob) 
                    values ("${ParentName}","${ChildName}",${Grade},"${Country}",${Phone},"${Email}","${Code}","${DOB}")`,
                  (error, result, fields) => {
                    if (error) {
                      console.log("asasasasasasas");
                      console.log(error);
                    } else {
                      console.log(2)
                      mysqlConnection.query(
                        `Select course_name from firstcry_courses where courseid=${course}`,
                        (err, result, field) => {
                          if (err) {
                            res.send(err);
                          } else {
                            console.log(result);
                            res.send(`Your code has successfully redeemed for course ${result[0].course_name}`);
                          }
                        }
                      );
                    }
                  }
                );
              }
            }
          );
        }else{
          let err= new Error("This code has already redeemed")
          err.status=500
          next(err)
        } 
      }
    }
  );
});

app.use(function (err, req, res, next) {
  
  res.status(500).send({ message: err.message });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
