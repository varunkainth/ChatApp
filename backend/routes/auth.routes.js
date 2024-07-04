import express from "express";
import { login, logout, signup } from "../controller/auth.controller.js";
import TokenVerified from "../middleware/tokenVerification.middleware.js";

const router = express.Router();

router.route("/signup").post(signup);
router.route("/login").post( login);
router.route("/logout").post(TokenVerified, logout);

export default router;
