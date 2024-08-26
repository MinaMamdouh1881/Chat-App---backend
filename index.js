import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectToMongoDB from './DB/connectToMongodb.js';
import authRoute from './routes/auth.route.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());


app.use('/api/auth', authRoute);

app.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Listening On Port ${PORT}`);
});
