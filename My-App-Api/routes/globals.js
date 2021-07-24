var express = require('express');
var promise = require('bluebird');
require('dotenv')

var options = {
    promiseLib: promise
};

var pgp = require('pg-promise')(options);

var db = pgp({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
});

function sendFailedResponse(req, res, message, status_code) {
    console.log(req.originalUrl, message);
    var status = status_code ? status_code : 400;
    res.status(status)
        .json({
            success: false,
            message: message
        });
}

function parseErrorMessage(error) {
    var error_message = error;
    if (error.response) {
        if (error.response.body) {
            error_message = error.response.body;
        } else if (error.response.data) {
            error_message = error.response.data;
            if (error.response.data.message) {
                error_message = error.response.data.message;
            }
        }
    } else if (error.message) {
        error_message = error.message;
    }
    if (typeof error_message === 'object') {
        if (error_message == null) {
            return 'Some error occured. Please try again later!!';
        }
        return JSON.stringify(error_message);
    }
    return error_message;
}

module.exports = {
    db,
    pgp,
    express,
    sendFailedResponse,
    parseErrorMessage,
};