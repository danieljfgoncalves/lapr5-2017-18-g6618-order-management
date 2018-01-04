/**
 * Waypoint.js
 *
 * @description :: Represents a waypoint.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    latitude: {
      type: 'float',
      required: true
    },

    longitude: {
      type: 'float',
      required: true
    },

  }

};

