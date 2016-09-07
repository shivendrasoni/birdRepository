/**
 * Created by shivendra on 6/9/16.
 */

"use strict";
require("./db");
const async = require('async');
const inert = require('inert');
const vision = require('vision');
const hapiSwagger = require('hapi-swagger');
const pack = require('../../package');
const config = require('./../../config');
const routes = require('./routes');
var register = function(server,options,next){
    var swaggerOptions = {
        basePath: '/v1',
        sortEndpoints: 'path',
        expanded: 'none',
        pathPrefixSize: 2,
        info: {
            'title': 'Bird Repository Service API Documentation',
            'version': pack.version
        }
    };
    server.route(routes);
    async.series([
        function(callback){
            server.register([
                inert,
                vision,
                {
                    register: hapiSwagger,
                    options: swaggerOptions
                }
            ], function(err){
                if(err){
                    console.error('failed to load plugin, hapi swagger ', err);
                }
                callback(err);
            });
        }
    ], function (err) {
        if(!err){
            console.log('all plugins loaded successfully');
            next();
        } else {
            throw err;
        }
    });
};

register.attributes = {
    name: 'Bird Repo Service API',
    version: '1.0.0'
};

module.exports = register;
