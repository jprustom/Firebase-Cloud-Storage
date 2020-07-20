"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//MODULES
var express = require("express");
var bodyParser = require("body-parser");
var morgan = require('morgan');
var singleImageRoute = require("../routers/single-image");
//MIDDLEWARES
exports.app = express();
exports.app.use(morgan("dev"));
exports.app.use(bodyParser.urlencoded({ extended: true }));
exports.app.use('/uploads', express.static('uploads')); //The uploads folder will be publicly available when accessing localhost:3000/uploads/{imagePath}
exports.app.use("/single-image", singleImageRoute);
//If we arrived here, throw a 404 not found error
exports.app.use(function (req, res) {
    res.status(404).json({
        error: {
            message: "Not found"
        }
    });
});
