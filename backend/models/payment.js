const mongoose = require('mongoose');

const billSchema = mongoose.Schema({
  accountId: {type: String, required: true},
  invoiceId: {type: String},
  createdDate: {type: String, required: true},
  amountDue: {type: Number, required: true},
  billType: {type: String, required: true},
  paymentType: {type: String},
  paymentAmount: {type: Number},
  checkNumber: {type: Number},
});

module.exports = mongoose.model('Bill', billSchema);
