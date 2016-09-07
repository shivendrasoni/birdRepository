/**
 * Created by shivendra on 6/9/16.
 */

'use strict';

var fs = require('fs');
var path = require('path');
var routes = [];
var currentFile = path.basename(__filename);

fs.readdirSync(__dirname)
    .filter(function (file) {
        return (fs.lstatSync(path.join(__dirname, file)).isFile()) && (file !== currentFile);
    })
    .forEach(function (file) {
        var hidden = /^\./.test(file);
        if (!hidden) {
            console.log(file);
            routes = routes.concat(require(path.join(__dirname, file)));
        }
    });

module.exports = routes;