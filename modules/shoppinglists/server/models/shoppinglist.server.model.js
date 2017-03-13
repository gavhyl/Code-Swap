'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Shoppinglist Schema
 */
var ShoppinglistSchema = new Schema({
  name: {
    type: String,
    default: '',
    required: 'Please fill Shoppinglist name',
    trim: true
  },
  created: {
    type: Date,
    default: Date.now
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  },
   note: {
    type: String,
    default: '',
    ref: 'note'
  }
});

mongoose.model('Shoppinglist', ShoppinglistSchema);
