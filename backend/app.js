const mongoose = require('mongoose');
const express = require('express');
const bodyParse = require('body-parser');
const app = express();

const customerRoutes = require('./routes/customers');
const invoiceRoutes = require('./routes/invoices');
const userRoutes = require('./routes/user');
const priceRoutes = require('./routes/prices');
const routeRoutes = require('./routes/route');

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
    "Origin, X-Requested-Wich, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, PUT, OPTIONS");
  next();
});

app.use("/api/customers", customerRoutes);
app.use("/api/invoice", invoiceRoutes);
app.use("/api/user", userRoutes);
app.use("/api/price", priceRoutes);
app.use("/api/route", routeRoutes);


module.exports = app;
