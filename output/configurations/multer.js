"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var multer = require('multer'); // middleware for handling form-data, which is primarily used for uploading files
//Setting up multer for receiving form-data from our request
var maxFileSize = Math.pow(1024, 2) * 5; //5 MB for eg
exports.filesDestination = 'uploads/';
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, exports.filesDestination);
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString() + " " + file.originalname); //for eg 2020-07-17 meat.png
    }
});
//I want the supported types to be only png and jpeg
var jpegOrPng = 'image/jpeg' || 'image/png';
var fileFilter = function (req, file, cb) {
    // reject a file
    if (file.mimetype == jpegOrPng) {
        cb(null, true);
    }
    else {
        cb(null, false); //We can, instead on null, create a new Error
    }
};
exports.upload = multer({
    storage: storage,
    dest: exports.filesDestination,
    fileFilter: fileFilter,
    limits: {
        fileSize: maxFileSize
    }
});
