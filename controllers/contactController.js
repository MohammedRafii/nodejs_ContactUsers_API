import { Contact } from "../models/contactModel.js";
import { sendResponce } from "../utils/features.js"
import ErrorHandler from "../middlewares/error.js";

export const add = async (req, res, next) => {
  try {
    const { name, email, phone } = req.body
    let contact = await Contact.findOne({ email })
    if (contact) return next(new ErrorHandler("Contact Email already Exist", 400))
    await Contact.create({
      name, email, phone,
      userId: req.user._id
    })
    sendResponce(res, 201, "Contact added Successfully")
  } catch (e) {
    next(e)
  }
}
export const all = async (req, res, next) => {
  try {
    const contacts = await Contact.find({userId:req.user._id})
    sendResponce(res, 200, contacts)
  } catch (e) {
    next(e)
  }
}
export const view = async (req, res, next) => {
  try {
    const contact = await Contact.findById(req.params.id)
    if (!contact) return next(new ErrorHandler("Contact Not Found!", 404))
    sendResponce(res, 200, contact)
  } catch (e) {
    next(e)
  }
}
export const update = async (req, res, next) => {
  try {
    const contact = await Contact.findByIdAndUpdate(req.params.id, req.body)
    if (!contact) return next(new ErrorHandler("Contact Not Found!", 404))
    sendResponce(res, 200, "Updated Successfully")
  } catch (e) {
    next(e)
  }
}
export const remove = async (req, res, next) => {
  try {
    const contact = await Contact.findById(req.params.id)
    if (!contact) return next(new ErrorHandler("Contact Not Found!", 404))
    await Contact.deleteOne(contact)
    sendResponce(res, 200, "Deleted Successfully!")
  } catch (e) {
    next(e)
  }
}