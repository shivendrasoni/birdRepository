/**
 * Created by shivendra on 7/9/16.
 */

'use strict';

const boom = require('boom');
var logger = require('../utils/logger-utils').logger;
var _ = require('lodash');

var Bird = require('../models/bird').Bird;

module.exports = {
    getAllBirds : function (callback) {
        Bird.find({visible : true, active : true}, function (err, docs) {
            callback(err, docs);
        });

    },
    getBirdById : function (birdId, callback) {
        Bird.findById(birdId, function (err, doc) {
            callback(err, doc);
        });
    },
    createBird : function (payload, callback) {
        var bird = new Bird(payload);
        bird.save(function (err,doc) {
            if(!err) {
                callback(null, doc);
            }
            else callback(err);
        });
        
    },
    deleteBirdById : function (birdId, callback) {
        var query = {_id : birdId};
        Bird.findOneAndUpdate(query,{active : false}, {upsert: false}, function (err, doc) {
            if(!err) {
                callback(null, doc)
            }
            else callback(err);
        })
        
    }
}