const db = require("../models");

exports.createMessage = async function(req, res, next) {
  try {
    let user = await db.User.findById(req.params.id);
    let message = await db.Message.create({
      text: req.body.text,
      user: req.params.id
    });
    user.message.push(message.id);
    await user.save();
    let foundMessage = db.Message.findById(message.id).populate("user", {
      name: true
    });
    return res.status(200).json(foundMessage);
  } catch (err) {
    return next(err);
  }
};

exports.getMessage = async function(req, res, next) {
  try {
    let message = await db.Message.find(req.params.message_id);
    return res.status(200).json(message);
  } catch (err) {
    return next(err);
  }
};

exports.deleteMessage = async function(req, res, next) {
  try {
    let foundMessage = await db.Message.findById(req.params.message_id);
    await foundMessage.remove();
    return status(200).json(foundMessage);
  } catch (err) {}
};
