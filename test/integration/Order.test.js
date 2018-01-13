/**
 * Tests for the Provider model.
 */
var request = require('supertest');
var mockObjects = require('../mock-objects');
var assert = require('assert');

describe('Order Tests', function () {

    describe('[GET] /api/orders', function () {
        it('should get the mock orders', function (done) {
            request(sails.hooks.http.app)
                .get('/api/orders')
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
                            requestDate: element.requestDate,
                            orderDate: element.orderDate,
                            itemName: element.itemName,
                            form: element.form,
                            quantity: element.quantity,
                            pharmacy: element.pharmacy,
                            latitude: element.latitude,
                            longitude: element.longitude,
                            timeRestriction: element.timeRestriction
                        })
                    });

                    assert.equal(JSON.stringify(result), JSON.stringify(mockObjects.orders));
                    done();
                });
        });
    });

    describe("[POST] /api/orders", () => {
        it("should create a new order", done => {
            request(sails.hooks.http.app)
                .post('/api/orders')
                .send({
                    requestDate: "Tue Dec 19 2017 11:39:47 GMT+0000",
                    itemName: "Tussilene",
                    form: "pills",
                    quantity: 10,
                    pharmacy: "TestPharmacy",
                    latitude: 1.30,
                    longitude: 1.35,
                    timeRestriction: "morning"
                })
                .expect('Content-Type', 'application/json; charset=utf-8')
                .expect(201)
                .end((err, res) => {
                    if (err) {
                        throw err;
                    }
                    assert.equal(res.body.itemName, "Tussilene");
                    done();
                })
        });
    });

    describe("[POST] /api/orders/new", () => {
        it("should\'t create a new order without a requestDate", done => {
            request(sails.hooks.http.app)
                .post('/api/orders/new')
                .send({
                    //requestDate: "Tue Dec 19 2017 11:39:47 GMT+0000",
                    itemName: "Tussilene",
                    form: "pills",
                    quantity: 10,
                    pharmacy: "TestPharmacy",
                    latitude: 1.30,
                    longitude: 1.35,
                    timeRestriction: "morning"
                })
                .expect('Content-Type', 'application/json; charset=utf-8')
                .expect(400)
                .end((err, res) => {
                    if (err) {
                        throw err;
                    }
                    done();
                })
        });
    });

    describe("[POST] /api/orders/new", () => {
        it("should\'t create a new order without a itemName", done => {
            request(sails.hooks.http.app)
                .post('/api/orders/new')
                .send({
                    requestDate: "Tue Dec 19 2017 11:39:47 GMT+0000",
                    //itemName: "Tussilene",
                    form: "pills",
                    quantity: 10,
                    pharmacy: "TestPharmacy",
                    latitude: 1.30,
                    longitude: 1.35,
                    timeRestriction: "morning"
                })
                .expect('Content-Type', 'application/json; charset=utf-8')
                .expect(400)
                .end((err, res) => {
                    if (err) {
                        throw err;
                    }
                    done();
                })
        });
    });

    describe("[POST] /api/orders/new", () => {
        it("should\'t create a new order without a form", done => {
            request(sails.hooks.http.app)
                .post('/api/orders/new')
                .send({
                    requestDate: "Tue Dec 19 2017 11:39:47 GMT+0000",
                    itemName: "Tussilene",
                    //form: "pills",
                    quantity: 10,
                    pharmacy: "TestPharmacy",
                    latitude: 1.30,
                    longitude: 1.35,
                    timeRestriction: "morning"
                })
                .expect('Content-Type', 'application/json; charset=utf-8')
                .expect(400)
                .end((err, res) => {
                    if (err) {
                        throw err;
                    }
                    done();
                })
        });
    });

    describe("[POST] /api/orders/new", () => {
        it("should\'t create a new order without a quantity", done => {
            request(sails.hooks.http.app)
                .post('/api/orders/new')
                .send({
                    requestDate: "Tue Dec 19 2017 11:39:47 GMT+0000",
                    itemName: "Tussilene",
                    form: "pills",
                    //quantity: 10,
                    pharmacy: "TestPharmacy",
                    latitude: 1.30,
                    longitude: 1.35,
                    timeRestriction: "morning"
                })
                .expect('Content-Type', 'application/json; charset=utf-8')
                .expect(400)
                .end((err, res) => {
                    if (err) {
                        throw err;
                    }
                    done();
                })
        });
    });

    describe("[POST] /api/orders/new", () => {
        it("should\'t create a new order without a pharmacy name", done => {
            request(sails.hooks.http.app)
                .post('/api/orders/new')
                .send({
                    requestDate: "Tue Dec 19 2017 11:39:47 GMT+0000",
                    itemName: "Tussilene",
                    form: "pills",
                    quantity: 10,
                    //pharmacy: "TestPharmacy",
                    latitude: 1.30,
                    longitude: 1.35,
                    timeRestriction: "morning"
                })
                .expect('Content-Type', 'application/json; charset=utf-8')
                .expect(400)
                .end((err, res) => {
                    if (err) {
                        throw err;
                    }
                    done();
                })
        });
    });

    describe("[POST] /api/orders/new", () => {
        it("should\'t create a new order without a latitude", done => {
            request(sails.hooks.http.app)
                .post('/api/orders/new')
                .send({
                    requestDate: "Tue Dec 19 2017 11:39:47 GMT+0000",
                    itemName: "Tussilene",
                    form: "pills",
                    quantity: 10,
                    pharmacy: "TestPharmacy",
                    //latitude: 1.30,
                    longitude: 1.35,
                    timeRestriction: "morning"
                })
                .expect('Content-Type', 'application/json; charset=utf-8')
                .expect(400)
                .end((err, res) => {
                    if (err) {
                        throw err;
                    }
                    done();
                })
        });
    });

    describe("[POST] /api/orders/new", () => {
        it("should\'t create a new order without a longitude", done => {
            request(sails.hooks.http.app)
                .post('/api/orders/new')
                .send({
                    requestDate: "Tue Dec 19 2017 11:39:47 GMT+0000",
                    itemName: "Tussilene",
                    form: "pills",
                    quantity: 10,
                    pharmacy: "TestPharmacy",
                    latitude: 1.30,
                    //longitude: 1.35,
                    timeRestriction: "morning"
                })
                .expect('Content-Type', 'application/json; charset=utf-8')
                .expect(400)
                .end((err, res) => {
                    if (err) {
                        throw err;
                    }
                    done();
                })
        });
    });

});
