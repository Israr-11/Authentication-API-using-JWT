const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const loginRoute = require("./Route/routerLogin");
const registerRoute = require("./Route/routerRegister")


//Calling dependencies
const app = express();
dotenv.config();
app.use(express.json());


//Connecting to the Database
mongoose.set("strictQuery", false);
mongoose.connect(process.env.DB_URL, { useUnifiedTopology: true, useNewUrlParser: true }, () => {
    console.log("Connected to Database")
});


//Middleware
app.use("/login", loginRoute)
app.use("/welcome", registerRoute)
app.use("/register", registerRoute)


//Litening at port 5000
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Listening at port ${port}`)
})
