import mongoose from "mongoose";

export async function dbConnect() {
  try {
    mongoose.connect(process.env.MONGODB_URI);
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("MongoDB Connected");
    });

    connection.on("error", (error) => {
      console.log("failed to connect mongoDB", error);
      process.exit();
    });
  } catch (error) {
    console.log("something went wrong in connecting to database", error);
  }
}
