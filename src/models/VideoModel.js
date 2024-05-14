import mongoose from "mongoose";

const videoSchema = new mongoose.Schema(
  {
    title: { type: String, required: [true, "Add title"] },
    description: { type: String, required: [true, "Add Description"] },
    url: { type: String, required: true },
    thumbnail: { type: String },
    uploader: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    category: {
      type: String,
      enum: [
        "MUSIC",
        "GAMING",
        "COMEDY",
        "ENTERTAINMENT",
        "SPORTS",
        "FITNESS",
        "LIFESTYLE",
        "OTHER",
      ],
      default: "OTHER",
    },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
  },
  { timestamps: true }
);

const Video = mongoose.models.Video || mongoose.model("Video", videoSchema);
export default Video;
