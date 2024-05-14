import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      required: [true, "Please Enter Username."],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Please Enter Email."],
    },
    password: {
      type: String,
      required: [true, "Please Enter Password."],
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    forgotPasswordToken: String,

    forgotPasswordTokenExpiry: String,

    verifyToken: String,

    verifyTokenExpiry: String,

    avatar: { type: String, default: "default_avatar.png" },
    videos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Video" }],
    likedVideos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Video" }],
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
