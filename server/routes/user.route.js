import express from "express";
import { addPost, deletePost, toggleLike, updatePost, getAllPosts } from "../controllers/user.controller.js";
import { follow } from "../controllers/follower.controller.js";


const UserRoute = express.Router();

UserRoute.post("/add-post", addPost);
UserRoute.delete("/delete-post/:postId", deletePost);
UserRoute.post("/toggleLike/:postId", toggleLike);
UserRoute.put("/update-post/:postId", updatePost);
UserRoute.get("/allposts", getAllPosts);
UserRoute.post("/follow/:whoToFollowId", follow);


export default UserRoute 