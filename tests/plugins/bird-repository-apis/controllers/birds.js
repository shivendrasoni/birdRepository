'use strict';
process.env.NODE_ENV = 'test';

var chai = require('chai');
const rewire = require('rewire');
var sinonChai = require("sinon-chai");
var expect = chai.expect;
var birdController;
chai.use(sinonChai);

describe("Bird controller testing", function() {

    beforeEach(function() {
        birdController = rewire('../../../../plugins/bird-repository-apis/controllers/birds');
    });

    describe("tests for : create a bird entry", function() {

        it("should call reply with created method", function(done) {
            //setup stubs
            var birdService = {
                createBird: function(payload, callback) {
                    //Payload has already been validated at route level.
                    //assuming created bird document has id '1234'
                    callback(null, {
                        id: "1234"
                    });
                }
            }
            birdController.__set__('birdService', birdService);

            //begin mock & test
            var payload = {
                "name": "Pigeon",
                "family": "Columbidae",
                "continents": [
                    "asia",
                    "australia"
                ],
                "added": "2016-09-09",
                "visible": true
            };

            birdController.createBird(payload, function(err, data) {
                return {
                    created: function(url) {
                        expect(url).to.equal("/birds/1234");
                        done();
                    }
                };
            })
        });

        it("Should call reply with Bad request", function(done) {
            //setup stubs
            var birdService = {
                createBird: function(payload, callback) {
                    //Payload has already been validated at route level.
                    //An unknown error occurs
                    callback(new Error("Bad Request"), null);
                }
            };

            birdController.__set__('birdService', birdService);

            //begin mock & test
            var payload = {
                "name": "Pigeon",
                "family": "Columbidae",
                "continents": [
                    "asia",
                    "australia"
                ],
                "added": "2016-09-09",
                "visible": true
            };

            birdController.createBird(payload, function(err, data) {
                expect(err.output.statusCode).to.equal(400);
                done();
            })
        });
    });
    describe("tests for : get a bird entry by object id", function() {

        it("should call reply with the bird details", function(done) {
            var birdService = {
                getBirdById: function(id, callback) {

                    callback(null, {
                        "_id": "1234",
                        "name": "Pigeon",
                        "continents": [
                            "asia",
                            "america"
                        ],
                        "active": true,
                        "family": "Columbidae",
                        "added": "2016-09-08",
                        "visible": true
                    });
                }
            }
            birdController.__set__('birdService', birdService);

            birdController.getBirdById({
                params: {
                    birdId: "1234"
                }
            }, function(data) {
                expect(data.id).to.equal('1234');
                expect(data.name).to.equal('Pigeon');
                expect(data.family).to.equal('Columbidae');
                expect(data.added).to.equal('2016-09-08');
                expect(data.visible).to.equal(true);
                done();
            });
        });

        it("Should call reply with Bad request for unpredictable errors", function(done) {
            var birdService = {
                getBirdById: function(id, callback) {

                    callback(new Error("Bad Request"), null);
                }
            }

            birdController.__set__('birdService', birdService);

            birdController.getBirdById({
                params: {
                    birdId: "1234"
                }
            }, function(err) {
                expect(err.output.statusCode).to.equal(400);
                done();
            });
        });

        it("Should call reply with Not Found when no bird is found.", function(done) {
            var birdService = {
                getBirdById: function(id, callback) {

                    callback(null, null);
                }
            }

            birdController.__set__('birdService', birdService);

            birdController.getBirdById({
                params: {
                    birdId: "1234"
                }
            }, function(err) {
                expect(err.output.statusCode).to.equal(404);
                done();
            });
        });
    });
    describe("tests for : get all visible birds", function() {

        it("should call reply with an array of matching documents", function(done) {
            var response = [{
                "id": "57d11f8107e9587f492c65ff",
                "name": "Pigeon",
                "continents": [
                    "asia",
                    "america"
                ],
                "family": "Columbidae",
                "added": "2016-09-08",
                "visible": true
            }, {
                "id": "57d11fcac7ce59ec49229d82",
                "name": "Another Pigeon",
                "continents": [
                    "asia",
                    "australia"
                ],
                "family": "Columbidae",
                "added": "2016-09-09",
                "visible": true
            }, {
                "id": "57d122db2c288352516ba83f",
                "name": "Parrot",
                "continents": [
                    "asia",
                    "australia"
                ],
                "family": "Columbidae",
                "added": "2016-09-09",
                "visible": true
            }];
            var birdService = {
                getAllBirds: function(callback) {
                    callback(null, response);
                }
            }
            birdController.__set__('birdService', birdService);

            birdController.getAllBirds({}, function(data) {

                expect(data.length).to.equal(3);
                done();
            });
        });

        it("Should call reply with Bad request", function(done) {
            var birdService = {
                getAllBirds: function(callback) {
                    callback(new Error('Bad Request'), null);
                }
            };

            birdController.__set__('birdService', birdService);

            birdController.getAllBirds({}, function(err) {
                expect(err.output.statusCode).to.equal(400);
                done();
            });
        });
    });
    describe("tests for : delete a bird entry", function() {

        it("should call reply with empty body & 200 OK", function(done) {
            var birdService = {
                deleteBirdById: function(birdId, callback) {
                    callback(null, {
                        active: true
                    })
                }
            };
            birdController.__set__('birdService', birdService);

            birdController.deleteBird({
                params: {
                    birdId: "1234"
                }
            }, function(data) {

                expect(Object.keys(data).length).to.equal(0);

                done();
            })


        });

        it("Should call reply with Bad request", function(done) {
            var birdService = {
                deleteBirdById: function(birdId, callback) {
                    callback(new Error('Bad Request'));
                }
            };
            birdController.__set__('birdService', birdService);

            birdController.deleteBird({
                params: {
                    birdId: "1234"
                }
            }, function(err) {
                expect(err.output.statusCode).to.equal(400);

                done();
            })
        });

        it("Should call reply with 'Not Found' if Bird Not Found", function(done) {
            var birdService = {
                deleteBirdById: function(birdId, callback) {
                    callback(null, null);
                }
            };
            birdController.__set__('birdService', birdService);

            birdController.deleteBird({
                params: {
                    birdId: "1234"
                }
            }, function(err) {
                expect(err.output.statusCode).to.equal(404);

                done();
            })
        });

        it("Should call reply with 'Not Found' if Bird found but soft deleted", function(done) {
            var birdService = {
                deleteBirdById: function(birdId, callback) {
                    callback(null, {
                        active: false
                    });
                }
            };
            birdController.__set__('birdService', birdService);

            birdController.deleteBird({
                params: {
                    birdId: "1234"
                }
            }, function(err) {
                expect(err.output.statusCode).to.equal(404);

                done();
            })
        });
    });


})