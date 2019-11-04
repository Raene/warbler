exports.errorMiddleware = function(err, req, res, next) {
  err.displayError(res);
};
