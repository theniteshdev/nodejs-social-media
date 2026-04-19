import mongoose from 'mongoose';
import variable from '../conf/variable.js';

const connectToDB = async () => {
    try {
        await mongoose.connect(variable.mongo_url);
        console.log('Database connected');
    } catch (error) {
        console.error('Database connection failed', error);
    }
};

export default connectToDB;