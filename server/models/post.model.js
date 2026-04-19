import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    content: {
        type: String,
        required: true,
        maxlength: 280,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserModel",
        required: true,
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserModel",
    }]
}, { timestamps: true });

export const PostModel = mongoose.model("PostModel", postSchema);