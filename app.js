const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const loginRoute = require("./Route/routerLogin");
const registerRoute = require("./Route/routerRegister");

const app = express();
dotenv.config();
app.use(express.json());

mongoose.set("strictQuery", false);
mongoose.connect(
  process.env.DB_URL,
  { useUnifiedTopology: true, useNewUrlParser: true },
  () => {
    console.log("Connected to Database");
  }
);

app.use("/login", loginRoute);
app.use("/welcome", registerRoute);
app.use("/register", registerRoute);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Listening at port ${port}`);
});
