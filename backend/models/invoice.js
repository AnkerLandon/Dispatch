const mongoose = require('mongoose');
const uniqueValidator = require("mongoose-unique-validator");

const requestSchema = mongoose.Schema({
  number: {type: Number, required: true},
  animal: {type: String,
    enum:[
    'cow',
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
  priceId: {type: String}
});


const invoiceSchema = mongoose.Schema({
  accountId: {type: String, required: true},
  date: {type: String, required: true },
  requests: [requestSchema],
  total: {type: Number}
});


module.exports = mongoose.model('Invoice', invoiceSchema);
