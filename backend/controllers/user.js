const sensitive = require("../sensitive");
const User = require("../models/user");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


exports.getUsers = (req, res, next) => {
  User.find().then(documents => {
    res.status(200).json({documents});
  });
}

exports.createUser = (req, res, next) => {
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
}

exports.loginUser = (req, res, next) => {
  let matchedUser;
  User.findOne({userName: req.body.userName})
    .then(user => {
      if(!user) {
        return res.status(401).json({message: "Incorrect User or Password", token: null});
      }
    matchedUser = user;
    return bcrypt.compare(req.body.password, user.password)
    })
    .then( result => {
      if(!result) {
        return res.status(401).json({message: "Incorrect User or Password", token: null});
      }
      const token = jwt.sign(
        {userName: matchedUser.userName, userId: matchedUser._id, rank: matchedUser.rank},
        sensitive.salt,
        {expiresIn: '1h'});
      res.status(200).json({
        message: "Login Success",
        token: token,
        rank: matchedUser.rank,
        userName: matchedUser.userName,
        expiresIn: 3600
      });
    })
    .catch(err => {
      return res.status(401).json({message: "Login failure", token: null});
    });
}

exports.ChangeUserPass = (req, res, next) => {
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
}

exports.deleteUser = (req, res, next) => {
  User.deleteOne({_id: req.params.id}).then(result => {
    console.log(result);
    res.status(200).json({message: "User Deleted!"});
  });
}
