var mysql = require('mysql');

var con = mysql.createConnection({
    database: "rpapilot",
    multipleStatements: true
});

con.connect(function (err) {
    if (err) {
        console.log('Error connecting to Database');
        return;
    } 
   
});

module.exports = con;
