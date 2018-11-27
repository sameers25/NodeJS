var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var studentRouter = require("./routers/studentRoutes");
var cors = require("cors");
var config = require("./config/config");



var app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(cors());
// app.use(fileUpload());

var PORT = config.portNum;
var HOST_NAME = config.hostName;
var DATABASE_NAME = config.dbName;

// mongoose.connect("mongodb://" + HOST_NAME + "/" + DATABASE_NAME, { useMongoClient: true });
// mongoose.connect("mongodb://" + HOST_NAME + "/" + DATABASE_NAME, { useMongoClient: true }, function (err) {
 
//    if (err) throw err;
 
//    console.log('Mongo Successfully connected');
 
// });
var mongoDB = 'mongodb://localhost/TestDB';
mongoose.connect(mongoDB);
// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;
//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));






app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

app.use("/home", studentRouter);
// app.use("/home", parameterRouter);
app.use(express.static('./public'));


app.listen(PORT, function () {
  console.log("Listening on port " + PORT);
});

