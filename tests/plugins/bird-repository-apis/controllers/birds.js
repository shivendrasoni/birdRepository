'use strict';
var chai = require('chai');
var rewire = require('rewire');
var sinonChai = require("sinon-chai");
var expect = chai.expect;
var birdController;
chai.use(sinonChai);

describe("Bird controller testing", function () {

    beforeEach(function () {
        birdController = rewire('../../../../plugins/bird-repository-apis/controllers/birds');
    });

    describe("tests for : create a bird entry", function () {

        it("should call reply with created method", function (done) {
        	done();
        });

        it("Should call reply with Bad request", function (done) {
        	done();
        });

        it("Should call reply with Not Found", function (done) {
        	done();
        });
	});
    describe("tests for : get a bird entry by object id", function () {

        it("should call reply with the bird details", function (done) {
        	done();
        });

        it("Should call reply with Bad request for unpredictable errors", function (done) {
        	done();
        });

        it("Should call reply with Not Found when no bird is found.", function (done) {
        	done();
        });
	});
    describe("tests for : get all visible birds", function () {

        it("should call reply with an array of matching documents", function (done) {
        	done();
        });

        it("Should call reply with Bad request", function (done) {
        	done();
        });
	});
    describe("tests for : delete a bird entry", function () {

        it("should call reply with empty body & 200 OK", function (done) {
        	done();
        });

        it("Should call reply with Bad request", function (done) {
        	done();
        });

        it("Should call reply with Not Found", function (done) {
        	done();
        });
	});


})