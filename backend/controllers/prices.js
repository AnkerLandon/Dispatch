const Price = require("../models/price");

exports.getPrices = (req, res, next) => {
  Price.find().then(documents => {
    res.status(200).json({documents});
  })
  .catch(err => {
    console.log('Get Price Error:', err);
    res.status(500).json({message: "Error retrieving prices"});
  });
}

exports.createPrice = (req, res, next) => {
  let price = new Price (req.body);
  var d = new Date();
  price.date = (d.getMonth()+1) + "/" + d.getDate() + "/" + d.getFullYear();
  price.save().then(result => {
    res.status(201).json({
      message: 'success',
      priceId: result._id
    });
  })
  .catch(err => {
    console.log('create Price Error:', err);
    res.status(500).json({message: "Error Creating Price Model"});
  });
}
