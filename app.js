import { config } from "dotenv";
import express from "express";
import userRoute from "./routes/userRoute.js";
import contactRouter from "./routes/contactRouter.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { errorMiddleware } from "./middlewares/error.js";

config({ path: "./data/config.env" });
export const app = express();

// Using Middlewares
app.use(express.json())
app.use(cookieParser())
app.use(
  cors({
    origin: [process.env.FRONT_URL, process.env.LocalHost],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
  }))

// Using Routes
app.use("/api/v1/user", userRoute)
app.use("/api/v1/contact", contactRouter)

app.get("/", (_req, res) => {
  res.send("<h1>Working</h1>");
});

app.use(errorMiddleware)
