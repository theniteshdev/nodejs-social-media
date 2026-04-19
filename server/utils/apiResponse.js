
function ApiResponse(res, statusCode, success, message, error = "something went wrong !!", data = null) {
    if (!res) {
        return "please provide response object"
    }
    return res.status(statusCode).json({
        success,
        message,
        error,
        data
    })
}

export default ApiResponse;