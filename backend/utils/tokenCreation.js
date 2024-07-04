import jwt from "jsonwebtoken";

const tokenCreate = async (userId, res) => {
  const Accesstoken = jwt.sign({ userId }, process.env.JWT_ACCESS_SECRET_KEY, {
    expiresIn: "1h",
  });
  const Refreshtoken = jwt.sign(
    { userId },
    process.env.JWT_REFRESH_SECRET_KEY,
    {
      expiresIn: "10d",
    }
  );

  res.setHeader("Authorization", `Bearer ${Accesstoken}`);
  res.cookie("refreshtoken", Refreshtoken, {
    maxAge: 10 * 24 * 60 * 60 * 1000, // Expired in 10 Days
    secure: true, // Only send cookie over HTTPS
    httpOnly: true, // Prevent access via client-side JavaScript
    sameSite: "strict", // Limit cookie to first-party context
  });
};

export default tokenCreate;
