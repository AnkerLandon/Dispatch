const mongoose = require('mongoose');

const paymentPlanSchema = mongoose.Schema({
  plan: {type: String, required: true},
  start: {type: Date, required: true},
  end: {type: Date}
});

const customerSchema = mongoose.Schema({
  companyName: {type: String},
  name: { type: String, required: true  },
  address: {type: String, required: true },
  city: {type: String, required: true},
  township: {type: String},
  currentPlan: {type: String},
  planLog: [paymentPlanSchema]
});

module.exports = mongoose.model('Customer', customerSchema);
