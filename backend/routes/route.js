const express = require("express");
const checkAuth = require('../Middleware/check-auth-admin');
const RouteController = require('../controllers/route');

const router = express.Router();

router.post("/new", checkAuth, RouteController.createRoute);

router.get("", checkAuth, RouteController.getRoutes);

router.put("", checkAuth, RouteController.editRoute);

router.delete("/:id",checkAuth, RouteController.deleteRoute);

module.exports = router;
