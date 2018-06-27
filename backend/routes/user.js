const express = require("express");
const User = require("../models/user");
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const mongo = require('mongodb');

const router = express.Router();

router.post("/new", (req, res, next) => {
  console.log(req.body);
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
      phone: req.body.phone,
      rank: req.body.rank
    });
    console.log(this.user);
    user.save()
      .then(result => {
        res.status(201).json({
          message: 'user created',
          result: result.id
        });
      })
      .catch(err => {
        res.status(500).json({
          error: err
        });
      });
  });
});

router.get("",(req, res, next) => {
  User.find().then(documents => {
    res.status(200).json({documents});
  });

});



module.exports = router;
