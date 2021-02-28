var helpers = require("../helpers/users");

module.exports = router => {
  router.route("/signup").post(helpers.createUsers);

  router.route("/login").post(helpers.login);

  return router;
};
