const mongoose = require('mongoose');

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
  price: {type: Number}
});

module.exports = mongoose.model('Request', requestSchema);
