'use strict';

var chai = require('chai');
var rewire = require('rewire');
var sinon = require('sinon');
var sinonChai = require("sinon-chai");
chai.use(sinonChai);
const moment = require('moment');

var expect = chai.expect;
var Bird;
var birdService;

describe("2) Bird Service testing", function() {
    describe("Bird service test schemaValidation", function() {
        beforeEach(function() {
            Bird = require('../../../../plugins/bird-repository-apis/models/bird').Bird;
        });

        describe("create Bird", function() {
            it("Should have name, family, continents present(absense test)", function(done) {
                var bird = new Bird({});

                bird.save(function(err, doc) {
                    var errors = err['errors'];

                    expect(Object.keys(errors).length).to.equal(3);
                    expect(errors.hasOwnProperty('name')).to.equal(true);
                    expect(errors.hasOwnProperty('family')).to.equal(true);
                    expect(errors.hasOwnProperty('continents')).to.equal(true);
                    done();
                });
            });
        });
    });

    describe('Create valid bird record', function() {
        var bird;
        var Bird;

        beforeEach(function() {
            birdService = require('../../../../plugins/bird-repository-apis/services/birds');
            Bird = require('../../../../plugins/bird-repository-apis/models/bird').Bird;

            bird = new Bird();

            Bird.prototype.save = function(callback) {
                callback(null, bird);
            }


        });
        it("should call callback with valid data", function(done) {
            Bird.prototype.save = function(callback) {
                callback(null, bird);
            }

            birdService.createBird({
                    name: "pigion",
                    family: "Columbidae",
                    continents: ["Asia", "Africa"]
                },
                function(err, data) {
                    expect(data.visible).to.equal(true);
                    expect(data.active).to.equal(true);
                    expect(data.added).to.equal(moment().format('YYYY-MM-DD'));
                    done()
                })
        })
        it("should call callback with error", function(done) {
            Bird.prototype.save = function(callback) {
                callback(new Error('Bad Request'));
            }
            birdService.createBird({
                    name: "pigion",
                    family: "Columbidae",
                    continents: ["Asia", "Africa"]
                },
                function(err, data) {
                    expect(err.message).to.equal("Bad Request");
                    done();
                })
        })
    });

    describe('Get bird by Id', function() {
        var bird;
        beforeEach(function() {
            birdService = rewire('../../../../plugins/bird-repository-apis/services/birds');
            Bird = require('../../../../plugins/bird-repository-apis/models/bird').Bird;
            bird = new Bird();
        });

        it("should get null or undefined data for non existing birdId", function(done) {

            var Bird = {
                findById: function(id, callback) {
                    callback(null, null);
                }
            }

            birdService.__set__('Bird', Bird);

            birdService.getBirdById(123, function(err, data) {
                expect(err).to.not.exist;
                expect(data).to.not.exist;
                done();
            });
        });

        it("should return the doc corresponding to the birdId", function(done) {

            var Bird = {
                findById: function(id, callback) {
                    callback(null, bird);
                }
            }

            birdService.__set__('Bird', Bird);

            birdService.getBirdById(123, function(err, data) {
                expect(data._id).to.equal(bird._id);
                done();
            });
        });

        it("should return an error if an unknown db error occurs", function(done) {
            var Bird = {
                findById: function(id, callback) {
                    callback(new Error('unrecognized error'), null);
                }
            }

            birdService.__set__('Bird', Bird);

            birdService.getBirdById(123, function(err, data) {
                expect(data).to.not.exist;
                expect(err.message).to.equal('unrecognized error');
                done();
            });
        })
    });

    describe('Delete a bird by Id', function() {
        var bird;
        beforeEach(function() {
            birdService = rewire('../../../../plugins/bird-repository-apis/services/birds');
            Bird = require('../../../../plugins/bird-repository-apis/models/bird').Bird;
            bird = new Bird();
        });

        it('should call the callback with the response for soft deletion(update)', function(done) {
            var Bird = {
                findOneAndUpdate: function(filter, update, upsert, callback) {
                    callback(null, {
    "_id": "1234",
    "name": "Pigeon",
    "continents": [
      "asia",
      "australia"
    ],
    "family": "Columbidae",
    "added": "2016-09-09",
    "visible": true
  });
                }
            }
            birdService.__set__('Bird', Bird);
            birdService.deleteBirdById('1234', function(err, data) {
                expect(data._id).to.equal('1234');
                expect(data.name).to.equal('Pigeon');
                expect(data.family).to.equal('Columbidae');
                expect(data.added).to.equal('2016-09-09');
                expect(data.visible).to.equal(true);
                expect(err).to.not.exist;
                done();
            });


        });
        it('should return an error if an unknown db error occurs', function(done) {
            var Bird = {
                findOneAndUpdate: function(filter, update, upsert, callback) {
                    callback(new Error('unrecognized error'), null);
                }
            }
            birdService.__set__('Bird', Bird);
            birdService.deleteBirdById(123, function(err, data) {
                expect(data).to.not.exist;
                expect(err.message).to.equal('unrecognized error');
                done();
            });

        });

    })
})