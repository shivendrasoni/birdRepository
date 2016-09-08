/**
 * Created by shivendra on 6/9/16.
 */

'use strict';

const birdApiController = require('../controllers/birds');
const joi = require('joi');

module.exports =[
    {
        method: 'GET',
        path: '/birds',
        config: {
            handler: birdApiController.getAllBirds,
            description: 'Get All Birds registered and visible',
            tags: ['api', 'birds'],
            plugins: {
                'hapi-swagger': {
                    responses: {
                        '400': {'description': 'Bad Request'},
                        '500' : {'description' : 'Internal Server Error'}
                    }
                }
            }

        }
    },
    {
        method: 'GET',
        path: '/birds/{birdId}',
        config: {
            handler: birdApiController.getBirdById,
            description: 'Get Bird with a particular Id',
            tags: ['api', 'birds'],
            plugins: {
                'hapi-swagger': {
                    responses: {
                        '400': {'description': 'Bad Request'},
                        '404': {'description': 'Resource Not Found'},
                        '500' : {'description' : 'Internal Server Error'}
                    }
                }
            },
            validate : {
                params : {
                    birdId : joi.string().description('Object id from the database')
                }
            }

        }
    },
    {
        method: 'POST',
        path: '/birds',
        config: {
            handler: birdApiController.createBird,
            description: 'Create a Bird',
            tags: ['api', 'birds'],
            plugins: {
                'hapi-swagger': {
                    responses: {
                        '400': {'description': 'Bad Request'},
                        '500' : {'description' : 'Internal Server Error'}
                    }
                }
            },
            validate : {
                payload : joi.object({
                    name : joi.string().required().example('Pigeon'),
                    family : joi.string().required().example('Columbidae'),
                    continents : joi.array().min(1).unique().items(joi.string()).example(['asia','australia']).required(),
                    added : joi.string().example('2016-09-09'),
                    visible : joi.boolean()

                }).description('Required fields : name, family and continents. added defaults to now & visible' +
                    ' defaults to true')
            }

        }
    },
    {
        method: 'DELETE',
        path: '/birds/{birdId}',
        config: {
            handler: birdApiController.deleteBird,
            description: 'Delete a Bird',
            tags: ['api', 'birds'],
            plugins: {
                'hapi-swagger': {
                    responses: {
                        '400': {'description': 'Bad Request'},
                        '404': {'description': 'Resource Not Found'},
                        '500' : {'description' : 'Internal Server Error'}
                    }
                }
            },
            validate : {
                params : {
                    birdId : joi.string().description('Object id from the database')
                }
            }

        }
    }
];

