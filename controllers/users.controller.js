import User from '../models/users.model.js';
import Conversation from '../models/conversation.model.js';

export const getConversationUsers = async (req, res) => {
  try {
    const id = req.user._id;

    const users = await Conversation.find({ participants: id })
      .select(['-_id', '-messages', '-password', '-gender'])
      .populate('participants', ['fullName', 'userName', 'profilePic']);

    const filteredConversations = users.map((el) => {
      const filteredParticipants = el.participants.filter(
        (prant) => prant._id.toString() !== id.toString()
      );

      return {
        _id: filteredParticipants[0]._id,
        fullName: filteredParticipants[0].fullName,
        userName: filteredParticipants[0].userName,
        profilePic: filteredParticipants[0].profilePic,
        createdAt: el.createdAt,
        updatedAt: el.updatedAt,
        __v: el.__v,
      };
    });

    res.json({ data: filteredConversations });
  } catch (error) {
    console.log('Error in set conversation users', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const searchForUsers = async (req, res) => {
  try {
    const { query } = req.body;

    if (!query)
      return res.status(400).json({ error: 'Please Provide Information' });

    const users = await User.find({ userName: new RegExp(query, 'i') }).select([
      '-password',
      '-gender',
    ]);

    res.status(200).json(users);
  } catch (error) {
    console.log('Error Search For Users', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
