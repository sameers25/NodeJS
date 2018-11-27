var express = require("express");
var Students = require("../models/Students");
var math = require("mathjs");
var replace = require("str-replace");
var mongoose = require("mongoose");
var request = require("request");
var studentRouter = express.Router();
var obj = {};

studentRouter
    .route("/getStudentListById")
    .post(function (req1, res1) {
        console.log(req1.body);
        //Get Document By ID     
        Students.findOne({ _id: mongoose.Types.ObjectId(req1.body.UserId) }).
            exec(function (error2, student) {
                if (error2) {
                    console.log("Not found");
                    obj.status = { "code": "500", "message": "Something went wrong" };
                    obj.res = error;
                    res1.status(500).send(obj);
                    return;
                }
                if (student) {
                    console.log("found");
                    obj.status = { "code": "200", "message": "Success" };
                    obj.result = student;
                    res1.status(200).send(obj);
                    return;
                }

                else {

                    console.log("Invalid User Id");
                    obj.status = { "code": "201", "message": "Invalid UserId" };
                    // obj.res = error;
                    res1.status(201).send(obj);
                    return;
                }

            });
    });


//Get All document
studentRouter
    .route("/getStudentList")
    .post(function (req1, res1) {
        console.log(req1.body);
        Students.find({}).
            exec(function (error2, student) {
                if (error2) {
                    console.log("Not found");
                    obj.status = { "code": "500", "message": "Something went wrong" };
                    obj.res = error;
                    res1.status(500).send(obj);
                    return;
                }
                if (student) {
                    console.log("found");
                    obj.status = { "code": "200", "message": "Success" };
                    obj.result = student;
                    res1.status(200).send(obj);
                    return;
                }

                else {

                    console.log("Invalid User Id");
                    obj.status = { "code": "201", "message": "Invalid UserId" };
                    // obj.res = error;
                    res1.status(201).send(obj);
                    return;
                }

            });
    });



studentRouter
    .route("/addStudent")
    .post(function (req, res) {
        console.log(req.body);
        const newTodoObj = new Students(req.body);
        newTodoObj.save(err => {
            if (err) return res.status(500).send(err);
            return res.status(200).send(newTodoObj);
        });
    });

//Update by ID
studentRouter
    .route("/updateStudentListById")
    .post(function (req1, res1) {
        console.log(req1.body);
        Students.findByIdAndUpdate(req1.body.UserId, req1.body, { new: true }, function (err, student) {
            res1.send(student);
        });
    });

//Delete by ID
studentRouter
    .route("/deleteStudentListById")
    .post(function (req, res) {
        console.log(req.body);
        Students.findByIdAndRemove(req.body.UserId, (err, students) => {
            // As always, handle any potential errors:
            if (err) return res.status(500).send(err);
            // We'll create a simple object to send back with a message and the id of the document that was removed
            // You can really do this however you want, though.
            const response = {
                message: "Todo successfully deleted",
                id: students._id
            };
            return res.status(200).send(response);
        });
    });



module.exports = studentRouter;