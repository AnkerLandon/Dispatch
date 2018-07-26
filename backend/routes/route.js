const express = require("express");
const Route = require("../models/route")
const mongoose = require('mongoose');
const checkAuth = require('../Middleware/check-auth-admin');

const mongo = require('mongodb');

const router = express.Router();

router.post("/new", checkAuth,(req, res, next) => {
  console.log('server data', req.body);
  let route = new Route(req.body);
  route.save().then(result => {
    res.status(201).json({
      message: 'success',
      routeId: result._id
    });
  });
});

router.get("", checkAuth,(req, res, next) => {
  Route.find().then(documents => {
    res.status(200).json({documents});
  });

});

router.put("", checkAuth,(req, res, next) => {
  console.log("edit route data", req.body)
  Route.updateOne({_id: req.body._id}, req.body)
  .exec()
    .then(result => {
      console.log(result);
      res.status(200).json({message: "Route update success"})
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      })
    });
});

router.delete("/:id",checkAuth,(req, res, next) => {
  Route.deleteOne({ _id: req.params.id}).then(result => {
    console.log(result);
    res.status(200).json({ message: "Route deleted!" });
  });
});

module.exports = router;
