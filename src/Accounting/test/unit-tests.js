require('../server.js')

var debug = require('debug')('test');
var supertest = require('supertest');
var should = require('should');

var request = supertest("http://localhost:8080/");
describe('/devices tests', function () {
    it('should return 2 items', function (done) {
        request.get('devices')
            .expect(200)
            .expect('Content-Type', /json/)
            .expect(function (res) {
                res.body.length.should.equal(2);
            })
        .end(done);
    });
});