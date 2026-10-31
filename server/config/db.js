import mongoose from 'mongoose';

let isConnected = false;

const connectDB = async () => {
  if (!process.env.MONGODB_URI) {
    console.warn('⚠️ MONGODB_URI not found in environment. Running with in-memory storage.');
    return false;
  }

  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      dbName: 'cynbit-assistant',
      serverSelectionTimeoutMS: 5000,
    });
    isConnected = true;
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    return true;
  } catch (error) {
    console.warn(`⚠️ MongoDB Connection Error: ${error.message}`);
    console.warn('⚡ Operating with resilient in-memory storage fallback.');
    isConnected = false;
    return false;
  }
};

export const getDBStatus = () => isConnected;
export default connectDB;
