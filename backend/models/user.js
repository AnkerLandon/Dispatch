const mongoose = require('mongoose');
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: {type: String, required: true },
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
    address: {type: String},
    city: {type: String},
    state: {type: String},
    zip: {type: Number},
  phone: {type: Number, required: true},
  level: {type: String, required: true}
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);
