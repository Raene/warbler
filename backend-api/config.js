genVar = {
  port: process.env.PORT || 3000,
  saltngRounds: 10
};

module.exports = {
  development: {
    genVar,
    db_host: process.env.DB_HOST
  },
  test: {
    genVar,
    db_host: process.env.DB_TEST_HOST
  }
};
