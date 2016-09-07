/**
 * Created by shivendra on 7/9/16.
 */

'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var birdSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    family: {
        type: String,
        required: true
    },
    continents: {
        type: String,
        required: true
    },
    added: {
        type: Date,
        required: true
    },

    visible: {
        type: Boolean,
        required: true
    }
}, {timestamps: true});


var Bird = mongoose.model('Bird', birdSchema);

module.exports = {
    Bird: Bird
};