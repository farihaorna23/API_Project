const dotenv = require("dotenv"); //to load enviroment variables from the .env file. importing modules.
const mysql = require("mysql"); //to interact mysql database
//ensuring that enviroment variable from env file are loaded
const envFound = dotenv.config();

//if enviromental variable is not loaded
if (!envFound) {
  throw new Error("Enviroment variable couldn't be loaded");
}

//all the enviroment variables needed to make connection
const connectionData = {
  mysql: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_SCHEMA
  },
  port: parseInt(process.env.PORT)
};

//creating a connection with the database using the enviromental data
const connection = mysql.createPool(connectionData.mysql);

/**
 * Executes a database query.
 * @param {string} qryStr - The SQL query string.
 * @param {Array} values - Values for SQL query (if any).
 * @returns {Promise} - Resolves with query results or rejects with an error.
 */
const query = (qryStr, values) => {
  return new Promise((resolve, reject) => {
    connection.query(qryStr, values, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

module.exports = query;
