import mongoose from "mongoose";

export const connectDB = () => {
  mongoose
    .connect(process.env.MONGODB_URI, { dbName: "backendAPIContactProject" })
    .then(() => {
      console.log("DB Connected");
    })
    .catch((e) => console.log(e));
};