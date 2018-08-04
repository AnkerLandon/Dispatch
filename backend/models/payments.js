const mongoose = require('mongoose');

const paymentSchema = mongoose.Schema({
  paymentType: {type: String},
  paymentAmount: {type: Number},
  checkNumber: {type: Number}
});

module.exports = mongoose.model('Payment', paymentSchema);
