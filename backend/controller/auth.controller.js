import User from "../model/user.model.js";
import tokenCreate from "../utils/tokenCreation.js";
import uploadToCloudinary from "../utils/uploadToCloud.js";

export const signup = async (req, res) => {
  const { fullname, username, password, email, gender } = req.body;

  // Check if all required fields are provided
  if (!fullname || !username || !password || !email || !gender) {
    return res
      .status(400)
      .json({ error: "Please provide all required fields." });
  }

  try {
    const user = await User.findOne({ $or: [{ email }, { username }] });
    // Check if user exists
    if (user) {
      return res.status(404).json({ error: "User already Exist." });
    }


    let profilePicUrl = ""; // Initialize profile pic URL

    // Handle profile picture upload if provided
    if (req.file) {
      const profilepicPath = req.file.path;

      // Upload profile picture to Cloudinary
      const profilePicUploaded = await uploadToCloudinary(
        profilepicPath,
        username
      );
      if (!profilePicUploaded || !profilePicUploaded.url) {
        return res
          .status(400)
          .json({ error: "Failed to upload profile picture to Cloudinary." });
      }

      profilePicUrl = profilePicUploaded.url; // Set profile pic URL
    }else{
      
        let genderPrefix = '';
        if (gender === 'male') {
            genderPrefix = 'boy';
        } else  {
            genderPrefix = 'girl';
        } 
        profilePicUrl= `https://avatar.iran.liara.run/public/${genderPrefix}?username=${username}`;
      }
    

    // Create user in the database
    const newUser = new User({
      fullname,
      username,
      email,
      gender,
      password, // Remember to hash this password before saving to DB
      profilePic: profilePicUrl, // Assign profile pic URL
    });

    // Save user to database
    const savedUser = await newUser.save();
    if (!savedUser) {
      return res
        .status(500)
        .json({ error: "Failed to save user to the database." });
    }

    // Fetch created user details excluding password
    const createdUser = await User.findById(savedUser._id).select("-password");
    if (!createdUser) {
      return res
        .status(500)
        .json({ error: "Failed to fetch user details after creation." });
    }

    // Return success response
    return res.status(201).json({
      data: createdUser,
      message: "User successfully created.",
      success: true,
    });
  } catch (error) {
    // Handle any unexpected errors
    console.error("Error in user registration:", error);
    return res
      .status(500)
      .json({ error: "Failed to register user. Please try again later." });
  }
};

export const login = async (req, res) => {
  const { email, username, password } = req.body;

  // Check if email or username is provided
  if (!email && !username) {
    return res
      .status(400)
      .json({ error: "Please enter the Email or Username." });
  }

  // Check if password is provided
  if (!password) {
    return res.status(400).json({ error: "Password must be entered." });
  }

  try {
    const user = await User.findOne({ $or: [{ email }, { username }] });
    // Check if user exists
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    // Validate password
    const isPasswordValid = await user.isValidPassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid password." });
    }

    // If authentication succeeds, generate token and handle further actions (e.g., sending tokens)
    // Example: Generate and send JWT token for authentication

    await tokenCreate(user._id, res);

    // Return success response
    return res.status(200).json({
      message: "Login successful.",
      user: {
        _id: user._id,
        fullname: user.fullname,
        username: user.username,
        email: user.email,
        gender: user.gender,
        profilePic: user.profilePic,
      },
    });
  } catch (error) {
    // Handle any unexpected errors
    console.error("Error in user login:", error);
    return res
      .status(500)
      .json({ error: "Failed to login. Please try again later." });
  }
};

export const logout = async (req, res) => {
  try {
     // Clear refresh token cookie
  res.clearCookie("refreshtoken");

  // Clear Authorization header (if applicable)
  res.setHeader("Authorization", "");

  return res.status(200).json({ message: "Logout successful." });
  } catch (error) {
    console.log("Logout Error in Contoller", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
