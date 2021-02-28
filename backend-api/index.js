require("dotenv").config();
const express = require("express");
const app = express();
const router = express.Router({ mergeParams: true });
const envVar = process.env.NODE_ENV;
const logger = require("morgan");
const config = require("./config")[envVar];
const bodyParser = require("body-parser");
const messageRoutes = require("./routes/messages");
const userRoutes = require("./routes/users");
const db = require("./models");
const { loginRequired, ensureCorrectUser } = require("./middleware/auth");
const { ErrorHandler } = require("./helpers/error");

const { errorMiddleware } = require("./middleware/error");

app.disable("x-powered-by");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
if (envVar !== "production" || envVar !== "test") {
  app.use(logger("dev"));
}

app.use(
  "/api/users/:id/messages",
  loginRequired,
  ensureCorrectUser,
  messageRoutes(router)
);
app.use("/api/users/auth", userRoutes(router));

app.get("/api/message",  loginRequired,
ensureCorrectUser, async function(req, res, next) {
  try {
    let messages = await db.Message.find()
      .sort({ createdAt: "desc" })
      .populate("user", {
        name: true,
        profileImageUrl: true
      });
    return res.status(200).json(messages);
  } catch (err) {}
});

//test route for error middleware
app.get("/error", (req, res, next) => {
  next(new ErrorHandler());
});

//error middleware must get called last for stable performance
app.use(errorMiddleware);
app.listen(`${config.genVar.port}`, () =>
  console.log(`Example app listening on port ${config.genVar.port}!`)
);

module.exports = app;
