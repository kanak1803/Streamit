import { dbConnect } from "@/dbConfig/dbconnect";
import User from "@/models/UserModel";
import Video from "@/models/VideoModel";
import cloudinary from "@/utils/cloudinaryConfig";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  await dbConnect();
  const { id } = params;
  if (!id) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }

  try {
    const user = await User.findById(id).select("-password"); // exclude password from fetching from database
    if (!user) {
      return NextResponse.json(
        { error: "User not found", error },
        { status: 404 }
      );
    }
    //fetching videos that the user has uploaded
    const videos = await Video.find({ uploader: id }).populate(
      "uploader",
      "username"
    );
    return NextResponse.json({ user, videos }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch user profile", details: error.message },
      { status: 500 }
    );
  }
}

//api to update user data like avatar etc
export async function PUT(req, { params }) {
  await dbConnect();
  const { id } = params;

  if (!id) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }

  const { username, email, avatar } = await req.json();

  try {
    //find the user
    const user = await User.findById(id);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    // Update fields
    if (username) user.username = username;
    if (email) user.email = email;
    if (avatar) user.avatar = avatar;
    // Save updates
    await user.save();
    return NextResponse.json(
      { message: "User updated successfully", user },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update user profile", details: error.message },
      { status: 500 }
    );
  }
}
