import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, "Username is required"],
            unique: true,
            lowercase: true,
            trim: true,
            minlength: [4, "Username must be at least 4 characters"],
            maxlength: [20, "Username must be less than 20 characters"],
            index: true
        },

        age: {
            type: Number,
            required: [true, "Age is required"],
            min: [13, "Age must be at least 13"]
        },

        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            lowercase: true,
            trim: true,
            index: true,
            match: [
                /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                "Please enter a valid email address"
            ]
        },

        password: {
            type: String,
            required: [true, "Password is required"],
            minlength: [8, "Password must be at least 8 characters"],
        },

        posts: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "PostModel"
            }
        ],

        followers: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "UserModel"
            }
        ],

        following: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "UserModel"
            }
        ]
    },
    {
        timestamps: true
    }
);

export const UserModel = mongoose.model("UserModel", userSchema);