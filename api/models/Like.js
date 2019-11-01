/**
 * Like.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  datastore: 'default',
  attributes: {
    storyId: {
      type: 'integer',
    },
    userId: {
      type: 'integer',
    },
  },

};

