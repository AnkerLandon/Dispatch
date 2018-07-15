const mongoose = require('mongoose');
const uniqueValidator = require("mongoose-unique-validator");

const requestSchema = mongoose.Schema({
  number: {type: Number, required: true},
  animal: {type: String,
    enum:[
    'cow',
    'horse',
    'heffer',
    'calf',
    'bull',
    'steer',
    'pig',
    'sow',
    'boar',
    'barrel',
    'other'],
  required: true},
  other: {type: String},
  complete: {type: Boolean, required: true},
  price: {type: Number},
  tax: {type: Number},
  priceId: {type: String}
});


const invoiceSchema = mongoose.Schema({
  accountId: {type: String, required: true},
  date: {type: String, required: true },
  requests: [requestSchema],
  pickupFee: {type: Number},
  tax: {type: Number},
  route: {type: String}
});


module.exports = mongoose.model('Invoice', invoiceSchema);
