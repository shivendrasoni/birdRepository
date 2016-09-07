/**
 * Created by shivendra on 6/9/16.
 */

'use strict';

// const birdApiController = require('../controllers/birds');
const joi = require('joi');

module.exports =[

    {
        method: 'GET',
        path: '/v1/merchants/{id}/summary',
        config: {
            handler: function (req, reply) {
                reply('true');
            },
            description: 'Get Summary of merchant Orders',
            tags: ['api', 'merchant dashboard'],
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

