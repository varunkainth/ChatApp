import Conversation from "../model/conversation.model.js";
import Message from "../model/message.model.js";

export const SendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    let Conversations = await Conversation.findOne({
      participants: {
        $all: [senderId, receiverId],
      },
    });

    if (!Conversations) {
      Conversations = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });

    if (newMessage) {
      Conversations.messages.push(newMessage._id);
    }

    await Promise.all([Conversations.save(), newMessage.save()]);

    res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error in SendMessage Controller", error.message);
    return res.status(500).json({ error: "Internal Error" });
  }
};

export const ReceiveMessage = async (req, res) => {
  try {
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    }).populate("messages");

    if (!conversation) return res.status(200).json([]);

    return res.status(200).json(conversation.messages);
  } catch (error) {
    console.error("Error in ReceiveMessage", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
