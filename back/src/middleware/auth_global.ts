const jwt = require("jsonwebtoken");
require('dotenv').config({path: '.env'})
const {env} = process;
const { sign } = require('jsonwebtoken');
const mysql = require('mysql2');
const fs_glob = require('fs');
const connection = mysql.createConnection({
    host: env.DB_HOST,
    user: env.DB_USERNAME,
    database: env.DB_NAME,
    password: env.DB_PASSWORD,
});

module.exports = (req, res, next) => {
    req.jwt = jwt;
    req.connection = connection;
    req.env = env
    req.fs = fs_glob
    next()
}