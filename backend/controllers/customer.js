const Customer = require("../models/customer");
const PaymentPlan = require("../models/paymentPlan");

exports.createCustomer = (req, res, next) => {
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
  Customer.find()
  .then(documents => {
    res.status(200).json({documents});
  })
  .catch(err => {res.status(500).json({message: 'Customers not found'});
  });
}

exports.getCustomer = (req, res, next) => {
  Customer.findOne({_id: req.params.id}).then(customer => {
    res.status(200).json(customer);
  })
  .catch(err => {res.status(500).json({message: 'Customer not found'});
  });
}

exports.deleteCustomer = (req, res, next) => {
  Customer.deleteOne({ _id: req.params.id}).then(result => {
    res.status(200).json({ message: "Post deleted!" });
  })
  .catch(err => {res.status(500).json({message: 'Customer not found'});
  });
}

exports.editCustomer = (req, res, next) => {
  Customer.updateOne({_id: req.params.id}, req.body)
    .exec()
    .then(result => {
      res.status(200).json({
        message: "Details update success"
      })
    })
    .catch(err => {
      res.status(500).json({
        message: 'Customer Edit Failed'
      })
    });
}

exports.addEndDate = (req, res, next) => {
  Customer
    .updateOne({_id: req.params.id, 'planLog.end': null},
      {$set: {'planLog.$.end': new Date}})
    .exec()
    .then(result => {
      res.status(200).json({
        message: "End date update success"
      })
    })
    .catch(err => {
      res.status(500).json({
        message: 'Failed to create Payment End Date For Customer'
      })
    });
}

exports.addPaymentPlan = (req, res, next) => {
  const paymentplan = new PaymentPlan ({
    plan: req.body.currentPlan,
    start: new Date,
    end: ''
  });
  Customer
    .updateOne({_id: req.params.id},
      {$push: {planLog: paymentplan}})
    .exec()
    .then(result => {;
      res.status(200).json({
        message: "add payment Plan update success"
      })
    })
    .catch(err => {
      res.status(500).json({
        message: 'Failed to Add new Payment Plan to Customer'
      })
    });
}
