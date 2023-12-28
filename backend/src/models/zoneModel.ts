import mongoose from "mongoose";

const zoneSchema = new mongoose.Schema({
    organizationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Organization'
    },
    name: {
        type: String, required: true
    }
}, { timestamps: true });

export const Zone = mongoose.model('Zone', zoneSchema);