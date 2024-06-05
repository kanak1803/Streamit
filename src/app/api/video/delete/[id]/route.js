import { dbConnect } from "@/dbConfig/dbconnect";
import Video from "@/models/VideoModel";
import { NextResponse } from "next/server";

export async function DELETE(req, { params }) {
  await dbConnect();
  const { id } = params;

  if (!id) {
    return NextResponse.json(
      { error: "Video ID is required" },
      { status: 400 }
    );
  }

  try {
    const deletedVideo = await Video.findByIdAndDelete(id);
    if (!deletedVideo) {
      return NextResponse.json(
        { error: "Video not found with the specified ID" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { message: "Video deleted successfully", deletedVideo },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "failed to delete selected video" },
      { status: 500 }
    );
  }
}
