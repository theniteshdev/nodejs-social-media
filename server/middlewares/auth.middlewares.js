import jwt from "jsonwebtoken";
import variable from "../conf/variable.js"
import ApiResponse from "../utils/apiResponse.js";
function authorizationMiddleware(req, res, next) {
    try {
        const token = req.body.token;
        if (!token) {
            return ApiResponse(res, 401, false, "Please login first !!", "unauthorized access");
        }
        const decoded = jwt.verify(token, variable.secret);
        req.user = decoded;
        next();

    } catch (error) {
        console.log(error.name)
        console.log("error in authorization function")
        return ApiResponse(res, 500, false, error.name == "TokenExpiredError" ? "Token Expired!!" : "internal server error !! ? ", null)
    }
};


export default authorizationMiddleware;