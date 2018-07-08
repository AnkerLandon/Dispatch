const mongoose = require('mongoose');
const uniqueValidator = require("mongoose-unique-validator");

const priceSchema = mongoose.Schema({
  date: {type: String, required: true, unique: true, index: true },
  pickup: {type: Number, required: true},
  cow: {type: Number, required: true},
  horse: {type: Number, required: true},
  tax: {type: Number, required: true},
  subscription: {type: Number, required: true}
});
priceSchema.set('autoIndex', false);
priceSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Price', priceSchema);
