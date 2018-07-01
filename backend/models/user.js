const mongoose = require('mongoose');
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = mongoose.Schema({
  userName: { type: String, required: true, unique: true, index: true },
  password: {type: String, required: true },
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
    address: {type: String},
    city: {type: String},
    state: {type: String},
    zip: {type: Number},
  phone: {type: Number, required: true},
  rank: {type: String, required: true}
});
userSchema.set('autoIndex', false);
userSchema.plugin(uniqueValidator);
module.exports = mongoose.model('User', userSchema);
