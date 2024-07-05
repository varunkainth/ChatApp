import mongoose, { Schema, Types } from "mongoose";

const conversionSchema = new Schema(
  {
    participants: [
      {
        type: Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],
    messages: [
      {
        type: Types.ObjectId,
        ref: "Message",
        required: true,
      },
    ],
  },
  { timestamps: true }
);

const Conversation = mongoose.model("Conversion", conversionSchema);
export default Conversation;
