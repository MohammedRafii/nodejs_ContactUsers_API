import mongoose from "mongoose";

export const connectDB = () => {
  mongoose
    .connect(process.env.MONGODB_URI, { dbName: "backendapiContactUsers" })
    .then(() => console.log(`db connect in mongodb atlas`))
    .catch((e) => console.log(e));
};
