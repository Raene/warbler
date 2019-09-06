const mongoose = require("mongoose");
mongoose.set("debug", true);
mongoose.connect("mongodb://localhost/todo-api", {
  useFindAndModify: true,
  useNewUrlParser: true
});
mongoose.connection.on(
  "error",
  console.error.bind(console, "connection error:")
);
mongoose.connection.once("open", function() {
  console.log("connected to mongo");
});

mongoose.Promise = Promise;

module.exports.Todo = require("./todo");
module.exports.User = require("./user");
