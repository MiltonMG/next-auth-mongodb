import mongoose from "mongoose";

const {MONGODB_URI} = process.env;

if (!MONGODB_URI) {
    throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
}

export const connectDB = async () => {
    try {
        const { connection } = await mongoose.connect(MONGODB_URI);
        if ( connection.readyState === 1 ) {// 1: connected
            console.log(`MongoDB Connected: ${connection.host}`);
            return Promise.resolve(connection);// return connection
        }
    } catch (error) { 
        console.error(`Error: ${error}`);
        process.exit(1);
    }
}
