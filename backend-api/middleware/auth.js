const jwt = require("jsonwebtoken");

exports.loginRequired = function(req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, process.env.SECRET_KEY, function(err, decoded) {
      if (decoded) {
        return next();
      } else {
        err = new Error("Unauthorized");
        err.statusCode = 401;
        return next(err);
      }
    });
  } catch (err) {
    err = new Error("Please log in first");
    err.statusCode = 401;
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
        return next({
          status: 401,
          message: "Unauthorized"
        });
      }
    });
  } catch (err) {
    return next({
      status: 401,
      message: "Unauthorized"
    });
  }
};
