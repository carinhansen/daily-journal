/**
 * Story.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  datastore: 'default',
  attributes: {
    title: {
      type: 'string',
      required: true,
    },
    text: {
      type: 'string',
      required: true,
      columnType: 'text'
    },
    owner: {
      type: 'integer',
    },
    category: {
      type: 'string',
      required: true,
    },
    published: {
      type: 'boolean',
    }
  },

};


