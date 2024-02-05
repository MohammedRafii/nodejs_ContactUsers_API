import jwt from "jsonwebtoken";

export const setCookie = (user,res,message,statusCode=200)=>{
  const token = jwt.sign({_id:user._id},process.env.JWT_SECRET)

  res.status(statusCode).cookie(`token_${user._id}`,token,{
    httpOnly:true,
    maxAge:15*60*1000,
    sameSite:process.env.NODE_ENV ==="Development"?"lax":"none",
    secure:process.env.NODE_ENV ==="Development"?false:true
  }).json({
    success: true,
    message
  })
}

export const sendResponce = (res,statusCode=200,message)=>{
  return res.status(statusCode).json({
    success:true,
    message
  })
}