const express = require("express");
const User = require("../models/user");
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const mongo = require('mongodb');

const router = express.Router();

router.post("/new", (req, res, next) => {
  console.log(req.body);
  bcrypt.hash(req.body.password, 10).then(hash => {
    const user = new User({
      userName: req.body.userName,
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
    console.log(user);
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

router.get("", (req, res, next) => {
  User.find().then(documents => {
    res.status(200).json({documents});
  });

});

router.post("/login", (req, res, next) => {
  let matchedUser;
  User.findOne({userName: req.body.userName})
    .then(user => {
      if(!user) {
        return res.status(401).json({message: "Auth Failed 1", token: null});
      }
    matchedUser = user;
    return bcrypt.compare(req.body.password, user.password)
    })
    .then( result => {
      if(!result) {
        return res.status(401).json({message: "Auth Failed 2", token: null});
      }
      const token = jwt.sign(
        {userName: matchedUser.userName, userId: matchedUser._id, rank: matchedUser.rank},
        '4!8Dy7fzQL_`[3E%(hs(y.]L+bhNk/2x',
        {expiresIn: '1h'});
      res.status(200).json({
        message: "Auth Succsess",
        token: token,
        rank: matchedUser.rank,
        userName: matchedUser.userName,
        expiresIn: 3600
      });
    })
    .catch(err => {
      return res.status(401).json({message: "Auth Failed 3", token: null});
    });
});

router.put("/:id", (req, res, next) => {
  const editedUser = req.body;

  if(editedUser.password) {
    bcrypt.hash(req.body.password, 10).then(hash => {
      editedUser.password = hash;
      updateFunk();
    })
  } else {
    updateFunk();
  }

 //updateFunk forces proper order so password hash is created and then updates

 function updateFunk() {
  User.updateOne({_id: req.params.id}, editedUser)
    .exec()
    .then(result => {
      console.log(result);
      res.status(200).json({message: "update success"})
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      })
    });
  };
});

router.delete("/:id", (req, res, next) => {
  User.deleteOne({_id: req.params.id}).then(result => {
    console.log(result);
    res.status(200).json({message: "User Deleted!"});
  });
});



module.exports = router;
