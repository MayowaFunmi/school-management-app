import mongoose from "mongoose";

const zoneSchema = new mongoose.Schema({
    organizationUniqueId: {
        type: String,
        required: true
    },
    name: {
        type: String, required: true
    }
}, { timestamps: true });

export const Zone = mongoose.model('Zone', zoneSchema);