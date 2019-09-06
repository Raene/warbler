var db = require("../models");
const jwt = require("jsonwebtoken");

exports.getUsers = (req, res) => {
  db.User.find()
    .then(users => {
      res.json(users);
    })
    .catch(err => res.send(err));
};

exports.login = async (req, res) => {
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
        "secret"
      );
      return res.status(201).json({
        id,
        name,
        token
      });
    } else {
      return res.status(400).json({
        message: "Invalid Password"
      });
    }
  } catch (err) {
    res.send(err);
  }
};

exports.createUsers = async function(req, res) {
  try {
    let user = db.User.create(req.body);
    let { id, name } = user;
    let token = jwt.sign(
      {
        id,
        name
      },
      "secret"
    );
    return res.status(201).json({
      id: newUser.id,
      name: newUser.name,
      token
    });
  } catch (err) {
    console.log(err);
    res.send(err);
  }
};

module.exports = exports;
