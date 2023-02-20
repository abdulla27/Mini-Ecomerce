var mysql = require("mysql");
const util = require("util");
var connection = mysql.createConnection({
  // host: "localhost",
  // user: "root",
  // password: "Surajsah@97",
  // database: "abdulla",
  // database: "prismadb",

  host: "sql12.freesqldatabase.com",
  user: "sql12599412",
  password: "Aih4fHYgpg",
  database: "sql12599412",
  port: 3306,
});

connection.connect(function (error) {
  if (error) throw error;
  console.log("connected");
});

const query = util.promisify(connection.query).bind(connection);

module.exports = query;
