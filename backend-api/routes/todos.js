//return new router with passed down expresss variable
const express = require("express");
const router = express.Router();
var helpers = require("../helpers/todos");

router
  .route("/")
  .get(helpers.getTodos)
  .post(helpers.createTodo);

router
  .route("/:todoId")
  .get(helpers.getTodo)
  .put(helpers.updateTodo)
  .delete(helpers.deleteTodo);

module.exports = router;
