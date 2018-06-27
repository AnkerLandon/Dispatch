const mongoose = require('mongoose');
const express = require('express');
const bodyParse = require('body-parser');
const app = express();

const customerRoutes = require('./routes/customers');
const invoiceRoutes = require('./routes/invoices');
const userRoutes = require('./routes/user');

const Invoice = require('./models/invoice');
const Request = require('./models/request');

const mongo = require('mongodb');

ObjectID = mongo.ObjectID;

app.use(bodyParse.json());

mongoose.connect("mongodb+srv://Lando:cfDUpyJXcXFxxFlZ@anker0-k2bcv.gcp.mongodb.net/Dispatchdb?retryWrites=true")
  .then(() => {
    console.log('connected database');
  })
  .catch(() => {
    console.log('connection to database falure')
});

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-Wich, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, PUT, OPTIONS");
  next();
});

app.use("/api/customers", customerRoutes);
app.use("/api/invoice", invoiceRoutes);
app.use("/api/user", userRoutes);


module.exports = app;
