/**
 * Created by shivendra on 6/9/16.
 */

'use strict';
var winston = require('winston');
var config = require('../../../config');
var moment = require('moment');

//******* Using winston **********//
var winstonConsoleTransporter =
    new (winston.transports.Console)({
        level: config.get("logs:logLevel"),
        'timestamp': function() {
            var ts = moment();
            return "["+ts.format("x")+"] ["+ts.format("DD-MM-YYYY HH:mm:ss.SSS Z")+"]";
        },
        prettyPrint: false,
        showLevel: true,
        silent: false
    });


var winstonLoggerConfig = new (winston.Logger)({
    transports: [winstonConsoleTransporter]
});

module.exports.logger = winstonLoggerConfig;