/**
 * Tests for the Waypoint model.
 */
var request = require('supertest');
var mockObjects = require('../mock-objects');
var assert = require('assert');

describe('Waypoint Tests', function () {

    describe('[GET] /api/waypoints', function () {
        it('should get the mock waypoints', function (done) {
            request(sails.hooks.http.app)
                .get('/api/waypoints')
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
                            latitude: element.latitude,
                            longitude: element.longitude,
                        })
                    });

                    assert.equal(JSON.stringify(result), JSON.stringify(mockObjects.waypoints));
                    done();
                });
        });
    });

    describe("[POST] /api/waypoints", () => {
        it("should create a new waypoint", done => {
            request(sails.hooks.http.app)
                .post('/api/waypoints')
                .send({
                    latitude: 40.200,
                    longitude: -8.320,
                })
                .expect('Content-Type', 'application/json; charset=utf-8')
                .expect(201)
                .end((err, res) => {
                    if (err) {
                        throw err;
                    }
                    assert.equal(res.body.latitude, 40.200);
                    done();
                })
        });
    });

});
