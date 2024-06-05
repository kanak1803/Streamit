import { dbConnect } from "@/dbConfig/dbconnect";
import Video from "@/models/VideoModel";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  await dbConnect();
  const { id } = params;

  try {
    const video = await Video.findById({ _id: id }).populate("uploader");
    if (!video) {
      return NextResponse.json({ error: "video not found" }, { status: 404 });
    }
    return NextResponse.json(
      { message: "video found", video },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "failed to get video from db ", error },
      { status: 500 }
    );
  }
}
