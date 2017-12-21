/**
 * Tests for the Provider model.
 */
var request = require('supertest');
var mockObjects = require('../mock-objects');
var assert = require('assert');

describe('Provider Tests', function () {

  describe('[GET] /api/providers', function () {
    it('should get the mock providers', function (done) {
      request(sails.hooks.http.app)
        .get('/api/providers')
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
              name: element.name,
              latitude: element.latitude,
              longitude: element.longitude,
              timeRestriction: element.timeRestriction,
              orders: orders
            });
          });

          assert.equal(JSON.stringify(result), JSON.stringify(mockObjects.providers));
          done();
        });
    });
  });

  describe("[POST] /api/providers", () => {
    it("should create provider provider4", done => {
      request(sails.hooks.http.app)
        .post('/api/providers')
        .send({
          name:"provider4",
          latitude: 1.55,
          longitude: 1.65,
          orders: []
        })
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(201)
        .end( (err, res) => {
          if (err) {
            throw err;
          }          
          assert.equal(res.body.name, "provider4");
          done();
        })
    });
  });

});
