const mongoose = require('mongoose');

const customerSchema = mongoose.Schema({
  name: { type: String, required: true  },
  address: {type: String, required: true },
  city: {type: String, required: true},
  payment: {type: String, required: true, enum: ['Cash','Subscription']}
});

module.exports = mongoose.model('Customer', customerSchema);
