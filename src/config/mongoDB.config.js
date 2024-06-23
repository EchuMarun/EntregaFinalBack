import mongoose from 'mongoose';

export const connectionMongoDB = async () => {
  try {
    mongoose.connect('');
    console.log('conectado a MongoDB');
  } catch (error) {
    console.log(`Error:${error}`);
  }
};
