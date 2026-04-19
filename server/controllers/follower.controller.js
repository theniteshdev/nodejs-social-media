import { UserModel } from "../models/user.model.js";
import ApiResponse from "../utils/apiResponse.js"

const follow = async (req, res) => {
    try {
        const { user } = req; // this is coming from cookie
        const { whoToFollowId } = req.params; // this coming from prams

        if (!user || !whoToFollowId) {
            ApiResponse(res, 400, false, "bad request")
            return;
        }

        const iswhoToFollowIdExist = await UserModel.findById(whoToFollowId);
        if (!iswhoToFollowIdExist) {
            ApiResponse(res, 404, false, "you want to follow that user does't exist !", "you want to follow that user does't exist !")
            return;
        }
        const findUser = await UserModel.findById(user.id);
        const isAreadyFollow = findUser.following.includes(whoToFollowId);
        if (isAreadyFollow) {
            ApiResponse(res, 409, false, "you already follow to given user.", "already followed")
            return;
        }

        findUser.following.push(whoToFollowId);
        await findUser.save();
        iswhoToFollowIdExist.followers.push(user.id);
        await iswhoToFollowIdExist.save();
        ApiResponse(res, 200, true, `${findUser.username} successfully follow ${iswhoToFollowIdExist.username}`, "NO ERRORS", {
            totalFollowers: findUser.followers.length,
            totalFollowing: findUser.following.length,
        })
        return;
    } catch (error) {
        ApiResponse(res, 500, false, "internal server error", error.message);
    }
};


export { follow };