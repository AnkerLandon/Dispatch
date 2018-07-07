const mongoose = require('mongoose');
const uniqueValidator = require("mongoose-unique-validator");

const RouteSchema = mongoose.Schema({
  title: {type: String, required: true, unique: true, index: true},
  description: {type: String}
});
RouteSchema.set('autoIndex', false);
RouteSchema.plugin(uniqueValidator);
module.exports = mongoose.model('Route', RouteSchema);
