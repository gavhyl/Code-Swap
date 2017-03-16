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
    required: 'Please provide Shopping List name',
    trim: true
  },
  color: {
    type: String,
    required: 'Please provide Shopping List color',
    trim: true
  },
  created: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
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
 },

  items: {
    type: Array,
    default: []
  }

});

mongoose.model('Shoppinglist', ShoppinglistSchema);
