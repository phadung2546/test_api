var express = require('express')
var cors = require('cors')
require('dotenv').config()
var app = express()
const mysql = require('mysql2')

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: 3306
})

app.use(cors())


app.get('/gets', function (req, res, next) {
  res.json({ msg: 'Hello World' })
  console.log('hello s')
})

app.get('/attractions', function (req, res, next) {
  pool.query("SELECT * FROM attractions", function (err, rows, fields) {
    if (err) {
      console.error("Error message : ", err.message);
      return res.status(500).json({
        message: "Query failed!",
      });
    }
    res.json(rows);
    console.log('Query successful');
  });
});



app.listen(5000, function () {
  console.log("web server listening on port 5000 ")
})