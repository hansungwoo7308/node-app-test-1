// Server ------------------------------------------
const express = require("express");
const app = express();
const port = 5000;

// Server Setting ------------------------------------------
const config = require("./config/key");
const { User } = require("./models/User"); // User Model 가져오기...
const bodyParser = require("body-parser"); // 미들웨어

// application/x-www-form-urlencoded 형식의 데이터를 분석할 수 있게하는...
app.use(bodyParser.urlencoded({ extended: true }));
// application/json 타입으로 된것을 분석해서 가져올수있게하는...
app.use(bodyParser.json()); // 본문을 json형태로 파싱

// Database -------------------------------------------
const mongoose = require("mongoose");
// Connecting Database with Mongoose
mongoose
  .connect(config.mongoURI)
  .then(() => console.log("mongoDB is connected."))
  .catch((err) => console.log(err));

// Server Routing ------------------------------------------

// Route for Home
app.get("/", (req, res) => res.send("Hello World"));

// Route for SignUp
app.post("/register", (req, res) => {
  // 회원가입할때 필요한 정보들을 클라이언트에서 가져오면
  // 그것들을 데이터베이스에 넣어준다.
  const user = new User(req.body);

  // mongoDB method
  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({ success: true });
  });
});

//
app.listen(port, () => console.log(`App is listening on port ${port}`));
