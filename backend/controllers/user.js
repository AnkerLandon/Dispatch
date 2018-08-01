const User = require("../models/user");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

function editPass (password, callback) {
  bcrypt.hash(password, 10).then(hash => {
    return callback(null, hash);
  })
  .catch(err => {
    return callback(err, null);
  })
}

exports.getUsers = (req, res, next) => {
  User.find().then(documents => {
    res.status(200).json({documents});
  })
  .catch(err => {
    console.log('get Users Error: ', err);
    res.status(500).json({message: "Error Retrieving Users"});
  });
}

exports.createUser = (req, res, next) => {
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
    user.save()
      .then(result => {
        res.status(201).json({
          message: 'user created',
          result: result.id
        });
      })
      .catch(err => {
        console.log('Create Users Error: ', err);
        res.status(500).json({message: "Error Creating User"});
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
        process.env.JWT_KEY,
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
    editPass(req.body.password, function(err, hash) {
      if(err) {
        return req.status(500).json({message: "password error"});
      }
      editedUser.password = hash;
    User.updateOne({_id: req.params.id}, editedUser)
      .exec()
      .then(result => {
        res.status(200).json({message: "update success"})
      })
      .catch(err => {
        console.log("Update User Password Error: ",err);
        res.status(500).json({
          error: err,
          message: "Error Updateing User Password"
        })
      });
    })
  }

}

exports.deleteUser = (req, res, next) => {
  User.deleteOne({_id: req.params.id}).then(result => {
    res.status(200).json({message: "User Deleted!"});
  })
  .catch(err => {
    console.log("delete User error: ",err);
    rest.status(500).json({message: "error Deleting User"});
  });
}
