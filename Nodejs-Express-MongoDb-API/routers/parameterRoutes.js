var express = require("express");
// var parameterFields = require('../models/parameter');
// var parameter = require('../models/parameter');
var fs = require('fs');
var request = require("request");
var mongoose = require("mongoose");
var parameterRouter = express.Router();
var obj = {};
module.exports = parameterRouter;

/* post api to get all parameter for a bot */
parameterRouter
    .route("/getAllParameterForBotID")
    .post(function (req, response) {
        // find parameter by bot id
        parameter.find({ "BotId": mongoose.Types.ObjectId(req.body.BotId) }).
            exec(function (error, parametersList) {
                if (error) {
                    // console.log("Not found");
                    obj.status = { "code": "500", "message": "Something went wrong" };
                    obj.result = error;
                    response.status(500).send(obj);
                    return;
                }
                else {
                    obj.status = { "code": "200", "message": "Here is the parameters list" };
                    obj.result = parametersList;
                    response.status(200).send(obj);
                    return;
                }
            });
    });


/* post api to delete parameter */

parameterRouter
    .route("/deleteParameterByID")
    .post(function (req, response) {
        // delete parameter by id
        parameter.remove({ "_id": mongoose.Types.ObjectId(req.body.id) }).
            exec(function (error) {
                if (error) {
                    // console.log("Not found");
                    obj.status = { "code": "500", "message": "Something went wrong" };
                    obj.result = error;
                    response.status(500).send(obj);
                    return;
                }
                else {
                    obj.status = { "code": "200", "message": "Parameters deleted successfully." };
                    response.status(200).send(obj);
                    return;
                }
            });
    });


/* post api to add parameter */
parameterRouter
    .route("/addParamater")
    .post(function (req, response) {
        parameter.findOne({ "BotId": mongoose.Types.ObjectId(req.body.BotId), "parameterName": req.body.parameterName }).
            exec(function (errorParamExists, paramExists) {
                if (errorParamExists) {
                    // console.log("Not found");
                    obj.status = { "code": "500", "message": "Something went wrong" };
                    obj.result = errorParamExists;
                    response.status(500).send(obj);
                    return;
                }
                else {
                    if (paramExists) {
                        obj.status = { "code": "500", "message": "Parameter with the same name already exists." };
                        obj.result = {};
                        response.status(500).send(obj);
                        return;
                    }
                    else {
                        var parameterFields = new parameter(req.body)
                        parameterFields.save(function (errr) {
                            if (errr) {
                                console.log(errr);
                                obj.status = { "code": "500", "message": "Something went wrong" };
                                obj.result = errr;
                                response.status(500).send(obj);
                                return;
                            }
                            else {
                                obj.status = { "code": "200", "message": "Parameter added successfully." };
                                obj.result = parameterFields;
                                response.status(200).send(obj);
                                return;
                            }
                        });
                    }
                }
            });
    });



