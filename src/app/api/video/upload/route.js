import cloudinary from "@/utils/cloudinaryConfig";
import { NextResponse } from "next/server";

export default async function POST(req) {
  try {
    //filestr is filestring base64-encoded string of the video file which user selects
    const filestr = req.body.data;

    const response = await cloudinary.uploader.upload_large(filestr, {
      resource_type: "video",
      chunk_size: 6000000,
    });
    console.log("Response of cloudinary:", response);
    return NextResponse.json(
      {
        url: response.secure_url,
        thumbnailUrl: response.eager[0].secure_url,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "failed to upload video to cloudinary", error },
      { status: 500 }
    );
  }
}
