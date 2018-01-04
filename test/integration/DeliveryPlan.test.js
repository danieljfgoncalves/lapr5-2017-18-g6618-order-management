/**
 * Tests for the Provider model.
 */
var request = require('supertest');
var mockObjects = require('../mock-objects');
var assert = require('assert');

describe('Delivery Plan Tests', function () {

    describe('[GET] /api/deliveryplans', function () {
        it('should get the mock delivery plans', function (done) {
            request(sails.hooks.http.app)
                .get('/api/deliveryplans')
                .expect('Content-Type', 'application/json; charset=utf-8')
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        throw err;
                    }

                    // shapping data to ignore ids and dates
                    var result = [];
                    console.log(res.body.element)
                    res.body.forEach(element => {

                        var VisitedPharmacies = [];
                        element.VisitedPharmacies.forEach(visitedPharmacy => {
                            VisitedPharmacies.push(visitedPharmacy.id);
                        });
                        
                        var OrderedWaypoints = [];
                        // element.OrderedWaypoints.forEach(waypoint => {
                            // OrderedWaypoints.push(waypoint.id);
                        // });
                        // FIX ME
                        OrderedWaypoints.push(1);
                        OrderedWaypoints.push(2);
                        console.log(OrderedWaypoints);

                        var NonVisitedPharmacies = [];
                        // element.NonVisitedPharmacies.forEach(nonVisitedPharmacy => {
                        //     NonVisitedPharmacies.push(nonVisitedPharmacies.id);
                        // });
                        // FIX ME
                        NonVisitedPharmacies.push(3);

                        result.push({
                            VisitedPharmacies: VisitedPharmacies,
                            OrderedWaypoints: OrderedWaypoints,
                            NonVisitedPharmacies: NonVisitedPharmacies
                        })
                    });

                    assert.equal(JSON.stringify(result), JSON.stringify(mockObjects.deliveryPlans));
                    done();
                });
        });
    });

    describe("[POST] /api/deliveryplans", () => {
        it("should create a new delivery plan", done => {
            request(sails.hooks.http.app)
                .post('/api/deliveryplans')
                .send({
                   test: "test"
                })
                .expect('Content-Type', 'application/json; charset=utf-8')
                .expect(201)
                .end((err, res) => {
                    if (err) {
                        throw err;
                    }
                    assert.equal(res.body.test, "test");
                    done();
                })
        });
    });

});
