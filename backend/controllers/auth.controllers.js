import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import generateToken from "../utils/generateToken.js";

export const signup = async (req, res) => {
  try {
    const { fullName, userName, password, confirmPassword, gender } = req.body;

    //check if the password matches with confirm password
    if (password !== confirmPassword || password === "") {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    //check if the user already exists
    const user = await User.findOne({ userName });

    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create a new user
    const boyPicture = `https://avatar.iran.liara.run/public/boy?username=${userName}`;
    const girlPicture = `https://avatar.iran.liara.run/public/girl?username=${userName}`;

    const newUser = await User.create({
      fullName,
      userName,
      password: hashedPassword,
      gender,
      profilePicture: gender === "male" ? boyPicture : girlPicture,
    });

    if (newUser) {
      // generate token
      generateToken(newUser._id, res);

      res.status(201).json({
        id: newUser._id,
        fullName: newUser.fullName,
        userName: newUser.userName,
        gender: newUser.gender,
        profilePicture: newUser.profilePicture,
      });
    } else {
      res.status(400).json({
        status: "fail",
        message: "invalid user data, something went wrong",
      });
    }
  } catch (error) {
    console.log("error while creating an user", error);
    res.status(500).json({ error: "error while creating user", error: error });
  }
};

export const login = async (req, res) => {
  try {
    const { userName, password } = req.body;

    //check if the user exists
    const user = await User.findOne({ userName });
    const correctPassword = await bcrypt.compare(
      password,
      user?.password || ""
    );

    if (!user || !correctPassword) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    //generate token
    generateToken(user._id, res);

    res.status(200).json({
      id: user._id,
      fullName: user.fullName,
      userName: user.userName,
      gender: user.gender,
      profilePicture: user.profilePicture,
    });
  } catch (error) {
    console.log("error during login", error);
    res.status(500).json({ error: "error while logging in", error: error });
  }
};

export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "logged out successfully" });
  } catch (error) {
    console.log("error during logout", error);
    res.status(500).json({ error: "error while loggin out", error: error });
  }
};
