const User = require("../models/user_model");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const auth = async (req, res, next) => {
  console.log(req);
  try {
    if (!req.header("Authorization")) {
      throw new Error("UnAuthorized");
    }
    const token = req.header("Authorization").replace("Bearer ", "");
    const user = await jwt.verify(token, process.env.JWT_KEY);
    if (!user) {
      throw new Error("Invalid Token");
    }
    const profile = await User.findOne({ email: user.email });
    if (!profile) {
      throw new Error("Invalid Token");
    }
    req.profile = profile;
    next();
  } catch (error) {
    if (error.message == "UnAuthorized") {
      res.status(401).send(error.message);
    } else if (error.message == "Invalid Token") {
      res.status(401).send("Invalid Token");
    } else {
      res.status(400).send(error.message);
    }
  }
};

module.exports = auth;
