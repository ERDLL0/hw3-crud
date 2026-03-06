import mongoose from 'mongoose';

export const initMongoConnection = async () => {
    const MONGODB_URI = process.env.MONGODB_URI;

    if (!MONGODB_URI) {
        throw new Error('MONGODB_URI is not defined in environment variables');
    }

    try {
        await mongoose.connect(MONGODB_URI);
        console.log('MongoDB connection established!');
    } catch (error) {
        console.error('MongoDB connection failed:', error.message);
        throw error;
    }
};
