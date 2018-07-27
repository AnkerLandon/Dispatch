const Customer = require("../models/customer");
const PaymentPlan = require("../models/paymentPlan");

exports.createCustomer = (req, res, next) => {
  console.log('server data', req.body);
  const paymentPlan = new PaymentPlan({
    plan: req.body.currentPlan,
    start: new Date,
    end: ''
  });
  const customer = new Customer({
    companyName: req.body.companyName,
    name: req.body.name,
    address: req.body.address,
    city: req.body.city,
    township: req.body.township,
    route: req.body.route,
    currentPlan: req.body.currentPlan,
    planLog: []
  });

  customer.planLog.push(paymentPlan);

  customer.save().then(result => {
    res.status(201).json({
      message: 'success',
      custId: result._id
    });
  });
}

exports.getCustomers = (req, res, next) => {
  Customer.find().then(documents => {
    res.status(200).json({documents});
  });
}

exports.getCustomer = (req, res, next) => {
  Customer.findOne({_id: req.params.id}).then(customer => {
    console.log('customer:', customer);
    res.status(200).json(customer);
  });
}

exports.deleteCustomer = (req, res, next) => {
  Customer.deleteOne({ _id: req.params.id}).then(result => {
    console.log(result);
    res.status(200).json({ message: "Post deleted!" });
  });
}

exports.editCustomer = (req, res, next) => {
  console.log('details edit:', req.body);
  Customer.updateOne({_id: req.params.id}, req.body)
    .exec()
    .then(result => {
      console.log(result);
      res.status(200).json({message: "Details update success"})
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      })
    });
}

exports.addEndDate = (req, res, next) => {
  Customer
    .updateOne({_id: req.params.id, 'planLog.end': null},
      {$set: {'planLog.$.end': new Date}})
    .exec()
    .then(result => {
      console.log(result);
      res.status(200).json({message: "End date update success"})
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      })
    });
}

exports.addPaymentPlan = (req, res, next) => {
  console.log('payment edit:', req.body);
  const paymentplan = new PaymentPlan ({
    plan: req.body.currentPlan,
    start: new Date,
    end: ''
  });
  Customer
    .updateOne({_id: req.params.id},
      {$push: {planLog: paymentplan}})
    .exec()
    .then(result => {
      console.log(result);
      res.status(200).json({message: "add payment Plan update success"})
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      })
    });
}
