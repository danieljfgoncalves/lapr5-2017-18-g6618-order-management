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
                    res.body.forEach(element => {
                        var orders = [];
                        element.orders.forEach(order => {
                          orders.push(order.id);
                        });
                        result.push({
                            date: element.date,
                            path: element.path,
                            orders: orders
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
                    path: "[{test}]"
                })
                .expect('Content-Type', 'application/json; charset=utf-8')
                .expect(201)
                .end((err, res) => {
                    if (err) {
                        throw err;
                    }
                    assert.equal(res.body.path, "[{test}]");
                    done();
                })
        });
    });

});
