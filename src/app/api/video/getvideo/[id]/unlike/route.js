import { dbConnect } from "@/dbConfig/dbconnect";
import Video from "@/models/VideoModel";

export async function POST(req, { params }) {
  await dbConnect();
  const { id } = params;
  const { userId } = await req.json();

  try {
    const video = await Video.findByIdAndUpdate(
      id,
      // Remove the user ID from likes array
      {
        $pull: { likes: userId },
      },
      { new: true }
    );
    if (!video) {
      return new Response(JSON.stringify({ error: "Video not found" }), {
        status: 404,
      });
    }
    return new Response(JSON.stringify(video), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
    });
  }
}
