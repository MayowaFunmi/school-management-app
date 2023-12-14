import mongoose from "mongoose";

const organizationSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

    organizationName: {
        type: String,
        required: true,
    },
    organizationUniqueId: {
        type: String,
        required: true,
        unique: true
    },
}, { timestamps: true });

export const Organization = mongoose.model('Organization', organizationSchema);