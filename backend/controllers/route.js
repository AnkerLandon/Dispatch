const Route = require("../models/route");

exports.getRoutes = (req, res, next) => {
  Route.find().then(documents => {
    res.status(200).json({documents});
  })
  .catch(err => {
    console.log('get Routes Error: ', err);
    res.status(500).json({message: "Error Retrieving Routes"});
  });
}

exports.createRoute = (req, res, next) => {
  let route = new Route(req.body);
  route.save().then(result => {
    res.status(201).json({
      message: 'success',
      routeId: result._id
    });
  })
  .catch(err => {
    console.log('create Routes Error: ', err);
    res.status(500).json({message: "Error creating Route"});
  });;
}

exports.editRoute = (req, res, next) => {
  Route.updateOne({_id: req.body._id}, req.body)
  .exec()
  .then(result => {
    res.status(200).json({message: "Route update success"})
  })
  .catch(err => {
    console.log('Edit Route Error: ', err);
    res.status(500).json({message: "Error editing Route"});
  });
}

exports.deleteRoute = (req, res, next) => {
  Route.deleteOne({ _id: req.params.id}).then(result => {
    res.status(200).json({ message: "Route deleted!" });
  })
  .catch(err => {
    console.log('Delete Route Error: ', err);
    res.status(500).json({message: "Error Deleting Route"});
  });;
}
