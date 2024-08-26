import mongoose from 'mongoose';

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log('Connected To Mongo DB');
  } catch (error) {
    console.log('Error In Connecting To Mongo DB', error.message);
  }
};
export default connectToMongoDB;
