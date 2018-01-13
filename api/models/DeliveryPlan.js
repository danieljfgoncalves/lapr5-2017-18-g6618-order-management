/**
 * DeliveryPlan.js
 *
 * @description :: Represents a delivery plan of orders.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    date: {
      type: 'datetime',
      defaultsTo: function () {
        return new Date();
      }
    },

    TotalDistance: {
      type: 'string'
    },

    VisitedPharmacies: {
      collection: 'pharmacy',
    },

    NonVisitedPharmacies: {
      collection: 'pharmacy',
    }

  }
};

