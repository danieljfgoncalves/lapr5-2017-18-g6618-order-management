/**
 * Waypoint.js
 *
 * @description :: Represents a waypoint.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    latitude: {
      type: 'string',
      required: true
    },

    longitude: {
      type: 'string',
      required: true
    },

  }

};

