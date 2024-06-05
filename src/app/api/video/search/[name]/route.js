import { dbConnect } from "@/dbConfig/dbconnect";
import Video from "@/models/VideoModel";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  await dbConnect();
  const { name } = params;

  try {
    const videos = await Video.find({
      $or: [
        { title: { $regex: name, $options: "i" } }, // Case-insensitive title search
        { description: { $regex: name, $options: "i" } }, // Case-insensitive description search
      ],
    });
    return NextResponse.json(
      { message: "Successfully fetched user search video", videos },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch search video from database" },
      { status: 500 }
    );
  }
}