/* post api to update parameter */
parameterRouter
    .route("/updateParamater")
    .post(function (req, response) {
        parameter.findOne({ "_id": mongoose.Types.ObjectId(req.body._id) }).
            exec(function (error, param) {
                if (error) {
                    // console.log("Not found");
                    obj.status = { "code": "500", "message": "Something went wrong" };
                    obj.result = error;
                    response.status(500).send(obj);
                    return;
                }
                else {
                    if (param) {
                        parameter.findOne({ "BotId": mongoose.Types.ObjectId(req.body.BotId), "parameterName": req.body.parameterName }).
                            exec(function (errorParamExists, paramExists) {
                                if (errorParamExists) {
                                    // console.log("Not found");
                                    obj.status = { "code": "500", "message": "Something went wrong" };
                                    obj.result = errorParamExists;
                                    response.status(500).send(obj);
                                    return;
                                }
                                else {
                                    if (paramExists) {
                                        if (paramExists._id == req.body._id) {
                                            param.parameterName = req.body.parameterName;
                                            param.parameterUrl = req.body.parameterUrl;
                                            param.BotId = req.body.BotId;
                                            param.save(function (errr) {
                                                if (errr) {
                                                    console.log(errr);
                                                    obj.status = { "code": "500", "message": "Something went wrong" };
                                                    obj.result = errr;
                                                    response.status(500).send(obj);
                                                    return;
                                                }
                                                else {
                                                    obj.status = { "code": "200", "message": "Parameter updated successfully." };
                                                    obj.result = param;
                                                    response.status(200).send(obj);
                                                    return;
                                                }
                                            });
                                        }
                                        else {
                                            obj.status = { "code": "500", "message": "Parameter with the same name already exists." };
                                            obj.result = {};
                                            response.status(500).send(obj);
                                            return;
                                        }
                                    }
                                    else {

                                        param.parameterName = req.body.parameterName;
                                        param.parameterUrl = req.body.parameterUrl;
                                        param.BotId = req.body.BotId;
                                        param.save(function (errr) {
                                            if (errr) {
                                                console.log(errr);
                                                obj.status = { "code": "500", "message": "Something went wrong" };
                                                obj.result = errr;
                                                response.status(500).send(obj);
                                                return;
                                            }
                                            else {
                                                obj.status = { "code": "200", "message": "Parameter updated successfully." };
                                                obj.result = param;
                                                response.status(200).send(obj);
                                                return;
                                            }
                                        });
                                    }
                                }
                            });
                    }
                    else {
                        obj.status = { "code": "500", "message": "No parameter to update" };
                        obj.result = {};
                        response.status(500).send(obj);
                        return;
                    }
                }
            });
    });

/* post api to get data for parameter */
parameterRouter
    .route("/getDataForParam")
    .post(function (req, response) {
        // find parameter by bot id
        parameter.findOne({ "BotId": mongoose.Types.ObjectId(req.body.BotId), "parameterName": req.body.parameterName }).
            exec(function (error, param) {
                if (error) {
                    // console.log("Not found");
                    obj.status = { "code": "500", "message": "Something went wrong" };
                    obj.result = error;
                    response.status(500).send(obj);
                    return;
                }
                else {
                    if (param) {
                        request({
                            url: param.parameterUrl,
                            method: param.ApiType,
                            body: {
                            },
                            json: true
                        }, function (err, res) {
                            if (err) {
                                console.log("Something went wrong at 140");
                            }
                            if (res) {
                            }
                        })
                    }
                }
            });
    });

/* post api to update parameter */

// parameterRouter
//     .route("/updateParamater")
//     .post(function (req, response) {
//         // get parameter by id
//         parameter.findOne({ "_id": mongoose.Types.ObjectId(req.body.id) }).
//             exec(function (error, parameterFound) {
//                 if (error) {
//                     obj.status = { "code": "500", "message": "Something went wrong" };
//                     obj.result = err;
//                     // res1.status(500).send(obj);
//                     return;
//                 }
//                 else {
//                     if (parameterFound) {
//                         parameterFound.parameterName = req.body.parameterName;
//                         parameterFound.parameterUrl = req.body.parameterUrl;
//                         parameterFound.BotId = req.body.BotId;
//                         parameterFound.save(function (errr) {
//                             if (errr) {
//                                 console.log(errr);
//                                 obj.status = { "code": "500", "message": "Something went wrong" };
//                                 obj.result = errr;
//                                 response.status(500).send(obj);
//                                 return;
//                             }
//                             else {
//                                 obj.status = { "code": "200", "message": "Parameter saved successfully." };
//                                 obj.result = {};
//                                 response.status(200).send(obj);
//                                 return;
//                             }
//                         });
//                     }
//                     else {
//                         obj.status = { "code": "201", "message": "Parameter not found" };
//                         response.status(200).send(obj);
//                         return;
//                     }
//                 }
//             });


//     });


