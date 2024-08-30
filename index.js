import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import connectToMongoDB from './DB/connectToMongodb.js';
import authRoute from './routes/auth.route.js';
import messageRoute from './routes/message.route.js';
import usersRoute from './routes/users.route.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const corsOptions = {
  origin: 'http://localhost:5173', // Frontend origin
  credentials: true, // Allow credentials (cookies)
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());


app.use('/api/auth', authRoute);
app.use('/api/message', messageRoute);
app.use('/api/users', usersRoute);

app.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Listening On Port ${PORT}`);
});
