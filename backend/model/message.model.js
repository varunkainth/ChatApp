import mongoose, { Schema } from "mongoose";
import { decrypt, encrypt } from "../utils/encryption.js";

const messageSchema = new Schema(
  {
    senderId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiverId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

messageSchema.pre('save', async function (next) {
    this.message = encrypt(this.message);
    next();
  });
  
 messageSchema.methods.decryptFields = async function () {
    this.message = decrypt(this.message);
    return this;
  };

  const Message = mongoose.model("Message",messageSchema)
  export default Message