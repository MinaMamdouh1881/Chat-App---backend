import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import connectToMongoDB from './DB/connectToMongoDB.js';
import authRoute from './routes/auth.route.js';
import messageRoute from './routes/message.route.js';
import usersRoute from './routes/users.route.js';
import { app, server, io } from './socket/socket.js';

dotenv.config();

const PORT = process.env.PORT || 3000;
const corsOptions = {
  origin: [
    'http://localhost:5173',
    'https://chat-app-frontend-beryl-omega.vercel.app',
  ],
  // origin: 'https://chat-app-frontend-beryl-omega.vercel.app',
  credentials: true,
  methods: ['GET', 'POST'],
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoute);
app.use('/api/message', messageRoute);
app.use('/api/users', usersRoute);

server.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Listening On Port ${PORT}`);
});
