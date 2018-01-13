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
      type: 'string',
      required: true
    },

    longitude: {
      type: 'string',
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

