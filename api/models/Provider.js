/**
 * Provider.js
 *
 * @description :: Represents a supplies provider.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    
    // provider's name
    name: {
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

    timeRestriction: {
      type: 'string',
    },

    // provider has many orders
    orders: {
      collection: 'order',
      via: 'provider'
    }

  }
};

