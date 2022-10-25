const express = require("express");
const app = express();
const port = 5000;

const mongoose = require("mongoose");
mongoose
  .connect(
    "mongodb+srv://wooky:7308@cluster0.ay69hkp.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => console.log("mongoDB is connected."))
  .catch((err) => console.log(err));

// Frontend
app.get("/", (req, res) => res.send("Hello World"));

// Backend
app.listen(port, () => console.log(`App is listening on port ${port}`));
