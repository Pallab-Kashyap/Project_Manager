import mongoose from "mongoose";

const  connectDB = async () => {
    try {

        if (!process.env.MONGODB_URL) {
            throw new Error('MongoDB connection URL is not defined in environment variables.');
          }

        await mongoose.connect(process.env.MONGODB_URL)

        console.log('DB connected');
    } catch (error) {
        console.error('db error');
}
}

export default connectDB;