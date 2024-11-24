import mongoose from "mongoose";
import { getEnvVariable } from "../utils/getEnvVariable";

const  connectDB = async () => {
    try {

        const dbURL = getEnvVariable('MONGODB_URL')
        const dbName = getEnvVariable('DB_NAME')

        await mongoose.connect(`${dbURL}/${dbName}`)

        console.log('DB connected');
    } catch (error) {
        console.error('mongoDB connection error', error);
        process.exit(1)
}
}

export default connectDB;