/**
 * DeliveryPlan.js
 *
 * @description :: Represents a delivery plan of orders.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    date: {
      type: 'date',
      //required: true
    },

    // the generated delivery plan path (name, latitude, longitude)
    path: {
      type: 'string'
    },

    // a delivery plan has many orders
    orders: {
      collection: 'order',
      via: 'deliveryPlan'
    }

  }
};

