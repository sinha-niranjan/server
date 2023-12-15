const { hashPassword, comparePassword } = require("../helpers/authHelper");
const userModel = require("../models/userModel");
const JWT = require("jsonwebtoken");

const registerController = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // validation
    if (!name) {
      return res.status(400).send({
        success: false,
        message: "email is required ",
      });
    }

    if (!email) {
      return res.status(400).send({
        success: false,
        message: "email is required ",
      });
    }

    if (!password || password.lenght < 6) {
      return res.status(400).send({
        success: false,
        message: "Password is required and 6 character long",
      });
    }

    // existing user
    const existingUser = await userModel.findOne({ email: email });

    if (existingUser) {
      return res.status(500).send({
        success: false,
        message: "User ALready Register with this email ",
      });
    }

    // hashed password
    const hashedPassword = await hashPassword(password);

    // save user
    const user = await userModel({
      name,
      email,
      password: hashedPassword,
    }).save();
    res.status(201).send({
      success: true,
      message: "Registeration Successfull pleasse login",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in register api",
      error,
    });
  }
};

// login
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(500).send({
        success: false,
        message: "Please Provide Email and Password both ",
      });
    }

    // find user
    const user = await userModel.findOne({ email: email });

    if (!user) {
      return res.status(500).send({
        success: false,
        message: "User not found ",
      });
    }

    // match Password

    const match = await comparePassword(password, user.password);

    if (!match) {
      return res.status(500).send({
        success: false,
        message: "Invalid username or password ",
      });
    }

    // TOKEN JWT
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // undefined password
    user.password = undefined;

    res.status(200).send({
      success: true,
      message: "login successfully",
      token,
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "error is login api ",
      error,
    });
  }
};

// update user
const updateUser = async (req, res) => {
  try {
    const { name, password, email } = req.body;

    // user find
    const user = await userModel.findOne({ email });

    // password Validate
    if (password && password.lenght < 6) {
      return res.status(400).send({
        success: false,
        message: "Password is required and should 6 character long ",
      });
    }

    const hashedPassword = password ? await hashPassword(password) : undefined;

    // updated user
    const updatedUser = await userModel.findOneAndUpdate(
      { email },
      {
        name: name || user.name,
        password: hashedPassword || user.password,
      },
      { new: true }
    );

    updatedUser.password = undefined

    res.status(201).send({
      success: true,
      message: "Profile updated Please login",
      updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in user update api ",
      error,
    });
  }
};

module.exports = { registerController, loginController, updateUser };
