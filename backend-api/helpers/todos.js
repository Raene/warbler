var db = require("../models");

exports.getTodos = (req, res) => {
  db.Todo.find()
    .then(todos => res.json(todos))
    .catch(err => res.send(err));
};

exports.createTodo = (req, res) => {
  db.Todo.create(req.body)
    .then(newToDo => {
      console.log(req.body);
      res.status(201).json(newToDo);
    })
    .catch(err => {
      res.send(err);
    });
};

exports.getTodo = (req, res) => {
  db.Todo.findById(req.params.todoId)
    .then(resp => res.status(201).json(resp))
    .catch(err => res.send(err));
};

exports.updateTodo = (req, res) => {
  db.Todo.findOneAndUpdate({ _id: req.params.todoId }, req.body)
    .then(todo => res.status(201).json(todo))
    .catch(err => res.status(401).send(err));
};

exports.deleteTodo = (req, res) => {
  db.Todo.remove({ _id: req.params.todoId })
    .then(() => {
      res.json({ message: "deleted successfully" });
    })
    .catch(err => res.send(err));
};

module.exports = exports;
