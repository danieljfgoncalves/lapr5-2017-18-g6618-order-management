var mockObject = require('../test/mock-objects');

/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.bootstrap.html
 */

module.exports.bootstrap = (done) => {

  // Don't seed fake data when running in production.
  if (process.env.NODE_ENV === 'production') {
    return done();
  }
  new Promise( (resolve, reject) => {

    Order.create(mockObject.orders).exec(err => {
      if (err) {
        return reject(err);
      }
      return resolve();
    });

  }).then(res => {
    new Promise( (resolve, reject) => {

      Provider.create(mockObject.providers).exec( err => {
        if (err) {
          return done(err);
        }
        resolve();
      });

    });
  }).then(res => {
    new Promise( (resolve, reject) => {

      DeliveryPlan.create(mockObject.deliveryPlans).exec( err => {
        if (err) {
          return done(err);
        }
        resolve();
      });

    });
  }).then(res => {

    done();

  });

};
