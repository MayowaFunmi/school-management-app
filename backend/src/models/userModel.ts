import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },

    firstName: {
        type: String,
        required: true,
    },

    lastName: {
        type: String,
        required: true,
    },

    uniqueId: {
        type: String,
        required: true,
        unique: true
    },

    roles: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Role', select: true
    }],

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },
}, { timestamps: true });

export const User = mongoose.model('User', userSchema);