import jwt from "jsonwebtoken";
import variable from "../conf/variable.js"
import ApiResponse from "../utils/apiResponse.js";
function authorizationMiddleware(req, res, next) {
    try {
        const token = req.cookies.token;
        if (!token) {
            ApiResponse(res, 401, false, "Please login first !!", "unauthorized access");
        }
        const decoded = jwt.verify(token, variable.secret);
        req.user = decoded;
        next();

    } catch (error) {
        console.log("error in authorization function")
        ApiResponse(res, 500, false, "internal server error !!", "server error",)
    }
};


export default authorizationMiddleware;