import { dbConnect } from "@/dbConfig/dbconnect";
import Video from "@/models/VideoModel";
import { NextResponse } from "next/server";

export async function GET(req) {
  await dbConnect();

  try {
    const videos = await Video.find().populate(
      "uploader",
      "username email avatar"
    );

    if (videos.length === 0) {
      return NextResponse.json({ error: "No videos found" }, { status: 404 });
    }
    return NextResponse.json(
      { message: "Found vidoes!", videos },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "failed to get all video from database" },
      { status: 500 }
    );
  }
}
