import mongoose from "mongoose";

const levelSchema = new mongoose.Schema({
    name: {
        type: String, required: true
    },
    schoolUniqueId: {
        type: String,
        required: true
    },
}, { timestamps: true });

export const StudentLevel = mongoose.model('Level', levelSchema);