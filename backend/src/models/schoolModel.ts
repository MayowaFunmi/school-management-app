import mongoose from "mongoose";

const schoolSchema = new mongoose.Schema({
  organizationUniqueId: {
    type: String,
    required: true
  },
  schoolUniqueId: {
    type: String,
    required: true,
    unique: true
  },
  zone: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Zone',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  }
}, { timestamps: true });

export const School = mongoose.model('School', schoolSchema);