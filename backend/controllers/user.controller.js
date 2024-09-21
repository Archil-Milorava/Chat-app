import User from "../models/user.model.js";

export  const getUsersForSidebar = async (req, res) => {
  try {
    const loggedinUserId = req.user._id;
    const users = await User.find({ _id: { $ne: loggedinUserId } }).select("-password")
    res.status(200).json(users);
  } catch (error) {
    console.log("error from getUsersForSidebar", error);
    res.status(500).json({ error: error.message });
  }
};
