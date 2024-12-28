import { Schema, model, models } from "mongoose";
 // create schema for User model with username, email, password, role, createdAt, updatedAt, isActive
export const userSchema = new Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
        trim: true,
        unique: [true, "Username is already taken"],
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        match: [
            /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
            "Please fill a valid email address",
        ],// regex to validate email
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        select: false,
    },
    role: {
        type: String,
        required: true,
        enum: ["user", "admin"],
        default: "user",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
});
// avoid recompiling model User if it exists already in mongoose.models
// third argument is to especify the collection name in the database -> model("User", userSchema, "usersTesting")
const User = models.User || model("User", userSchema, "usersTesting"); 
// export model User
export default User;