const mongoose = require('mongoose');

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

module.exports = mongoose.model('Request', requestSchema);
