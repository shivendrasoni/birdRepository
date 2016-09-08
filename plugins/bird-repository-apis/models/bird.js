/**
 * Created by shivendra on 7/9/16.
 */

'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const moment = require('moment');

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
        type: String,
        required: true,
        default: moment().format('YYYY-MM-DD')
    },

    visible: {
        type: Boolean,
        required: true
    },
    active : {
        type : Boolean,
        required : true,
        default : true
    }
}, {timestamps: true});


var Bird = mongoose.model('Bird', birdSchema);

module.exports = {
    Bird: Bird
};