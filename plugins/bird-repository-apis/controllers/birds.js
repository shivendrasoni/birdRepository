/**
 * Created by shivendra on 7/9/16.
 */

'use strict';
const birdService = require('../services/birds');
const boom = require('boom');

module.exports = {
    getAllBirds : function (request,reply) {

        birdService.getAllBirds(function(err, data) {
            if (err) {
                reply(boom.badRequest(err));
            } else {
                reply(data);
            }
        })
        
    },
    getBirdById : function (request, reply) {
        var birdId = request.params.birdId;
        birdService.getBirdById(birdId, function(err, data) {
            if (err) {
                reply(boom.badRequest(err));
            } else {
                reply(data);
            }
        })
        
    },
    createBird : function (request, reply) {

    birdService.createBird(request.payload, function (err, data) {
        logger.debug("inside the create bird response. ");
        if (!err) {
            reply(data).created('/birds/' + data.id);
        } else {
            reply(Boom.badRequest(err));
        }

    });
    },
    deleteBird : function (request, reply) {
        var birdId = request.params.birdId;
        birdService.deleteBirdById(birdId, function(err, data) {
            if (err) {
                reply(boom.badRequest(err));
            } else {
                reply({});
            }
        })
    }
}