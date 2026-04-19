import { UserModel } from "../models/user.model.js";
import { PostModel } from "../models/post.model.js"
import ApiResponse from "../utils/apiResponse.js"

const addPost = async (req, res) => {
    try {
        const { user } = req;
        console.log(user)
        const { content } = req.body;

        if (!content) {
            ApiResponse(res, 400, false, "please provide post content", "content is empty")
            return;
        };
        if (!user) {
            ApiResponse(res, 401, false, "unauthorized user not allowed to create post", "unauthorized")
            return;
        };

        let findUser = await UserModel.findOne({ _id: user.id });
        if (!findUser) {
            ApiResponse(res, 404, false, "user not found!!", "not found!!")
            return;
        }
        let newPost = await PostModel.create({
            content,
            author: findUser._id,
        });

        findUser.posts.push(newPost)
        await findUser.save();
        ApiResponse(res, 201, true, "post created", "NO ERRORS", {
            postContent: newPost.content,
            postId: newPost._id,
        })
        return
    } catch (error) {
        console.log("Error while creating post", error);
        ApiResponse(res, 500, false, "internal server error", error.message)
    }
}

const deletePost = async (req, res) => {
    try {
        const { user } = req;
        const { postId } = req.params;
        if (!user) {
            ApiResponse(res, 401, false, "your are not authorized to delte this post");
            return;
        };// if ends

        const findUser = await UserModel.findOne({ _id: user.id });
        if (!findUser) {
            ApiResponse(res, 404, false, "user not found", "not found!!")
            return
        };

        const post = await PostModel.findOne({ _id: postId })
        if (!post) {
            ApiResponse(res, 404, false, "post with this ID not found!!", "post not found!!")
            return;
        };

        if (String(post.author) !== user.id) {
            ApiResponse(res, 403, false, "you are not allowed to delete this post", "not allowed !!")
            return
        };

        await post.deleteOne()
        await UserModel.findByIdAndUpdate(user.id, {
            $pull: { posts: post._id }
        })

        ApiResponse(res, 200, true, "post deleted", "NO ERRORS");
        return
    } catch (error) {
        console.log("Error while creating post", error);
        ApiResponse(res, 500, false, "server error!!", error.message)
    }
}

const toggleLike = async (req, res) => {
    try {

        const { user } = req;
        const { postId } = req.params;

        if (!user) {
            ApiResponse(res, 401, false, "unauthorized", "unauthorized")
            return;
        }

        let findPost = await PostModel.findById(postId);
        if (!findPost) {
            ApiResponse(res, 404, false, "post not found", "post not found!!")
            return;
        };

        let isLikedByUser = findPost.likes.includes(user.id)
        if (isLikedByUser) {
            findPost.likes = findPost.likes.filter((id) => id.toString() !== user.id);
        } else {
            findPost.likes.push(user.id)
        }
        await findPost.save();

        ApiResponse(res, 200, true, `${isLikedByUser ? "post unliked" : "post liked"}`, "NO ERRORS");
    } catch (error) {
        ApiResponse(res, 500, false, "internal server error!!", "server error!!")
    }
};

const updatePost = async (req, res) => {
    try {
        const { user } = req;
        const { postId } = req.params;
        const { updatedContent } = req.body;

        if (!user || !postId) {
            ApiResponse(res, 401, false, "Unauthorized", "Unauthorized",)
            return;
        };

        let findPost = await PostModel.findById(postId);
        if (!findPost) {
            ApiResponse(res, 404, false, "post with this ID is not found!!", "post not found!!",)
            return;
        };
        if (findPost.author.toString() !== user.id) {
            ApiResponse(res, 401, false, "you cannot uupdate this post", "unauthorized update")
            return;
        };
        findPost.content = updatedContent;
        await findPost.save()

        ApiResponse(res, 200, true, "post updated", "NO ERRORS", findPost)
    } catch (error) {
        ApiResponse(res, 500, false, "internal server error!!", "server error!!");
    }
};

const getAllPosts = async (req, res) => {
    try {
        const allPosts = await PostModel.find()
            .populate({
                path: "author",
                select: "username email",
            })
            .populate({
                path: "likes",
                select: "username email"
            });
        ApiResponse(res, 200, true, "all posts", "NO ERRORS", {
            posts: allPosts,
            totalPosts: getAllPosts.length,
        });
    } catch (error) {
        ApiResponse(res, 500, false, "internal server error!!", error.message)
        console.log(error)
        return;
    }
}

export { addPost, deletePost, toggleLike, updatePost, getAllPosts };