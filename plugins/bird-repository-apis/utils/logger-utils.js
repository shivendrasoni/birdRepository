/**
 * Created by shivendra on 6/9/16.
 */

'use strict';
var winston = require('winston');
var config = require('../../../config');
var moment = require('moment');

//******* Using winston **********//
var winstonConsoleTransporterConsole =
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


    var winstonLoggerConfig;
    if (process.env.NODE_ENV !== 'test'){
        winstonLoggerConfig = new (winston.Logger)({
        transports: [winstonConsoleTransporterConsole, new (winston.transports.File)({ filename: 'logfile.log',
                    prettyPrint: true,
                    showLevel: true })]
    });
    }
    else {
        winstonLoggerConfig= new (winston.Logger)({
        transports: [
            new (winston.transports.File)({ filename: 'logfile.log',
                    prettyPrint: true,
                    showLevel: true })
        ]
    });
    }

module.exports.logger = winstonLoggerConfig;