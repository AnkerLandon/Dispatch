const mongoose = require('mongoose');

const paymentSchema = mongoose.Schema({
  accountId: {type: String, required: true},
  invoiceId: {type: String},
  createdDate: {type: String, required: true},
  amountDue: {type: String, required: true},
  billType: {type: String, required: true},
  paymentType: {type: String},
  paymentAmount: {type: Number},
  checkNumber: {type: Number},
});

module.exports = mongoose.model('Payment', paymentSchema);
