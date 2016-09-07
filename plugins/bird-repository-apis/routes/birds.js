/**
 * Created by shivendra on 6/9/16.
 */

'use strict';

const birdApiController = require('../controllers/birds');
const joi = require('joi');

module.exports =[
    {
        method: 'GET',
        path: 'birds',
        config: {
            handler: birdApiController.getAllBirds,
            description: 'Get All Birds registered and visible',
            tags: ['api', 'birds'],
            plugins: {
                'hapi-swagger': {
                    responses: {
                        '400': {'description': 'Bad Request'}
                    }
                }
            }

        }
    },
    {
        method: 'GET',
        path: 'birds/{id}',
        config: {
            handler: birdApiController.getBirdById,
            description: 'Get Bird with a particular Id',
            tags: ['api', 'birds'],
            plugins: {
                'hapi-swagger': {
                    responses: {
                        '400': {'description': 'Bad Request'}
                    }
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
                        '400': {'description': 'Bad Request'}
                    }
                }
            }

        }
    },
    {
        method: 'DELETE',
        path: '/birds/{id}',
        config: {
            handler: birdApiController.deleteBird,
            description: 'Soft delete a Bird',
            tags: ['api', 'birds'],
            plugins: {
                'hapi-swagger': {
                    responses: {
                        '400': {'description': 'Bad Request'}
                    }
                }
            }

        }
    }
];

