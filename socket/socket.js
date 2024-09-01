import { Server } from 'socket.io';
import http from 'http';
import express from 'express';

const app = express();
const server = http.createServer(app);

const usersSocketMap = {};

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173', // Frontend origin
    credentials: true, // Allow credentials (cookies)
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  const userId = socket.handshake.query.userId;
  if (userId) usersSocketMap[userId] = socket.id;

  io.emit('getOnlineUsers', Object.keys(usersSocketMap));

  socket.on('disconnect', () => {
    delete usersSocketMap[userId];
    io.emit('getOnlineUsers', Object.keys(usersSocketMap));
  });
});

export { app, io, server };
