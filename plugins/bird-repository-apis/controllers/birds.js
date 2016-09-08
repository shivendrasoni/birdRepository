/**
 * Created by shivendra on 7/9/16.
 */

'use strict';
const birdService = require('../services/birds');
const boom = require('boom');
var logger = require('../utils/logger-utils').logger;

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
            if((!data && !err) || !data.active) {
                reply(boom.notFound('the bird does not exist'))
            }
            else if (err) {
                reply(boom.badRequest(err));
            } else {
                reply(data);
            }
        })
        
    },
    createBird : function (request, reply) {

    birdService.createBird(request.payload, function (err, data) {
        logger.debug("inside the create bird response. ");
        if (err) {
            logger.error('Error in creating bird ', err);
            reply(boom.badRequest(err));

        } else {
            reply(data).created('/birds/' + data.id);
        }

    });
    },
    deleteBird : function (request, reply) {
        var birdId = request.params.birdId;
        birdService.deleteBirdById(birdId, function(err, data) {
            if((!data && !err) || !data.active) {
                reply(boom.notFound('the bird does not exist'))
            }
            if (err) {
                logger.error('Error in creating bird ', err);
                reply(boom.badRequest(err));
            } else {
                reply({});
            }
        })
    }
}