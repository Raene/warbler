exports.errorMiddleware = function(err, req, res, next) {
  console.log(err.message);
  err.displayError(res);
};
