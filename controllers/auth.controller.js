import User from '../models/users.model.js';
import { hashPassword, Compare } from '../utils/hashPassword.js';
import generateTokenAndSetCookie from '../utils/generateToken.js';

export const singUpController = async (req, res) => {
  try {
    const { fullName, userName, password, confirmPassword, gender } = req.body;

    //check if passwords match
    if (password !== confirmPassword)
      return res.status(400).json({ error: "Passwords Don't Match" });

    //check if user already exists
    const user = await User.findOne({ userName });
    if (user)
      return res.status(400).json({ error: 'User Name Already Exists' });

    //generate profile picture
    const girlImg = `https://avatar.iran.liara.run/public/girl?username=${userName}`;
    const boyImg = `https://avatar.iran.liara.run/public/boy?username=${userName}`;

    //hash the password
    const hashedPassword = await hashPassword(password);

    //save the new user
    const newUser = new User({
      fullName,
      userName,
      password: hashedPassword,
      gender,
      profilePic: gender === 'male' ? boyImg : girlImg,
    });

    if (newUser) {
      generateTokenAndSetCookie(newUser._id, res);
      await newUser.save();

      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        userName: newUser.userName,
        profilePic: newUser.profilePic,
      });
    } else {
      res.status(400).json({ error: 'Invalid User Data' });
    }
  } catch (error) {
    console.log('SignUp Error', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
export const loginController = async (req, res) => {
  try {
    const { userName, password } = req.body;

    const user = await User.findOne({ userName });

    if (!(await Compare(password, user?.password || ' '))) {
      return res.status(400).json({ error: 'Invalid User Name OR Password' });
    }
    generateTokenAndSetCookie(user._id, res);
    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      userName: user.userName,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.log('Error Login', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
export const logOutController = (req, res) => {
  try {
    res.cookie('jwt', '', { maxAge: 0 });
    res.status(200).json({ message: 'Logged Out Successfully' });
  } catch (error) {
    console.log('Error LogOut', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
