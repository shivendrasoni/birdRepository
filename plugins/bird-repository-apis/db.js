/**
 * Created by shivendra on 6/9/16.
 */

'use strict';

var Mongoose = require('mongoose');
var config = require('./../../config');

var logger = require("./utils/logger-utils").logger;

Mongoose.connect('mongodb://' + config.get("database:mongo:host")+':' +config.get("database:mongo:port") + '/' + config.get("database:mongo:db"));
var db = Mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function callback() {
    logger.info("Connection with database succeeded.");
});

exports.Mongoose = Mongoose;
exports.db = db;