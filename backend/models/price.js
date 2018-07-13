const mongoose = require('mongoose');
const uniqueValidator = require("mongoose-unique-validator");

const feeSchema = mongoose.Schema({
  animal: {type: String, required: true},
  feeAmount: {type: Number, required: true},
  taxable: {type: Boolean, required: true},
  appliesToo: {type: String, required: true}
});


const priceSchema = mongoose.Schema({
  date: {type: String, required: true, unique: true, index: true },
  pickup: {type: Number, required: true},
  tax: {type: Number, required: true},
  subscription: {type: Number, required: true},
  fees: [feeSchema]
});
priceSchema.set('autoIndex', false);
priceSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Price', priceSchema);
