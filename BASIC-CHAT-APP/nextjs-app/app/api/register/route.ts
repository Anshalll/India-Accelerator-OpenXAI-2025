import { RegisterModel } from "@/models/model";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import passwordValidator from 'password-validator';
import bcrypt from 'bcrypt'

const JWT_SECRET = process.env.JWT_SECRET || "jwt";

const schema = new passwordValidator();

schema
    .is().min(5)
    .is().max(100)
    .has().uppercase()
    .has().lowercase()
    .has().digits(1)
    .is().not().oneOf(['Passw0rd', 'Password123']);

export async function POST(req: Request) {

    try {

        const body = await req.json();
        const existingUser = await RegisterModel.findOne({ email: body.email });

        if (!body.username || !body.name || !body.email || !body.password) {
            return NextResponse.json({ error: "All fields are required." }, { status: 400 });
        }

        const existingUsername = await RegisterModel.findOne({ username: body.username });
        if (existingUsername) {
            return NextResponse.json({ error: "Username already taken." }, { status: 400 });
        }   


        if (existingUser) {
            return NextResponse.json({ error: "Email already registered." }, { status: 400 });
        }


        if (!schema.validate(body.password)) {
            return NextResponse.json({ error: "Password does not meet requirements." }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(body.password, 10);

        const user = new RegisterModel({
            username: body.username,
            name: body.name,
            email: body.email,
            password: hashedPassword,
            profileicon: ""
        });

        await user.save();


        const token = jwt.sign(
            { id: user._id, username: user.username, email: user.email },
            JWT_SECRET,
            { expiresIn: "1h" }
        );

        const response = NextResponse.json({ message: "Registration successful!" });
        response.cookies.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 3600,
            path: "/",
        });

        return NextResponse.json({ message: "Registration successful!" }, { status: 200 });

    } catch (error) {

        console.error(error)
        return NextResponse.json({ error: "Internal server error." }, { status: 500 });

    }
}