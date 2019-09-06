//return new router with passed down expresss variable
const express = require("express");
const router = express.Router();
var helpers = require("../helpers/users");

router.route("/signup").post(helpers.createUsers);

router.route("/login").post(helpers.login);

module.exports = router;
