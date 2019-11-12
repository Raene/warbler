const {
  createMessage,
  getMessage,
  deleteMessage
} = require("../helpers/messages");

module.exports = router => {
  router.route("/").post(createMessage);

  router
    .route("/:message_id")
    .get(getMessage)
    .delete(deleteMessage);

  return router;
};
