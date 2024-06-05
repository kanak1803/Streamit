import { dbConnect } from "@/dbConfig/dbconnect";
import Video from "@/models/VideoModel";

export async function POST(req, { params }) {
  await dbConnect();
  const { id } = params;
  let requestBody;
  try {
    requestBody = await req.json();
    console.log("Body",requestBody);
  } catch (error) {
    return new Response(JSON.stringify({ error: "Invalid JSON" }), {
      status: 400,
    });
  }

  const { userId, username, comment } = requestBody;

  try {
    const video = await Video.findById(id);
    if (!video) {
      return new Response(JSON.stringify({ error: "Video not found" }), {
        status: 404,
      });
    }
    video.comments = video.comments || [];
    video.comments.push({ userId, username, comment, createdAt: new Date() });
    await video.save(); // Save the updated document
    return new Response(JSON.stringify(video), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
    });
  }
}
