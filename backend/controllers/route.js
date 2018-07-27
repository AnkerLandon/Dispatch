const Route = require("../models/route");

exports.getRoutes = (req, res, next) => {
  Route.find().then(documents => {
    res.status(200).json({documents});
  });
}

exports.createRoute = (req, res, next) => {
  console.log('server data', req.body);
  let route = new Route(req.body);
  route.save().then(result => {
    res.status(201).json({
      message: 'success',
      routeId: result._id
    });
  });
}

exports.editRoute = (req, res, next) => {
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
}

exports.deleteRoute = (req, res, next) => {
  Route.deleteOne({ _id: req.params.id}).then(result => {
    console.log(result);
    res.status(200).json({ message: "Route deleted!" });
  });
}
