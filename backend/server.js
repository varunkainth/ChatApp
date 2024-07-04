import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

dotenv.config();

const app = express();

// app.set('trust proxy', true);

// Middleware to parse JSON and cookies
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(helmet());
// app.use(
//   rateLimit({
//     windowMs: 15 * 60 * 1000,
//     max: 100,
//     message: "Too many requests from this IP, please try again later.",
//   })
// );

//Custom Routes Import
import AuthRoutes from "./routes/auth.routes.js";

// Custom Routes

app.use("/api/auth", AuthRoutes);

const PORT = process.env.PORT || 5000;

// Connect to MongoDB and then start the server
connectDB()
  .then(() => {
    app.get("/", (req, res) => {
      res.send("Hello World!!");
    });

    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error.message);
  });
