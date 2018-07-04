const mongoose = require('mongoose');

const paymentPlanSchema = mongoose.Schema({
  plan: {type: String, required: true},
  start: {type: Date, required: true},
  end: {type: Date}
});

module.exports = mongoose.model('PaymentPlan', paymentPlanSchema);
