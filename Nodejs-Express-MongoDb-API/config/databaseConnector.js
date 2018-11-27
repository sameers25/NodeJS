var mysql = require('mysql');

var con = mysql.createConnection({
    // host: "rpainstance.chqsdddmmhkf.us-east-1.rds.amazonaws.com",
    // user: "rpaadmin_root",
    // password: "vdzChQ3aafK4fDuJ",
    // host: "localhost",
    // user: "root",
    // password: "",
    database: "rpapilot",
    multipleStatements: true
});

con.connect(function (err) {
    if (err) {
        console.log('Error connecting to Database');
        return;
    } 
    console.log('Connection established @' + "rpainstance.chqsdddmmhkf.us-east-1.rds.amazonaws.com" );
});

module.exports = con;