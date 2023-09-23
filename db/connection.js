// get the client
const mysql = require('mysql2');

// create the connection to database
// const db = `mysql://root:root@localhost:3306/employeetracker`;
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'employeetracker',
  password: 'root'
});

module.exports = connection