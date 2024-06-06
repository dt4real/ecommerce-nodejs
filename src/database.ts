import mongoose from 'mongoose';
import { config } from '@users/config';

const databaseConnection = async (): Promise<void> => {
  try {
    await mongoose.connect(`${config.DATABASE_URL}`);
    console.info('app successfully connected to database.');
  } catch (error) {
    console.log('error', 'app databaseConnection() method error:', error);
  }
};

export { databaseConnection };