const express = require("express");
const checkAuth = require('../Middleware/check-auth-admin');
const UserController = require('../controllers/user');

const router = express.Router();

router.post("/new", checkAuth, UserController.createUser);

router.get("", checkAuth, UserController.getUsers);

router.post("/login", UserController.loginUser);

router.put("/:id", checkAuth, UserController.ChangeUserPass);

router.delete("/:id", checkAuth, UserController.deleteUser);



module.exports = router;
