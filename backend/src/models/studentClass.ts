import mongoose from "mongoose";

const classSchema = new mongoose.Schema({
    name: {
        type: String, required: true
    },
    schoolUniqueId: {
        type: String,
        required: true
    },
}, { timestamps: true });

export const StudentClass = mongoose.model('Class', classSchema);