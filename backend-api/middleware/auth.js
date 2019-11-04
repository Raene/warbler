const jwt = require("jsonwebtoken");
const { ErrorHandler } = require("../helpers/error");

exports.loginRequired = function(req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, process.env.SECRET_KEY, function(err, decoded) {
      if (decoded) {
        return next();
      } else {
        err = new ErrorHandler(401, "Unauthorized bad token");
        return next(err);
      }
    });
  } catch (err) {
    err = new ErrorHandler(401, "Please Log in First");
    return next(err);
  }
};

exports.ensureCorrectUser = function(req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, process.env.SECRET_KEY, function(err, decoded) {
      if (decoded && decoded.id === req.params.id) {
        return next();
      } else {
        err = new ErrorHandler(401, "Unauthorized");
        return next(err);
      }
    });
  } catch (err) {
    return next(err);
  }
};
