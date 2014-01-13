/**
 * Snap
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 *
 */

module.exports = {

  attributes: {

    userId: {
        type: 'string',
        required: true
    },

  	html: {
        type: 'string',
        required: true
    },
    
    url: {
        type: 'string',
        required: true
    },

    like: {
        type: 'integer',
        required: true
    },
  }

};
