const express = require("express");
const Route = require("../models/route")
const mongoose = require('mongoose');


const mongo = require('mongodb');

const router = express.Router();

router.post("/new", (req, res, next) => {
  console.log('server data', req.body);
  let route = new Route(req.body);
  route.save().then(result => {
    res.status(201).json({
      message: 'success',
      routeId: result._id
    });
  });
});

router.get("", (req, res, next) => {
  Route.find().then(documents => {
    res.status(200).json({documents});
  });

});
module.exports = router;
