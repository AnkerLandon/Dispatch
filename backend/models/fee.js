const mongoose = require('mongoose');

const feeSchema = mongoose.Schema({
  animal: {type: String, required: true},
  feeAmount: {type: Number, required: true},
  taxable: {type: Boolean, required: true},
  appliesToo: {type: String, required: true}
});

module.exports = mongoose.model('Fee', feeSchema);
