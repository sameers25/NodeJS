var request = require("request");
var config = require("../config/config");
var UserBot = require("../models/UserBot");
var BotIntent = require("../models/BotIntent");
var mongoose = require("mongoose");
var nodemailer = require("nodemailer");




function getStident(botId, callback) {
    // console.log(botId);
    UserBot.findOne({ "_id": mongoose.Types.ObjectId(botId) }).
        exec(function (error, bot) {
            if (error) {
                console.log("error" + error);
            }
            else {
                // console.log("no error"+bot);
            }
            callback(error, bot);
        });
}

function getIntent(intentId, callback) {
    // console.log(botId);
    BotIntent.findOne({ "_id": mongoose.Types.ObjectId(intentId) }).
        exec(function (error, intent) {
            if (error) {
                console.log("error" + error);
            }
            else {
                // console.log("no error"+intent);
            }
            callback(error, intent);
        });
}


function sendEmail(to, subject, message) {
    var transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: '587',
        auth: {
            user: config.email,
            pass: config.maillPassword
        },
        secureConnection: 'false',
        tls: { ciphers: 'SSLv3' }
    });
    var mailOptions = {

        from: config.email,
        to: to,
        subject: subject,
        html: message
        // attachments: attachments
    };
    transporter.sendMail(mailOptions, function (err, info) {
        if (err) {
            console.log(err);
            return 'Error while sending email' + err
        }
        else {
            console.log("Email sent");
            return 'Email sent'
        }
    });
}


module.exports = {
    getBot: getBot,
    getIntent: getIntent,
    sendEmail: sendEmail
}