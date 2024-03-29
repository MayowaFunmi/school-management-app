import mongoose from "mongoose";

const deptSchema = new mongoose.Schema({
    name: {
        type: String, required: true
    },
    schoolUniqueId: {
        type: String,
        required: true
    },
}, { timestamps: true });

export const Department = mongoose.model('Department', deptSchema);