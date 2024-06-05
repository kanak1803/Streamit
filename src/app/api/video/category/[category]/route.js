import { dbConnect } from "@/dbConfig/dbconnect";
import Video from "@/models/VideoModel";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  await dbConnect();
  const { category } = params;
  try {
    const query = category ? { category } : {};
    const videos = await Video.find(query).populate("uploader");
    if (videos.length === 0) {
      return NextResponse.json({ error: "No videos found" }, { status: 404 });
    }
    return NextResponse.json(
      { message: " category Found videos!", videos },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to get category videos from database",
        details: error.message,
      },
      { status: 500 }
    );
  }
}
