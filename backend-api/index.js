require("dotenv").config();
const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
var todoRoutes = require("./routes/todos");
var userRoutes = require("./routes/users");

const secret = process.env.SECRET_KEY;
app.set("secret", secret);
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/views"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => res.sendFile("index.html"));
app.use("/api/todos", todoRoutes);
app.use("/api/users/auth", userRoutes);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
