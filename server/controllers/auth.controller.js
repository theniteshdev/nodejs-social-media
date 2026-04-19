import { UserModel } from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import variable from "../conf/variable.js";
import ApiResponse from "../utils/apiResponse.js";

const login = async (req, res) => {
    try {
        if (req.body === undefined) {
            return ApiResponse(
                res,
                400,
                false,
                "Username and password are required",
                "validation error"
            );
        }
        const { username, password } = req.body;
        if (!username || !password) {
            return ApiResponse(
                res,
                400,
                false,
                "Username and password are required",
                "validation error"
            );
        }
        const user = await UserModel.findOne({
            $or: [{ email: username }, { username }]
        })
            .populate({
                path: "posts"
            })
            .populate({
                path: "followers"
            }).populate({
                path: "following"
            })
        if (!user) {
            return ApiResponse(
                res,
                401,
                false,
                "Invalid username or password",
                "invalid credentials"
            );
        }
        console.log(user.password)
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return ApiResponse(
                res,
                401,
                false,
                "Invalid username or password",
                "invalid credentials",
                "from password"
            );
        };
        const token = jwt.sign(
            { id: user._id },
            variable.secret,
            { expiresIn: "5m" }
        );

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 5 * 60 * 1000 // 5 minutes
        });

        const dataUserToSend = {
            username: user.username,
            email: user.email,
            age: user.age,
            posts: user.posts,
            followers: user.followers,
            following: user.following,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        }

        return ApiResponse(
            res,
            200,
            true,
            "User logged in successfully",
            "no errors",
            dataUserToSend
        );
    } catch (error) {
        console.error(error);
        return ApiResponse(
            res,
            500,
            false,
            "Internal server error",
            error.message
        );
    }
};
const signup = async (req, res) => {
    try {
        const { username, password, email, age } = req.body;
        if (!username || !password || !email || !age) {
            return ApiResponse(
                res,
                400,
                false,
                "All fields are required",
                "validation error"
            );
        }

        if (age < 18) {
            return ApiResponse(
                res,
                400,
                false,
                "You must be at least 18 years old",
                "age validation failed"
            );
        }
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return ApiResponse(
                res,
                409,
                false,
                "Email already exists",
                "conflict error"
            );
        }
        const hashedPassword = await bcrypt.hash(password, 12);
        await UserModel.create({
            username,
            email,
            age,
            password: hashedPassword
        });

        return ApiResponse(
            res,
            201,
            true,
            "Account created successfully",
            "no errors"
        );

    } catch (error) {
        console.error(error);
        return ApiResponse(
            res,
            500,
            false,
            "Internal server error",
            error.message
        );
    }
};

export { login, signup };