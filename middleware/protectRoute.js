import jwt from 'jsonwebtoken';
import Users from '../models/users.model.js';
const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token)
      return res
        .status(401)
        .json({ error: 'Unauthorized - No Token Provided' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded)
      return res.status(401).json({ error: 'Unauthorized - Invalid Token' });

    const user = await Users.findById(decoded.userId);

    if (!user) return res.status(404).json({ error: 'User Not Found' });

    req.user = user;
    next();
  } catch (error) {
    console.log('Error protectRoute', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default protectRoute;
