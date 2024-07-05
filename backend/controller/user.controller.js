import User from "../model/user.model.js";

export const allUser = async (req, res) => {
  try {
    const loggedInUser = req.user._id;
    const filterUser = await User.find({ _id: { $ne: loggedInUser } }).select(
      "-password"
    );
    return res.status(200).json(filterUser);
  } catch (error) {
    console.error("Error in all User Controller ", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
