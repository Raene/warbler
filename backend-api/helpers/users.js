var db = require("../models");
const jwt = require("jsonwebtoken");
const { ErrorHandler } = require("../helpers/error");

exports.getUsers = (req, res) => {
  db.User.find()
    .then(users => {
      res.json(users);
    })
    .catch(err => res.send(err));
};

exports.login = async (req, res, next) => {
  try {
    let user = await db.User.findOne({
      email: req.body.email
    });
    let { id, name } = user;
    let match = await user.comparePassword(req.body.password);
    if (match) {
      let token = jwt.sign(
        {
          id,
          name
        },
        process.env.SECRET_KEY
      );
      return res.status(201).json({
        id,
        name,
        token
      });
    } else {
      let err = new ErrorHandler(400, "Invalid Password");
      return next(err);
    }
  } catch (err) {
    return next(err);
  }
};

exports.createUsers = async function(req, res, next) {
  try {
    let user = await db.User.create(req.body);
    let { id, name } = user;
    let token = jwt.sign(
      {
        id,
        name
      },
      "secret"
    );
    return res.status(201).json({
      id: user.id,
      name: user.name,
      token
    });
  } catch (err) {
    return next(err);
  }
};

module.exports = exports;
