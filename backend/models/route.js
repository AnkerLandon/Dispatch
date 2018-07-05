const mongoose = require('mongoose');

const testSchema = mongoose.Schema({
  title: {type: String, required: true},
  description: {type: String}
});

module.exports = mongoose.model('Test', testSchema);
