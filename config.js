/**
 * Created by shivendra on 6/9/16.
 */

//Boiler plate for config.js modified for usage.

const nconf = require('nconf');
const fs = require('fs');
const path = require('path');

var startup = nconf
    .argv()
    .env({
        separator: '__' // bash doesn't like periods or colons in environment vars, they already have meaning
    })
    .defaults({
        'conf': 'configuration'
    });

// get a conf
const configFile = path.resolve(startup.get('conf'));

// purge the start up config
startup.remove('env');
startup.remove('argv');
startup.remove('defaults');
startup = null;

var conf = nconf
    .overrides({/* something that must always be this way */})
    .argv()
    .env({separator: '__'});

if (fs.existsSync(configFile)) {
    if (fs.statSync(configFile).isDirectory()) {
        // if it is a directory, read all json files
        fs
            .readdirSync(configFile)
            .filter(function (file) {
                return (/\.json$/).test(file);
            })
            .sort(function (fileA, fileB) {
                return fileA < fileB;
            })
            .forEach(function (file) {
                var filepath = path.normalize(path.join(configFile, file));
                conf = conf.file(file, filepath)
            });
    } else {
        // if it is a file, read the file
        conf = conf.file(configFile)
    }
}

conf.defaults({
    environment: 'development'
});

if (conf.get('NODE_ENV')) {
    conf.set('environment', conf.get('NODE_ENV'));
}

module.exports = conf;