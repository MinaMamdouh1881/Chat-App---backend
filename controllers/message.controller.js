import Conversation from '../models/conversation.model.js';
import Message from '../models/message.model.js';
import { getReceiverSocketId, io } from '../socket/socket.js';

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation)
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });

    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });

    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }
    await Promise.all([newMessage.save(), conversation.save()]);

    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit('newMessage', senderId, newMessage);
    }
    res.status(201).json({ newMessage });
  } catch (error) {
    console.log('Error Send Message', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: userToChat } = req.params;
    const userId = req.user._id;

    let conversation = await Conversation.findOne({
      participants: { $all: [userId, userToChat] },
    }).populate('messages');

    const messages = conversation?.messages || [];

    res.status(200).json(messages);
  } catch (error) {
    console.log('Error Get Messages', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
