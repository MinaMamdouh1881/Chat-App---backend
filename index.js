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

app.use(cors());
app.use(express.json());
app.use(cookieParser());


app.use('/api/auth', authRoute);
app.use('/api/message', messageRoute);
app.use('/api/users', usersRoute);

app.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Listening On Port ${PORT}`);
});
