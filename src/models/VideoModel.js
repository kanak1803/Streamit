import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  username: { type: String, required: true },
  comment: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

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
        "TECHNOLOGY",
        "OTHER",
      ],
      default: "OTHER",
    },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    comments: [commentSchema],
  },
  { timestamps: true }
);

const Video = mongoose.models.Video || mongoose.model("Video", videoSchema);
export default Video;
