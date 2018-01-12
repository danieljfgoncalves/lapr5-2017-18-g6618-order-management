/**
 * Pharmacy.js
 *
 * @description :: Represents a Pharmacy.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    name: {
      type: 'string',
      required: true
    },

    waypoint: {
      model: 'waypoint'
    },

    time: {
      type: 'string'
    },

    orderedWaypoints: {
      collection: 'waypoint',
    },
  }
  
};

