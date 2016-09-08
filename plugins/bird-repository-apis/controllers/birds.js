/**
 * Created by shivendra on 7/9/16.
 */

'use strict';
var birdService = require('../services/birds');
const boom = require('boom');
const logger = require('../utils/logger-utils').logger;
const simplifyResponse = require('../utils/response-wrapper').simplifyResponse;

module.exports = {
    getAllBirds: function(request, reply) {
        birdService.getAllBirds(function(err, data) {
            if (err) {
                reply(boom.badRequest(err));
            } else {
                reply(simplifyResponse(data));
            }
        })

    },
    getBirdById: function(request, reply) {
        var birdId = request.params.birdId;
        birdService.getBirdById(birdId, function(err, data) {

            if (err) {
                reply(boom.badRequest(err));
            } else if ((!data && !err) || !data.active) {

                reply(boom.notFound('the bird does not exist'))
            } else {
                reply(simplifyResponse(data));
            }
        })

    },
    createBird: function(request, reply) {
        birdService.createBird(request.payload, function(err, data) {
            logger.debug("inside the create bird response. ");
            if (err) {
                logger.error('Error in creating bird ', err);
                reply(boom.badRequest(err));

            } else {
                reply(simplifyResponse(data)).created('/birds/' + data.id);
            }

        });
    },
    deleteBird: function(request, reply) {
        var birdId = request.params.birdId;
        birdService.deleteBirdById(birdId, function(err, data) {

            if (err) {
                logger.error('Error in deleting bird ', err);
                reply(boom.badRequest(err));
            } else if ((!data && !err) || !data.active) {
                logger.error('the bird does not exist');
                reply(boom.notFound('the bird does not exist'))
            } else {
                reply({});
            }
        })
    }
}