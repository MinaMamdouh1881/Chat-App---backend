import User from '../models/users.model.js';
import Conversation from '../models/conversation.model.js';

export const getConversationUsers = async (req, res) => {
  // try {
  //   const id = req.user._id;

  //   const users = await Conversation.find({ participants: id })
  //     .select(['-_id', '-messages', '-password', '-gender'])
  //     .populate('participants', ['fullName', 'userName', 'profilePic'])
  //     .sort({ updatedAt: 'desc' });

  //   // const filteredConversations = users.map((el) => {
  //   //   const filteredParticipants = el.participants.filter(
  //   //     (prant) => prant._id.toString() !== id.toString()
  //   //   );

  //   //   return {
  //   //     _id: users[0]._id,
  //   //     fullName: users[0].fullName,
  //   //     userName: users[0].userName,
  //   //     profilePic: users[0].profilePic,
  //   //     createdAt: el.createdAt,
  //   //     updatedAt: el.updatedAt,
  //   //     __v: el.__v,
  //   //   };
  //   // });

  //   res.json({ data: users });
  // } catch (error) {
  //   console.log('Error in set conversation users', error.message);
  //   res.status(500).json({ error: 'Internal server error' });
  // }
  try {
    const loggedInUserId = req.user._id;

    // const filteredUsers = await User.find().select('-password');
    const filteredUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select('-password');
    
    res.status(200).json({ data: filteredUsers });
  } catch (error) {
    console.error('Error in getUsersForSidebar: ', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const searchForUsers = async (req, res) => {
  try {
    const { query } = req.body;
    const id = req.user._id;

    if (!query)
      return res.status(400).json({ error: 'Please Provide Information' });

    const users = await User.find({ userName: new RegExp(query, 'i') }).select([
      '-password',
      '-gender',
    ]);

    const filteredUsers = users.filter(
      (user) => user._id.toString() !== id.toString()
    );

    res.status(200).json(filteredUsers);
  } catch (error) {
    console.log('Error Search For Users', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
