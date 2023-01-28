var mysql=require("mysql")
const util = require('util');
var connection=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"Surajsah@97",
    database:"abdulla"
});



connection.connect(function(error){
    if(error) throw error;
    console.log("connected");
    })

    const query = util.promisify(connection.query).bind(connection);

module.exports=query;
