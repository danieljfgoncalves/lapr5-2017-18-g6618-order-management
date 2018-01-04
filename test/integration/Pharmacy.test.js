/**
 * Tests for the Pharmacy model.
 */
var request = require('supertest');
var mockObjects = require('../mock-objects');
var assert = require('assert');

describe('Pharmacy Tests', function () {

    describe('[GET] /api/pharmacies', function () {
        it('should get the mock pharmacies', function (done) {
            request(sails.hooks.http.app)
                .get('/api/pharmacies')
                .expect('Content-Type', 'application/json; charset=utf-8')
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        throw err;
                    }

                    // shapping data to ignore ids and dates
                    var result = [];
                    res.body.forEach(element => {
                        result.push({
                            name: element.name,
                            waypoint: element.waypoint.id
                        });
                    });

                    assert.equal(JSON.stringify(result), JSON.stringify(mockObjects.pharmacies));
                    done();
                });
        });
    });

    describe("[POST] /api/pharmacies", () => {
        it("should create pharmacy PharmacyTest", done => {
            request(sails.hooks.http.app)
                .post('/api/pharmacies')
                .send({
                    name: "PharmacyTest",
                    waypoint: 1
                })
                .expect('Content-Type', 'application/json; charset=utf-8')
                .expect(201)
                .end((err, res) => {
                    if (err) {
                        throw err;
                    }
                    assert.equal(res.body.name, "PharmacyTest");
                    done();
                })
        });
    });

});
