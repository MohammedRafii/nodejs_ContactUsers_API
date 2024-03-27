import mongoose from "mongoose";
const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
});

// Create a compound unique index on userId, email, and phone
contactSchema.index({ userId:1,email: 1 }, { unique: true });
contactSchema.index({ userId:1,phone: 1 }, { unique: true });
export const Contact = mongoose.model("Contact", contactSchema);


