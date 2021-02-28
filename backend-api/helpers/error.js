class ErrorHandler extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
  }

  displayError(res) {
    res.status(this.statusCode || 500).json({
      status: "error",
      statusCode: this.statusCode || 500,
      message: this.message || "Something went wrong man"
    });
  }
}

module.exports = { ErrorHandler };
