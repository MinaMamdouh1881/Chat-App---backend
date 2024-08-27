import User from '../models/users.model.js';

export const getUsersForSidebar = async (req, res) => {
  try {
    const id = req.user._id;

    let users = await User.find({ _id: { $ne: id } }).select([
      '-password',
      '-gender',
    ]);

    res.status(200).json(users);
  } catch (error) {
    console.log('Error getUsersForSidebar', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
