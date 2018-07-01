const mongoose = require('mongoose');
const uniqueValidator = require("mongoose-unique-validator");

const priceSchema = mongoose.Schema({
  date: {type: String, required: true, unique: true, index: true },
  cow: {type: Number, required: true},
  heffer: {type: Number, required: true},
  calf: {type: Number, required: true},
  bull: {type: Number, required: true},
  steer: {type: Number, required: true},
  pig: {type: Number, required: true},
  sow: {type: Number, required: true},
  boar: {type: Number, required: true},
  barrel: {type: Number, required: true}
});
priceSchema.set('autoIndex', false);
priceSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Price', priceSchema);
