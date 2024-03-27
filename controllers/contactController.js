import { Contact } from "../models/contactModel.js";
import ErrorHandler from "../middlewares/error.js";
export const add = async (req, res, next) => {
  try {
    const { name, email, phone } = req.body
    const contactEmail = await Contact.findOne({ userId: objectId(req.user._id),email })
    const contactPhone = await Contact.findOne({ userId: objectId(req.user._id),phone })
    if (contactEmail) return next(new ErrorHandler("Contact Email already Exist", 400))
    if (contactPhone) return next(new ErrorHandler("Contact Phone number already Exist", 400))
    await Contact.create({
      name, email, phone,
      userId: req.user._id
    })
    res.status(201).json({
      success:true,
      message:"Contact added Successfully"
    })
  } catch (e) {
    next(e)
  }
}
export const all = async (req, res, next) => {
  try {
    const contacts = await Contact.find({userId:req.user._id})
    res.status(200).json({
      success:true,
      user:contacts
    })
  } catch (e) {
    next(e)
  }
}
export const view = async (req, res, next) => {
  try {
    const contact = await Contact.findById(req.params.id)
    if (!contact) return next(new ErrorHandler("Contact Not Found!", 404))
    res.status(200).json({
      success:true,
      user:contact
    })
  } catch (e) {
    next(e)
  }
}
export const update = async (req, res, next) => {
  try {
    const contact = await Contact.findByIdAndUpdate(req.params.id, req.body)
    if (!contact) return next(new ErrorHandler("Contact Not Found!", 404))
    res.status(200).json({
      success:true,
      message:"Updated Successfully"
    })
  } catch (e) {
    next(e)
  }
}
export const remove = async (req, res, next) => {
  try {
    const contact = await Contact.findById(req.params.id)
    if (!contact) return next(new ErrorHandler("Contact Not Found!", 404))
    await Contact.deleteOne(contact)
    res.status(200).json({
      success:true,
      message:"Deleted Successfully!"
    })

  } catch (e) {
    next(e)
  }
}
