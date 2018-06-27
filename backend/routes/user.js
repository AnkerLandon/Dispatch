const express = require("express");
const User = require("../models/user");
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const mongo = require('mongodb');

const router = express.Router();

router.post("/login", (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then(hash => {
    const user = new User({
      email: req.body.email,
      password: hash,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      address: req.body.address,
      city: req.body.city,
      state: req.body.state,
      zip: req.body.zip,
      phone: req.body.phone
    });
    user.save()
      .then(result => {
        res.status(201).json({
          message: 'user created',
          result: result
        });
      })
      .catch(err => {
        res.status(500).json({
          error: err
        });
      });
  });
});

module.exports = router;
