import express from "express"
import TokenVerified from "../middleware/tokenVerification.middleware.js"
import { ReceiveMessage, SendMessage } from "../controller/message.controller.js"

const router = express.Router()

router.route("/:id").get(TokenVerified,ReceiveMessage)
router.route("/send/:id").post(TokenVerified,SendMessage)

export default router
