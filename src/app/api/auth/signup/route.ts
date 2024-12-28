import User from "@/models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/libs/mongodb";



export async function POST(req: Request) {

    // get username, email, password from request body
    const { username, email, password, role } = await req.json();

    // check if fields are empty
    if (!username || !email || !password) {
        return NextResponse.json({ message: "Please fill all fields" }, { status: 400 });
    }
    // check if email is valid
    const emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/; // regex to validate email
    if (!emailRegex.test(email)) {
        return NextResponse.json({ message: "Please fill a valid email address" }, { status: 400 });
    }
    // check if password is strong
    // 6 to 20 characters which contain at least one numeric digit, one uppercase and one lowercase letter
    // const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/; 
    // if ( !passwordRegex.test(password) ) {
    //     return NextResponse.json({ message: "Password must be 6 to 20 characters which contain at least one numeric digit, one uppercase and one lowercase letter" }, { status: 400 });
    // }

    try {
        // connect to database
        await connectDB();

        // check if user or email already exists and sent a message error with especific message if email or username already exists
        const user = await User.findOne({ $or: [{ email }, { username }] });
        if (user) {
            if (user.email === email) {
                return NextResponse.json({ message: "Email already exists" }, { status: 400 });
            } else {
                return NextResponse.json({ message: "Username already exists" }, { status: 400 });
            }
        }
        // hash password
        const salt = await bcrypt.genSalt(12); // generate salt with 12 rounds 
        const hashedPassword = await bcrypt.hash(password, salt); // hash password with salt 

        // create new user
        const newUser = new User({ username, email, password: hashedPassword, role });
        // save user to database
        const savedUser = await newUser.save();
        console.log(savedUser);

        // return response
        return NextResponse.json({
            message: "User created successfully",
            _id: savedUser._id,
            user: savedUser,
        }, { status: 201 });
    } catch (error) {
        console.error(`Error: ${error}`);
        if ( error instanceof Error ) {
            return NextResponse.json({ message: error.message }, { status: 500 });
        }
    }
}