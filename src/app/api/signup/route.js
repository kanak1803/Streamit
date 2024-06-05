// http://localhost:3000/api/signup

import { dbConnect } from "@/dbConfig/dbconnect";
import User from "@/models/UserModel";

import bcrypt from "bcryptjs";

import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await dbConnect();
    const { username, email, password } = await req.json();

    const user = await User.findOne({ email });

    if (user) {
      return NextResponse.json({ ErrorMessage: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "POST Error (Sign up)" });
  }
}
