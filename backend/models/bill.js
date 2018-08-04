const mongoose = require('mongoose');

const paymentSchema = mongoose.Schema({
  paymentType: {type: String},
  paymentAmount: {type: Number},
  checkNumber: {type: Number}
});

const billSchema = mongoose.Schema({
  accountId: {type: String, required: true},
  invoiceId: {type: String},
  createdDate: {type: String, required: true},
  amountDue: {type: Number, required: true},
  billType: {type: String, required: true},
  payments: [paymentSchema],
});

module.exports = mongoose.model('Bill', billSchema);
