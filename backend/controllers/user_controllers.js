const User = require("../models/user_model");
const validator = require("validator");

exports.addUser = async (req, res) => {
  console.log(req.body);
  try {
    if (
      !req.body.fname ||
      !req.body.email ||
      !req.body.password ||
      !req.body.mobile
    ) {
      throw new Error("empty");
    }
    if (!validator.isEmail(req.body.email)) {
      throw new Error("Invlaid Email");
    }
    if (!validator.isMobilePhone(req.body.mobile, "en-IN")) {
      throw new Error("Invlaid Mobile");
    }
    const user = await User.find({ email: req.body.email });
    if (user.length > 0) {
      throw new Error("Email");
    }
    const user1 = await User.find({ mobile: req.body.mobile });
    if (user1.length > 0) {
      throw new Error("Mobile");
    }
    const created = await new User(req.body);
    if (created) {
      await created.save();
      res.status(201).send("User Created");
    }
  } catch (error) {
    if (error.message == "Email") {
      res.status(409).send("Email Already Exist");
    } else if (error.message == "Mobile") {
      res.status(409).send("Mobile Number Already Exist");
    } else if (error.message == "Invlaid Mobile") {
      res.status(409).send("Invalid Mobile Number");
    } else if (error.message == "Invlaid Email") {
      res.status(409).send("Invalid Email");
    } else if (error.message == "empty") {
      res.status(400).send("Please Fill All The Fields");
    } else {
      res.status(400).send(error.message);
    }
  }
};

exports.login = async (req, res) => {
  try {
    console.log(req.body);
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.genToken();
    if (!token) {
      throw new Error("something");
    }
    res.status(200).json({
      Name: user.fname,
      Email: user.email,
      Mobile: user.mobile,
      Token: token,
    });
    res.send("Done");
  } catch (error) {
    if (error.message == "something") {
      res.status(500).send("Something Went Wrong");
    } else {
      console.log(error);
      res.status(400).send(error.message);
    }
  }
};

exports.update = async (req, res) => {
  console.log(req.body);
  try {
    if (
      !req.body.fname ||
      !req.body.email ||
      !req.body.password ||
      !req.body.mobile
    ) {
      throw new Error("Bad Request");
    }
    if (!validator.isEmail(req.body.email)) {
      throw new Error("Invalid Email");
    }
    if (!validator.isMobilePhone(req.body.mobile, "en-IN")) {
      throw new Error("Invalid Mobile");
    }
    const user = req.profile;
    console.log(user);

    const updateUser = await User.findById({
      _id: user._id,
    });

    console.log(updateUser);

    await updateUser.updateOne(req.body);
    await updateUser.save();

    const updatedUser = await User.findById({
      _id: user.id,
    });

    console.log("Updated User = ", updatedUser);
    res.send(updatedUser);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = req.profile;
    if (!user) {
      throw new Error("No User");
    }
    res.send(user);
  } catch (error) {
    if (error.message == "No User") {
      res.status(400).send("Invaid Token");
    }
  }
};
