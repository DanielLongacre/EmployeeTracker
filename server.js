const express = require('express');
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;
const app = express();

//Connect to the database
const db = `mysql://root:root@localhost:3306/employeetracker`;

//Express middleware
app.use(express.urlencoded({ extended: flase }));
app.use(express.json());

