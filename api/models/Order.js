/**
 * Order.js
 *
 * @description :: Represents a Order requested by a Pharmacy of a specific item/medicine, which will be supplied by a Provider.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    // date of order creation
    orderDate: {
      type: 'datetime',
      defaultsTo: function () {
        return new Date();
      }
    },

    requestDate: {
      type: 'datetime',
      required: true
    },

    // name of the requested medicine
    itemName: {
      type: 'string',
      required: true
    },

    form: {
      type: 'string',
      required: true
    },

    // requested medicine quantity
    quantity: {
      type: 'integer',
      required: true
    },

    // order has one provider
    provider: {
      model: 'provider'
    },

    // pharmacy name and location (latitude and longitude)
    pharmacy: {
      type: 'string',
      required: true
    },

    latitude: {
      type: 'float',
      required: true
    },

    longitude: {
      type: 'float',
      required: true
    },

    // pharmacy time restriction ex: morning, afternoon...
    timeRestriction: {
      type: 'string' // change to enum?
    },

    // order is in one delivery plan
    deliveryPlan: {
      model: 'deliveryplan'
    }

  }
};

