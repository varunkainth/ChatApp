import { Router } from "express";
import { allUser } from "../controller/user.controller.js";
import TokenVerified from "../middleware/tokenVerification.middleware.js";

const router = Router();

router.route("/").get(TokenVerified,allUser);

export default router;
