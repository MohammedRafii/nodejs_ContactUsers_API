import { User } from "../models/userModel.js";
import bcrypt from "bcrypt";
import { setCookie } from "../utils/features.js"
import ErrorHandler from "../middlewares/error.js";

export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body
    let user = await User.findOne({ email })
    if (user) return next(new ErrorHandler("User Already Exist", 400))
    const hashedPassword = await bcrypt.hash(password, 10)

    user = await User.create({ name, email, password: hashedPassword })

    setCookie(user, res, `Hi ${user.name}`, 201)
  }
  catch (error) {
    next(error)
  }
}

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body
    let user = await User.findOne({ email }).select("+password");
    if (!user) return next(new ErrorHandler("Invalid E-mail or Password", 400))
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) return next(new ErrorHandler("Invalid E-mail or Password", 400))
    setCookie(user, res, `Welcome Back ${user.name}`, 200)
  }
  catch (error) {
    next(error);
  }
}

export const getUserDetails = (req, res) => {
  const { user } = req
  return res.status(200).json({
    success: true,
    user
  })
}

export const logout = (req, res) => {
  // const uniqueCookieName = `token_${req.user._id}`;
  res.status(200).clearCookie("token", "", {
    httpOnly: true,
    expires: new Date(Date.now()),
    sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
    secure: process.env.NODE_ENV === "Development" ? false : true
  }).json({
    success:true,
    message:"Logged Out"
  })
}