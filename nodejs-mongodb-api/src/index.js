const express = require("express");
var cors = require('cors');
const mongoose = require("mongoose");
require("dotenv").config();
const userRoute = require("./routes/user");

const app = express();
const port = process.env.PORT || 9000;

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((error) => console.error(error));

// middleware
app.use(cors())
app.use(express.json());
app.use("/api", userRoute);

app.get("/", (req, res) => {
    res.send("WELCOME");
});

app.listen(port, () => {
  console.log(`El sevidor se esta ejecutando en http://localhost:${port}`);
});
