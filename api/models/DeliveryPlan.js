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

    VisitedPharmacies: {
      collection: 'pharmacy',
    },

    OrderedWaypoints: {
      collection: 'waypoint',
    },

    NonVisitedPharmacies: {
      collection: 'pharmacy'
    }

  }
};

