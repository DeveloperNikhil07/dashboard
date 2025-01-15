import ConnectDataBase from "@/app/lib/db";
import User from "@/app/models/User";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        // Connect to MongoDB
        await ConnectDataBase();

        // Parse request body
        let body;
        try {
            body = await request.json();
        } catch (err) {
            return NextResponse.json(
                { message: "Invalid JSON input" },
                { status: 400 }
            );
        }

        const { fullname, email, password } = body;

        // Validate input
        if (!fullname || !email || !password) {
            return NextResponse.json(
                { message: "All fields are required: fullname, email, password" },
                { status: 400 }
            );
        }

        // Check for duplicate email
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json(
                { message: "User with this email already exists" },
                { status: 409 }
            );
        }

        // Save the new user
        const newUser = new User({ fullname, email, password });
        await newUser.save();

        // Success response
        return NextResponse.json(
            { message: "User created successfully", user: newUser },
            { status: 200 }
        );
    } catch (err) {
        console.error("Error during user signup:", err);
        return NextResponse.json(
            { message: "Error during user signup", error: err.message },
            { status: 500 }
        );
    }
}
