require("dotenv").config();
const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
var messageRoutes = require("./routes/messages");
var userRoutes = require("./routes/users");
var todoroutes = require("./routes/todos");

app.disable("x-powered-by");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/users/:id/messages", messageRoutes);
app.use("/api/users/auth", userRoutes);
app.use("/api/todo", todoroutes);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
