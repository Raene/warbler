require("dotenv").config();
const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
const messageRoutes = require("./routes/messages");
const userRoutes = require("./routes/users");
const todoroutes = require("./routes/todos");
const db = require("./models");
const { loginRequired, ensureCorrectUser } = require("./middleware/auth");
const { ErrorHandler } = require("./helpers/error");

const { errorMiddleware } = require("./middleware/error");

app.disable("x-powered-by");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  "/api/users/:id/messages",
  loginRequired,
  ensureCorrectUser,
  messageRoutes
);
app.use("/api/users/auth", userRoutes);
app.use("/api/todo", todoroutes);

app.get("/api/message", async function(req, res, next) {
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

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
