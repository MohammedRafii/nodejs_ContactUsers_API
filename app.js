import { config } from 'dotenv'
import express from 'express'
import userRouter from './routes/userRoutes.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'

config({
  path:"./data/config.env"
})
export const app = express()

// Using Middlewares
app.use(express.json())
app.use(cookieParser())
app.use(cors({
  origin:[process.env.FRONTEND_URL],
  methods:["GET","POST","PUT","DELETE"],
  credentials:true
}))

// Using Routes
app.use('/api/v1/user',userRouter)

// Initial Page
app.get('/',(req,res)=>{
  res.send("MERN Stack API")
})