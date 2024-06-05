import { dbConnect } from "@/dbConfig/dbconnect";
import Video from "@/models/VideoModel";
import { NextResponse } from "next/server";

//connecting to database
dbConnect();

export async function POST(req) {
  try {
    const {
      title,
      description,
      uploader,
      category,
      url,
      thumbnail,
      likes,
      comments,
    } = await req.json();

    // Check if the uploader is provided
    if (!uploader) {
      return NextResponse.json(
        { error: "Uploader is required" },
        { status: 400 }
      );
    }

    const newVideo = new Video({
      title,
      description,
      uploader,
      category,
      url,
      thumbnail,
      likes,
      comments,
    });
    // Save the video document to the database
    const savedVideo = await newVideo.save();
    return NextResponse.json(
      { message: "Video Created succesfully", video: savedVideo },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "failed to create video in database", error },
      { status: 500 }
    );
  }
}
